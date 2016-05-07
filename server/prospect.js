Meteor.publish("prospects", function () {
  return Prospects.find();
});
