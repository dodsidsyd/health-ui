import type { CustomHeaderTitle, HeaderUtilsButton } from '~/types/common/header/header.types'

declare module '#app' {
  interface PageMeta {
    dataLayout?: string
    dataPage?: string
    isShowHeader?: boolean
    isShowUtils?: boolean
    isShowBackButton?: boolean
    title?: string
    utils?: HeaderUtilsButton[] | undefined
    pageTitle?: CustomHeaderTitle | undefined
    isShowTabbar?: boolean
  }
}
export {}
