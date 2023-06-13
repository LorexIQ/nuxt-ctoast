<script lang="ts" setup>
import {useNuxtApp} from "#imports";

const { $cToast } = useNuxtApp();

function callToast() {
  $cToast.show({
    title: 'TEST',
    description: 'test desc',

    name: 'test-del',
    delay: 10000,
    onDelete: (v) => console.log(v),

    type: 'warn',
  });
  $cToast.success('123');
}
function replaceToast() {
  $cToast.replace('test-del', {
    title: 'TEST REPLACE',
    description: 'test desc',

    name: 'test-del',
    delay: 5000,

    type: 'error',
  });
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
    <button @click="() => $cToast.remove('test-del')">
      REMOVE NAME: test-del
    </button>
    <button @click="replaceToast">
      REPLACE NAME: test-del
    </button>
  </div>
</template>
