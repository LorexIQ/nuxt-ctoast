<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type {
  CToastLoaderStagesStatuses,
  CToastPrepared
} from "../types";
import type { ModuleOptions } from "../../module";

interface Props {
  data: CToastPrepared,
  options: ModuleOptions
}
interface Emits {
  (e: 'remove', v: CToastPrepared): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function getLoaderStageIcon(status: CToastLoaderStagesStatuses): string {
  return props.options.icons.loader.status[status];
}
function getLoaderStageClass(status: CToastLoaderStagesStatuses): string {
  return `--${status}`;
}

function removeToast() {
  if (props.data.onClick?.delete) {
    emit('remove', props.data);
  }
  if (props.data.onClick?.func) {
    props.data.onClick?.func(props.data);
  }
}
</script>

<template>
  <div
    class="ctoast-notify"
    :class="`--${data.type}`"
    @click.stop="removeToast"
  >
    <div class="ctoast-notify__header">
      <icon
        :icon="data.icon"
        width="20"
      />
      <p>{{ data.title }}</p>
    </div>
    <div
      v-if="data.delay !== options.infinityDestroyDelay && data.timer"
      class="ctoast-notify__timer"
      :style="`animation-duration: ${data.delay}ms;`"
    />
    <div
      v-if="data.description || data.loader"
      class="ctoast-notify__content"
      :class="{'--loader': data.loader}"
    >
      <p v-if="data.description">
        {{ data.description }}
      </p>
      <div
        v-if="data.loader"
        class="ctoast-notify__content__loader"
      >
        <div
          v-for="stage in data.loader.stagesStatus"
          :key="stage"
          class="ctoast-notify__content__loader__item"
        >
          <icon
            :class="getLoaderStageClass(stage.status)"
            :icon="getLoaderStageIcon(stage.status)"
          />
          <p>{{ stage.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ctoast-notify {
  --ctoastBg: #ffffff;
  --ctoastBgHeader: #f1f1f1;
  --ctoastTitle: #2c3e50;
  --ctoastTitleDescription: #2c3e50;
  --ctoastTitleLoader: #2c3e50;
  --ctoastShadow: #0000001E;
  --ctoastStatusSuccess: #4caf50;
  --ctoastStatusWarn: #ffb020;
  --ctoastStatusError: #f44336;
}
</style>
<style scoped lang="scss">
$success: var(--ctoastStatusSuccess);
$warn: var(--ctoastStatusWarn);
$error: var(--ctoastStatusError);

.ctoast-notify {
  width: 250px;
  max-height: 300px;
  margin: 4px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 var(--ctoastShadow);
  overflow: hidden;
  transition: 1s;

  &.--success .ctoast-notify {
    &__header, &.iconify {
      color: $success;
    }
    &__timer {
      background-color: $success;
    }
  }
  &.--error .ctoast-notify {
    &__header, &.iconify {
      color: $error;
    }
    &__timer {
      background-color: $error;
    }
  }
  &.--warn .ctoast-notify {
    &__header, &.iconify {
      color: $warn;
    }
    &__timer {
      background-color: $warn;
    }
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    text-decoration: none;
    text-transform: inherit;
    margin: 0;
    color: var(--ctoastTitle);
    user-select: none;
    transition: .3s;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: .5rem;
    background-color: var(--ctoastBgHeader);

    & svg {
      min-width: 20px;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      display: block;
      margin: 0 auto 2rem;
      border-bottom: 1px solid black;
    }
  }
  &__content {
    font-size: 1.5rem;
    white-space: pre-line;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: .75rem;
    background-color: var(--ctoastBg);

    &.--loader p {
      padding-bottom: 2px;
    }
    p {
      font-size: .9rem !important;
      color: var(--ctoastTitleDescription);
    }
    &__loader__item {
      display: flex;
      align-items: center;
      gap: 10px;

      & p {
        color: var(--ctoastTitleLoader);
      }
      & .iconify {
        min-width: 24px;

        &.--load {
          color: $warn;
        }
        &.--success {
          color: $success;
        }
        &.--error {
          color: $error;
        }
      }
    }
  }
  &__timer {
    width: 0;
    height: 2px;
    animation: linear width-out;
  }
}

@keyframes width-out {
  0% {
    width: 250px
  }
  100% {
    width: 0;
  }
}
</style>
