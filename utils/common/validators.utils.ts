import dayjs from 'dayjs'
import { INPUT_VALIDATION_PATTERNS } from '~/constants/input.constants'

export const isValidEmail = (email: string): boolean => {
  const emailRegex = INPUT_VALIDATION_PATTERNS.EMAIL
  return emailRegex.test(email)
}

export const isValidFullEmail = (email: string): boolean => {
  const emailRegex = INPUT_VALIDATION_PATTERNS.FULL_EMAIL
  return emailRegex.test(email)
}

export const isValidUrl = (url: string): boolean => {
  const urlRegex = INPUT_VALIDATION_PATTERNS.URL
  return urlRegex.test(url)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = INPUT_VALIDATION_PATTERNS.PHONE_NUMBER
  return phoneRegex.test(phone)
}

export const isValidName = (name: string): boolean => {
  const nameRegex = INPUT_VALIDATION_PATTERNS.NAME
  return nameRegex.test(name)
}

export const isValidBirth = (birth: string): boolean => {
  const birthRegex = INPUT_VALIDATION_PATTERNS.BIRTH
  return birthRegex.test(birth)
}

export const isValidVerifyCode = (verifyCode: string): boolean => {
  const verifyCodeRegex = INPUT_VALIDATION_PATTERNS.VERIFY_CODE
  return verifyCodeRegex.test(verifyCode)
}

export const isValidId = (id: string): boolean => {
  const idRegex = INPUT_VALIDATION_PATTERNS.ID
  return idRegex.test(id)
}

export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = INPUT_VALIDATION_PATTERNS.NICKNAME
  return nicknameRegex.test(nickname)
}

/*
 * 핸드폰 번호 - 자동 입력
 * */
export const toHyphenPhoneNumber = (str: string) => {
  if (!str) {
    return ''
  }

  return str
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(-{1,2})$/g, '')
}

/*
 * 대소문자 포함 여부
 * */
export const hasUpperAndLowerCase = (str: string): boolean => {
  if (!str) {
    return false
  }
  return /(?=.*[a-z])(?=.*[A-Z])/.test(str)
}

/*
 * 대문자 또는 소문자 포함 여부
 * */
export const hasUpperOrLowerCase = (str: string): boolean => {
  if (!str) {
    return false
  }
  return /[a-zA-Z]/.test(str)
}

/*
 * 특수문자 포함 여부
 * */
export const hasSpecialCharacter = (str: string): boolean => {
  if (!str) {
    return false
  }
  return /[^a-zA-Z0-9]/.test(str)
}

/*
 * 사용자 지정 특수문자 포함 여부
 * */
export const hasCustomSpecialCharacter = (characters: string, str: string): boolean => {
  if (!characters || !str) {
    return false
  }

  // 특수문자를 정규식에 안전하게 넣기 위해 이스케이프 처리
  const escaped = characters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(`[${escaped}]`)

  return regex.test(str)
}

/*
 * 사용자 지정 특수문자만을 포함하는지 여부
 * */
export const hasOnlyCustomSpecialCharacter = (characters: string, str: string): boolean => {
  if (!characters || !str) {
    return false
  }

  // 특수문자를 정규식에 안전하게 넣기 위해 이스케이프 처리
  const escaped = characters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(`^[${escaped}]+$`)

  return regex.test(str)
}

/*
 * 영어 포함 여부
 * */
export const hasEnglish = (str: string): boolean => {
  return /[a-zA-Z]/.test(str)
}

/*
 * 한글 포함여부
 * */
export const hasKorean = (str: string): boolean => {
  return /[^ㄱ-ㅎ가-힣ㅏ-ㅣ]/.test(str)
}

/*
 * 숫자 포함여부
 * */
export const hasNumber = (str: string): boolean => {
  return /\d/.test(str)
}

/*
 * 문자열 중 숫자만 있는지 확인
 * */
export const isOnlyNumbers = (str: string): boolean => {
  if (!str) {
    return false
  }
  return /^\d+$/.test(str)
}

/*
 * 문지열 중 숫자만 리턴
 * */
export const toOnlyNumbers = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/\D/g, '')
}

/**
 * 문자열 중 한글만 리턴
 */
export const toOnlyKorean = (str: string) => {
  if (!str) {
    return ''
  }
  return str.replace(/[^ㄱ-ㅎ가-힣ㅏ-ㅣ]/g, '')
}

/**
 * 문자열 중 한글만 있는지 여부
 */
export const isOnlyKorean = (str: string) => {
  if (!str) {
    return ''
  }
  return /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/.test(str)
}

/**
 * 주민등록번호 유효성 검사
 * 주민번호 뒷자리 지역 번호가 2020년 10월부터 폐지되었음. 2020년 10월 이후 주민등록번호는 검증 X
 * 참고: https://helpdesk.heumtax.com/31193e52-b397-4e89-95b2-8d14f639b342
 */
export const isValidResidentNumber = (frontNumber: string | number, backNumber: string | number): boolean => {
  if (!frontNumber || !backNumber) {
    return false
  }

  const digits = frontNumber.toString() + backNumber.toString()

  const gender = parseInt(digits[6], 10)
  const month = parseInt(digits.slice(2, 4), 10)
  const day = parseInt(digits.slice(4, 6), 10)
  let yearPrefix = null

  if ([1, 2, 5, 6].includes(gender)) {
    yearPrefix = 1900
  } else if ([3, 4, 7, 8].includes(gender)) {
    yearPrefix = 2000
  }

  if (yearPrefix === null) {
    return false
  }

  const year = yearPrefix + parseInt(digits.slice(0, 2), 10)

  // 태어난해가 현재보다 클 수 없음 (890512-4647913 같이 입력한 경우, 2089년이 되므로 걸러낸다.)
  if (year > dayjs().year()) {
    return false
  }

  // 성별코드와 출생년도 모순 검사
  if (year >= 2000 && [1, 2, 5, 6].includes(gender)) {
    return false
  }
  if (year < 2000 && [3, 4, 7, 8].includes(gender)) {
    return false
  }

  // 2020년 10월 31일 이후 주민번호는 검증 제외
  if (dayjs(`${year}-${month}-${day}`).isAfter(dayjs('2020-10-31'))) {
    console.warn('2020년 10월 이후 주민번호는 검증 불가')
    return false
  }

  // 앞 12자리에 가중치를 곱한 값을 모두 더한다.
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
  let sum = 0

  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i], 10) * weights[i]
  }

  const checkDigit = (11 - (sum % 11)) % 10

  return checkDigit === parseInt(digits[12], 10)
}
