import requests

locs = ['LHR', 'CDG', 'AMS', 'ISL', 'MAD',
        'BCN', 'FCO', 'DUB', 'ZRH', 'CPH', 'VIE', 'TXL']

for loc1 in locs:
    for loc2 in locs:
        if loc1 != loc2:
            response = requests.get("https://api.skypicker.com/flights?fly_from=" + loc1 + "&fly_to=" + loc2 +
                                    "&dateFrom=10/10/2019&dateTo=12/10/2019&flight_type=oneway&partner=picky")
            data = response.json()
            flights = data['data']
            flightLimit = len(flights)
            print(f"{loc1} {loc2} has {flightLimit} flights.")