import Vue, { VueConstructor , PluginObject} from 'vue';
import App from '@/App.vue';
import VueRouter, { RawLocation, Route } from 'vue-router';
import { config } from '../config'
import { Inject } from '../decorators/Ioc';

/**
 * 项目初始化文件
 */
export class Init {

  @Inject()
  private config!: config;
  
  private initVuePlugsArray = config.VuePlugs;
  private initOtherPlugsArray = config.NotVuePlugs;
  private initVueMixin = config.VueMixin;
  private ininVueDirective = config.VueDirective;

  protected router!: VueRouter;
  protected Vues: VueConstructor<Vue> = Vue;
  public static AppComponent: VueConstructor = App;


  constructor() {
    this.Vues.config.productionTip = false;
    this.initPlugs();
  }

  /**
   * 初始化Vue和非Vue插件，Vue Mixin，vue directive
   */
  private initPlugs(): void {
    this.ininVueDirective.forEach(v => this.Vues.directive(v['n'], v['f']))
    this.initVueMixin.forEach(v => this.Vues.mixin(v))
    this.initOtherPlugsArray.forEach(v => this.Vues.prototype[v['n']] = new (v['f'])());
    this.initVuePlugsArray.forEach(v => this.Vues.use(v));
    this.InitVueRouter();
  }

  /**
   * 初始化配置全局路由
   * @constructor
   */
  private InitVueRouter(): void {
    this.router = new VueRouter(config.RouterConfigUrl);
    // 全局路由守卫
    this.router.beforeEach((to: Route, from: Route, next: (to?: RawLocation | false | void) => void) => {
      document.title = to.meta.title
      next()
    })
    // 重写路由Push
    const routerPush: (location: RawLocation) 
          => Promise<Route> 
          = VueRouter.prototype.push;
          
    VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
      // @ts-ignore
      return routerPush.call(this, location).catch((error: Error) => error)
    };
  }

}
