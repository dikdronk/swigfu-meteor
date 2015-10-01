//Load dummy deal data when DB has none

if (Deals.find().count() === 0) {
  
  Deals.insert({
    dealTitle: '1 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 1'
  });
  
  Deals.insert({
    dealTitle: '2 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 2'
  });

  Deals.insert({
    dealTitle: '3 This is an example of an awesome deal!',
    when: 'All-day',
    venueName: 'Bar 3'
  });
}