// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.methods({
  updateMe(name){
    User.update(Meteor.userId(), {$set:{name}})
  },
  newMessage(message, user) {
    const msg = {};
    msg.createdAt = new Date();
    msg.users = [Meteor.userId(), user];
    msg.sender = Meteor.userId();
    msg.message = message;
    const messageId = Messages.insert(msg);
    // Chats.update(message.chatId, { $set: { lastMessage: message } });
    return messageId;
  }
});
