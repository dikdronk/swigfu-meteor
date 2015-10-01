Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyAglhUstuu9vs92UD10Ffz496F3Svt3jqQ',
    libraries: 'places'  // also accepts an array if you need more than one
  });
  console.log('API Loading...');
});