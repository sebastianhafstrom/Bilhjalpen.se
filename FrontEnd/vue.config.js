var PrerenderSpaPlugin = require('prerender-spa-plugin')
const PuppeteerRenderer = PrerenderSpaPlugin.PuppeteerRenderer
var path = require('path')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
 configureWebpack: config => {
   if (process.env.NODE_ENV !== 'production') return

   return {
     plugins: [
       new PrerenderSpaPlugin({
        staticDir: path.resolve(__dirname, 'dist'),
        routes: ['/', '/om', '/kategori/miljo', '/kategori/el'],
         renderer: new PuppeteerRenderer()
       }),
     ]
   }
 }
}