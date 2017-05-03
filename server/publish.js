Meteor.publish('users', function () {
  return User.find({}, {fields:{username:1,name:1}})
})
Meteor.publish('messages', function (id) {
  // console.log({users:{$in:[id, this.userId]}});
  return Messages.find({users:{$all:[id, this.userId]}});
})
