var dealsData = [
  {
    deal: '1 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 1'
  },
  {
    deal: '2 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 1'
  },
  {
    deal: '3 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 1'
  }
];

Template.dealsList.helpers({
  deals: dealsData
});