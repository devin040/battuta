Select (f1.price + f2.price + f3.price + f4.price) as total, r1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															r2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            r3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            r4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from routes r1 NATURAL JOIN flightPrices f1, routes r2 NATURAL JOIN flightPrices f2, routes r3 NATURAL JOIN flightPrices f3, routes r4 NATURAL JOIN flightPrices f4
where r1.fromPort = 'LHR' AND r1.toPort IN ('CDG', 'TXL', 'MAD') AND 
	  r2.fromPort = r1.toPort AND r2.toPort in ('CDG', 'TXL', 'MAD') AND
      r3.fromPort = r2.toPort AND r3.toPort IN ('CDG', 'TXL', 'MAD') AND r3.toPort != r1.toPort AND
      r4.fromPort = r3.toPort AND r4.toPort = 'LHR' AND
      f1.depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800 AND
      f2.depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 AND
      f3.depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 AND
      f4.depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800
LIMIT 50000