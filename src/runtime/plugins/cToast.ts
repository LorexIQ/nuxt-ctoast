import {defineNuxtPlugin} from "#imports";
import CToastComponent from '../components/CToast.vue';
import evBus from "./evBus";
import {createApp} from 'vue';
import {
  CToast, CToastCreate,
  CToastDefault,
  CToastDefaultResult, CToastEditLoaderStatus,
  CToastLoader,
  CToastLoaderDataPrepared, CToastLoaderReturn,
  CToastPrepared,
  CToastType
} from "../types";
import {ModuleOptions} from "../../module";

let options: ModuleOptions;
let idPadding = 0;

function initDefaultTypes<T extends CToastDefault>(types: T): CToastDefaultResult<T> {
  const resultFunctions = {} as CToastDefaultResult<T>;

  for (const toastType in types) {
    resultFunctions[toastType] = (data: CToastCreate) => {
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
    icon: options.icons.default[data.type],
    ...options.toast,
    ...data,
    delay: (data.delay ?? options.toast.delay) || options.infinityDestroyDelay
  };
}
function prepareToastLoaderData(data: CToastLoader): CToastPrepared {
  const loader = data.loader;
  const stages = loader.stages;
  const preparedStages = {
    success: {
      ...loader.success,
      toast: prepareToastData({
        type: 'success',
        ...loader.success.toast
      })
    },
    error: {
      ...loader.error,
      toast: prepareToastData({
        type: 'error',
        ...loader.error.toast
      })
    },
    stages: loader.stages,
    stagesStatus: {}
  } as CToastLoaderDataPrepared;

  for (const stage in stages) {
    preparedStages.stagesStatus[stage] = {
      status: 'load',
      title: stages[stage]
    };
  }

  return {
    id: (Date.now() + idPadding++).toString(),
    type: 'warn',
    icon: options.icons.loader.header,
    timer: false,
    onClick: { delete: false },
    ...data,
    loader: preparedStages,
    delay: data.delay || options.infinityDestroyDelay
  };
}

function show(data: CToast): void {
  evBus.$event('create', prepareToastData(data));
}
function showLoader<T extends CToastLoader>(data: T): CToastLoaderReturn<T['loader']['stages']> {
  evBus.$event('create', prepareToastLoaderData(data));

  return {
    success: (stage) => {
      evBus.$event('editLoaderStatus', {
        name: data.name,
        stage: stage as string,
        status: 'success'
      });
    },
    error: (stage, desc?) => {
      evBus.$event('editLoaderStatus', {
        name: data.name,
        stage: stage as string,
        status: 'error',
        desc
      });
    }
  };
}
function editLoaderStatus(stageData: CToastEditLoaderStatus) {
  evBus.$event('editLoaderStatus', stageData);
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
  if (process.server) return;

  nuxtApp.hook('app:created', () => {
    const cToastDOMElement = document.createElement('div');
    cToastDOMElement.id = '__ctoast';
    document.body.appendChild(cToastDOMElement);

    const app = createApp(CToastComponent, {
      options
    });
    app.mount('#__ctoast');
  });

  options = (nuxtApp.$config as any).public.ctoast as ModuleOptions;

  const cToast = {
    ...initDefaultTypes(options.icons.default),

    show,
    showLoader,
    editLoaderStatus,

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
