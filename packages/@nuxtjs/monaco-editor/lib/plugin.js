import MonacoEditor from 'vue-monaco'
import Vue from 'vue'
// https://nuxtjs.org/docs/2.x/directory-structure/plugins
// the plugin only run at client side

/**
 * @type {import('@nuxt/types').Plugin}
 */
const plugin = (ctx, inject) => {

  <% if(options.componentName){ %>
  let componentName = '<%= options.componentName %>'
  <% } else { %>
  let componentName = MonacoEditor.name
  <% } %>
  Vue.component(componentName, MonacoEditor)
}
export default plugin
