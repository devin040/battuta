CREATE DEFINER=`admin`@`%` PROCEDURE `onecitysearch`(city1 VARCHAR(3), city2 VARCHAR(3), city3 VARCHAR(3), date1 VARCHAR(10), date2 VARCHAR(10))
BEGIN
	select (f1.price + f2.price) as total, f1.routeStr as rs1, f1.depTime as dt1, f1.arrTime as at1, f1._id as i1, f1.carrier as c1, f1.price as p1, f1.layovers as l1,
										   f2.routeStr as rs2, f2.depTime as dt2, f2.arrTime as at2, f2._id as i2, f2.carrier as c2, f2.price as p2, f2.layovers as l2
	from (select * from route_price where fromPort = city1 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 50 ) f1, 
			(select * from route_price where fromPort = city2 AND toPort = city3 AND depTime BETWEEN unix_timestamp(date2) - 86400 AND unix_timestamp(date2) + 172800 order by price LIMIT 50 ) f2
	order by total
	LIMIT 100;

END