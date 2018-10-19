import json
import requests
import pandas as pd
import re
from bs4 import BeautifulSoup
from requests.auth import HTTPBasicAuth


def _get_username(soup):
    tags_users = soup.find("tbody").find_all("a", attrs={"href":re.compile("https://github.com/*")})
    users = [x.getText() for x in tags_users]
    return users

def _get_mean_star(json):
    sum = 0.0
    number_of_repository = 0
    for x in json:
        if (x["stargazers_count"] != 0):
            sum = sum + x["stargazers_count"]
            number_of_repository += 1
    if number_of_repository == 0:
        return 0
    else:
        return sum / number_of_repository


def main():
    url = "https://gist.github.com/paulmillr/2657075"
    api_url_main = "https://api.github.com/users/"
    res = requests.get(url)
    dict_users = {}
    users = []
    if (res.status_code == 200):
        soup = BeautifulSoup(res.text,"lxml")
        users = _get_username(soup)
        for user in users[0:10]:
            api_url_user = api_url_main + user+"/repos"
            # Request with my authorization to get more than 60 request. But I delete my password
            # Without password, use the request without authorization but it is limited in request
            # res_api = requests.get(api_url_user, auth=HTTPBasicAuth('MickaelLopes', 'xxxxxxxx'))
            res_api = requests.get(api_url_user)
            if res_api.status_code == 403:
                print("Reach limit of request")
                print("Try your request later or increase the number of allowed requests")
                break
            else:
                print("Processing User "+ user)
                json_res = json.loads(res_api.text)
                dict_users.update({user:_get_mean_star(json_res)})
    else:
        return False
    df = pd.Series(dict_users)
    print(df.head(200))


if __name__ == '__main__':
    main()



