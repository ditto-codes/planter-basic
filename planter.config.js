// See config options: https://planter.dev/docs/planter-basic/config#options

module.exports = {
  site: {
    title: 'Planter',
  },
  placeholders: {
    '%PLANTER_NAME%': 'Planter Basic',
  },
  dev: {
    port: 5000,
    open: false,
    ghostMode: false,
  },
  js: {
    input: ['js/main.js', 'js/howdy.js']
  },
  build: {
    outDir: './build',
  },
}