Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('deals'); }
});

Router.route('/', {name: 'dealsList'});

Router.route('/deals/:_id', {
  name: 'dealPage',
  data: function() { return Deals.findOne(this.params._id); }
});

Router.route('/submit', {name: 'dealSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'dealPage'});