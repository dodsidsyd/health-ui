// POST /v1/accounts/verifications req
export interface VerificationsAccountsRequest {
  type: 'SIGN_UP' | 'ADULT' | 'USER_EDIT' | 'FIND_PASSWORD' | 'PRODUCT_PURCHASE' | 'ETC'
  siteUrl: string
  birth: string // YYYY-MM-DD
  gender: 'M' | 'F'
  name: string
  phoneCorp: 'SKT' | 'KTF' | 'LGT' | 'SKM' | 'KTM' | 'LGM'
  phoneNumber: string
  isResend: boolean
  resendTempKey?: string
}

// POST /v1/accounts/verifications res
export interface VerificationsAccountsResponse {
  tempKey: string
}

// POST /v1/accounts/verifications/confirm req
export interface ConfirmVerificationsAccountsRequest {
  tempKey: string
  otp: string
}

// POST /v1/accounts/verifications/confirm res
export interface ConfirmVerificationsAccountsResponse {
  tempKey: string
}

// POST /v1/accounts/users/sing-up req
export interface SignUpUsersAccountsRequest {
  tempKey: string
  uid?: string
  password?: string
  type: 'GENERAL' | 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE'
  socialKey?: string
}

// POST /v1/accounts/users/sing-up res
export interface SignUpUsersAccountsResponse {
  tokenType: string
  accessToken: string
  refreshToken: string
}

// POST /v1/accounts/users/login req
export interface LoginUsersAccountsRequest {
  uid: string
  password: string
}

// POST /v1/accounts/users/login res
export interface LoginUsersAccountsResponse {
  tokenType: string
  accessToken: string
  refreshToken: string
}

// POST /v1/accounts/tokens/refresh req
export interface RefreshTokensAccountsRequest {
  accessToken: Maybe<string>
  refreshToken: Maybe<string>
}

// POST /v1/accounts/tokens/refresh res
export interface RefreshTokensAccountsResponse {
  accessToken: Maybe<string>
  refreshToken: Maybe<string>
}

export type Token = Maybe<string>

// GET /v1/accounts/pushes/detail req
export interface DetailPushesAccountsRequest {
  id: number
}

// GET /v1/accounts/pushes/detail res
export interface DetailPushesAccountsResponse {
  id: number
  title?: string
  message: string
  createdAt: string // yyyy-MM-dd HH:mm:ss
  readAt?: string // yyyy-MM-dd HH:mm:ss
}

// PUSH 이력
export interface AccountPush {
  id: number
  title?: string
  message: string
  createdAt: string // yyyy-MM-dd HH:mm:ss
  readAt?: string // yyyy-MM-dd HH:mm:ss
}

// GET /v1/accounts/pushes/pages req
export interface pagePushesAccountsRequest {
  pageNumber: number
  limit: number
}

// GET /v1/accounts/pushes/pages res
export interface pagePushesAccountsResponse {
  offset: number
  limit: number
  pageNumber: number
  totalPageNumber: number
  totalDataCount: number
  isNextPage: boolean
  isPrevPage: boolean
  data: AccountPush[]
}
