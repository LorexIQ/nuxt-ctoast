export type CToastCreate = string | CToast;
export type CToastReplace = [string, CToastPrepared];

export type CToastType = 'success' | 'error' | 'warn';
export interface CToast {
  title: string
  type: CToastType

  name?: string
  icon?: string
  description?: string
  delay?: number | false
  timer?: boolean

  deleteOnClick?: boolean
  onDelete?: (toast: CToastPrepared) => void
}
export interface CToastPrepared extends CToast {
  id: string
  icon: string
  delay: number
  deleteOnClick: boolean,
  timer: boolean
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
