export interface BaseImage {
  src: string
  alt: string
}

export interface CommunityUser {
  id: number
  nickName: string
  name: string
  profileImg: BaseImage
}

export interface EnergyRankUser extends CommunityUser {
  rank: number
  point: number
}

export interface CompetitionTitleCard {
  id: number
  category: string
  title: string
  description: string
  memberCount: number
  bottomImg: BaseImage
  energyRankingTop3List: EnergyRankUser[]
  currentUserEnergyRank: number
}

export interface DiaryEmoji extends BaseImage {
  title: string
}

export interface DiaryItem {
  id: number
  content: string
  registerDate: string
  emoji: DiaryEmoji
}

export type DiaryViewType = 'list' | 'calendar'

export interface HospitalTitleCard {
  id: number
  title: string
  subTitle: string
  description: string
  memberCount: number
  logoImg: BaseImage
  bottomImg?: BaseImage
}

export interface CommunityContentCategory {
  id: number
  title: string
  value: string
}

export interface HospitalCommunityInfo extends HospitalTitleCard {
  notification: NotificationBox
  shortcutCards: HospitalShortCutCard[]
  hospitalUrl: string
  chatId: string
}

export interface CommunityContent {
  id: number
  title: string
  content: string
  authorUserType: string
  thumbnail?: BaseImage
  category: string
  likeCount: number
  viewCount: number
  commentCount: number
  registerDate: string
}

export interface DirectButton {
  buttonText: string
  buttonAppendText: string
  buttonLink: string
  prependIcon: string
}

export interface DirectButtonGroup {
  grow: boolean
  cols: number
  items: DirectButton
}

export interface NotificationBox {
  prependIcon: string
  headTitle: string
  content: string
}

export interface HospitalShortCutCard {
  id: number
  title: string
  subTitle: string
  buttonText: string
}

export type CommunitySortType =
  | 'registerDate'
  | 'viewCount'
  | 'likeCount'
  | 'commentCount'

export interface CommunityContentSearchTerms {
  id?: number
  category?: string
  startDate?: string
  endDate?: string
  sortType?: CommunitySortType
}
