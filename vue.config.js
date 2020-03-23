const isProduction = process.env.NODE_ENV === 'production';
const ProdConfig = require("./build/prod");
const DevConfig = require("./build/dev");
const VariableConfig = require('./build/variable');

module.exports = {
  publicPath: './',
  filenameHashing: true,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  lintOnSave: false,
  pluginOptions: {
    route: {
      param: '传参数给內建插件'
    }
  },
  devServer: {
    hot: true,
    hotOnly: true,
    host: '0.0.0.0',
    port: 9000,
    compress: true,
    open: true,
    openPage: '#/',
    overlay: {
      warnings: true,
      errors: true,
    },
    // before 这块代码都可以删除，仅仅为脚手架提供一个用于测试的接口
    before: function(app, server) {
      app.get('/test', function(req, res) {
        res.json({ 
          status: 200,
          result: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ]
        });
      });

      app.post('/haha', function(req, res) {
        res.json({ 
          status: 200,
          result: [
            { id: 1, name: '哈哈1' },
            { id: 2, name: '哈哈2' }
          ]
        });
      });
    }
  },
  configureWebpack: (config) => {
    // 设置程序核心入口
    config.entry.app = './src/core/run/index.run.ts';
    isProduction ? new ProdConfig(config) : ''
  },
  chainWebpack: (config) => {
    isProduction ? config.plugin('html').tap(args => {
        args[0].cdn = VariableConfig.cdn;
        return args;
      }) : '';
    new DevConfig(config);

  }

};

