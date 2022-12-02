const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  pwa: {
    name: 'ToDo',
    themeColor: '#CD0000'
  }
})
