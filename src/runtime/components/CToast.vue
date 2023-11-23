<script lang="ts" setup>
import evBus from "../plugins/evBus";
import CToastNotify from "./CToastNotify.vue";
import { reactive } from "#imports";
import type {
  CToastLoaderStagesStatus,
  CToastLoaderStagesStatuses,
  CToastPrepared
} from "../types";
import type { ModuleOptions } from "../../module";

interface Props {
  options: ModuleOptions
}

const props = defineProps<Props>();
const options = reactive(props.options);
const { $listen } = evBus;

const ctoasts = reactive<CToastPrepared[]>([]);
const ctoastsDelays: NodeJS.Timeout[] = [];

function checkStagesLoader(stages: CToastLoaderStagesStatus): CToastLoaderStagesStatuses {
  let summary = 0;

  for (const stage in stages) {
    const status = stages[stage].status;
    if (status === 'success') summary += 1;
    else if (status === 'error') return 'error';
  }

  return summary === Object.keys(stages).length ? 'success' : 'load';
}

function createToast(toast: CToastPrepared, index: number = ctoasts.length): void {
  const removeTimeout = setTimeout((toast: CToastPrepared) => {
    const toastIndex = ctoasts.indexOf(toast);

    if (toastIndex !== -1) {
      clearToasts([ctoasts[toastIndex]]);
    }
  }, toast.delay, toast);

  ctoasts[index] = toast;
  ctoastsDelays[index] = removeTimeout;
}
function clearToasts(toasts: CToastPrepared[]): void {
  if (!toasts.length) return;

  const toastIndex = ctoasts.indexOf(toasts[0]);

  if (toastIndex !== -1) {
    ctoasts.splice(toastIndex, 1);
    clearTimeout(ctoastsDelays[toastIndex]);
    ctoastsDelays.splice(toastIndex, 1);
  }

  if (toasts.length > 1) {
    setTimeout(() => clearToasts(toasts.slice(1)), options.massClearDelay);
  }
}
function removeToast(toast: CToastPrepared): void {
  clearToasts([toast]);
}
function replaceToasts(toasts: CToastPrepared[], newToast: CToastPrepared) {
  if (toasts.length) {
    const lastToastIndex = ctoasts.indexOf(toasts[toasts.length - 1]);

    if (lastToastIndex !== -1) {
      createToast(newToast, lastToastIndex);
      clearToasts(toasts.slice(0, toasts.length - 1));
    }
  }
}

$listen('create', toast => {
  if (ctoasts.length >= options.maxToasts) {
    clearToasts([ctoasts[0]]);
  }

  createToast(toast);
});
$listen('editLoaderStatus', editData => {
  const modifiedToast = ctoasts.find(toast => editData.name === toast.name);

  if (modifiedToast && modifiedToast.loader) {
    const toastStages = modifiedToast.loader.stagesStatus;
    toastStages[editData.stage].status = editData.status;

    const checkStatus = checkStagesLoader(toastStages);
    if (['error', 'success'].includes(checkStatus)) {
      setTimeout((mt) => {
        if (mt.loader) {
          if (checkStatus === 'success') {
            replaceToasts([mt], mt.loader.success.toast);
            mt.loader.success.on && mt.loader.success.on(mt);
          } else if (checkStatus === 'error') {
            mt.loader.error.toast.description = editData.desc;
            replaceToasts([mt], mt.loader.error.toast);
            mt.loader.error.on && mt.loader.error.on(mt, editData.stage);
          }
        }
      }, options.loaderSwitchDelay, modifiedToast);
    }
  }
});
$listen('clear', () => {
  clearToasts([...ctoasts]);
});
$listen('remove', name => {
  clearToasts(ctoasts.filter(toast => toast.name === name));
});
$listen('replace', ([name, newToast]) => {
  const foundToasts = ctoasts.filter(toast => toast.name === name);

  replaceToasts(foundToasts, newToast);
});
</script>

<template>
  <div
    class="ctoast"
    :class="options.position"
  >
    <transition-group
      class="ctoast__list"
      :name="`ctoast-animation-${options.position}`"
      tag="div"
    >
      <c-toast-notify
        v-for="toast in ctoasts"
        :key="toast.id"
        :data="toast"
        :options="options"
        @remove="removeToast"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.ctoast {
  position: fixed;
  z-index: 3000;

  &.top {
    .ctoast__list {
      flex-direction: column-reverse;
    }
    &-left {
      top: 10px;
      left: 10px;
    }
    &-right {
      top: 10px;
      right: 10px;
    }
  }
  &.bottom {
    &-left {
      left: 10px;
      bottom: 10px;
    }
    &-right {
      right: 10px;
      bottom: 10px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &-animation {
    &-bottom, &-top {
      &-right {
        &-enter-active  {
          transition: all .6s ease;
        }
        &-leave-active {
          transition: transform .6s ease, opacity .6s, margin-top .4s .6s, margin-bottom .4s .6s, max-height .6s .4s;
        }
        &-enter-from {
          transform: translateX(120px);
          opacity: 0;
        }
        &-leave-to{
          margin-top: 0;
          margin-bottom: 0;
          max-height: 0;
          transform: translateX(120px);
          opacity: 0;
        }
      }
      &-left{
        &-enter-active  {
          transition: all .6s ease;
        }
        &-leave-active {
          transition: transform .6s ease, opacity .6s, margin-top .4s .6s, margin-bottom .4s .6s, max-height .6s .4s;
        }
        &-enter-from {
          transform: translateX(-120px);
          opacity: 0;
        }
        &-leave-to{
          margin-top: 0;
          margin-bottom: 0;
          max-height: 0;
          transform: translateX(-120px);
          opacity: 0;
        }
      }
    }
  }
}
@keyframes load-animation {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
