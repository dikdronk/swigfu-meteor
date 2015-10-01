Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('deals'); }
});

Router.route('/', {name: 'dealsList'});