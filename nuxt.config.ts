// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/fonts', '@vueuse/nuxt', '@nuxthub/core', '@nuxthub/core'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  colorMode: {
    disableTransition: true
  },
  routeRules: {
    '/': { prerender: true }
  },

  typescript: {
    strict: false
  },
  future: {
    compatibilityVersion: 4
  },
  hub: {
    // NuxtHub options
    database: true,
    kv: true
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})