-- migrate:up
ALTER TABLE IF EXISTS editor_schema.user ADD COLUMN code_id STRING;

-- migrate:down

ALTER TABLE IF EXISTS editor_schema.user DROP COLUMN code_id;