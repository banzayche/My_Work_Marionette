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
			onEditSection : '.first-section-model-ui',
			editInput : '.edit-model-title'
		},
		// события по действиям на элементы ui
		events: {
			'click @ui.deleteButton' : 'destroyModel',
			'click @ui.toggleDone' : 'toggleDone',
			'dblclick @ui.onEditSection' : 'showEditInput',
			'keypress @ui.editInput' : 'editModelTitle',
			'blur @ui.editInput' : 'render'
		},
		modelEvents: {
			'change' : 'render'
		},
		// onRender: function(){
		// 	console.log('onRenderItem');
		// },

		// Скрытие чекбокса с кнопкой и названием модели и показ инпута для редактирования тайтла модели
		showEditInput: function(){
			this.ui.onEditSection.hide();
			this.ui.editInput.show();
			this.ui.editInput.focus();			
		},
		// реализация редактирования модели
		editModelTitle: function(e){
			// это кейкод энтера
			var keyCode = 13;
			var editInput = this.ui.editInput;
			// сохраняем значение с инпута
			var newTitle = editInput.val().trim();
			// проверяем, чтобы был нажат именно энтер и фокус был именно на нашем ui
			if(editInput.focus && e.keyCode === keyCode && !!newTitle.length){
				// сохраняем новое валидное значение
				this.model.save('title', newTitle);
			} else if(!newTitle.length){
				// если текствое поле пусто - модель необходимо удалить
				this.destroyModel();
			}
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


	// Item View
	Views.NoChildView = Backbone.Marionette.ItemView.extend({
		id: 'image-attention',
		// указали шаблон
		template: '#noChildView-template',
	});

	// composite view
	Views.ListVews = Backbone.Marionette.CompositeView.extend({
		tagName: 'ul',
		id: 'todo-list',
		// шаблон
		template: '#compositeView-template',
		// на основе какого конструктора будут создаваться дочерние модели
		childView: Views.MainItemView,
		emptyView: Views.NoChildView,
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