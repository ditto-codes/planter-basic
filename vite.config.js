const { resolve } = require('path');

const inputs = { 
  main: resolve(__dirname, 'src/index.html'),
  some: resolve(__dirname, 'src/demo.html')
}

console.log(inputs);

export default {
  root: './src/',
  publicDir: '../static',
  build: {
    outDir: './build',
    rollupOptions: {
      input: {
        ...inputs,
      }
    }
  },
}