PhonebookApp = Ember.Application.create({ LOG_TRANSITIONS: true});

PhonebookApp.Router.map(function() {
  this.route("index", { path: "/" });
  this.route("about", { path: "/about" });
  
  this.resource("phonebooks", function(){
      console.log("Inside phonebooks....");
      this.route("new", {path:"/new"});
      this.route("edit", {path: "/:phonebook_id" });
  });

});

PhonebookApp.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

PhonebookApp.ApplicationAdapter = DS.RESTAdapter.extend({
  //namespace: 'api'
});


PhonebookApp.Store = DS.Store.extend({
  adapter: 'App.ApplicationAdapter'
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000/api'
});


PhonebookApp.Phonebook = DS.Model.extend({
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    phonenumber: DS.attr('string')

});

PhonebookApp.PhonebooksIndexRoute = Ember.Route.extend({

  setupController: function(controller) {

    var phonebooks = this.get('store').find('phonebook'); // App.Phonebook.find();
    controller.set('content', phonebooks);
  },

  renderTemplate: function() {
    this.render('phonebooks.index',{into:'application'});
  }

});

PhonebookApp.PhonebooksEditRoute = Ember.Route.extend({

  setupController: function(controller, model) {
      this.controllerFor('phonebooks.edit').setProperties({isNew: false,content:model});
  },

  renderTemplate: function() {
    this.render('phonebooks.edit',{into:'application'});
  }

});

PhonebookApp.PhonebooksNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
        var newPhonebook = this.store.createRecord('phonebook',{});
        this.controllerFor('phonebooks.edit').setProperties({isNew: true,content:newPhonebook});
  },
  renderTemplate: function() {
    this.render('phonebooks.edit',{into:'application'});
  }

});

PhonebookApp.PhonebooksEditController = Ember.ObjectController.extend({
  updateItem: function(phonebook) {
    phonebook.save();
    this.get("target").transitionTo("phonebooks");
  },

  isNew: function() {
    console.log("calculating isNew");
    return this.get('content').get('id');
  }.property()


});


PhonebookApp.PhonebooksIndexController = Ember.ArrayController.extend({
  
  editCounter: function () {
    return this.filterProperty('selected', true).get('length');
  }.property('@each.selected'),

  itemsSelected: function() {
    return this.get("editCounter")>0;
  }.property('editCounter'),

  removeItem: function(phonebook) {
    phonebook.on("didDelete", this, function() {
	   	console.log("record deleted");
    });

    phonebook.destroyRecord();
  },

  removeSelectedPhonebooks: function() {
    arr = this.filterProperty('selected', true);
    if (arr.length==0) {
        output = "nothing selected";
    } else { 
        output = "";
        for (i=0 ; i<arr.length ; i++) { 
          arr[i].destroyRecord()
        }
    }
  },

  phonebooksPresent: function() {

    var itemsPresent = this.get('content').get('length') > 0;
    console.log(" +++ Computed phonebooksPresent prop with value " + itemsPresent);
    return itemsPresent;
  }.property("content.@each")
  //}.property("content.isLoaded")
});

Ember.Handlebars.registerBoundHelper('locsPresent', 
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);

PhonebookApp.NavView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    didInsertElement: function () {
          this._super();
          this.notifyPropertyChange('active');
          var _this = this;
          this.get('parentView').on('click', function () {
              _this.notifyPropertyChange('active');
          });
    },

    active: function() {
      return this.get('childViews.firstObject.active');
    }.property()
  });

