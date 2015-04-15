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
		onRender: function(){
			console.log('onRenderItem');
			//this.trigger('show') 
		},
		// функция смены атрибута done
		toggleDone: function(){
			this.model.toggleDone().save();
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
		// при любом изменении коллекции - перерендериваем
		collectionEvents: {
			'change' : 'render',
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
			console.log('onRender');
			this.checkDone();
			//this.trigger('show') 
		},
		onShow: function(){
			console.log('onShow');
		},
		// check array of done
		checkDone: function(collection){
			var self = this;
			console.log('checkDone');
			console.log(self.collection)
				var setPluck = _.pluck(self.collection.toJSON(), 'done');
				console.log(self.collection)
				setPluck = _.difference(setPluck, [true]);
				if(!setPluck.length){
					self.ui.checkAll.attr('checked', 'true');
					console.log('win')
				} else{
					self.ui.checkAll.removeAttr('checked');
				}
		}
	});
});