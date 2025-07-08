// GET /v1/accounts/users/my res
export interface MyUsersAccountsResponse {
  id: number
  name: string
  profileFileId: number
  phoneNumber: string
  nickName: string
}

// User
export interface User {
  id: number
  name: string
  profileFileId: number
  phoneNumber: string
  nickName: string
}
