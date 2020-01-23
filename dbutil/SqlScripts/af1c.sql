select * FROM (
(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr as rs1, from_unixtime(f1.depTime), f1._id as i1, f1.carrier as c1, f1.price as p1, f1.layovers as l1,
															f2.routeStr as rs2, from_unixtime(f2.depTime), f2._id as i2, f2.carrier as c2, f2.price as p2, f2.layovers as l2,
                                                            f3.routeStr as rs3, from_unixtime(f3.depTime), f3._id as i3, f3.carrier as c3, f3.price as p3, f3.layovers as l3,
                                                            f4.routeStr as rs4, from_unixtime(f4.depTime), f4._id as i4, f4.carrier as c4, f4.price as p4, f4.layovers as l4
from (select * from route_price where fromPort = 'LHR' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'TXL' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'MAD' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'CDG' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 30)

UNION

(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from (select * from route_price where fromPort = 'LHR' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'TXL' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'CDG' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'MAD' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 30)

UNION

(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from (select * from route_price where fromPort = 'LHR' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'MAD' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'TXL' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'CDG' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 30)

UNION 

(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from (select * from route_price where fromPort = 'LHR' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'MAD' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'CDG' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'TXL' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 30)

UNION

(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from (select * from route_price where fromPort = 'LHR' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'CDG' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'TXL' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'MAD' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 30)

UNION

(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, from_unixtime(f1.depTime), f1._id, f1.carrier, f1.price, f1.layovers,
															f2.routeStr, from_unixtime(f2.depTime), f2._id, f2.carrier, f2.price, f2.layovers,
                                                            f3.routeStr, from_unixtime(f3.depTime), f3._id, f3.carrier, f3.price, f3.layovers,
                                                            f4.routeStr, from_unixtime(f4.depTime), f4._id, f4.carrier, f4.price, f4.layovers
from (select * from route_price where fromPort = 'LHR' AND toPort = 'CDG' AND depTime BETWEEN unix_timestamp('2019-12-03') - 86400 AND unix_timestamp('2019-12-03') + 172800  order by price LIMIT 8 ) f1, 
		(select * from route_price where fromPort = 'CDG' AND toPort = 'MAD' AND depTime BETWEEN unix_timestamp('2019-12-08') - 86400 AND unix_timestamp('2019-12-08') + 172800 order by price LIMIT 8 ) f2, 
        (select * from route_price where fromPort = 'MAD' AND toPort = 'TXL' AND depTime BETWEEN unix_timestamp('2019-12-13') - 86400 AND unix_timestamp('2019-12-13') + 172800 order by price LIMIT 8 ) f3, 
        (select * from route_price where fromPort = 'TXL' AND toPort = 'LHR' AND depTime BETWEEN unix_timestamp('2019-12-17') - 86400 AND unix_timestamp('2019-12-17') + 172800  order by price LIMIT 8 ) f4
order by total
LIMIT 50)
) as i
order by total
LIMIT 500