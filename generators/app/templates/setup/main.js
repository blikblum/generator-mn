import '../main.scss'
import {View} from 'backbone.marionette'
<%- header %>

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
<%- body %>