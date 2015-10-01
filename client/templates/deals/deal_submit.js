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