-- Deploy audio-recording:init to pg

BEGIN;

CREATE TABLE "audio" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE
);

COMMIT;
