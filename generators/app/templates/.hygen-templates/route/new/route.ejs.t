---
to: <%- path %>/route.js
---
import { Route } from 'marionette.routing'
import { <%- viewName %> } from './view'

const <%- routeName %> = Route.extend({
  activate (transition) {
  },

  viewClass: <%- viewName %>,

  viewOptions () {
    return {

    }
  }
})

export { <%- routeName %> }
