# Vue3Template

使用Vue-cli3，并基于 Vue3.0 Composition-Api + TypeScript 改造搭建的基础项目骨架(符合我的使用习惯)，可以直接下载运行。

快来感受Vue3.0的魅力吧...

- 1: Vue3.0 Composition-Api 访问地址：[https://github.com/vuejs/composition-api](https://github.com/vuejs/composition-api)
- 2: TypeScript 中文网：[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)

## 下载
```
git clone https://github.com/helpcode/Vue3Template.git
```

## 运行
```
npm run serve
```

## 打包构建-发布
```
npm run build
```

## 项目结构

项目的大致结构如下，具体更详细的请自行看源码！！！

```
├── dist                            打包后用于部署到服务器上的版本
├── public                          公共静态资源，图片，字体体积较大的放这！！
└── src
    ├── application                 项目的页面组件部分
    │   ├── assets                  较小的且需要被webpack处理的资源放这！！
    │   │   └── stylus              stylus 样式
    │   │       ├── color           公共全局样色
    │   │       ├── common          公共css
    │   │       ├── components      页面样式
    │   │       └── mixin           公共css方法
    │   ├── components              Vue公共组件
    │   └── page                    Vue页面组件
    └── core                    
        ├── config                  站点的核心配置文件，必看代码
        ├── dao                     Axios的封装
        ├── decorators              自定义的一些注解(已有Ioc，后期再继续添加)
        ├── directive               Vue自定义指令
        ├── hooks                   Vue3 hooks
        ├── mixin                   Vue自定义mixin
        ├── run                     项目的启动配置/启动文件
        ├── service                 Ajax请求的中间层，实现接口规范，主要给组件页面调用
        │   └── impl                接口的具体实现逻辑
        ├── types                   一些Typescript的声明文件
        └── utils                   公共方法
```

## 已实现的注解

- 1: `@Directive()`：主要在文件 `directive/index.directive.ts`的类`DirectiveList`中使用，加在类`DirectiveList`的方法上，让方法成为Vue的自定义指令，方法名就是指令名。例如方法`public index() {}`，那么Vue组件中指令则为：`v-index`。

- 2: `@Injectable()、@Inject()`：注解`@Injectable()`为收集依赖，而`@Inject()`加在类的属性上，会把`@Injectable()`的类注入到属性上。

- 3: `@GET、@POST、@PUT、@DELETE`：主要在文件 `service/impl` 中使用，加在类的方法上，注解均接受一个参数，参数为请求地址。具体使用方法看 `service/impl/home.service.impl.ts` 文件。

- 4: `@Mixin()`：主要在文件 `mixin/index.mixin.ts` 中使用，加在类的方法上，会让类的方法自动成为Vue的全局mixin。具体使用方法看 `mixin/index.mixin.ts` 文件。

## 项目运行思路

- 1: `vue.config.js` 中 `config.entry.app = './src/core/run/index.ts';` 设置了程序的入口文件，程序从这启动！
- 2: `class Index` 继承 父类 `Init`, 这里 `index.ts` 只负责做初始化`Vue`的工作，所有的Vue参数插件等具体装载都在`init.ts`中
- 3: `init.ts` 主要负责装载`Vue`和非`Vue`插件，`Vue Mixin`，`vue Directive`，`Vue-Router`等工作。而`init.ts`用到的一系列东西大部分都从`config/index.ts`中来。
- 4: `config/index.ts`很核心，例如我们要安装UI框架`Vant`，那么请安装后再`config/index.ts`中导入，然后修改静态属性`VuePlugs`即可。具体请看代码，其它类似指令都类似。

额....好像就没有了，简单很。可以自己按照上面思路来看代码，代码里面都有注释。

**对了，记得看`src/application/page/Home.vue`里面的代码，还就是配置文件: `vue.config.js`也记得看下！**

## 后面考虑会写一个Vue3的学习文档，这样方便大家快速掌握！