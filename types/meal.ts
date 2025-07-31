// 음식 아이템 타입 정의
export interface FoodItem {
  id?: string | number
  name: string
  quantity: number | string
  weight: number
  calories: number
}

// 식사 타입 정의
export type MealType = 
  | 'breakfast' 
  | 'morning-snack' 
  | 'lunch' 
  | 'afternoon-snack' 
  | 'dinner' 
  | 'night-snack'

// 식사 계획 타입 정의
export interface MealPlan {
  type: MealType
  title?: string
  iconClass?: string
  foods: FoodItem[]
}

// 기본 아이콘 매핑
export const DEFAULT_ICON_MAP: Record<MealType, string> = {
  'breakfast': 'ico-sun',
  'morning-snack': 'ico-apple',
  'lunch': 'ico-sunSet',
  'afternoon-snack': 'ico-coffee',
  'dinner': 'ico-crescent',
  'night-snack': 'ico-bat'
}

// 기본 제목 매핑
export const DEFAULT_TITLE_MAP: Record<MealType, string> = {
  'breakfast': '아침식사',
  'morning-snack': '오전 간식',
  'lunch': '점심식사',
  'afternoon-snack': '오후 간식',
  'dinner': '저녁식사',
  'night-snack': '야간 간식'
}
