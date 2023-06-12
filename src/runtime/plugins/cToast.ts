import {defineNuxtPlugin} from "#imports";
import CToastComponent from '../components/CToast.vue';
import evBus from "./evBus";
import { createApp } from 'vue';
import {useNuxtApp} from '#imports';
import {CToast, CToastDefault, CToastDefaultConfig, CToastDefaultResult, CToastPrepared, CToastType} from "../types";
import {ModuleOptions} from "../../module";

let options: ModuleOptions;

function initDefaultTypes<T extends CToastDefault>(types: T): CToastDefaultResult<T> {
  const resultFunctions = {} as CToastDefaultResult<T>;

  for (const toastType in types) {
    const value = types[toastType] as CToastDefaultConfig;
    resultFunctions[toastType] = (data) => {
      const dataPrepared = typeof data === 'string' ? { title: data } : data;

      evBus.$event('create', prepareToastData({
        icon: value.icon,
        type: toastType as CToastType,
        ...dataPrepared
      }));
    };
  }

  return resultFunctions;
}

function prepareToastData(data: CToast): CToastPrepared {
  return {
    id: Date.now().toString(),
    ...options.toast,
    ...data,
    delay: (data.delay ?? options.toast.delay) || options.infinityDestroyDelay
  };
}

function clear(): void {
  evBus.$event('clear');
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:created', () => {
    if (process.server) return;

    const config = useNuxtApp().$config as any;
    options = config.public.ctoast;

    const cToastDOMElement = document.createElement('div');
    cToastDOMElement.id = '__ctoast';
    document.body.appendChild(cToastDOMElement);

    const app = createApp(CToastComponent, {
      options
    });
    app.mount('#__ctoast');
  });

  const defaultToasts = initDefaultTypes({
    success: {
      icon: 'mingcute:check-fill'
    },
    error: {
      icon: 'pepicons-pop:times'
    },
    info: {
      icon: 'svg-spinners:tadpole'
    }
  });

  const cToast = {
    ...defaultToasts,
    clear
  };

  return {
    provide: {
      cToast
    }
  };
});
