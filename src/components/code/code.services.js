const pool = require('../../../.config/dbConn');
const codeDal = require('./code.dal');

class CodeService {
  createNewCodeService = async(createCodeData) => {
    const client = await pool.connect();
    try {
      const value = await codeDal.createNewCode(client, createCodeData);
      return value;
    } finally {
      client.release();
    }
  };

  updateCodeContentService = async(updateCode) => {
    const client = await pool.connect();
    try {
      const updatedCodeResponse = await codeDal.updateCodeDetails(client, updateCode);
      return updatedCodeResponse;
    } finally {
      client.release();
    }
  };

  newUserJoiningCodeService = async(userCodeJoiningDetails) => {
    const client = await pool.connect();
    try {
      const newUserJoiningCodeResponse = await codeDal.newUserJoiningCode(client, userCodeJoiningDetails);
      return newUserJoiningCodeResponse;
    } finally {
      client.release();
    }
  };

  userLeavingCodeService = async(userCodeLeavingDetails) => {
    const client = await pool.connect();
    try {
      const userLeavingCodeResponse = await codeDal.userLeavingCode(client, userCodeLeavingDetails);
      return userLeavingCodeResponse;
    } finally {
      client.release();
    }
  };

  getCodeVersionDetailsService = async(codeVersionDetailsParameters) => {
    const client = await pool.connect();
    try {
      const codeVersionDetails = await codeDal.getCodeVersionDetails(client, codeVersionDetailsParameters);
      return codeVersionDetails;
    } finally {
      client.release();
    }
  };

  usersChatCollaboratingOncodeService = async(chatBodyParameters) => {
    const client = await pool.connect();
    try {
      const chatDetails = await codeDal.usersChatCollaboratingOncode(client, chatBodyParameters);
      return chatDetails;
    } finally {
      client.release();
    }
  };

  deleteCodeVersionDetailsService = async(deleteParameters) => {
    const client = await pool.connect();
    try {
      const codeVersionDeleteResponse = await codeDal.delelteCodeVersionDetails(client, deleteParameters);
      return codeVersionDeleteResponse;
    } finally {
      client.release();
    }
  };
}

module.exports = new CodeService();
