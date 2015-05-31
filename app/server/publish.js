Meteor.publish('aggregationMessage', function () {
  return Aggregation.find({type: 'message'},{sort: {ts: -1}, limit: 50});
});

Meteor.publish('aggregationTime', function () {
  return Aggregation.find({type: 'time'},{sort: {ts: -1}});
});