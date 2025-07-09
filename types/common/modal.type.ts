export interface BaseModalProps {
  title?: string
  isVisible: boolean
  isShowCloseButton?: boolean
  isShowCancelButton?: boolean
  isShowConfirmButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  disabledCancelButton?: boolean
  disabledConfirmButton?: boolean
  autoClose?: boolean
}

export type ModalEmitEvent = 'confirm' | 'cancel' | 'close'

export interface AlertModalProps {
  content?: string
  html?: string
  isVisible: boolean
  confirmButtonText?: string
  disabledConfirmButton?: boolean
}

export interface ConfirmModalProps extends BaseModalProps {
  html?: string
  content?: string
}

export type NoticeModalEvent = 'skipToday' | 'close'

export interface SwiperModalContent {
  width?: string
  img?: {
    src: string
    alt: string
  }
  title?: string
  text?: string
}

export interface SwiperModalProps extends BaseModalProps {
  contents: SwiperModalContent[]
  disabledCancelButton?: boolean
}
