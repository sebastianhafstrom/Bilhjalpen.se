import bs4 as bs
import pandas as pd
import pickle
import requests
import time

url = 'https://www.ultimatespecs.com'

def get_model_version_variants_links():
    with open('model_version_links.pickle', 'rb') as f:
        version_links = pickle.load(f)
    #link = 'https://www.ultimatespecs.com/car-specs/Audi/M10105/A1-(GB)-Sportback'
    i = 0
    length = len(version_links)
    dictionaries = []
    for link in version_links[:100]:
        if i % 10 == 0:
            print(i,'/',length)
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
        breadcrumbs = soup.findAll('div', {'class': 'breadcrumb'})
        image_div = soup.findAll('div', {'class': 'overImage'})
        try:
            img_url = (url + image_div[0].findAll('a')[0]['href'])
            print(img_url)
            # while True:
            #     try:
            #         res = requests.get(img_url)
            #         break
            #     except:
            #         print("Connection refused by the server..")
            #         print("Let me sleep for 5 seconds")
            #         print("ZZzzzz...")
            #         time.sleep(5)
            #         print("Was a nice sleep, now let me continue...")
            #         continue
            # soup = bs.BeautifulSoup(res.text, 'lxml')
            # image_div2 = soup.findAll('div', {'class': 'swiper-wrapper'})
            # #print(image_div2[0].findAll('img'))
            # image_array = []
            # for swiper in image_div2[0].findAll('img'):
            #     image_array.append('https:' + swiper['src'])
            #print(image_array)
        except:
            print('Error getting image links for: ', link)


        # try:
        #     for bread in breadcrumbs:
        #         arr = bread.text.split('>')
        #         last = arr[-1].lstrip()
        # except:
        #     print("Error with Breadcrumbs getting model for link: ", link)
        
        # try:
        #     for d in breadcrumbs:
        #         b = d.findAll('a')[1].text
        # except:
        #     print("Error with Breadcrumbs getting brand for link: ", link)
        
        
        # if not table:
        #     print('No table')
        # try:
        #     for row in table:
        #         for r in row.findAll('tr')[1:]:
        #             lin = url + r.findAll('td')[0].find('a')['href']
        #             n = r.findAll('td')[0].find('a').text
        #             n = n.rsplit(' ', 1)[0]
        #             y = r.findAll('td')[1].text
        #             dic = {
        #                 "link": lin,
        #                 "brand": b,
        #                 "model": last,
        #                 "variant": n,
        #                 "year": y,
        #                 "images": image_array
        #             }
        #             dictionaries.append(dic)
        # except:
        #     print("Error with getting the data of variants for link: ", link)
            
        i=i+1

    df = pd.DataFrame(dictionaries)
    df.to_excel('ALL_IMAGE_LINKS.xlsx')
    print(df)

get_model_version_variants_links()