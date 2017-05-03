import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';
import '../../components/itemList/itemList.js';
import '../../components/me/me.js';
import '../../components/login/login.js';
import '../../components/conversation/conversation.js';
import '../../components/profile/profile.js';

Template.App_home.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.subscribe('users');
  this.chat = new ReactiveVar({});
  this.filter = new ReactiveVar('');
  this.profile = new ReactiveVar(false);
});

Template.App_home.helpers({
  selected(channel){
    return channel._id == Template.instance().chat.get()._id
  },
  logged() {
    return !!Meteor.userId()
  },
  hasChat() {
    return Template.instance().chat.get()._id || false
  },
  close() {
    const instance = Template.instance();
    return ()=> instance.profile.set(false)
  },
  showProfile(){
    return Template.instance().profile.get();
  },
  click() {
    const instance = Template.instance();
    return function(data) {
        instance.chat.set({});
        Meteor.setTimeout(function functionName() {
          instance.chat.set(data);

        },200)
    }
  },
  users() {
    const filter = Template.instance().filter.get();
    return User.find({_id:{$not:Meteor.userId()}}).fetch().filter((user) => filter.length == 0 ||  user.username.includes(filter));
  },
  counter() {
    return Template.instance().counter.get();
  },
  chat() {
    return Template.instance().chat.get();
  }
});

Template.App_home.events({
  'input #searchText'(e, instance) {
    instance.filter.set(e.target.value)
  },
  'click .side-one .sideBar .sideBar-body'(e, instance){

  },
  'click .heading-avatar'(e, instance){
    instance.profile.set(true);
  },
  'click button'(event, instance) {
    // increment the counter when button is clicked
    // instance.counter.set(instance.counter.get() + 1);
  },
});
