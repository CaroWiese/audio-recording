-- Revert audio-recording:init from pg

BEGIN;

DROP TABLE "audio";

COMMIT;
