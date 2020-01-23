CREATE DEFINER=`admin`@`%` PROCEDURE `basicsearch`(city1 VARCHAR(3), city2 VARCHAR(3), date1 VARCHAR(10))
BEGIN
	select f1.price as total, f1.routeStr as rs1, f1.depTime as dt1, f1.arrTime as at1, f1._id as i1, f1.carrier as c1, f1.price as p1, f1.layovers as l1
	from (select * from route_price where fromPort = city1 AND toPort = city2 AND depTime BETWEEN unix_timestamp(date1) - 86400 AND unix_timestamp(date1) + 172800  order by price LIMIT 100 ) f1
	order by total
	LIMIT 100;
END