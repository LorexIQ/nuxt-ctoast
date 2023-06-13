import mitt from 'mitt';
import {CToastPrepared, CToastReplace} from "../types";

type Emits = {
  create: CToastPrepared
  clear: void
  remove: string
  replace: CToastReplace
};

const emitter = mitt<Emits>();

export default {
  $event: emitter.emit,
  $listen: emitter.on
};
