Meteor.method("collect", function (data) {
  var timestamp = moment().unix();
  var event = {
    content: data,
    ts: timestamp,
  };

  var _id = Events.insert(event);
  event._id = _id;

  Aggregation.byMessage(event);
  Aggregation.byTimestamp(event,[5,10,60]);

  console.log(event);
  return;
}, {
  url: "/collect",
  httpMethod: "post"
});
