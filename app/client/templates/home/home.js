/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  ags: function(){
    return Aggregation.find({type: 'message'});
  },
  timeAgs: function(){
    return Aggregation.find({type: 'time'});
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
  Meteor.subscribe('aggregationTime');
  Meteor.subscribe('aggregationMessage');
};

Template.Home.destroyed = function () {
};
