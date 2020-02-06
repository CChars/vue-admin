// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "data" in sass-loader v7
      sass: {
        // prependData: `@import "~@/variables.sass"`
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `data` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        prependData: `@import "~@/styles/main.scss";`
      }
      // pass Less.js Options to less-loader
      // less: {
      //   // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
      //   // `primary` is global variables fields name
      //   globalVars: {
      //     primary: "#fff"
      //   }
      // }
    }
  },

  devServer: {
    // open: false,
    // host: "0.0.0.0",
    // port: 8080,
    // https: false,
    // hot: true,
    // hotOnly: false,
    proxy: {
      "/devapi": {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: "http://www.web-jshtml.cn/productapi",
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/devapi": ""
        }
      }
    }
  }
};
