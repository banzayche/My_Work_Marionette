/*global Backbone */
'use strict';

MyApp.module('AppStaticLayout', function(AppStaticLayout, App, Backbone){
	// наше главное представление с регионами
	AppStaticLayout.Root = Backbone.Marionette.LayoutView.extend({
		el: '#root-template',
		// добавили регионы
		regions: {
			header: '#header',
			main: '#main',
			footer: '#footer'
		}
	});

	// header view
	AppStaticLayout.Header = Backbone.Marionette.ItemView.extend({
		id: 'header-element',
		className: 'ovf-a',
		template: '#header-template',
		initialize: function(){
			// Слушаем filterState и если модель изменится то нужно перерендеривать вью
			this.listenTo(App.request('filterState'), 'change:filter', this.hideInput, this);
		},
		// єлементі управления
		ui: {
			input : '#add-new-todo',
			sort1 : '.firs-sort',
			sort2 : '.second-sort',
			sort3 : '.third-sort',
			goRoute : '.go-route' 
		},
		// события для ui
		events: {
			'keypress @ui.input' : 'addNewTodo',
			'click @ui.sort1' : 'sortBegin',
			'click @ui.sort2' : 'sortBegin',
			'click @ui.sort3' : 'sortBegin',
			'click @ui.goRoute' : 'changeButtonClass'
		},
		// функция обработки значения сортировки
		sortBegin:function(e){
			var parameter = $(e.target).attr('sortby');
			this.collection.goSort(parameter);

		},
		hideInput: function(){
			var filterValue = MyApp.request('filterState').get('filter');
			if(filterValue === 'all'){
				$('#add-section').show();
			} else{
				$('#add-section').hide();
			}
		},
		changeButtonClass: function(e){
			this.ui.goRoute.removeClass('active');
			$(e.target).addClass('active');
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

		// тепер будет нижеприведенная конструкция будет отдавать вьюхе модель с необходимыми атрибутами
		serializeData: function(){
			// отдаем данные, необходимые представлению
			return {
				"firstSort": 'title',
				"secondSort" : 'id',
				"thirdSort" : 'date'
			}
		}
	});

	//footer view
	AppStaticLayout.Footer = Backbone.Marionette.ItemView.extend({
		template: '#footer-template',
		ui: {
			remove : '.remove-done'
		},
		events: {
			'click @ui.remove' : 'removeDone'
		},
		collectionEvents: {
			'change' : 'render',
			'destroy' : 'render'
		},
		removeDone: function(){
			var complited = this.collection.getCompleted();
			complited.forEach(function (model) {
				model.destroy();
			});			
		},
		// тепер будет нижеприведенная конструкция будет отдавать вьюхе модель с необходимыми атрибутами
		serializeData: function(){
			// получаем массив из значений ключа done
			var haveDo = _.pluck(this.collection.toJSON(), 'done');
			// получаем длинну нашего массива
			var done = this.collection.length;
			// исключаем все значения true в массиве
			haveDo = _.difference(haveDo, [true]);
			// узнаем длинну массива
			haveDo = haveDo.length;
			// узнаем количество выполненных дел
			done = done - haveDo;
			// отдаем данные, которые необходимо будет вывести в представлении
			return {
				"haveDo": haveDo,
				"done" : done
			}
		}
	}); 
});