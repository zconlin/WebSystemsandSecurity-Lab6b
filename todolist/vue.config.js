const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'ToDo',
    themeColor: '#CD0000'
  }
})
