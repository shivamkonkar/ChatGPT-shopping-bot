import os
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import urllib.request

op = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=op)

json_string = ''
driver.get('https://www.myntra.com/')
driver.minimize_window()

project_directory = os.path.abspath(os.path.dirname(__file__))

query = "yellow tshirts"
# query = sys.argv[0]

def startscrape(query):
    links = [] 
    time.sleep(1)
    driver.find_element("class name", 'desktop-searchBar').send_keys(query)
    driver.find_element("class name", 'desktop-submit').click()
    time.sleep(1)
    for product_base in driver.find_elements("class name", 'product-base'):
        prod_result = {}
        prod_result["brand"] = (product_base.find_element(By.XPATH,'a/div[2]/h3').text)
        prod_result["name"] = (product_base.find_element(By.XPATH,'a/div[2]/h4').text)
        prod_result["url"] = (product_base.find_element(By.XPATH,'a').get_attribute("href")) 
        UnSpliced_price = (product_base.find_element(By.XPATH,'a/div[2]/div/span').text)
        prod_result["price"] = UnSpliced_price[:UnSpliced_price.find('R', UnSpliced_price.find('R') + 1)]
        prod_result["rating"] = (product_base.find_element(By.XPATH,'div[2]/span').text)
        try:
            prod_result["image_url"] = product_base.find_element(By.TAG_NAME, 'img').get_attribute('src')
        except:
            print("Element not found")
        
        links.append(prod_result)
        if len(links) > 10:
            break

    json_string = json.dumps(links, indent=4)

    with open("./public/py/sample.json", "w") as outfile:
        outfile.write(json_string)
    return(json_string)

print(startscrape(query))
driver.quit()


    