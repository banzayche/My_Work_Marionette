/*global Backbone */
'use strict';

MyApp.module('TodoList.Views', function(Views, App, Backbone){

	// Item View
	Views.ItemView = Backbone.Marionette.ItemView.extend({
		// указали тег-нейм
		tagName: 'li',
		// указали шаблон
		template: '#itemView-template',
		// элементы управления
		ui: {
			deleteButton : '.delete',
			toggleDone : '.get-done',
		},
		// события по действиям на элементы ui
		events: {
			'click @ui.deleteButton' : 'destroyModel',
			'click @ui.toggleDone' : 'toggleDone',
		},

		// функция смены атрибута done
		toggleDone: function(){
			this.model.toggleDone();
		},
		// функция удаления модели
		destroyModel: function(){
			this.model.destroy();
		},
	});

	// composite view
	Views.ListVews = Backbone.Marionette.CompositeView.extend({
		tagName: 'ul',
		id: 'todo-list',
		// шаблон
		template: '#compositeView-template',
		// на основе какого конструктора будут создаваться дочерние модели
		childView: Views.ItemView,
		// контейнер для дочерних моделей
		// childViewContainer: "#todo-list",
		initialize: function(){
			this.checkDone();
		},
		// при любом изменении коллекции - перерендериваем
		collectionEvents: {
			'all' : 'render',
		},
		// элементы управления на этой вью
		ui:{
			checkAll : '.check-all',
		},
		// события, касающиеся элементов управления
		events: {
			'click @ui.checkAll' : 'checkedAll',
		},
		// функция отмечания всех выполненных
		checkedAll: function(){
			if(this.ui.checkAll.attr('checked') == 'checked'){
				this.collection.each(function(model){
					model.save('done', false);
				});	
			} else{
				this.collection.each(function(model){
					model.save('done', true);
				});
			}	
		},
		onRender: function(){
			this.checkDone();
		},
		// check array of done
		checkDone: function(collection){
			var self = this;
			_.delay(function(){
				var setPluck = _.pluck(self.collection.toJSON(), 'done');
				setPluck = _.difference(setPluck, [true]);
				if(!setPluck.length){
					self.ui.checkAll.attr('checked', 'true');
					console.log('win')
				} else{
					self.ui.checkAll.removeAttr('checked');
				}
			}, 50);
		}
	});
});