type MinArgs = {
  type: 'min'
  min: number
  password: string
  message?: string
}

type MaxArgs = {
  type: 'max'
  max: number
  password: string
  message?: string
}

type MinMaxArgs = {
  type: 'min-max'
  min: number
  max: number
  password: string
  message?: string
}

/** 대소문자 모두 포함 */
type CaseSensitiveArgs = {
  type: 'case-sensitive'
  password: string
  message?: string
}

/** 대문자 또는 소문자 포함 */
type UpperOrLowerCaseArgs = {
  type: 'upper-lower'
  password: string
  message?: string
}

/** 최소, 최대, 대소문자, 특수문자 포함 */
type StrongPasswordArgs = {
  type: 'strong'
  min: number
  max: number
  password: string
  message?: string
  specialCharacters?: string
}

/** 최소, 최대, 대문자 또는 소문자, 특수문자 포함 */
type NormalPasswordArgs = {
  type: 'normal'
  min: number
  max: number
  password: string
  message?: string
  specialCharacters?: string
}

export type PasswordArgs =
  | MinArgs
  | MaxArgs
  | MinMaxArgs
  | CaseSensitiveArgs
  | UpperOrLowerCaseArgs
  | StrongPasswordArgs
  | NormalPasswordArgs
