define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var ListView = ComponentView.extend({

    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.setReadyStatus();

      const itemWidth = (100/this.model.get('_columns')) - 1;
      //console.log(itemWidth);
      this.model.get('_items').forEach(function(item, i) {
        this.$('.list__item-container').eq(i).width(itemWidth + '%');
      });

      this.setupInview();

    },

    setupInview: function() {
      var selector = this.getInviewElementSelector();
      if (!selector) {
        this.setCompletionStatus();
        return;
      }
      this.setupInviewCompletion(selector);
    },

    getInviewElementSelector: function() {
      if (this.model.get('body')) return '.component__body';
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }
  },
  {
    template: 'list'
  });

  return Adapt.register('list', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: ListView
  });
});
