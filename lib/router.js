Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('deals'); }
});

Router.route('/', {name: 'dealsList'});
Router.route('/deals/:_id', {
  name: 'dealPage',
  data: function() { return Deals.findOne(this.params._id); }
});