-- Verify audio-recording:init on pg

BEGIN;

SELECT id FROM "audio" WHERE false;

ROLLBACK;
