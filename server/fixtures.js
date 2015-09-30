//Load dummy deal data when DB has none

if (Deals.find().count() === 0) {
  
  Deals.insert({
    deal: '1 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 1'
  });
  
  Deals.insert({
    deal: '2 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 2'
  });

  Deals.insert({
    deal: '3 This is an example of an awesome deal!',
    when: 'All-day',
    venue: 'Bar 3'
  });
}