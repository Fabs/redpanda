/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  removeAll: function (){
    Aggregation.remove({});
  }
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   * }
   */
});
