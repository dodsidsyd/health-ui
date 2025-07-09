import type { $Fetch } from 'ofetch'
export {}

declare global {
  interface Window {
    Lemonhc: {
      canary: (flag: boolean) => boolean
    }
    kakao: any
    Android?: {
      toNative: (data: string) => void
    }
    webkit?: {
      messageHandlers: {
        observer: {
          postMessage: (message: { toNative: string }) => void
        }
      }
    }
    toNative?: {
      // web -> native
      nativeBrowsingWithUrl?: (url: string) => Promise<any>
      popUpBrowsing?: (url: string, showLogo: boolean, title: string, method: string) => Promise<any>
    }
    toNativeCallback?: {
      // native -> web
      [key: string]: (response: { data?: any; error?: string }) => void
    }
    toWeb?: {
      // native -> web
      appForeground?: (data?: any) => void
      appBackground?: (data?: any) => void
      triggerBackBtn?: (data?: any) => void
    }
  }
}

declare module '#app' {
  interface NuxtApp {
    $apiClient: $Fetch & {
      get: (url: string, options?: any) => Promise<any>
      post: (url: string, body?: any, options?: any) => Promise<any>
      put: (url: string, body?: any, options?: any) => Promise<any>
      delete: (url: string, options?: any) => Promise<any>
    }
  }
}
