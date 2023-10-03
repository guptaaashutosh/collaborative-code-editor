-- migrate:up
CREATE TABLE newUserJoinedCode (
      userId uuid,
      codeId uuid REFERENCES editor_schema.code(cid) ON DELETE CASCADE,
      joinedAt TIMESTAMP DEFAULT NOW(),
      leavedAt TIMESTAMP DEFAULT NOW()
     );

-- migrate:down
DROP TABLE IF EXISTS  editor_schema.newUserJoinedCode;
