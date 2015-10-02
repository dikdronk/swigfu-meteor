//Check user permissions

ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}