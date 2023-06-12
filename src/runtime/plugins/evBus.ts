import mitt from 'mitt';
import {CToastPrepared} from "../types";

type Emits = {
  create: CToastPrepared,
  clear: void
};

const emitter = mitt<Emits>();

export default {
  $event: emitter.emit,
  $listen: emitter.on
};
