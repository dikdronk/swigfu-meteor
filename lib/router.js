Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('deals'), Meteor.subscribe('comments')]; 
  }
});

Router.route('/', {name: 'dealsList'});

Router.route('/deals/:_id', {
  name: 'dealPage',
  data: function() { return Deals.findOne(this.params._id); }
});

Router.route('/deals/:_id/edit', {
  name: 'dealEdit',
  data: function() { return Deals.findOne(this.params._id); }
});

Router.route('/submit', {name: 'dealSubmit'});

//Change Log route, not for production
Router.route('/changelog', {name: 'changeLog'});

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
