import 'dotenv/config'
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        config: {
          baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
          site: '8888',
          apiPrefix: '/api/v1',
          auth: {
            username: 'dpc',
            password: 'sdp'
          }
        }
      },
      API_URL: ''
    }
  },
  modules: ['@dpc-sdp/ripple-ui-core/nuxt', '@dpc-sdp/ripple-ui-forms/nuxt']
})
