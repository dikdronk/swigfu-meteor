Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('deals'); }
});

Router.route('/', {name: 'dealsList'});