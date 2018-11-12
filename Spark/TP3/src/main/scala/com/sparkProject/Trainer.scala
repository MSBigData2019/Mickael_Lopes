package com.sparkProject

import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql._
import org.apache.spark.sql.functions._
import org.apache.spark.ml.feature.{RegexTokenizer, Tokenizer, StopWordsRemover, StringIndexer, OneHotEncoder, VectorAssembler,  CountVectorizer, IDF, PCA}
import org.apache.spark.ml.{Pipeline, PipelineModel}
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.tuning.{ParamGridBuilder, CrossValidator, TrainValidationSplit}
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator


object Trainer {

  def main(args: Array[String]): Unit = {

    val conf = new SparkConf().setAll(Map(
      "spark.scheduler.mode" -> "FIFO",
      "spark.speculation" -> "false",
      "spark.reducer.maxSizeInFlight" -> "48m",
      "spark.serializer" -> "org.apache.spark.serializer.KryoSerializer",
      "spark.kryoserializer.buffer.max" -> "1g",
      "spark.shuffle.file.buffer" -> "32k",
      "spark.default.parallelism" -> "12",
      "spark.sql.shuffle.partitions" -> "12",
      "spark.driver.maxResultSize" -> "2g"
    ))

    val spark = SparkSession
      .builder
      .config(conf)
      .appName("TP_spark")
      .getOrCreate()

    import spark.implicits._

    /*******************************************************************************
      *
      *       TP 3
      *
      *       - lire le fichier sauvegarder précédemment
      *       - construire les Stages du pipeline, puis les assembler
      *       - trouver les meilleurs hyperparamètres pour l'entraînement du pipeline avec une grid-search
      *       - Sauvegarder le pipeline entraîné
      *
      *       if problems with unimported modules => sbt plugins update
      *
      ********************************************************************************/

    println("Starting Trainer program")

    val currentDir = System.getProperty("user.dir")


    // Loading of the dataset
    val df= spark.read.format("parquet")
      .option("header",true)
      .option("inferSchema","true")
      .load(currentDir + "/SparkTP3_prepared_trainingset/")
    df.show(5)


    println("Data loaded successful")
    println("Start of stages definition for regression Pipeline")

    // Definier donnees contextuelles: Stage 1-4

    // Stage 1 : Tokenize
    val tokenizer = new RegexTokenizer()
      .setPattern("\\W+")
      .setGaps(true)
      .setInputCol("text")
      .setOutputCol("textTokens")

    // Stage 2 : Stop Word Remover - We use the default stop  words from the class and set Case Sensitive to false
    val remover = new StopWordsRemover()
      .setInputCol("textTokens")
      .setOutputCol("textTokensFiltered")
      .setCaseSensitive(false)

    // Stage 3 : Count Vectorizer : Minimun DF set to 1, no maximun vocab size
    val cv = new CountVectorizer()
      .setInputCol("textTokensFiltered")
      .setOutputCol("textVectorized")

    // Stage 4 : TF-IDF calculation
    val idf = new IDF()
      .setInputCol("textVectorized")
      .setOutputCol("tfidf")

    // Convertir les catégories en données numériques: Stages 5-8

    // Stage 5, index country features
    val countryIndexer = new StringIndexer()
      .setInputCol("country2")
      .setOutputCol("country_indexed")
      .setHandleInvalid("skip")

    // Stage 6, index currency
    val currencyIndexer = new StringIndexer()
      .setInputCol("currency2")
      .setOutputCol("currency_indexed")
      .setHandleInvalid("skip")

    // Stage 7&8 , one hot encoder for the country and currency features

    val countryOneHot = new OneHotEncoder()
      .setInputCol("country_indexed")
      .setOutputCol("country_onehot")

    val currencyOneHot = new OneHotEncoder()
      .setInputCol("currency_indexed")
      .setOutputCol("currency_onehot")

    // Mettre les données sous une forme utilisable par Spark.ML.: Stage 9-10

    // Stage 9 , Vector Assembler
    val assembler = new VectorAssembler()
      .setInputCols(Array("tfidf", "days_campaign", "hours_prepa", "goal", "country_onehot", "currency_onehot"))
      .setOutputCol("features")


    // Stage 10 , creation of classifier in logistic regression
    val model_classifier = new LogisticRegression()
      .setElasticNetParam(0.0)
      .setFitIntercept(true)
      .setFeaturesCol("features")
      .setLabelCol("final_status")
      .setStandardization(true)
      .setPredictionCol("predictions")
      .setRawPredictionCol("raw_predictions")
      .setThresholds(Array(0.7, 0.3))
      .setTol(1.0e-6)
      .setMaxIter(300)

    // Pipeline creation
    val regPipeline = new Pipeline()
      .setStages(Array(tokenizer, remover, cv,idf, countryIndexer, currencyIndexer, countryOneHot, currencyOneHot, assembler,model_classifier))

    println("Stages and Pipeline defined")

    // Entraînement et tuning du modèle

    println("Starts the training and testing")
    println("Split raw dataset in testing and training")

    // Split in training and testing set
    val Array(dftraining, dftest)  = df.randomSplit(Array(0.9, 0.1), seed = 12345)

    println("Dataset split successful")

    // Def of grid for parameter
    val paramGrid = new ParamGridBuilder()
      .addGrid(model_classifier.regParam, Array(10e-8, 10e-6, 10e-4, 10e-2))
      .addGrid(cv.minDF, Array(55.0, 75.0, 95.0))
      .build()

    val evaluator = new MulticlassClassificationEvaluator()
      .setLabelCol("final_status")
      .setPredictionCol("predictions")
      .setMetricName("f1")

    // Train Linear Regression model
    val trainSplit = new TrainValidationSplit()
      .setEstimator(regPipeline)
      .setEvaluator(evaluator)
      .setEstimatorParamMaps(paramGrid)
      // 70% of the data will be used for training and the remaining 30% for validation.
      .setTrainRatio(0.7)

    // Let's also try a cross validation technique to see if we got the same results
    val crossVal = new CrossValidator()
      .setEstimator(regPipeline)
      .setEvaluator(evaluator)
      .setEstimatorParamMaps(paramGrid)
      .setNumFolds(10)

    println("evaluator and TrainValidation split defined")
    println("Start the fit on training set")

    // Train the model
    val trainSplit_model = trainSplit.fit(dftraining)


    println("fit successful")
    println("prediction and score on test set for Train Validation model")

    val df_predictions = trainSplit_model
      .transform(dftest)
      .select("features", "final_status", "predictions", "raw_predictions")

    df_predictions.groupBy("final_status","predictions").count().show()
    println("f1 score :" + evaluator.evaluate(df_predictions))



  }
}
