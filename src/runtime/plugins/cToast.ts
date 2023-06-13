import {defineNuxtPlugin} from "#imports";
import CToastComponent from '../components/CToast.vue';
import evBus from "./evBus";
import {createApp} from 'vue';
import {useNuxtApp} from '#imports';
import {CToast, CToastDefault, CToastDefaultResult, CToastPrepared, CToastType} from "../types";
import {ModuleOptions} from "../../module";

let options: ModuleOptions;
const defaultToasts: CToastDefault = {
  success: {
    icon: 'mingcute:check-fill'
  },
  error: {
    icon: 'pepicons-pop:times'
  },
  warn: {
    icon: 'pajamas:warning-solid'
  }
};
let idPadding = 0;

function initDefaultTypes<T extends CToastDefault>(types: T): CToastDefaultResult<T> {
  const resultFunctions = {} as CToastDefaultResult<T>;

  for (const toastType in types) {
    resultFunctions[toastType] = (data) => {
      const dataPrepared = typeof data === 'string' ? { title: data } : data;

      evBus.$event('create', prepareToastData({
        type: toastType as CToastType,
        ...dataPrepared
      }));
    };
  }

  return resultFunctions;
}

function prepareToastData(data: CToast): CToastPrepared {
  return {
    id: (Date.now() + idPadding++).toString(),
    icon: defaultToasts[data.type].icon,
    ...options.toast,
    ...data,
    delay: (data.delay ?? options.toast.delay) || options.infinityDestroyDelay
  };
}

function show(data: CToast): void {
  evBus.$event('create', prepareToastData(data));
}
function clear(): void {
  evBus.$event('clear');
}
function remove(name: string): void {
  evBus.$event('remove', name);
}
function replace(name: string, data: CToast): void {
  evBus.$event('replace', [name, prepareToastData(data)]);
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

  const cToast = {
    ...initDefaultTypes(defaultToasts),
    show,
    clear,
    remove,
    replace
  };

  return {
    provide: {
      cToast
    }
  };
});
