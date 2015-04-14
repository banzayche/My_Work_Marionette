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
		},
		// события по действиям на элементы ui
		events: {
			'click @ui.deleteButton' : 'destroyModel'
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
	});
});