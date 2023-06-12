<script lang="ts" setup>
import {useNuxtApp} from "#imports";

const { $cToast } = useNuxtApp();

function callToast() {
  $cToast.success({ title: 'TEST', description: 'test desc' });
}
</script>

<template>
  <div>
    <button @click="callToast">
      EVENT
    </button>
    <button @click="() => $cToast.clear()">
      CLEAR
    </button>
  </div>
</template>
