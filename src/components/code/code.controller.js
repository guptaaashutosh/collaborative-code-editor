const codeServices = require('./code.services');
const SocketClass = require('../../utils/socket');
const constantMessage = require('../../constants/message');

class CodeController {
  createNewCode = async(req, res, next) => {
    try {
      const code = await req.body;
      const currentUser = req.user;
      // send to service
      const newCodeResponse = await codeServices.createNewCodeService({ code, currentUser });
      if (newCodeResponse === 1) {
        res.status(200).send({
          message: constantMessage.SUCCESSFULLY_NEW_CODE_CREATED,
          newCodeResponse,
        });
      } else {
        res.status(500).send({
          message: constantMessage.FAILED_TO_CREATE_NEW_CODE,
          newCodeResponse,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  updateCodeContent = async(req, res, next) => {
    try {
      const codeId = await req.params.codeId;
      const updateBodyData = await req.body;

      const updateResponse = await codeServices.updateCodeContentService({ codeId, updateBodyData });
      if (updateResponse) {
        // emit message to all the user in the room
        SocketClass.emitMessageInRoom(codeId, 'updatedCodeDetails', updateResponse);
        res.status(200).send({
          message: constantMessage.SUCCESSFULLY_NEW_CODE_UPDATED,
          updateResponse,
        });
      } else {
        res.status(500).send({
          message: constantMessage.FAILED_TO_UPDATE_NEW_CODE,
          updateResponse,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  getCodeVersionDetails = async(req, res, next) => {
    try {
      const codeId = await req.params.codeId;
      const codeVersionDetails = await codeServices.getCodeVersionDetailsService(codeId);
      if (!codeVersionDetails) {
        res.status(500).send({
          message: constantMessage.FAILED_TO_GET_CODE_VERSION_DETAILS,
        });
      }
      res.status(200).send({
        message: constantMessage.SUCCESSFULLY_GET_CODE_VERSION_DETAILS,
        codeVersionDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCodeVersionDetails = async(req, res, next) => {
    try {
      const vid = await req.params.vid;
      const userId = await req.user.id;

      const codeVersionDeletedDetails = await codeServices.deleteCodeVersionDetailsService({ vid, userId });
      if (!codeVersionDeletedDetails) {
        res.status(500).send({
          message: constantMessage.FAILED_TO_DELETE_CODE_VERSION_DETAILS,
        });
      }
      res.status(200).send({
        message: constantMessage.SUCCESSFULLY_DELETED_CODE_VERSION_DETAILS,
        codeVersionDeletedDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  newUserJoiningCode = async(req, res, next) => {
    try {
      const codeId = await req.params.codeId;
      const userId = await req.user.id;
      // send to service
      const newUserJoiningCodeResponse = await codeServices.newUserJoiningCodeService({ codeId, userId });
      if (!newUserJoiningCodeResponse) {
        res.status(500).send({
          message: constantMessage.FAILED_TO_JOIN_NEW_USER_IN_CODE,
          newUserJoiningCodeResponse,
        });
      }
      const joinedUserName = await req.user.name;
      const joinedAt = await newUserJoiningCodeResponse.joinedat;
      // emit joined message to all the users in the room
      SocketClass.emitMessageInRoom(codeId, 'newUserJoinCode', { joinedUserName, joinedAt });
      res.status(200).send({
        message: constantMessage.SUCCESSFULLY_JOINED_NEW_USER_IN_CODE,
        newUserJoiningCodeResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  userLeavingCode = async(req, res, next) => {
    try {
      const codeId = await req.params.codeId;
      const userId = await req.user.id;
      // send to service
      const userLeavingCodeResponse = await codeServices.userLeavingCodeService({ codeId, userId });
      if (!userLeavingCodeResponse) {
        res.status(500).send({
          message: constantMessage.FAILED_TO_LEAVE_CODE,
          userLeavingCodeResponse,
        });
      }

      const leavedUserName = await req.user.name;
      const leavedAt = await userLeavingCodeResponse.leavedat;
      // emit leave message to all the user in the room
      SocketClass.emitMessageInRoom(codeId, 'userLeaveCodeMessage', { leavedUserName, leavedAt });
      res.status(200).send({
        message: constantMessage.SUCCESSFULLY_LEAVED_CODE,
        userLeavingCodeResponse,
      });
    } catch (error) {
      next(error);
    }
  };

  // chat among user collaborating on code
  usersChatCollaboratingOncode = async(req, res, next) => {
    try {
      const codeId = await req.params.codeId;
      const senderId = await req.user.id;
      const { message } = await req.body;
      // send to service
      const usersChatDetails = await codeServices.usersChatCollaboratingOncodeService({ codeId, senderId, message });
      if (!usersChatDetails) {
        res.status(500).send({
          message: constantMessage.FAILED_TO_GET_USER_CHAT_DETAILS,
        });
      }
      const userName = await req.user.name;
      const messageSendByUser = await usersChatDetails.message;
      const sendTime = await usersChatDetails.createdat;
      // send message to all user in the group
      SocketClass.emitMessageInRoom(codeId, 'chatMessage', { userName, messageSendByUser, sendTime });
      res.status(200).send({
        message: constantMessage.SUCCESSFULLY_GET_USER_CHAT_DETAILS,
        usersChatDetails,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CodeController();
