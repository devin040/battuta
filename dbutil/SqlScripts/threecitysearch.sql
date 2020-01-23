CREATE DEFINER=`admin`@`%` PROCEDURE `threeCityFlight`(city1 VARCHAR(3), city2 VARCHAR(3), city3 VARCHAR(3),
    city4 VARCHAR(3), city5 VARCHAR(3), date1 VARCHAR(10), date2 VARCHAR(10), date3 VARCHAR(10), date4 VARCHAR(10))
BEGIN
    select * FROM (
	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr as rs1, f1.depTime as dt1, f1.arrTime as at1, f1._id as i1, f1.carrier as c1, f1.price as p1, f1.layovers as l1,
																f2.routeStr as rs2, f2.depTime as dt2, f2.arrTime as at2, f2._id as i2, f2.carrier as c2, f2.price as p2, f2.layovers as l2,
																f3.routeStr as rs3, f3.depTime as dt3, f3.arrTime as at3, f3._id as i3, f3.carrier as c3, f3.price as p3, f3.layovers as l3,
																f4.routeStr as rs4, f4.depTime as dt4, f4.arrTime as at4, f4._id as i4, f4.carrier as c4, f4.price as p4, f4.layovers as l4
	from (select * from route_price where fromPort = city1 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city2 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city3 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city4 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)

	UNION

	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, f1.depTime, f1.arrTime, f1._id, f1.carrier, f1.price, f1.layovers,
																f2.routeStr, f2.depTime, f2.arrTime, f2._id, f2.carrier, f2.price, f2.layovers,
																f3.routeStr, f3.depTime, f3.arrTime, f3._id, f3.carrier, f3.price, f3.layovers,
																f4.routeStr, f4.depTime, f4.arrTime, f4._id, f4.carrier, f4.price, f4.layovers
	from (select * from route_price where fromPort = city1 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city2 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city4 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city3 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)

	UNION

	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, f1.depTime, f1.arrTime, f1._id, f1.carrier, f1.price, f1.layovers,
																f2.routeStr, f2.depTime, f2.arrTime, f2._id, f2.carrier, f2.price, f2.layovers,
																f3.routeStr, f3.depTime, f3.arrTime, f3._id, f3.carrier, f3.price, f3.layovers,
																f4.routeStr, f4.depTime, f4.arrTime, f4._id, f4.carrier, f4.price, f4.layovers
	from (select * from route_price where fromPort = city1 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city3 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city2 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city4 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)

	UNION 

	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, f1.depTime, f1.arrTime, f1._id, f1.carrier, f1.price, f1.layovers,
																f2.routeStr, f2.depTime, f2.arrTime, f2._id, f2.carrier, f2.price, f2.layovers,
																f3.routeStr, f3.depTime, f3.arrTime, f3._id, f3.carrier, f3.price, f3.layovers,
																f4.routeStr, f4.depTime, f4.arrTime, f4._id, f4.carrier, f4.price, f4.layovers
	from (select * from route_price where fromPort = city1 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city3 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city4 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city2 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)

	UNION

	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, f1.depTime, f1.arrTime, f1._id, f1.carrier, f1.price, f1.layovers,
																f2.routeStr, f2.depTime, f2.arrTime, f2._id, f2.carrier, f2.price, f2.layovers,
																f3.routeStr, f3.depTime, f3.arrTime, f3._id, f3.carrier, f3.price, f3.layovers,
																f4.routeStr, f4.depTime, f4.arrTime, f4._id, f4.carrier, f4.price, f4.layovers
	from (select * from route_price where fromPort = city1 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city4 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city2 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city3 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)

	UNION

	(select (f1.price + f2.price + f3.price + f4.price) as total, f1.routeStr, f1.depTime, f1.arrTime, f1._id, f1.carrier, f1.price, f1.layovers,
																f2.routeStr, f2.depTime, f2.arrTime, f2._id, f2.carrier, f2.price, f2.layovers,
																f3.routeStr, f3.depTime, f3.arrTime, f3._id, f3.carrier, f3.price, f3.layovers,
																f4.routeStr, f4.depTime, f4.arrTime, f4._id, f4.carrier, f4.price, f4.layovers
	from (select * from route_price where fromPort = city1 AND toPort = city4 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 8 ) f1, 
			(select * from route_price where fromPort = city4 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 8 ) f2, 
			(select * from route_price where fromPort = city3 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date3) - 86400 AND unix_timestamp(date3) + 172800 order by price LIMIT 8 ) f3, 
			(select * from route_price where fromPort = city2 AND toPort = city5 AND depTime BETWEEN unix_timestamp(date4) - 86400 AND unix_timestamp(date4) + 172800  order by price LIMIT 8 ) f4
	order by total
	LIMIT 30)
	) as i
	order by total
	LIMIT 100;
END