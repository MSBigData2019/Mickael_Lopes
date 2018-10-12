import re
import requests
import numpy as np
from bs4 import BeautifulSoup

def request_and_parsed_darty_page(url: str):
    html= requests.get(url).text
    return BeautifulSoup(html,"lxml")

def _discount_percentage_list(soup: BeautifulSoup):
    match = soup.find_all("p", attrs={"class":"darty_prix_barre_remise darty_small separator_top"})
    list = [_from_string_percentage_to_float(k.getText()) for k in match]
    return list

def _from_string_percentage_to_float(str: str):
    s = re.sub("[-,?!%()\t\n ]+","",str)
    return float(s)

def main():
    main_url= "https://www.darty.com/nav/achat/informatique/ordinateur_portable/marque"
    marques = ["hp","dell"]
    average_discount = {}
    for marque in marques:
        l = []
        for i in range(1,10):
            if i ==1 :
                url = main_url+"__"+marque.lower()+"__"+marque.upper()+".html"
            else :
                url = main_url +"_"+str(i)+ "__" + marque.lower() + "__" + marque.upper() + ".html"
            l = l + _discount_percentage_list(request_and_parsed_darty_page(url))
        average_discount.update({marque:round(np.mean(l),2)})
    print(average_discount)
    return 0

if __name__ == '__main__':
    main()