Aggregation = new Mongo.Collection('aggregation');


Aggregation.byMessage = function(event) {
  var ag = Aggregation.find({message: event.content.message});

  if(ag.count() != 0){
    Aggregation.update({message: event.content.message},{$push: {events: event._id}});
  } else {
    Aggregation.insert({message: event.content.message, events: [event._id], type: 'message'});
  }
};

Aggregation.byTimestamp = function(event,intervals) {
  _.each(intervals, function(interval){
    var group = Math.round(event.ts / interval);
    var ag = Aggregation.find({interval: interval, group: group});

    if(ag.count() != 0){
      Aggregation.update({interval: interval, group: group},{$push: {events: event._id}});
    } else {
      Aggregation.insert({interval: interval, group: group, events: [event._id], type: 'time'});
    }
  });
};


if (Meteor.isServer) {
  Aggregation.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Aggregation.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
