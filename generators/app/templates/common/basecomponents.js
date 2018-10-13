import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce'
import { initElementClass } from 'snabbdom-element'

const Component = initElementClass([
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/dataset').default
])

export { Component }
