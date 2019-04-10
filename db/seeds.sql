USE SenSaison_db;

INSERT IGNORE INTO Observations
    (userId, pictureId, dateObs, timeObs, latitude, longitude, category, species, speciesConfidence, firstConfidence, briefDescription)
    VALUES (12345, "5", "1989-12-31", "23:59:59", 68.50, -162.50, "animal", "red-footed booby", 4, 3, "lalalallalalalala"),
    (678910, "4", "1990-12-31", "23:59:59", 69.50, -161.50, "animal", "blue-footed booby", 3, 5, "rurururururururuur"),
    (678910, "3", "1883-12-31", "23:59:59", 70.50, -163.50, "plant", "white oak", 1, 1, "kjkjkjkjkjkjkjkjkjkjk"),
    (246810, "2", "2015-12-31", "23:59:59", 68.55, -162.51, "plant", "low-bush blueberry", 2, 2, "dfdfdfdfdhfdffdfdfdfdf"),
    (246810, "1", "1630-12-31", "23:59:59", 68.50, -162.00, "fungus", "morelle", 3, 5, "ctctctctctctctctct"),
    (246810, "100", "1998-12-31", "23:59:59", 55.50, -132.50, "weather", "hurricane", null, 1, "sisisisisisisisisisis"),
    (13579, "29", "2000-12-31", "23:59:59", 45.50, 32.50, "weather", "monsoon rain", null, 5, "mfmfmfmfmfmfmfmfmfmfm"),
    (13579, "13", "1766-12-31", "23:59:59", 88.50, 162.50, "weather", "above freezing", null, 5, "bbebebebebebebebebebe"),
    (13579, "35", "2045-12-31", "23:59:59", 50.50, -150.50, "fungus", "oyster mushroom", 4, 5, "hihihihihihihihihiihihi"),
    (13579, "esr", "1995-12-31", "23:59:59", 68.20, -161.90, "land_water", "freeze", null, 3, "hahahahahahahahahaha"),
    (13579, "456", "1995-12-01", "23:59:59", 68.10, -161.90, "other", "something", null, 2, "hahahahahahahahahaha");

INSERT IGNORE INTO Users
    (userId, firstName, lastName, email, username)
    VALUES (12345, "Catherine", "Pham", "acpham028@gmail.com", "catherine"),
    (678910, "Stefan", "Apreutesei", "sapreut@uw.edu", "stefan"),
    (246810, "Julie", "Mathews", "julie@mathews.com", "julie"),
    (13579, "Auri", "Robbins-Phillips", "auri@r-b.com", "auri");


/*  unhex(replace(uuid(),'-','')) */