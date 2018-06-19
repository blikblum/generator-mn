---
to: <%- path %>/view.js
---
import { View } from 'backbone.marionette'

const <%- viewName %> = View.extend({
  template: function () {
    return (
      <div className='row'>
        Hello!
      </div>
    )
  }
})

export { <%- viewName %> }
