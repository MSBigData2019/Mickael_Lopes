package com.sparkProject

import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql
import org.apache.spark.sql.functions._


object Preprocessor {

  def main(args: Array[String]): Unit = {

    // Des réglages optionels du job spark. Les réglages par défaut fonctionnent très bien pour ce TP
    // on vous donne un exemple de setting quand même
    val conf = new SparkConf().setAll(Map(
      "spark.scheduler.mode" -> "FIFO",
      "spark.speculation" -> "false",
      "spark.reducer.maxSizeInFlight" -> "48m",
      "spark.serializer" -> "org.apache.spark.serializer.KryoSerializer",
      "spark.kryoserializer.buffer.max" -> "1g",
      "spark.shuffle.file.buffer" -> "32k",
      "spark.default.parallelism" -> "12",
      "spark.sql.shuffle.partitions" -> "12"
    ))

    // Initialisation de la SparkSession qui est le point d'entrée vers Spark SQL (donne accès aux dataframes, aux RDD,
    // création de tables temporaires, etc et donc aux mécanismes de distribution des calculs.)
    val spark = SparkSession
      .builder
      .config(conf)
      .appName("TP_spark")
      .getOrCreate()

    import spark.implicits._


    /*******************************************************************************
      *
      *       TP 2
      *
      *       - Charger un fichier csv dans un dataFrame
      *       - Pre-processing: cleaning, filters, feature engineering => filter, select, drop, na.fill, join, udf, distinct, count, describe, collect
      *       - Sauver le dataframe au format parquet
      *
      *       if problems with unimported modules => sbt plugins update
      *
      ********************************************************************************/

    val df = spark.read.format("csv")
      .option("header",true)
      .option("inferSchema","true")
      .load("train_clean.csv")

    println("[INFO]: Training data loaded ")
    println("Numbers of columns : " + df.columns.size)
    println("Numbers of rows : " + df.count())

    println("\nTop 5 values of the dataframe \n")
    df.show(5)

    println("\nSchema of the training dataframe\n")
    df.printSchema()

    val dff = df.withColumn("goal", $"goal".cast(sql.types.IntegerType))
      .withColumn("deadline", $"deadline".cast(sql.types.IntegerType))
      .withColumn("state_changed_at", $"state_changed_at".cast(sql.types.IntegerType))
      .withColumn("created_at", $"created_at".cast(sql.types.IntegerType))
      .withColumn("launched_at", $"launched_at".cast(sql.types.IntegerType))
      .withColumn("backers_count", $"backers_count".cast(sql.types.IntegerType))
      .withColumn("final_status", $"final_status".cast(sql.types.IntegerType))

    dff.printSchema()

    dff.describe("goal","backers_count","final_status").show()

    dff.select("currency").distinct().show(100)
}

}
