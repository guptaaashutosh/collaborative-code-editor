-- migrate:up
ALTER TABLE IF EXISTS editor_schema.user ADD COLUMN token STRING;

-- migrate:down

ALTER TABLE IF EXISTS editor_schema.user DROP COLUMN token;