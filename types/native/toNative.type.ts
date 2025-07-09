export interface ToNative {
  callNative<T = any>(command: NativeCommand): Promise<NativeResponse<T>>
}

// 네이티브 명령 형식
export interface NativeCommand {
  type: 'command'
  functionType: string
  version?: number
  requestId?: string // 고유 요청 ID
  callbackFn?: string // 동적 콜백 함수 이름
  value?: Record<string, any>
}

// 네이티브 응답 형식
export interface NativeResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// 지원할 액션 타입 (functionType)
export enum NativeFunctionType {
  NATIVE_BROWSING_WITH_URL = 'nativeBrowsingWithUrl', // 시스템에 설치된 웹 브라우저로 로딩
  POP_UP_BROWSING = 'popUpBrowsing', // 팝업 웹 브라우징
  OPEN_APP_SETTINGS = 'openAppSettings', // 앱 설정 열기
  EXIT = 'exit' // 앱 종료
}
