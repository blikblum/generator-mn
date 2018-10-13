---
to: "<%= fileScope === 'global' ? h.rootDir() + '/src/common/views/' + h.inflection.transform(name, ['underscore', 'dasherize']).replace('-view', '') : h.inflection.transform(name, ['underscore', 'dasherize'])%>.js"
---
import { View } from 'backbone.marionette'

const <%- name %> = View.extend({
  template: function () {
    return (
      <div className='row'>
        Hello!
      </div>
    )
  }
})

export { <%- name %> }
