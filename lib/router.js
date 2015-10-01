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

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }    
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'dealPage'});
Router.onBeforeAction(requireLogin, {only: 'dealSubmit'});

