-- migrate:up
ALTER TABLE IF EXISTS editor_schema.code ADD COLUMN users STRING;

-- migrate:down

ALTER TABLE IF EXISTS editor_schema.code DROP COLUMN users;