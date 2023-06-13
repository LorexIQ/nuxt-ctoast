<div align="center">
<img src="https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/cToast.png" />
  <h1>cToast</h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/ctoast"><img src="https://img.shields.io/npm/v/ctoast.svg?style=for-the-badge&logo=npm"/></a>
  <a href="https://www.npmjs.com/package/ctoast"><img src="https://img.shields.io/npm/l/ctoast.svg?style=for-the-badge"/></a>
  <a href="https://www.npmjs.com/package/ctoast"><img src="https://img.shields.io/npm/dm/ctoast.svg?style=for-the-badge"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/static/v1?logo=node.js&label=Node.js&message=v16.x.x&labelColor=6a6a6a&color=5ecc34&style=for-the-badge"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=for-the-badge&logo=vue.js"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/nuxt-3.x-brightgreen.svg?style=for-the-badge&logo=nuxt.js"/></a>
</p>

***

## Menu
- [Installation](#install)
- [Connecting to the project](#connect)
- [Setting standard parameters](#default)
- [Parameters (args)](#args)
  - [positionPadding](#position_padding)
  - [toast](#toast)
  - [ctoasts](#ctoasts)
- [Methods](#methods)
  - [Methods `default`, `success`, `info`, `error`](#quick)
  - [Method `show`](#show)
  - [Method `showLoader`](#show_loader)
  - [Method `loaderStatus`](#loader_status)
  - [Method `replace`](#replace)
  - [Method `delete`](#delete)
  - [Method `clear`](#clear)

***

- [✨ Release Notes](/CHANGELOG.md)

## Features

- 🌗 Themes
- 🪝 Config base toasts
- 🧊 Offline icons
- 🪟 More toast positions

## Quick Setup

1. Add `ctoast` dependency to your project

```bash
# Using pnpm
pnpm add nuxt-ctoast

# Using yarn
yarn add nuxt-ctoast

# Using npm
npm install nuxt-ctoast
```

2. Add `ctoast` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-ctoast'
  ]
})
```

That's it! You can now use cToast in your Nuxt app ✨

<a name="default"></a>
## Setting standard parameters

There are 2 ways to pass parameters to the module

1. Transfer when adding a module
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    ['cToast', { args }]
  ]
})
```

2. Passing parameters through the namespace
```ts
export default {
  cToast: {
      args
  }  
}
```

***

<a name="args"></a>
## Parameters (args)

```ts
interface ModuleOptions {  
	// position on the screen
	// default: 'bottom-right'
	position: CToastOptionsPosition
	// maximum number of notifications on the screen at a time
	// default: 10
	maxToasts: number
	// the delay between replacing toasts at the loader
	// default: 300
	loaderSwitchDelay: number 
	// maximum delay when delay: false
	// default: 120000
	infinityDestroyDelay: number
	// delay between deleting notifications during mass deletion
	// default: 150
	massClearDelay: number
	toast: {
		// notification lifetime
		// default: 3000
		delay: number 
		// timer status
		// default: true
		timer: boolean
		onClick: CToastOnClickConfig
	}
	icons: {
		default: { // icon names for standard notifications
			success: string // default: 'mingcute:check-fill'
			error: string // default: 'pepicons-pop:times'
			warn: string // default: 'pajamas:warning-solid'
		}
		loader: { // icon names for the notification loader
			header: string // default: 'svg-spinners:tadpole'
			status: {  
				load: string // default: 'svg-spinners:3-dots-scale'
				success: string // default: 'mingcute:check-fill'
				error: string // default: 'pepicons-pop:times'
			}  
		}  
	}  
}
```

```ts
type CToastOptionsPosition =  
	| 'top-left'  
	| 'top-right'  
	| 'bottom-left'  
	| 'bottom-right';
```

```ts
type CToastOnClickConfig = {
	// whether to delete a notification by clicking on it
	// default: true 
	delete?: boolean
};
```
<a name="toast"></a>
#### CToast

```ts
type CToastType = 'success' | 'error' | 'warn';
type CToastOnClick = {  
	delete?: boolean // whether to delete a notification by clicking on it
	func?: (toast: CToastPrepared) => void // called function when pressed
};
```

```ts
interface CToast {  
	type: CToastType // notification type
	title: string // notification title
	  
	description?: string // description of the notification
	delay?: number | false // delay before deletion
	name?: string // notification name
	icon?: string // notification icon
	timer?: boolean // timer status
	onClick?: CToastOnClick
}
```
<a name="toast-loader"></a>
#### CToastLoader

```ts
interface CToastLoaderData {  
	success: {
		toast: CToast // successful notification
		// called successful function
		on?: (toast: CToastPrepared) => void
	}
	error: {
		toast: CToast // erroneous notification
		// called error function
		on?: (toast: CToastPrepared, stage: keyof CToastLoaderStages) => void
	}
	stages: {
		// key: title - stage
		[name: string]: string  
	}
}
```

```ts
interface CToastLoader {
	type: CToastType // notification type
	title: string // notification title
	name: string // notification name
	loader: CToastLoaderData
	
	description?: string // description of the notification
	delay?: number | false // delay before deletion
	icon?: string // notification icon
}
```

***

<a name="methods"></a>
## Methods

<a name="quick"></a>
#### Methods  `success`, `warn`, `error`

Standard functions for quickly calling toasts. At the moment there are 4 types.

```ts
type CToastWithoutMeta<T extends CToastForm> = Omit<T, 'type'>;
type CToastCreate = string | CToastWithoutMeta<CToast>;
```

```ts
$cToast.success(data: CToastCreate);
$cToast.warn(data: CToastCreate);
$cToast.error(data: CToastCreate);
```

```ts
// quicke toasts with parameters
$cToast.success({
	title: 'Test Success',
	delay: false
});
$cToast.warn({ 
	title: 'Test info',
	icon: 'ph:spinner',
	delay: false,
	name: 'test-replace'
});  
$cToast.error({ 
	title: 'Test Delete',
	delay: false,
	name: 'test-delete'
});
// or quicke toasts without parameters
$cToast.success('Test Success');
$cToast.info('Test Info');
$cToast.error('Test Error');
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/quickToastsTest.gif)

To call a test with a full list of parameters, the `show` function is used.

***
<a name="show"></a>
#### Method `show`

```ts
// full toast form
$cToast.show(data: CToast)

$cToast.show({  
	title: 'Тест зелёного',  
	description: 'Вроде есть',  
	type: 'success',  
	onClick: {  
		func: () => console.log('click')  
	},  
	delay: 10000,  
	icon: 'fa:ban'
})
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/toastTest.gif)

***
<a name="show_loader"></a>
#### Method `showLoader` `NEW`
This type of toast is designed to remove spam from the website interface. It is called once with all the necessary parameters and then, as something is loaded on the page, using an additional method, the state of each of the parameters changes.

An example of calling this toast

```ts
// loader toast form
$cToast.showLoader(data: CToastLoader) => {
	success: (stage: string) => void
	error: (stage: string, desc?: string) => void
};
// loader toast example
$cToast.showLoader({  
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
```
![loaderSuccessTest](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/loaderSuccessTest.gif)
![loaderErrorTest](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/loaderErrorTest.gif)

To change the loading state, the `editLoaderStatus` method is used

***

<a name="edit_loader_status"></a>
#### Method `editLoaderStatus` `NEW`

This method works in conjunction with showLoader and nothing else.

```ts
type CToastLoaderStagesStatuses = 'load' | 'success' | 'error';
```

```ts
// loader change status form
$cToast.loaderStatus({  
	name: string  
	stage: string
	status: CToastLoaderStagesStatuses
	desc?: string 
});
// loader change status example success
$cToast.loaderStatus('loader-test', 'test-1', 'error', 'error description');
```
***

<a name="replace"></a>
#### Method `replace`
It is also possible to make toasts immortal. To do this, just enter the `false` value in the `delay` parameters.
Such toasts can be destroyed by _clicking the mouse_ (**if deletion is enabled**), _reloading the page_, _clearing all toasts_, _deleting by name_, but not by time (**unless you have infinityDestroyDelay set to a very small value**).
If you use immortal toast when loading something, then the `replace` function is perfect for your purposes.
The function will delete the immortal toast by its name and create a new one based on the data just passed.

```ts
$cToast.replace(name: string, toast: CToast);
// example
$cToast.warn({ title: 'Test info', icon: 'ph:spinner', delay: false, name: 'test-replace' });
$cToast.replace('test-replace', { title: 'Replaced!', type: 'success' });
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/replaceTest.gif)

***

<a name="remove"></a>
#### Method remove

A function that deletes a toast by its name.

```ts
$cToast.remove(name: string);
// example
$cToast.error({ title: 'Test Delete', delay: false, name: 'test-delete' });
$cToast.remove('test-delete');
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/clearTest.gif)

***

<a name="clear"></a>
#### Method `clear`

The function deletes all existing toasts. Does not need parameters.

```ts
$cToast.clear();
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/clearTest.gif)

***

Enjoy using my toasts 🤗

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
