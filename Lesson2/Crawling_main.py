import unittest
import sys
import re
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

def request_and_parsed_reuters_page(url: str):
    res = requests.get(url)
    html_doc = res.text
    soup = BeautifulSoup(html_doc,"lxml")
    return soup


def _extract_sales_q4_2018(soup: BeautifulSoup):
    sales = soup.find("td",  text=re.compile(".*SALES.*"),
                             attrs={"class":"dataTitle"})\
                            .find_next("td",text= re.compile(".*Dec.*18.*"))\
                            .parent\
                            .select("td")[2].getText()
    return float(sales.replace(",",""))

def _extract_SE(soup: BeautifulSoup):
    se = soup.find("span",  text=re.compile(".*Stock Exchange.*"),
                             attrs={"class":"nasdaqChangeHeader"}).\
                            find_next("span", attrs={"style": "font-size: 23px;"})\
                            .getText()
    return float(se.replace(",",""))

def _extract_SE_Change(soup: BeautifulSoup):
    se_change = soup.find("span", attrs={"class":"priceDetail"})\
                    .find_next("span", attrs={"class":"valueContentPercent"})\
                    .children
    return se_change


def _to_float(s: str):




def main():
    reuters_financial_url = "https://www.reuters.com/finance/stocks/financial-highlights/"
    dict_reuters_abreviation = {"Louis Vuitton":"LVMH.PA",
                                "Airbus":"AIR.PA",
                                "Danone":"DANO.PA"}

    summary = pd.DataFrame(columns= ['Sales Q4-2018', 'SE', 'SE Change'], dtype= np.int64)

    soup_danone = request_and_parsed_reuters_page(reuters_financial_url+dict_reuters_abreviation["Danone"])

    print(_extract_sales_q4_2018(soup_danone))
    print(_extract_SE(soup_danone))
    print(_extract_SE_Change(soup_danone))

if __name__ == '__main__':
    main()

class Crawling_uni_test(unittest.TestCase):

    def test_get_sales_q4_2018(self):
        url_danone = "https://www.reuters.com/finance/stocks/financial-highlights/DANO.PA"
        url_airbus = "https://www.reuters.com/finance/stocks/financial-highlights/AIR.PA"
        url_louis_vuitton = "https://www.reuters.com/finance/stocks/financial-highlights/LVMH.PA"
        soup_danone = BeautifulSoup(requests.get(url_danone).text, "lxml")
        soup_airbus = BeautifulSoup(requests.get(url_airbus).text, "lxml")
        soup_louis_vuitton = BeautifulSoup(requests.get(url_louis_vuitton).text, "lxml")
        self.assertEqual(_extract_sales_q4_2018(soup_danone), 6072.60)
        self.assertEqual(_extract_sales_q4_2018(soup_airbus), 23493.00)
        self.assertEqual(_extract_sales_q4_2018(soup_louis_vuitton), 13667.70)

