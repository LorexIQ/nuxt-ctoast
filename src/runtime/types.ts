export type CToastCreate = string | CToastWithoutMeta<CToast>;
export type CToastReplace = [string, CToastPrepared];
export type CToastEditLoaderStatus = {
  name: string
  stage: string
  status: CToastLoaderStagesStatuses
  desc?: string
};

export type CToastType = 'success' | 'error' | 'warn';
export type CToastLoaderStagesStatuses = 'load' | 'success' | 'error';

export interface CToastForm {
  type: CToastType
  title: string

  description?: string
  delay?: number | false
  name?: string
  icon?: string
}

export type CToastOnClick = {
  delete?: boolean,
  func?: (toast: CToastPrepared) => void
};
export type CToastOnClickConfig = Omit<CToastOnClick, 'func'>
export interface CToast extends CToastForm {
  timer?: boolean
  onClick?: CToastOnClick
}

type CToastLoaderStages = {
  [name: string]: string
};
export type CToastLoaderStagesStatus = {
  [name: string]: {
    status: CToastLoaderStagesStatuses,
    title: string
  }
};
interface CToastLoaderStatus<T> {
  toast: T
}
interface CToastLoaderSuccess<T> extends CToastLoaderStatus<T> {
  on?: (toast: CToastPrepared) => void
}
interface CToastLoaderError<T> extends CToastLoaderStatus<T> {
  on?: (toast: CToastPrepared, stage: keyof CToastLoaderStages) => void
}
interface CToastLoaderData {
  success: CToastLoaderSuccess<CToastWithoutMeta<CToast>>
  error: CToastLoaderError<CToastWithoutMeta<CToast>>
  stages: CToastLoaderStages
}
export interface CToastLoaderDataPrepared extends CToastLoaderData {
  success: CToastLoaderSuccess<CToastPrepared>
  error: CToastLoaderError<CToastPrepared>
  stagesStatus: CToastLoaderStagesStatus
}
export interface CToastLoaderReturn<T extends CToastLoaderStages> {
  success: (stage: (keyof T)) => void
  error: (stage: keyof T, desc?: string) => void
}

export interface CToastLoader extends CToastWithoutMeta<CToastForm> {
  name: string
  loader: CToastLoaderData
}

export interface CToastPrepared extends CToastForm {
  type: CToastType
  id: string
  icon: string
  delay: number
  timer: boolean

  onClick: CToastOnClick
  loader?: CToastLoaderDataPrepared
}
export type CToastWithoutMeta<T extends CToastForm> = Omit<T, 'type'>;

export type CToastDefault = {
  [key in CToastType]: string
};
export type CToastDefaultResult<T> = {
  [key in keyof T]: (data: string | CToastWithoutMeta<CToast>) => void
};

export type CToastOptionsPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
