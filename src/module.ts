import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit';
import {CToastOptionsPosition} from "./runtime/types";
import defu from "defu";

export interface ModuleOptions {
  position: CToastOptionsPosition
  maxToasts: number
  infinityDestroyDelay: number
  massClearDelay: number
  toast: {
    delay: number
    timer: boolean
    deleteOnClick: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt/ctoast',
    configKey: 'ctoast',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    position: 'bottom-right',
    maxToasts: 10,
    infinityDestroyDelay: 120000,
    massClearDelay: 150,
    toast: {
      delay: 3000,
      timer: true,
      deleteOnClick: true
    }
  },
  setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.public.ctoast = defu(nuxt.options.runtimeConfig.public.ctoast, options);

    addPlugin(resolve('runtime/plugins/cToast'));
  }
});
