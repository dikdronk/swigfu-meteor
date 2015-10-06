Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});

//Route Controller
DealsListController = RouteController.extend({
  template: 'dealsList',
  increment: 10,
  dealsLimit: function() {
    return parseInt(this.params.dealsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.dealsLimit()};
  },
  subscriptions: function() {
    this.dealsSub = Meteor.subscribe('deals', this.findOptions());
  },
  deals: function() {
    return Deals.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.deals().count() === this.dealsLimit();
    var nextPath = this.route.path({dealsLimit: this.dealsLimit() + this.increment});
    return {
      deals: this.deals(),
      ready: this.dealsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

//Individual deal page
Router.route('/deals/:_id', {
  name: 'dealPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleDeal', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Deals.findOne(this.params._id); }
});

//Deal edit page
Router.route('/deals/:_id/edit', {
  name: 'dealEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Deals.findOne(this.params._id); }
});

//Deal submit page
Router.route('/submit', {name: 'dealSubmit'});


//Change Log route, not for production
Router.route('/changelog', {name: 'changeLog'});

//Main landing page
Router.route('/:dealsLimit?', {
  name: 'dealsList'
});

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
