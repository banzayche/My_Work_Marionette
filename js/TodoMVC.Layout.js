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
	});

	// main view
	Layout.Main = Backbone.Marionette.ItemView.extend({
		template: '#main-template',
	});

	//footer view
	Layout.Footer = Backbone.Marionette.ItemView.extend({
		template: '#footer-template',
	}); 
});