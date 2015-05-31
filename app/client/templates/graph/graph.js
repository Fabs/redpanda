/*****************************************************************************/
/* Graph: Event Handlers */
/*****************************************************************************/
Template.Graph.events({
  "click [data-interval]": function(e,t){
    console.log(e);
    var interval = $(e.target).data('interval');
    Session.set('currentInterval',interval);
  }
});

/*****************************************************************************/
/* Graph: Helpers */
/*****************************************************************************/
Template.Graph.helpers({
  interval: function(slice, limit){
    return Aggregation.find({type: 'time', interval: slice},{sort: {group: 1}})
  },
  intervalFormat: function(){
    var initialGroupTimestamp = this.group * this.interval;
    return moment(initialGroupTimestamp, "X").format("hh:mm");
  },
  currentInterval: function(){
    return Session.get('currentInterval')
  },
  eventsCount: function(){
    return this && this.events.length;
  }
});

/*****************************************************************************/
/* Graph: Lifecycle Hooks */
/*****************************************************************************/
Template.Graph.created = function () {
};

Template.Graph.rendered = function () {
  Session.set('currentInterval',5);

  //Session.set('x', ['x', 30, 50, 75, 100, 120]);
  //Session.set('data1', ['data1', 30, 200, 100, 400, 150]);
  var chart = c3.generate({
    bindto: this.find('.chart'),
    data: {
      xs: {
        'data1': 'x',
      },
      type: 'bar',
      columns: [['x'],['data1']]
    }
  });

  this.autorun(function (tracker) {
    var query = {type: 'time', interval: Session.get('currentInterval')};
    var opts = {sort: {group: 1}, limit: 200};

    var labels = _.map(Aggregation.find(query, opts).fetch(), function (x) {
      return x.group * x.interval;
    });

    var data = _.map(Aggregation.find(query, opts).fetch(), function (x) {
      return x.events.length;
    });

    Session.set('x', ['x'].concat(labels));
    Session.set('data1', ['data1'].concat(data));

  });

  this.autorun(function (tracker) {
    chart.load({columns: [
      Session.get('x'),
      Session.get('data1'),
      []
    ]});
  });

};

Template.Graph.destroyed = function () {
};
