/* /store.js
*/
App.PhonebooksRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('phonebook');
  }
});
