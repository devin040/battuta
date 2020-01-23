Select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from route_price f1, route_price f2, route_price f3, route_price f4
where f1.fromPort = 'LHR' AND f1.toPort IN ('CDG', 'TXL', 'MAD') AND 
	  f2.fromPort = f1.toPort AND f2.toPort in ('CDG', 'TXL', 'MAD') AND
      f3.fromPort = f2.toPort AND f3.toPort IN ('CDG', 'TXL', 'MAD') AND f3.toPort != f1.toPort AND
      f4.fromPort = f3.toPort AND f4.toPort = 'LHR' AND
      f1.depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800 AND
      f2.depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 AND
      f3.depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 AND
      f4.depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800 AND
      f1.price <= (Select avg(price) from route_price where routeStr = f1.routeStr AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800) AND
      f2.price <= (Select avg(price) from route_price where routeStr = f2.routeStr AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800) AND
      f3.price <= (Select avg(price) from route_price where routeStr = f3.routeStr AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800) AND
      f4.price <= (Select avg(price) from route_price where routeStr = f4.routeStr AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800)
LIMIT 100000