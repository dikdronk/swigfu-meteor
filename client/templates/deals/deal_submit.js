// geocomplete to watch venueName input and autocomplete
Template.dealSubmit.onRendered(function() {
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

Template.dealSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var deal = {
      dealTitle: $(e.target).find('[name=dealTitle]').val(),
      venueName: $(e.target).find('[name=venueName]').val(),
      when: $(e.target).find('[name=when]').val()
    };

    Meteor.call('dealInsert', deal, function(error, result) {
      //display error and abort
      if (error)
        return throwError(error.reason);

      //Duplicate code that goes with deals.js code
      /*
      if (result.dealExists)
        throwError('This deal has already been posted');
      */

      Router.go('dealPage', {_id: result._id});
    });
  }
});