export type CToastCreate = string | CToast;

export type CToastType = 'success' | 'error' | 'info';
export interface CToast {
  title: string
  description?: string
  icon: string
  delay?: number | false

  type: CToastType
}
export interface CToastPrepared extends CToast {
  id?: string
  delay: number
}

export type CToastWithoutMeta = PartialBy<Omit<CToast, 'type'>, 'icon'>;

export type CToastDefaultConfig = {
  icon: string
};
export type CToastDefault = {
  [key in CToastType]: CToastDefaultConfig
}
export type CToastDefaultResult<T> = {
  [key in keyof T]: (data: string | CToastWithoutMeta) => void
}

export type CToastOptionsPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
