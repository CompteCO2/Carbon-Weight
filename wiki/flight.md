# Flight Emissions
Firstly the distances are calculated between the airports selected, using the greater circle method: we compute the **distance in Km** from longitude and latitude using the haversine formula (cf. https://en.wikipedia.org/wiki/Haversine_formula).

This is then multiplied by the appropriate emissions factor specific to the type of flight (short haul or long haul) and the class of seat taken (e.g. economy class, business class etc.). The emissions factors include the distance uplift to compensate for planes not flying using the most direct route i.e. flying around international airspace, stacking etc.

## Short-Haul & Long-Haul


# Seat Types
The factors in use here are based on the area occupied by a passenger of different seat class. As you could fit more economy seats in a classic plane (YYY) than 1st class seats (YYY), emission of a 1st class passenger attribute to a larger percentage of the overall planes emission. This factors comes from the average of (source. XXXXX)

Different emission factors were calculated according to the relative area on the aircraft occupied by different seating classes, for example a first class seat would occupy a larger area compared to an economy class equivalent per passenger and therefore attribute to a larger percentage of the overall planes emission.
