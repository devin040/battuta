const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const fs = require('fs');

const currency = 'USD';
var mongo = [];
var topSights = [];
var city  = '';
var country = '';
/** Keep the Countries and Cities Array Below 11  */
var countries = ['switzerland/zurich', 'denmark/copenhagen', 'austria/vienna', 'germany/berlin'];
/** Cities have to be capitalized for numbeo but must NOT for LP */
var cities = ['Zurich', 'Copenhagen', 'Vienna', 'Berlin'];


    (async () => {
        
        const browser = await puppeteer.launch();
        
        for (var j = 0; j < countries.length; j++){
            
            city = cities[j];
            country = countries[j];
            /**Reset Sights Array for next City */
            topSights = [];
            const page = await browser.newPage();
            await page.goto(`https://www.lonelyplanet.com/${country}`);
            await page.waitForSelector('.SightsList-item');
            
            const LIST_LINK_SELECTOR = '.SightsList-wrap > div:nth-child(INDEX) > a';
            const NAME_SELECTOR = '.SightsList-wrap > div:nth-child(INDEX) > a > div:nth-child(2) > h5';
            const LOCATION_SELECTOR = '.SightsList-wrap > div:nth-child(INDEX) > a > div:nth-child(2) > p';
            /** Get sights from LonelyPlanet */
            for (var i = 1; i < 9; i++ ){
                let linkSelector = LIST_LINK_SELECTOR.replace("INDEX", i);
                let nameSelector = NAME_SELECTOR.replace("INDEX", i);
                let locationSelector = LOCATION_SELECTOR.replace("INDEX", i);
                let plink = await page.evaluate((sel) => {
                    return document.querySelector(sel).getAttribute('href');
                }, linkSelector);
        
                let pname = await page.evaluate((sel) => {
                    return document.querySelector(sel).textContent;
                }, nameSelector);
        
                let plocation = await page.evaluate((sel) => {
                    return document.querySelector(sel).textContent;
                }, locationSelector);
                
                topSights.push({
                    name: pname,
                    location:  plocation,
                    link: 'https://lonelyplanet.com/' + plink
                });
        
            }
            console.log(topSights);
            
            /** Get CPI From Numbeo */
            await axios.get(`https://www.numbeo.com/cost-of-living/in/${city}?displayCurrency=${currency}`).then((response) => {
        
                const $ = cheerio.load(response.data);
                
                const rows = $('body > div.innerWidth > table > tbody > tr')
                    .filter((i, el) => $(el).children('td').length === 3)
                    .map(
                        (i, el) => $(el).children().map(
                            (i, el) => $(el).text().trim()
                        ).toArray()
                    ).toArray();
                
                const costs = chunkArray(rows, 3)
                    .map(([item, costWithSymbol, range]) => {
                        const cost = costWithSymbol.replace(/^.*?([\d,.]+).*?$/, '$1');
                        const [rangeLow, rangeHigh] = range.split('-');
                        return {
                            item,
                            cost,
                            range: {
                                low: rangeLow,
                                high: rangeHigh
                            }
                        }
                    });
                /**Push into Mongo JSON Array */    
                mongo.push({ city, costs, topSights, currency });
                })
                   
        }
        browser.close(); 
        var temp = JSON.stringify(mongo);
        fs.writeFileSync('mongoimp6.json', temp);
    })();


function chunkArray(arr, chunkSize) {
    let temp = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        temp.push(arr.slice(i, i + chunkSize));
    }
    return temp;
}