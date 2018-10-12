import unittest
import sys
import re
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np


# ----------------- HTML Parsing function -----------------
def request_and_parsed_reuters_page(url: str):
    res = requests.get(url)
    html_doc = res.text
    soup = BeautifulSoup(html_doc,"lxml")
    return soup


# ----------------- DataStructure function -----------------
# Create the structure for storing, adding, updating the data
def create_dataframe():
    df = pd.DataFrame(columns=["Q4-2018",
                               "SE",
                               "SE_Change",
                               "SE_Currency",
                               "IH_share_percentage",
                               "Dividend_Comp",
                               "Dividend_Ind",
                               "Dividend_Sect"])
    return df

def extract_company_data(data: pd.DataFrame, company_name: str, company_page: str):
    reuters_financial_url = "https://www.reuters.com/finance/stocks/financial-highlights/"
    parsed_url = request_and_parsed_reuters_page(reuters_financial_url+company_page)

    q4_2018 = extract_sales_q4_2018(parsed_url)
    se = extract_SE(parsed_url)
    se_change = extract_SE_Change_percentage(parsed_url)
    IH_share_percentage = pourcentage_share_owned_institutional_horders(parsed_url)
    dividends = dividends_yields(parsed_url)

    row = pd.DataFrame([[q4_2018,
                       se["Stock Exchange"],
                       se_change, se["Currency"],
                       IH_share_percentage,
                       dividends["Company"],
                       dividends["Industry"],
                       dividends["Sector"]]],
                       index = [company_name],
                       columns = data.columns)
    return row

# ----------------- Extraction function-----------------
# Extract the target metadata from the html page
def extract_sales_q4_2018(soup: BeautifulSoup):
    sales = soup.find("td", text=re.compile(".*SALES.*"),
                             attrs={"class":"dataTitle"})\
                            .find_next("td",text= re.compile(".*Dec.*18.*"))\
                            .parent\
                            .select("td")[2].getText()
    return _from_string_to_float(sales)

def extract_SE(soup: BeautifulSoup):
    se_value = soup.find("span", text=re.compile(".*Stock Exchange.*"),
                             attrs={"class":"nasdaqChangeHeader"}).\
                            find_next("span", attrs={"style": "font-size: 23px;"})\
                            .getText()
    currency = soup.find("span", text=re.compile(".*Stock Exchange.*"),
                             attrs={"class":"nasdaqChangeHeader"}).\
                            find_next("span", attrs={"style": "font-size: 23px;"})\
                            .find_next().getText()
    se = {"Stock Exchange": _from_string_to_float(se_value), "Currency": currency }
    return se

def extract_SE_Change_percentage(soup: BeautifulSoup):
    se_change = soup.find("span", attrs={"class":"priceDetail"})\
                    .find_next("span", attrs={"class":"valueContentPercent"}).getText()
    return _from_string_to_percentage(se_change)

def pourcentage_share_owned_institutional_horders(soup: BeautifulSoup):
    share = soup.find("strong", text= re.compile(".*% Shares Owned.*"))\
                                .find_next("td", attrs={"class":"data"})\
                                .getText()
    return _from_string_to_percentage(share)

def dividends_yields(soup: BeautifulSoup):
    comp = soup.find("td", text=re.compile(".*Dividend Yield.*"))\
            .find_next().getText()
    ind = soup.find("td", text=re.compile(".*Dividend Yield.*"))\
            .find_next()\
            .find_next().getText()
    sec = soup.find("td", text=re.compile(".*Dividend Yield.*"))\
            .find_next()\
            .find_next()\
            .find_next().getText()
    dividend = {"Company": _from_string_to_float(comp),
                "Industry": _from_string_to_float(ind),
                "Sector": _from_string_to_float(sec)}
    return dividend


# ----------------- Utilities functions-----------------
# Clean the string and convert them if required
def _from_string_to_float(s: str):
    if (s=="--"):
        return 0.0
    else:
        s=re.sub("[,?!%()\t\n ]+","",s)
        return float(s)

def _from_string_to_percentage(s: str):
    if (s=="--"):
        return "0.0%"
    else:
        s=re.sub("[,?!()\t\n ]+","",s)
        return s


