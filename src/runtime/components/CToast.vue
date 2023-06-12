<script lang="ts" setup>
import evBus from "../plugins/evBus";
import {CToastPrepared} from "../types";
import {ModuleOptions} from "../../module";
import {reactive} from "#imports";
import CToastNotify from "../../../dist/runtime/components/CToastNotify.vue";

interface Props {
  options: ModuleOptions
}

const props = defineProps<Props>();
const options = reactive(props.options);
const { $listen } = evBus;

const ctoasts = reactive<CToastPrepared[]>([]);
const ctoastsDelays: NodeJS.Timeout[] = [];

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

$listen('create', data => {
  if (ctoasts.length >= options.maxToasts) {
    clearToasts([ctoasts[0]]);
  }

  ctoasts.push(data);
  ctoastsDelays.push(setTimeout((toast: CToastPrepared) => {
    const toastIndex = ctoasts.indexOf(toast);

    if (toastIndex !== -1) {
      clearToasts([ctoasts[toastIndex]]);
    }
  }, data.delay, data));
});
$listen('clear', () => {
  clearToasts([...ctoasts]);
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
