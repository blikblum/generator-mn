---
to: "<%= fileScope === 'global' ? h.rootDir() + '/src/common/entities/' : '' %><%- name.toLowerCase() %>.js"
---
import { Model, Collection } from 'backbone'

const <%- name %> = Model.extend({
  defaults () {

  }
})

const <%- collection %> = Collection.extend({
  model: <%- name %>
})

export { <%- name %>, <%- collection %> }
