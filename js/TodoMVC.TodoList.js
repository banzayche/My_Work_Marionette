/*global Backbone */
'use strict';

MyApp.module('TodoList', function(TodoList, App, Backbone){
	// создаем обьект роут
	TodoList.Router = Marionette.AppRouter.extend({
		// задали роут
		appRoutes: {
			// *route - любое значение роута. Вычисление представления будет происходить в указанной функцие
			'*route': 'LoadApp'
		},
	});

	// создаем контроллер для нашего роута
	TodoList.Controller = Marionette.Controller.extend({
		// создаем коллекцию для наших вьюх
		initialize: function(){
			this.TodoCollection = new App.Todos.TodoCollection();
		},

		// что будет выполняться при старте
		start: function(){
			// каждая следующая строчка - это вызов функции находящейся в контроллере
			// которая в свою очередь запускает отведенное ей представление
			this.showHeader(this.TodoCollection);
			this.showMain(this.TodoCollection);
			this.showFooter(this.TodoCollection);
			// фетчим нашу коллекцию с сервера
			var self = this;
			self.TodoCollection.fetch().done(function(){
				self.TodoCollection.trigger('change');
			});
		},

		showHeader: function(TodoCollection){
			// создфли экземпляр представления хедера и передали ему коллекцию
			var header = new App.AppStaticLayout.Header({
				collection: TodoCollection,
			});
			// Вставляем наш экземпляр представления header в регион под названием header
			App.root.showChildView('header', header);
		},

		showMain: function(TodoCollection){
			// создфли экземпляр представления main и передали ему коллекцию
			var main = new App.TodoList.Views.ListVews({
				collection: TodoCollection,
			});
			// Вставляем наш экземпляр представления main в регион под названием main
			App.root.showChildView('main', main);					
		},

		showFooter: function(TodoCollection){
			// создфли экземпляр представления footer и передали ему коллекцию
			var footer = new App.AppStaticLayout.Footer({
				collection: TodoCollection,
			});
			// Вставляем наш экземпляр представления footer в регион под названием footer
			App.root.showChildView('footer', footer);
		},

		// Функция обработки значения роута
		LoadApp: function(route){
			// route - текущее значение роута
			console.log(route + ' something does not happening')
			return true;
		}
	});


	// Одна из самых главных частей всего приложения - общий старт
	App.on('start', function(){
		// создаем экземпляр контроллера
		var controller = new TodoList.Controller();
		//указываем экземпляр роутера
		controller.router = new TodoList.Router({
			// указали контроллер который относится к этому роуту
			controller : controller,
		});

		// стартовали контроллер
		controller.start();
	});
});