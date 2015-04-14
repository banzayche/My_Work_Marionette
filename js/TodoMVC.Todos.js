/*global Backbone */
'use strict';

// Создали модуль с конструктором модели и колекцией
MyApp.module("Todos", function(Todos, App, Backbone){
	// конструктор модели
	Todos.TodoModel = Backbone.Model.extend({
		// указали все предпологаемые атрибуты модели
		defaults: {
			title: undefined,
			type: undefined,
			done: false,
			id: undefined,
			date: undefined
		},
		// при инициализации присваеваем текущую дату создания
		initialize: function(){
			// если модель новая - присваеваем текущую дату
			if(this.isNew()){
				this.set('date', Date.now());
			}
		},
		// функция смені аттрибута done
		toggleDone: function(){
			this.save('done', !this.get('done'));
			console.log(this.get('done'));
		},
	});

	// Создаем конструктор коллекции
	Todos.TodoCollection = Backbone.Collection.extend({
		// указали на основе какого конструктора будут модели в коллекции
		model: Todos.TodoModel,
		// создаем связь с локальным хранилищем, вместо сервера
		localStorage: new Backbone.LocalStorage('Marionette-Todo-List'),
		// указываем атрибут для сортировки
		comparator: 'date',
	});
});