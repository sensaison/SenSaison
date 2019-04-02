USE SenSeason_db;

INSERT INTO main_data
    (user_id, picture_id, date_time_obs, lat_lon, category, species, species_confidence, first_confidence, notes)
    VALUES (12345, "5", "1989-12-31 23:59:59", ST_GeomFromText("POINT(1 2)"), "animal", "red-footed booby", 4, 3, "lalalalalalalalalalala"),
    (678910, "4", "1990-12-31 23:59:59", ST_GeomFromText("POINT(3 4)"), "animal", "blue-footed booby", 3, 5, "rurururururururuur"),
    (678910, "3", "1883-12-31 23:59:59", ST_GeomFromText("POINT(5 6)"), "animal", "brown booby", 1, 1, "kjkjkjkjkjkjkjkjkjkjk"),
    (246810, "2", "2015-12-31 23:59:59", ST_GeomFromText("POINT(7 8)"), "animal", "masked booby", 2, 2, "dfdfdfdfdhfdffdfdfdfdf"),
    (246810, "1", "1630-12-31 23:59:59", ST_GeomFromText("POINT(9 10)"), "animal", "emperor penguin", 3, 5, "ctctctctctctctctct"),
    (246810, "100", "1998-12-31 23:59:59", ST_GeomFromText("POINT(11 12)"), "animal", "adelie penguin", 4, 5, "sisisisisisisisisisis"),
    (13579, "29", "2000-12-31 23:59:59", ST_GeomFromText("POINT(13 14)"), "animal", "rockhopper penguin", 4, 3, "mfmfmfmfmfmfmfmfmfmfm"),
    (13579, "13", "1766-12-31 23:59:59", ST_GeomFromText("POINT(15 16)"), "animal", "macaroni penguin", 5, 2, "bbebebebebebebebebebe"),
    (13579, "35", "2045-12-31 23:59:59", ST_GeomFromText("POINT(17 18)"), "animal", "anna's hummingbird", 4, 5, "hihihihihihihihihiihihi"),
    (13579, "esr", "1995-12-31 23:59:59", ST_GeomFromText("POINT(19 20)"), "animal", "ruby-throated hummingbird", 1, 5, "hahahahahahahahahaha");

INSERT IGNORE INTO user_data
    (user_id, firstname, lastname, email, username, pw)
    VALUES (12345, "Catherine", "Pham", "acpham028@gmail.com", "catherine", "abcde"),
    (678910, "Stefan", "Apreutesei", "stefan@apreutesei.com", "stefan", "fghij"),
    (246810, "Julie", "Mathews", "julie@mathews.com", "julie", "klmno"),
    (13579, "Auri", "Robbins-Phillips", "auri@r-b.com", "auri", "pqrst");


/*  unhex(replace(uuid(),'-','')) */