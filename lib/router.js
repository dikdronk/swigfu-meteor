Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('deals');
  }
});

//Main landing page
Router.route('/', {name: 'dealsList'});

//Individual deal page
Router.route('/deals/:_id', {
  name: 'dealPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() { return Deals.findOne(this.params._id); }
});

//Deal edit page
Router.route('/deals/:_id/edit', {
  name: 'dealEdit',
  data: function() { return Deals.findOne(this.params._id); }
});

//Deal submit page
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
