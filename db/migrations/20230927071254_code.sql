-- migrate:up
CREATE TABLE editor_schema.code (
    cid UUID NOT NULL DEFAULT gen_random_uuid() ,
    code STRING NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT "pk_code_cid" PRIMARY KEY(cid ASC) 
);


-- migrate:down
DROP TABLE IF EXISTS  editor_schema.code;

