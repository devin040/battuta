#!/usr/bin/env python3

import requests
from mysql.connector import (connection)
from datetime import datetime

startTime = datetime.now()

locs = ['LHR', 'CDG', 'AMS', 'MAD',
        'BCN', 'FCO', 'DUB', 'ZRH', 'CPH', 'VIE', 'TXL']
routeid = 0
flightPriceIdx = 0


addflightPrice = ("INSERT INTO flightPrices "
                "(routeid, carrier, depTime, arrTime, price, layovers)"
                "VALUES (%s, %s, %s, %s, %s, %s)")
addflightLeg = ("INSERT INTO flightlegs "
                "(priceID, airline, flightno, routeid, fromPort, toPort, depTime, arrTime)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")

cnx = connection.MySQLConnection(user='admin', password='1qaz!QAZ',
                                 host='battuta.cole6w4w7clq.us-east-2.rds.amazonaws.com',
                                 database='battutardb')
cursor = cnx.cursor()

for loc1 in locs:
    for loc2 in locs:
        if loc1 != loc2:
            routeid = routeid + 1
            response = requests.get("https://api.skypicker.com/flights?fly_from=" + loc1 + "&fly_to=" + loc2 +
                                    "&dateFrom=16/12/2019&dateTo=20/12/2019&flight_type=oneway&partner=picky")
            data = response.json()
            flights = data['data']
            flightLimit = len(flights)
            deb = 'currently on flight str' + repr(loc1) + ' ' + repr(loc2) + ' len = ' + repr(flightLimit)
            print(deb)
            #if flightLimit > 3:
            #    flightLimit = 3
            for x in range(flightLimit):
                flightPriceIdx = flightPriceIdx + 1
                legs = flights[x]['route']
                flight_data = (routeid, flights[x]['airlines'][0], flights[x]['dTime'], flights[x]['aTime'], flights[x]['price'], (len(legs) - 1))
                cursor.execute(addflightPrice, flight_data)
                cnx.commit()
                priceId = cursor.lastrowid
                for leg in range(len(legs)):
                    leg_data = (priceId, legs[leg]['airline'], legs[leg]['operating_flight_no'], routeid, legs[leg]['flyFrom'], legs[leg]['flyTo'], legs[leg]['dTime'], legs[leg]['aTime'])
                    cursor.execute(addflightLeg, leg_data)
                    cnx.commit()
#cnx.commit()
cursor.close()
cnx.close()
print('done!')

cnx.close()

print(datetime.now() - startTime)

print("Hello l py")
