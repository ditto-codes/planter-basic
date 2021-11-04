// See config options: https://planter.dev/docs/planter-basic/config#options

module.exports = {
  placeholders: {
    '%TITLE%': 'Planter',
  },
  dev: {
    port: 5000,
    open: false,
    ghostMode: false,
  },
  build: {
    outDir: './build',
  },
}