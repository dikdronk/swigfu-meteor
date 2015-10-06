//Load dummy deal data when DB has none

if (Deals.find().count() === 0) {

  var now = new Date().getTime();

  //Create two dummy users with deals
  var robId = Meteor.users.insert({
    profile: { name: 'Robey'}
  });
  var robey = Meteor.users.findOne(robId);

  var alId = Meteor.users.insert({
    profile: { name: 'Albert'}
  });
  var albert = Meteor.users.findOne(alId);

  //Dummy deals
  var swigfuId = Deals.insert({
    dealTitle: '1 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 1',
    userId: robey._id,
    submittedBy: robey.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Comments.insert({
    dealId: swigfuId,
    userId: albert._id,
    submittedBy: albert.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'OMG you are so fucking smart Robey!'
  });

  Comments.insert({
    dealId: swigfuId,
    userId: robey._id,
    submittedBy: robey.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'I know right?'
  });

  Deals.insert({
    dealTitle: '2 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 2',
    userId: albert._id,
    submittedBy: albert.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000)
  });

  Deals.insert({
    dealTitle: '3 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 3',
    userId: albert._id,
    submittedBy: albert.profile.name,
    submitted: new Date(now - 12 * 3600 * 1000)
  });
}
