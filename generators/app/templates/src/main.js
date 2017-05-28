import './setup'
import Marionette from 'backbone.marionette'
import IndexView from './index/view'

let Application = Marionette.Application.extend({
  region: '#main-view'
})

let app = new Application()
app.getRegion().show(new IndexView())
