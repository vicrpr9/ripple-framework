import 'dotenv/config'
import { defineConfig } from 'cypress'
import { rplCypressConfigPlugin } from '@dpc-sdp/ripple-test-utils'

import { resolve } from 'pathe'
const testFolder = resolve(__dirname, './test')

export default defineConfig({
  projectId: 'mie4kg',
  env: {
    searchIndex: process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.{feature,feature.ts}',
    supportFile: `${testFolder}/support/index.ts`,
    supportFolder: testFolder,
    downloadsFolder: `${testFolder}/downloads`,
    fixturesFolder: `${testFolder}/fixtures`,
    videosFolder: `${testFolder}/videos`,
    screenshotsFolder: `${testFolder}/screenshots`,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await rplCypressConfigPlugin(on, config)
      return config
    }
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
