/**
 * @module nuxt-ctoast
 */

import {
  defineNuxtModule,
  addPlugin,
  createResolver
} from '@nuxt/kit';
import type {
  CToastOnClickConfig,
  CToastOptionsPosition
} from "./runtime/types";
import defu from "defu";

export interface ModuleOptions {
  position: CToastOptionsPosition
  maxToasts: number
  loaderSwitchDelay: number
  infinityDestroyDelay: number
  massClearDelay: number
  toast: {
    delay: number
    timer: boolean
    onClick: CToastOnClickConfig
  }
  icons: {
    default: {
      success: string
      error: string
      warn: string
    }
    loader: {
      header: string
      status: {
        load: string
        success: string
        error: string
      }
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ctoast',
    configKey: 'cToast',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    position: 'bottom-right',
    maxToasts: 10,
    loaderSwitchDelay: 300,
    infinityDestroyDelay: 120000,
    massClearDelay: 150,
    toast: {
      delay: 3000,
      timer: true,
      onClick: {
        delete: true
      }
    },
    icons: {
      default: {
        success: 'mingcute:check-fill',
        error: 'pepicons-pop:times',
        warn: 'pajamas:warning-solid'
      },
      loader: {
        header: 'svg-spinners:tadpole',
        status: {
          load: 'svg-spinners:3-dots-scale',
          success: 'mingcute:check-fill',
          error: 'pepicons-pop:times'
        }
      }
    }
  },
  setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.public.ctoast = defu(nuxt.options.runtimeConfig.public.ctoast, options);

    nuxt.hook('modules:done', () => {
      addPlugin({
        src: resolve('runtime/plugins/cToast'),
        mode: 'client'
      });
    });
  }
});
