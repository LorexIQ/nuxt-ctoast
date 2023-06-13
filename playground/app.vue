<script lang="ts" setup>
import {useNuxtApp} from "#imports";
import {CToastLoaderStagesStatuses} from "../src/runtime/types";

const { $cToast } = useNuxtApp();

let loaderObject;

function clearToasts () {
  $cToast.clear();
}
function changeLoaderState (name :string, stage: string, status: CToastLoaderStagesStatuses, desc?: string) {
  $cToast.editLoaderStatus({
    name,
    stage,
    status,
    desc
  });
}
function loaderToast () {
  loaderObject = $cToast.showLoader({
    title: 'Test Loader',
    description: 'A new loader toast has been released. Check out the new documentation',
    name: 'test-loader',
    loader: {
      success: {
        toast: {
          title: 'Good reviews have not been received'
        },
        on: () => console.log('success')
      },
      error: {
        toast: {
          title: 'Thank you for support'
        },
        on: () => console.log('error')
      },
      stages: {
        'test-1': 'search for an idea',
        'test-2': 'implementation of the idea',
        'test-3': 'good reviews'
      }
    }
  });
}
function replaceToast () {
  $cToast.replace('test-replace', { title: 'Replaced!', type: 'success' });
}
function deleteToast () {
  $cToast.remove('test-delete');
}
function testToast () {
  $cToast.success({ title: 'Test info', delay: false });
  $cToast.warn({ title: 'Test info', icon: 'ph:spinner', delay: false, name: 'test-replace' });
  $cToast.error({ title: 'Test Delete', delay: false, name: 'test-delete' });
  $cToast.show({
    title: 'Тест зелёного',
    description: 'Вроде есть',
    type: 'success',
    onClick: {
      func: () => console.log('click')
    },
    delay: 10000,
    icon: 'fa:ban'
  });
}
</script>

<template>
  <div class="content">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque eligendi enim molestias quas quisquam rerum sed similique? Aliquid assumenda at aut delectus ea, earum eligendi exercitationem fugiat illo labore laborum magni nihil non nulla perferendis quaerat quas quasi quod reiciendis reprehenderit similique tempora ullam unde ut velit voluptas voluptatum. Accusantium aliquam commodi eum fuga fugiat hic sed voluptatem. Aut illo in maiores pariatur qui rem, suscipit tenetur. Facere illo molestias nihil placeat, quod sequi? A accusamus, accusantium consectetur dicta dignissimos error, fuga id nam possimus qui quia repudiandae sequi tempore. Deleniti dolores ea maiores porro similique voluptatem, voluptates. Ipsam, qui!</p>
    <div class="content__buttons">
      <a href="#" class="btn green" @click="testToast">Spawn Toast</a>
      <a href="#" class="btn purple" @click="loaderToast">Loader Toast</a>
      <a href="#" class="btn" @click="replaceToast">Replace Toast</a>
      <a href="#" class="btn blue" @click="clearToasts">Clear Toasts</a>
      <a href="#" class="btn red" @click="deleteToast">Delete Toast</a>

      <a />
      <div class="content__buttons__sub">
        <p>Object</p>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.success('test-1')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.success('test-2')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.success('test-3')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.error('test-1', 'test-1 error')"><p class="red"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.error('test-2', 'test-2 error')"><p class="red"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="loaderObject.error('test-3', 'test-3 error')"><p class="red"></p></a>
      </div>
      <a />
      <a />
      <a />

      <a />
      <div class="content__buttons__sub">
        <p>Event</p>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-1', 'success')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-2', 'success')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-3', 'success')"><p class="green"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-1', 'error', 'test-1 error')"><p class="red"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-2', 'error', 'test-2 error')"><p class="red"></p></a>
        <a href="#" class="content__buttons__sub__button" @click="changeLoaderState('test-loader', 'test-3', 'error', 'test-3 error')"><p class="red"></p></a>
      </div>
      <a />
      <a />
      <a />
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Roboto', sans-serif;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

  & p {
    text-align: center;
  }
  &__buttons {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    grid-template-columns: repeat(5, auto);

    & .btn {
      padding: 5px 10px;
      border-radius: 5px;
      border: 0;
      color: #fff;
      background-color: rgba(123, 123, 123, 0.8);
      transition: .3s;

      &:hover {
        background-color: rgba(166, 166, 166, 0.8);
      }
      &:active {
        transform: scale(.95);
        color: #fff;
      }
      &:focus {
        box-shadow: none;
      }
    }
    &__sub {
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      grid-gap: 5px;

      & p {
        grid-column: 1 / 4;
        margin: 0;
      }
      &__button {
        p {
          width: 20px;
          height: 20px;
          margin: 0;
          border-radius: 5px;
          background-color: rgba(123, 123, 123, 0.8);
          transition: .3s;

          :hover {
            background-color: rgba(166, 166, 166, 0.8);
          }
        }
        :active {
          transform: scale(.95);
        }
      }
    }
  }
}
.red {
  background-color: rgba(255, 77, 77, 0.8) !important;
  &:hover {
    background-color: rgba(253, 25, 25, 0.8) !important;
  }
}
.green {
  background-color: rgba(13, 202, 51, 0.75) !important;
  &:hover {
    background-color: rgba(28, 230, 40, 0.8) !important;
  }
}
.blue {
  background-color: rgba(77, 208, 255, 0.8) !important;
  &:hover {
    background-color: rgba(25, 158, 253, 0.8) !important;
  }
}
.purple {
  background-color: rgba(124, 77, 255, 0.8) !important;
  &:hover {
    background-color: rgba(86, 25, 253, 0.8) !important;
  }
}
</style>
