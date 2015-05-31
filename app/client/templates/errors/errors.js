/*****************************************************************************/
/* Errors: Event Handlers */
/*****************************************************************************/
Template.Errors.events({
});

/*****************************************************************************/
/* Errors: Helpers */
/*****************************************************************************/
Template.Errors.helpers({
  countAll: function(){
    return this.count();
  },
  timeAg: function(){
    return this && this.type == 'time';
  },
  eventsCount: function(){
    return this && this.events.length;
  },
});

/*****************************************************************************/
/* Errors: Lifecycle Hooks */
/*****************************************************************************/
Template.Errors.created = function () {
};

Template.Errors.rendered = function () {
};

Template.Errors.destroyed = function () {
};
