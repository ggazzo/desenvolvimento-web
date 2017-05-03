import './itemList.html';

Template.itemList.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.itemList.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.itemList.events({
  'click .sideBar-body'(event, instance) {
    // increment the counter when button is clicked
    this.click(this.data)
  },
});
