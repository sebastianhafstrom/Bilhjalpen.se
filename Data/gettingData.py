import bs4 as bs
import pandas as pd
import pickle
import requests
import time

url = 'https://www.ultimatespecs.com'

def get_data_for_all_cars():
    #with open('model_version_variants_links.pickle', 'rb') as f:
    #    links = pickle.load(f)
    
    link = 'https://www.ultimatespecs.com/car-specs/Volvo/118860/Volvo-XC40-B4.html'
    links = []
    print(link)
    while True:
        try:
            response = requests.get(link)
            break
        except:
            print("Connection refused by the server..")
            print("Let me sleep for 5 seconds")
            print("ZZzzzz...")
            time.sleep(5)
            print("Was a nice sleep, now let me continue...")
            continue

    soup = bs.BeautifulSoup(response.text, 'lxml')
    tables = soup.findAll('table', {'class': 'content_text'})
    dic = {}
    if not tables:
        print('No table')
    for table in tables:
        
        for row in table.findAll('tr'):
            #print(row)
            key = ''
            value = ''
            for r in row.findAll('td', {'class': 'tabletd'}):
                key = r.text
                key = key[:-2]
                key = key.lstrip()
            for r in row.findAll('td', {'class': 'tabletd_right'}):
                value = r.text
                value = value.lstrip()
            dic[key] = value
                #d = d + r.text.strip()
            #dictionaries.append(d)
            #for r in row.findAll('tr')[1:]:
                #links.append(url + r.findAll('td')[0].find('a')['href'])
    #print(data)
    #for d in dictionaries:
        #print(d)
    print(dic)
    #df = pd.DataFrame(dic, index=[0])
    #print(df)
    #df.to_excel('test.xlsx')

get_data_for_all_cars()