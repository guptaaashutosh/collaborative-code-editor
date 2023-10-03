-- migrate:up

-- create table schema_name.table_name(elements);
CREATE TABLE editor_schema.user (
    id UUID NOT NULL DEFAULT gen_random_uuid() ,
    name STRING NOT NULL,
    email STRING NOT NULL,
    password STRING NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT "pk_user_id" PRIMARY KEY(id ASC) 
);


-- migrate:down

DROP TABLE IF EXISTS  editor_schema.user;

