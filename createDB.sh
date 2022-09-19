#!/bin/sh

if hash sqlite3 2>/dev/null; then
   echo "CREATE TABLE alarms (
        hour            INTEGER NOT NULL,
        minute          INTEGER NOT NULL,
        sunday          INTEGER NOT NULL,
        monday          INTEGER NOT NULL,
        tuesday         INTEGER NOT NULL,
        wednesday       INTEGER NOT NULL,
        thursday        INTEGER NOT NULL,
        friday          INTEGER NOT NULL,
        saturday        INTEGER NOT NULL,
        PRIMARY KEY(hour,minute),
        CHECK(hour >= 0 AND hour <= 23),
        CHECK(minute >= 0 AND minute <= 59),
        CHECK(sunday >= 0 AND monday >= 0 AND tuesday >= 0 AND wednesday >= 0 AND thursday >= 0 AND friday >= 0 AND saturday >= 0),
        CHECK(sunday <= 1 AND monday <= 1 AND tuesday <= 1 AND wednesday <= 1 AND thursday <= 1 AND friday <= 1 AND saturday <= 1)
    );
    CREATE TABLE settings (
        setting         TEXT NOT NULL,
        service         TEXT NOT NULL,
        value           BLOB NOT NULL,
        PRIMARY KEY(setting,service)
    );" | sqlite3 alarm.db

else
   echo "ERROR: sqlite3 is not installed" 
fi
