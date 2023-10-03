-- migrate:up
CREATE TABLE chat (
      messageId uuid NOT NULL DEFAULT gen_random_uuid(),
      senderId uuid, 
      codeId uuid REFERENCES editor_schema.code(cid),
      message STRING NOT NULL, 
      createdAt TIMESTAMP DEFAULT NOW()
     ); 
     
-- migrate:down
DROP TABLE IF EXISTS  editor_schema.chat;

