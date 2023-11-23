import mitt from 'mitt';
import type {
  CToastEditLoaderStatus,
  CToastPrepared,
  CToastReplace
} from "../types";

type Emits = {
  create: CToastPrepared
  editLoaderStatus: CToastEditLoaderStatus

  clear: void
  remove: string
  replace: CToastReplace
};

const emitter = mitt<Emits>();

export default {
  $event: emitter.emit,
  $listen: emitter.on
};
