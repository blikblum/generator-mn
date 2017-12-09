import './setup'
import {Application} from 'backbone.marionette'
import IndexView from './index/view'

let App = Application.extend({
  region: '#main-view'
})

let app = new App()
app.getRegion().show(new IndexView())
