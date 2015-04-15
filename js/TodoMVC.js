/*global Backbone */
'use strict';

// Создаем конструктор нашего проложения
var App = Backbone.Marionette.Application.extend({
  // приложение должно иметь рутовый шаблон
  setRootLayout: function(){
    // Основе созданного нами конструктора рутового представления в файле MyApp.Layout.js
    // создаем рутовое (главное) представление для нашего приложения 
    this.root = new MyApp.AppStaticLayout.Root();
  },

  onStart: function(){
    // прорисовываем главныое рутовое представление
    MyApp.setRootLayout();
    // стартуем бекбон хистори для роутов
    Backbone.history.start();
  },
});
// Сделали наше приложение глобальным
window.MyApp = new App();