# ----------------- Main -----------------
def main():
    dict_reuters_abreviation = {"Louis Vuitton":"LVMH.PA",
                                "Airbus":"AIR.PA",
                                "Danone":"DANO.PA"}

    summary = create_dataframe()
    for comp in dict_reuters_abreviation.keys():
        summary = pd.concat([summary,
                             extract_company_data(summary, comp, dict_reuters_abreviation[comp])])

    print("-"*60+"\n[SUMMARY]")
    print("Information about the companies:"
          "\nLouis Vuitton (Paris SE)"
          "\nAirbus (Paris SE)"
          "\nDanone (Paris SE)\n")
    print("-" * 60+"\n[DATA]")

    print(summary)

if __name__== '__main__':
    main()

# ----------------- unit testing -----------------
# Requires the samples files contained in the unittest subfolder
class Crawling_uni_test(unittest.TestCase):

    # Jeux de donnees initiales
    try:
        unittest_amazon = "unittest/AMZN.html"
        unittest_facebook = "unittest/FB.html"
        unittest_boeing = "unittest/BA.html"
        unittest_adp = "unittest/ADP.html"
        f_amazon = open(unittest_amazon, 'r')
        f_facebook = open(unittest_facebook, 'r')
        f_boeing = open(unittest_boeing, 'r')
        f_adp = open(unittest_adp, 'r')
        text_amazon = f_amazon.read()
        text_facebook = f_facebook.read()
        text_boeing = f_boeing.read()
        text_adp = f_adp.read()
        soup_amazon = BeautifulSoup(text_amazon, 'lxml')
        soup_facebook = BeautifulSoup(text_facebook, 'lxml')
        soup_boeing = BeautifulSoup(text_boeing, 'lxml')
        soup_adp= BeautifulSoup(text_adp, 'lxml')
    except:
        print("Failed to load the unit test data files\n"
              "Check that unit test folder is in same file than python file")

    def test_get_sales_q4_2018(self):
        self.assertEqual(extract_sales_q4_2018(self.soup_amazon), 73835.40)
        self.assertEqual(extract_sales_q4_2018(self.soup_facebook), 16475.40)
        self.assertEqual(extract_sales_q4_2018(self.soup_boeing), 26581.40)
        self.assertEqual(extract_sales_q4_2018(self.soup_adp), 4284.20)

    def test_extract_se(self):
        self.assertEqual(extract_SE(self.soup_amazon), {"Stock Exchange": 1870.32,"Currency" : "USD"})
        self.assertEqual(extract_SE(self.soup_facebook), {"Stock Exchange": 157.90, "Currency": "USD"})
        self.assertEqual(extract_SE(self.soup_boeing), {"Stock Exchange": 385.44, "Currency": "USD"})
        self.assertEqual(extract_SE(self.soup_adp), {"Stock Exchange": 181.30, "Currency": "EUR"})

    def test_se_change_percentage(self):
        self.assertEqual(extract_SE_Change_percentage(self.soup_amazon), "+1.20%")
        self.assertEqual(extract_SE_Change_percentage(self.soup_facebook), "+0.00%")
        self.assertEqual(extract_SE_Change_percentage(self.soup_boeing), "-0.09%")
        self.assertEqual(extract_SE_Change_percentage(self.soup_adp), "-1.04%")

    def _test_from_string_to_float(self):
        self.assertEqual(_from_string_to_float("12,456.78"),12456.78)
        self.assertEqual(_from_string_to_float("+3.00 %"), 3.0)
        self.assertEqual(_from_string_to_float("-2.18 %"), -2.18)
        self.assertEqual(_from_string_to_float("--"), 0.0)

    def _test_from_string_to_percentage(self):
        self.assertEqual(_from_string_to_percentage("--"), "0.0%")
        self.assertEqual(_from_string_to_percentage("\n					            (-1.04%)				        \n"), "-1.04%")
        self.assertEqual(_from_string_to_percentage("\n					            (+0.00%)				        \n"), "+0.00%")
        self.assertEqual(_from_string_to_percentage("\n					            (+1.20%)				        \n"), "+1.20%")
        self.assertEqual(_from_string_to_percentage("\n					            (+13.20%)				        \n"), "+13.20%")
