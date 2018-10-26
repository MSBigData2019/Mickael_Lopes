import unittest
import json
import requests
import re
import pyjq
from bs4 import BeautifulSoup
import pandas as pd
from multiprocessing import Pool

url_IDF = "https://www.leboncoin.fr/recherche/?category=2&regions=12&model=Zoe&brand=Renault"
argus_headers = {
        "Host": "www.lacentrale.fr",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": "mob_=0; __uzma=5bd3127e463217.14710939; __uzmb=1540559486; __uzmc=6430140334947; __uzmd=1540571749; php_sessid=288efbcc8c604369b7e0c4a5c3a536b9; __ssds=2; retargeting_data=A; tCdebugLib=1; cikneeto_uuid=id:b4293950-e659-45c4-8dd8-d94c1fdb807e; __ssuzjsr2=a9be0cd8e; __uzmaj2=55cbfb76-80d0-4d5b-9d31-a6fb7fd0b9144299; __uzmbj2=1540559488; __uzmcj2=7203827428905; __uzmdj2=1540571738; cikneeto=date:1540571756102; atidvisitor=%7B%22name%22%3A%22atidvisitor%22%2C%22val%22%3A%7B%22vrn%22%3A%22-251312-%22%2C%22at%22%3A%22undefined%22%2C%22ac%22%3A%22%22%7D%2C%22options%22%3A%7B%22path%22%3A%22%2F%22%2C%22session%22%3A15724800%2C%22end%22%3A15724800%7D%7D; lc_layout=list; lc_pageSize=16; lc_seed=20181026131; lc_abSeed=76; lc_geolocation=%7B%22coords%22%3A%7B%22latitude%22%3A49.9%2C%22longitude%22%3A2.3%7D%2C%22zipcode%22%3A%2280000%22%2C%22source%22%3A%22ip%22%7D; ABTestingAxa=2; ABTestingLeLynx=1; ABTest=0; consulted_offers=288efbcc8c604369b7e0c4a5c3a536b9; det_vu=1%7C69103291748%2C69102851794%7C%7C%7C%7C; isBasket=; user_type=acheteur; euconsent=BOWP3j2OWP3j2CRBPAFRBX6AAAAeQAAAAQgABAAAAGAARgAAACgAAAgAAAAAABACAAAAAAABCAAgAAAAAIAAAAQAAABABIAAAEAAAAAAAAAAAIA; pubconsent=BOWP3j2OWP3j2CRBXAB6AAAE4A; __trossion=1540564408_1800_2_7bbbacd7-4a00-4e90-a364-436f3533efa1%3A1540564408_7bbbacd7-4a00-4e90-a364-436f3533efa1%3A1540571743_1540571743_1; __troRUID=7bbbacd7-4a00-4e90-a364-436f3533efa1; __troSYNC=1; extra_search_ftco=; opt=2",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1"
}
regions = {"IDF": 12, "PACA": 21, "Aquitaine": 2}
regions_argus = {"IDF" : "75001", "PACA": "06088", "Aquitaine": "33100"}
# argus_zen = "https://www.lacentrale.fr/cote-auto-renault-zoe-q90+zen+charge+rapide-2013.html"
# argus_life =
# argus_intens +
# argus_edition


def _get_car_urls(soup: BeautifulSoup):
    tags = soup.find_all("a", class_= "clearfix trackable")
    return [tag['href'] for tag in tags]

def _prix_argus_zoe(postal, year, mileage):
    argus_url = f"https://www.lacentrale.fr/get_co_prox.php?km={mileage}&zipcode={postal}&month=06&year={year}"
    json_data = json.loads(requests.get(argus_url,headers = argus_headers).text)
    return pyjq.one(".cote_brute", json_data)

def _get_data_zoe_page_data(soup,region):
    row_dict = {}
    pattern = re.compile("(?i)(\\blife\\b)|(\\bintens\\b)|(\\bedition\\b)|(\\bzen\\b)")
    tags = soup.find_all('script')
    json_data = json.loads(tags[-3].text[20:])
    row_dict.update({"Area":region})
    row_dict.update({"Year" : pyjq.one(".adview.attributes[] | select(.key == \"regdate\").value",json_data)})
    row_dict.update({"Mileage": pyjq.one(".adview.attributes[] | select(.key == \"mileage\").value", json_data)})
    row_dict.update({"Price": pyjq.one(".adview.price[]", json_data)})
    row_dict.update({"Phone": pyjq.one(".stores.byId[].phone_number", json_data)})
    row_dict.update({"Owner_type": pyjq.one(".adview.owner.type", json_data)})
    try:
        version = pattern.search(pyjq.one(".adview.subject", json_data))[0]
        row_dict.update({"Version":version.upper()})
    except TypeError:
        row_dict.update({"Version": ""})

    if (row_dict["Year"] != "2018"):
        row_dict.update({"Argus":_prix_argus_zoe(postal = regions_argus[region],
                                                 year=row_dict["Year"],
                                                 mileage = row_dict["Mileage"])})
    else :
        row_dict.update({"Argus": None})

    return row_dict

def main():
    request_headers = {
        "Accept-Language": "en-US,en;q=0.5",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "http://thewebsite.com",
        "Connection": "keep-alive"
    }

    df = pd.DataFrame(columns=["Version","Owner_type","Year","Mileage","Price","Phone","Argus"])
    for (k,v) in regions.items():
        print(f"Start region {k}")
        i = 1
        while(i<15):
            url = f"https://www.leboncoin.fr/recherche/?category=2&regions={v}&model=Zoe&brand=Renault&page={i}"
            page = requests.get(url, headers=request_headers)
            if (page.status_code ==200):
                print(f"Start Scrapping page {i} for region {k}")
                soup = BeautifulSoup(page.text,'lxml')
                ads = _get_car_urls(soup)
                if ads == []:
                    break
                else :

                    for ad in ads :
                        soup_ad = BeautifulSoup(requests.get(f"https://www.leboncoin.fr{ad}",headers=request_headers).text,'lxml')
                        df = df.append(pd.Series(_get_data_zoe_page_data(soup_ad,region=k)), ignore_index=True)

                i+=1

    df[["Argus","Price","Mileage"]] = df[["Argus","Price","Mileage"]].astype(float)
    df["Benefit Buyer"] = pd.Series(df["Argus"]-df["Price"], index=df.index)
    return df
if __name__ == '__main__':
    df_zoe = main()


# ------------------------------Unit Testing---------------------------------

# class test_unit_testing(unittest.TestCase):
#     return 0