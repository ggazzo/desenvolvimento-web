import './conversation.html';
import moment from 'moment'
import autosize from 'autosize';
import debounce from 'debounce';
Template.conversation.helpers({
  isMine(id) {
    return Meteor.userId() == id
  },
  canSend() {
    return Template.instance().message.get().trim() != ''
  },
  messages(){
    const instance = Template.instance();
    return Messages.find({users:{$all:[instance.data._id, Meteor.userId()]}});
  },
  time(time){
    return moment(time).fromNow();
  },
  toBottom: debounce(() => {
    // return function() {
    const conversation = $('#conversation')
    conversation.animate({scrollTop:conversation[0].scrollHeight}, '500', 'swing', function() {

    });
    // }
  }, 100)
});


Template.conversation.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.message = new ReactiveVar('');
  this.subscribe('messages', this.data._id);
});
Template.conversation.onRendered(function helloOnCreated() {
  // counter starts at 0
});
Template.conversation.events({
  'keydown textarea'(e, instance) {
    if(e.keyCode === 13){
      e.preventDefault()
      return Template.instance().$('form').submit()
    }
    Template.instance().message.set(e.target.value)
  },
  'input textarea'(e, instance) {
    instance.message.set(e.target.value)
  },
  'click .reply-send'(event, instance) {
    const el = Template.instance().$('textarea')[0]
    Meteor.call('newMessage', el.value, this._id, function () {
      console.log(arguments);
    })
    el.value=''
  },
  'submit form'(event, instance) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    Meteor.call('newMessage',text, this._id, function () {
      console.log(arguments);
    })
    // Clear form
    target.text.value = '';
    Template.instance().message.set('')
    autosize(event.target)
  }
});
