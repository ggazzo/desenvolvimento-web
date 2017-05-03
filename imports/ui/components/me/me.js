import './me.html';
Template.me.helpers({
  name(){
    const user = Meteor.user();
    return user && (user.name || user.username)
  }
})
