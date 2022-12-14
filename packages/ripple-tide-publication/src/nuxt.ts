import { join } from 'pathe'
import {
  defineNuxtModule,
  addServerHandler,
  addComponentsDir,
  addComponent
} from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_opt, nuxt) {
    // Add TidePublication component and mapping
    addComponent({
      name: 'TidePublicationPage',
      filePath: join(__dirname, './index.vue'),
      global: true
    })
    nuxt.options.runtimeConfig.public.tide.mapping.content.publication = join(
      __dirname,
      '../dist/index.js'
    )

    // Add TidePublication page components as dynamic imports for Nuxt apps - See https://v3.nuxtjs.org/guide/concepts/auto-imports
    addComponentsDir({
      extensions: ['vue'],
      path: join(__dirname, './components'),
      prefix: 'TidePublication',
      global: true
    })
    console.log('Added TidePublication module')

    // Add API endpoint for TidePublication Index
    addServerHandler({
      route: '/api/tide/publication-index',
      handler: join(__dirname, '../dist/publicationIndexHandler.js')
    })
    console.log('Added TidePublicationIndex API endpoint')
  }
})
