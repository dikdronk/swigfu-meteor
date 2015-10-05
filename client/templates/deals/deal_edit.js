// geocomplete to watch venueName input and autocomplete
Template.dealEdit.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $('#venueName').geocomplete({
        types: ['establishment'], //only list business results
        details: ".geo-name", //only insert the name
        detailsAttribute: "data-geo" //look for data-geo class
      });
    }
  });
});

Template.dealEdit.onCreated(function() {
  Session.set('dealEditErrors', {});
});

Template.dealEdit.helpers({
  errorMessage: function(field) {
    return Session.get('dealEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('dealEditErrors')[field] ? 'has-error' : '';
  }
});

Template.dealEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentDealId = this._id;

    //Update the deal properties from the form  
    var dealProperties = {
      dealTitle: $(e.target).find('[name=dealTitle]').val(),
      venueName: $(e.target).find('[name=venueName]').val(),
      when: $(e.target).find('[name=when]').val()
    };

    var errors = validateDeal(dealProperties);
    if (errors.dealTitle || errors.venueName || errors.when)
      return Session.set('dealEditErrors', errors);

    //Implement update
    Deals.update(currentDealId, {$set: dealProperties}, function(error) {
      if (error) {
        //display error
        throwError(error.reason);
      } else {
        Router.go('dealPage', {_id: currentDealId});
      }
    });
  },

  //Delete function
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this deal?")) {
      var currentDealId = this._id;
      Deals.remove(currentDealId);
      Router.go('dealsList');
    }
  }
});