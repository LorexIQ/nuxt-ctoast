<script lang="ts" setup>
import {useNuxtApp} from "#imports";

const { $cToast } = useNuxtApp();

let test;

function callToast() {
  $cToast.show({
    title: 'TEST',
    description: 'test desc',

    name: 'test-del',
    delay: 10000,
    onClick: {
      delete: true,
      func: () => console.log(123)
    },

    type: 'warn',
  });
  test = $cToast.showLoader({
    title: 'TEST LoADER',
    description: 'ыфв ощзфыов фыо зщфзщыо взфы озфы ыфв',
    name: 'loader',
    loader: {
      success: {
        toast: {
          title: 'Success 1'
        }
      },
      error: {
        toast: {
          title: 'Error 2'
        }
      },
      stages: {
        'stage 1': 'test stage number 1',
        'stage 2': 'test asdas as as as as sa 2 sad foj odpjsp po'
      }
    }
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
    <button @click="replaceToast">
      REPLACE NAME: test-del
    </button>
    <button @click="test.success('stage 1')">
      Success STAGE: stage 1 NAME: loader
    </button>
    <button @click="test.success('stage 2')">
      Success STAGE: stage 2 NAME: loader
    </button>
    <button @click="test.error('stage 2')">
      Error STAGE: stage 2 NAME: loader
    </button>
    <button @click="$cToast.editLoaderStatus({
      name: 'loader',
      stage: 'stage 1',
      status: 'error',
      desc: 'test'
    })">
      EDIT STATUS SUCCESS STAGE: stage 1 NAME: loader
    </button>
  </div>
</template>
