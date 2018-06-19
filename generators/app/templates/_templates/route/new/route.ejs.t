---
to: <%- path %>/route.js
---
import {Route} from 'marionette.routing'
import View from './view'

const <%- routeName %> = Route.extend({
  activate (transition) {
  },

  viewClass: View,

  viewOptions () {
    return {

    }
  }
})

export default <%- routeName %>
