-- migrate:up
create table editor_schema.versionHistory (
      vid UUID NOT NULL DEFAULT gen_random_uuid(),
      cid UUID REFERENCES editor_schema.code(cid) ON DELETE CASCADE, 
      content STRING NOT NULL, 
      createdAt TIMESTAMP DEFAULT NOW() , 
      userId UUID REFERENCES editor_schema.user(id)
     ); 

-- migrate:down
DROP TABLE IF EXISTS  editor_schema.versionHistory;
