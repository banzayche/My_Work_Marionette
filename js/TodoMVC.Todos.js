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
		// функция смены аттрибута done
		toggleDone: function(){
			return this.set('done', !this.get('done'));
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
		// функция отмечаниявыполненных дел
		done: function(someValue){
			this.each(function(model){
				// проходим всю коллекцию и меняем атрибут done
				model.save('done', someValue);
			});
		},
		checkAll: function(){
			// делаем вычесления для вывода, какой атрибут done присваивать при нажатии на checkAll
			var setPluck = _.pluck(this.toJSON(), 'done');
			setPluck = _.difference(setPluck, [true]);
			if (!setPluck.length) return true
			else return false			
		},
		// // фильтрация коллекции по выполненным
		// getCompleted: function () {
		// 	return this.filter();
		// },
		// // фильтрация коллекции по невыполненным
		// getActive: function () {
		// 	return this.reject(function(model){!model.get('done')});
		// },
	});
});