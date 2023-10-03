class CodeDal {
  createNewCode = async(client, createCodeData) => {
    const createCodeQuery = 'INSERT INTO editor_schema.code(content,userId) VALUES ($1,$2)';
    const createCodeValues = [createCodeData.code.content, createCodeData.code.userId];
    const createCodeResponse = await client.query(createCodeQuery, createCodeValues);
    return createCodeResponse.rowCount;
  };

  updateCodeDetails = async(client, updateCodeData) => {
    // update the code in version history table
    const updateCodeQuery = 'INSERT INTO editor_schema.versionHistory(cid,content,userId) VALUES ($1,$2,$3) RETURNING *'; // rerturning column name or *
    const updateCodeValues = [updateCodeData.codeId, updateCodeData.updateBodyData.content, updateCodeData.updateBodyData.userId];
    const updatedCodeResponse = await client.query(updateCodeQuery, updateCodeValues);
    return updatedCodeResponse.rows[0];
  };

  newUserJoiningCode = async(client, userCodeJoiningDetails) => {
    const newUserJoiningCodeQuery = 'INSERT INTO editor_schema.newUserJoinedCode(codeId,userId) VALUES ($1,$2) RETURNING *';
    const newUserJoiningCodeValues = [userCodeJoiningDetails.codeId, userCodeJoiningDetails.userId];
    const newUserJoiningCodeResponse = await client.query(newUserJoiningCodeQuery, newUserJoiningCodeValues);
    return newUserJoiningCodeResponse.rows[0];
  };

  userLeavingCode = async(client, userLeavingDetailsParameters) => {
    const userLeavingCodeQuery = 'DELETE FROM editor_schema.newUserJoinedCode WHERE codeId=$1 AND userId=$2 RETURNING *';
    const userLeavingCodeValues = [userLeavingDetailsParameters.codeId, userLeavingDetailsParameters.userId];
    const userLeavingCodeResponse = await client.query(userLeavingCodeQuery, userLeavingCodeValues);
    return userLeavingCodeResponse.rows[0];
  };

  getCodeVersionDetails = async(client, codeId) => {
    const codeVersionDetailsQuery = 'SELECT editor_schema.versionHistory.vid,editor_schema.versionHistory.content,editor_schema.versionHistory.createdAt,editor_schema.versionHistory.userid,editor_schema.user.name,editor_schema.user.email FROM editor_schema.versionHistory INNER JOIN editor_schema.user ON editor_schema.versionHistory.userId=editor_schema.user.id  WHERE editor_schema.versionHistory.cid=$1';
    const codeVersionDetailsValues = [codeId];
    const codeVersionDetailsResponse = await client.query(codeVersionDetailsQuery, codeVersionDetailsValues);
    return codeVersionDetailsResponse.rows;
  };

  usersChatCollaboratingOncode = async(client, chatBodyParameters) => {
    const userCodeChatQuery = 'INSERT INTO editor_schema.chat(codeId,senderId,message) VALUES ($1,$2,$3) RETURNING *';
    const userCodeChatValues = [chatBodyParameters.codeId, chatBodyParameters.senderId, chatBodyParameters.message];
    const userCodeChatResponse = await client.query(userCodeChatQuery, userCodeChatValues);
    return userCodeChatResponse.rows[0];
  };

  delelteCodeVersionDetails = async(client, deleteParameters) => {
    // delete query
    const codeVersionDeleteQuery = 'DELETE FROM editor_schema.versionHistory WHERE vid=$1 AND userId=$2 RETURNING *';
    const codeVersionDeleteValues = [deleteParameters.vid, deleteParameters.userId];
    const codeVersionDeleteResponse = await client.query(codeVersionDeleteQuery, codeVersionDeleteValues);
    return codeVersionDeleteResponse.rows;
  };
}

module.exports = new CodeDal();
