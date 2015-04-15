/*global Backbone */
'use strict';

MyApp.module('TodoList.Views', function(Views, App, Backbone){

	// Item View
	Views.MainItemView = Backbone.Marionette.ItemView.extend({
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

		// onRender: function(){
		// 	console.log('onRenderItem');
		// },

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
		childView: Views.MainItemView,
		// контейнер для дочерних моделей
		// childViewContainer: "#todo-list",
		// при любом изменении коллекции - перерендериваем
		collectionEvents: {
			'change' : 'checkDone',
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
			var flag = this.collection.checkAll();
			console.log('checkedAll '+flag);
			this.collection.done(!flag);
			this.render();
			this.checkDone();
		},
		onRender: function(){
			console.log('onRender');
		},
		onShow: function(){
			console.log('onShow');
		},
		// check array of done
		checkDone: function(collection){
			var flag = this.collection.checkAll();
			console.log('checkDone '+flag);
			this.ui.checkAll.prop('checked', flag);
		}
	});
});