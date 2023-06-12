<script lang="ts" setup>
import {CToastPrepared} from "../types";
import { Icon } from '@iconify/vue';
import {ModuleOptions} from "../../module";

interface Props {
  data: CToastPrepared,
  options: ModuleOptions
}

defineProps<Props>();
</script>

<template>
  <div
    class="ctoast-notify"
    :class="`--${data.type}`"
  >
    <div class="ctoast-notify__header">
      <icon
        :icon="data.icon"
        width="20"
      />
      <p>{{ data.title }}</p>
    </div>
    <div
      v-if="data.delay !== options.infinityDestroyDelay && options.toast.timer"
      class="ctoast-notify__timer"
      :style="`animation-duration: ${data.delay}ms;`"
    />
    <div
      v-if="data.description"
      class="ctoast-notify__content"
    >
      <p>{{ data.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
$success: #4caf50;
$error: #f44336;
$info: #ffb020;

.ctoast-notify {
  width: 250px;
  max-height: 300px;
  margin: 4px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  background-color: #f1f1f1;
  overflow: hidden;
  transition: 1s;

  &.--success .ctoast-notify{
    &__header, &.iconify {
      color: $success;
    }
    &__timer {
      background-color: $success;
    }
  }
  &.--error .ctoast-notify{
    &__header, &.iconify {
      color: $error;
    }
    &__timer {
      background-color: $error;
    }
  }
  &.--info .ctoast-notify{
    &__header, &.iconify {
      color: $info;
    }
    &__timer {
      background-color: $info;
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
    color: #2c3e50;
    user-select: none;
    transition: .3s;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: .5rem;
    background-color: #f1f1f1;

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
    background-color: rgba(255,255,255,.95);

    p {
      font-size: .9rem !important;
    }
    &__loader {
      display: flex;
      gap: 5px;
      align-items: center;
      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        width: 21px;
        height: 21px;
        &--load {
          svg {
            color: #ffb020;
          }
        }
        &--success {
          svg {
            color: #4caf50;
          }
        }
        &--error {
          svg {
            color: #f44336;
          }
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
