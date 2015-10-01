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

    deal._id = Deals.insert(deal);
    Router.go('dealPage', deal);
  }
});