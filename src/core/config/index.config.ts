import { PluginObject } from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import { Utils } from '../utils/index.utils';
import { Injectable } from 'vue3decorators';

@Injectable()
export class config {

  /**
   * 接口配置: 测试环境基地址，正式环境基地址，具体页面接口
   */
  public static AjaxConfig: {
    [ key: string ]: any
  } = {
    DevUrl: 'http://localhost:9000',
    ProdUrl: 'http://127.0.0.1:3000',
    ApiList: {
      index: '/test',
      haha: '/haha'
    },
  };

  /**
   * 需要被挂载的节点
   */
  public static mountElement: string = '#app';

  /**
   * Vue插件
   */
  public static VuePlugs: PluginObject<never>[] 
  = [
    VueRouter,
    VueCompositionApi
  ];
  
  /**
   * Vue-router 配置
   */
  public static RouterConfigUrl: RouterOptions = {
    routes: [
      {
        path: '/',
        name: 'home',
        component: Utils.AsyncComponentHook("Home"),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: Utils.AsyncComponentHook("About"),
        meta: {
          title: '任务'
        }
      }
    ]
  }
}
