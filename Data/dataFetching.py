import bs4 as bs
import pandas as pd
import pickle
import requests
import time

url = 'https://www.ultimatespecs.com'

def get_brand_links():
    response = ''
    
    while True:
        try:
            response = requests.get(url)
            break
        except:
            print("Connection refused by the server..")
            print("Let me sleep for 5 seconds")
            print("ZZzzzz...")
            time.sleep(5)
            print("Was a nice sleep, now let me continue...")
            continue
    
    soup = bs.BeautifulSoup(response.text, 'lxml')
    div = soup.find('div', {'class': 'home_brands'})
    links = []

    for row in div.findAll("div", {"class": "home_brands_line"}):
        for r in row.findAll('a', href=True):
            links.append(url + r['href'])
    
    links.pop()
    with open('brand_links.pickle', 'wb') as f:
        pickle.dump(links, f)
    
#get_brand_links()

def get_model_links():
    with open('brand_links.pickle', 'rb') as f:
        car_links = pickle.load(f)
    
    all_links = []
    for link in car_links:
        links = []
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
        div = soup.find('div', {'class': 'home_models_line'})

        for row in div.findAll("a"):
            links.append(url + row['href'])

        links.pop()
        all_links.extend(links)

    with open('model_links.pickle', 'wb') as f:
        pickle.dump(all_links, f)
    
#get_model_links()

## Denna måste göras om, just nu finns det sidor där 
# jag väntar mig olika versioner av samma modell men 
# den finns bara en version så man kommer direkt till 
# listan av varianter...
def get_model_version_links():
    with open('model_links.pickle', 'rb') as f:
        model_links = pickle.load(f)
    all_links = []

    for link in model_links:
        print(link)
        links = []
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
        a = soup.findAll('a', {'class': 'col-md-3'})

        if not a:
            print('A is empty')
            links.append(link)
        else:
            for row in a:
                links.append(url + row['href'])

        all_links.extend(links)

    with open('model_version_links.pickle', 'wb') as f:
        pickle.dump(all_links, f)

#get_model_version_links()

def get_model_version_variants_links():
    with open('model_version_links.pickle', 'rb') as f:
        version_links = pickle.load(f)
    
    all_links = []
    for link in version_links:
        print(link)
        links = []
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
        table = soup.findAll('table', {'class': 'table_versions'})
        if not table:
            print('No table')
        for row in table:
            for r in row.findAll('tr')[1:]:
                links.append(url + r.findAll('td')[0].find('a')['href'])
                #print('R:',r.findAll('td')[0].find('a')['href'])
        all_links.extend(links)
    
    with open('model_version_variants_links.pickle', 'wb') as f:
        pickle.dump(all_links, f)

#get_model_version_variants_links()

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
    data = []
    if not tables:
        print('No table')
    for table in tables:
        for row in table.findAll('tr'):
            #print(row)
            d = ''
            for r in row.findAll('td'):
                #print(r.text)
                d = d + ' | ' + r.text.strip()
            data.append(d)
            #for r in row.findAll('tr')[1:]:
                #links.append(url + r.findAll('td')[0].find('a')['href'])
    #print(data)
    for d in data:
        print(d)

#get_data_for_all_cars()

def testing():
    print('Testing!')
    links = []
    link = 'https://www.ultimatespecs.com/car-specs/Alfa-Romeo-models/Alfa-Romeo-Giulietta'
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
    a = soup.findAll('a', {'class': 'col-md-3'})
    
    if not a:
        print('A is empty')
        links.append(link)
    else:
        for row in a:
            links.append(url + row['href'])

    print(links)

#testing()

def pickle_to_csv():
    with open('model_version_variants_links.pickle', 'rb') as f:
        links = pickle.load(f)
    
    df = pd.DataFrame()
    df['Links'] = links

    df.to_excel('all_variants.xlsx')

pickle_to_csv()


    
    




