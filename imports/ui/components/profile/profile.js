import './profile.html'

Template.profile.onCreated(function() {
  // counter starts at 0
  this.subscribe('users');
});
Template.profile.helpers({
  me(){
    return Meteor.user();
  }
});
Template.profile.events({
  'submit form'(e, instance){
    e.preventDefault();
    return Meteor.call('updateMe', instance.$('[name=name]')[0].value);
  },
  'click .newMessage-main'(e, instace){
    this.close();
  }
});
