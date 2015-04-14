/*global Backbone */
'use strict';

MyApp.module('Layout', function(Layout, App, Backbone){
	// наше главное представление с регионами
	Layout.Root = Backbone.Marionette.LayoutView.extend({
		el: '#root-template',
		// добавили регионы
		regions: {
			header: '#header',
			main: '#main',
			footer: '#footer'
		}
	});

	// header view
	Layout.Header = Backbone.Marionette.ItemView.extend({
		template: '#header-template',
		// єлементі управления
		ui: {
			input : '#add-new-todo', 
		},
		// события для ui
		events: {
			'keypress @ui.input' : 'addNewTodo'
		},
		// добавление новой модели
		addNewTodo: function(e){
			// создаем переменную со значением кей-кода энтера
			var Enter_key = 13,
			// запоминаем в переменную значение нашего инпута
			todoTitle = this.ui.input.val().trim();

			// теперь ставим условие, если две вышепредставленные переменные имеют какие то значение значит создаем модель
			if(e.which === Enter_key && todoTitle){
				this.collection.create({
					title: todoTitle
				});
				// очищаем поле ввода
				this.ui.input.val('');
			}
		},
	});

	//footer view
	Layout.Footer = Backbone.Marionette.ItemView.extend({
		template: '#footer-template',
	}); 
});