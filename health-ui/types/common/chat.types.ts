export type MESSAGE_TYPE = 'TEXT' | 'EXIT_JOIN' | 'IMAGE'

export interface LocalChatRoomData {
  id?: number
  name?: string
  profileFileUrls?: string[]
  newMessageCount?: number
  lastMessageId?: string
  lastMessageContents?: string
  lastActiveSendAt?: string
  accountId?: number
  type?: MESSAGE_TYPE
}

export interface LocalChatRooms {
  isNext: boolean
  lastCursor: number | string | null
  data: LocalChatRoomData[]
}

export interface LocalChatMessage {
  id?: string
  accountId?: number
  contents?: string
  createdAt?: string
  readAccountIds?: number[]
  type?: MESSAGE_TYPE
  fileUrls?: string[]
}

// GET /v1/chats/rooms/detail DetailRoomsChatsParams
export interface DetailRoomsChatsParams {
  roomId: number
}

// GET /v1/chats/rooms/detail DetailRoomsChatsResponse
export interface DetailRoomsChatsResponse {
  id: number // 채팅방 고유 번호
  name: string // 채팅방명
  profileFileUrls: string[] // 프로필 파일 url 목록
  newMessageCount: number // 새로운 메세지 수
  lastMessageId: string // 마지막 메세지 ID
  lastMessageContents: string // 마지막 메세지
  lastActiveSendAt: string // 마지막 활동 시간 (예: "2025-05-15 06:06:10" 형식)
  accountId: number // 마지막 메세지 전송계정 고유번호
  type: MESSAGE_TYPE
}

// GET /v1/chats/rooms/cursor CursorRoomsChatsParams
export interface CursorRoomsChatsParams {
  cursor?: number
  limit: number
}

// GET /v1/chats/rooms/cursor CursorRoomsChats
export interface CursorRoomsChats {
  id: number // 채팅방 고유 번호
  name: string // 채팅방명
  profileFileUrls: string[] // 프로필 파일 url 목록
  newMessageCount: number // 새로운 메세지 수
  lastMessageId: string // 마지막 메세지 ID
  lastMessageContents: string // 마지막 메세지
  lastActiveSendAt: string // 마지막 활동 시간 (예: "2025-05-15 06:06:10" 형식)
  accountId: number // 마지막 메세지 전송계정 고유번호
  type: MESSAGE_TYPE
}

// GET /v1/chats/rooms/cursor CursorRoomsChatsResponse
export interface CursorRoomsChatsResponse {
  isNext: boolean // 다음 페이지 여부
  lastCursor: number | string | null
  data: CursorRoomsChats[] // 데이터 목록 (ChatRoom[] 타입)
}

// GET /v1/chats/rooms/count CountRoomsChatsResponse
export interface CountRoomsChatsResponse {
  count: number
}

// GET /v1/chats/rooms/accounts AccountsRoomsChatsParams
export interface AccountsRoomsChatsParams {
  roomId: number
}

// GET /v1/chats/rooms/accounts AccountsRoomsChatsResponse
export interface AccountsRoomsChatsResponse {
  accountId: number
  name: string
}

// POST /v1/chats/rooms/join JoinRoomsChatsBody
export interface JoinRoomsChatsBody {
  roomId: number
}

// POST /v1/chats/rooms/exit ExitRoomsChatsBody
export interface ExitRoomsChatsBody {
  roomId: number
}

// POST /v1/chats/rooms/create CreateRoomsChatsBody
export interface CreateRoomsChatsBody {
  name: string
  profileFileId: number
  accountIds: number[]
}

// POST /v1/chats/rooms/Invitation InvitationRoomsChatsBody
export interface InvitationRoomsChatsBody {
  roomId: number
  accountIds: number[]
}

// GET /v1/chats/rooms/messages/search/page PageSearchMessagesRoomsChatsParams
export interface PageSearchMessagesRoomsChatsParams {
  roomId: number
  keyword: string
  pageNumber: number
  limit: number
}

// GET /v1/chats/rooms/messages/search/page PageSearchMessagesRoomsChats
export interface PageSearchMessagesRoomsChats {
  id: string // 메세지 고유 ID
  accountId: number // 전송자 계정 고유 번호
  contents: string // 메세지 내용
  createdAt: string // 전송일 (예: "2025-05-15 06:06:10" 형식)
  readAccountIds: number[] // 읽은 accountId 목록
  type: MESSAGE_TYPE // 메세지 타입 (Enum 값에 따라 확장 가능)
  fileUrls: string[] // 파일 url 목록 (선택적 필드, 메시지 타입이 IMAGE 등일 경우에만 존재)
}

// GET /v1/chats/rooms/messages/search/page PageSearchMessagesRoomsChatsResponse
export interface PageSearchMessagesRoomsChatsResponse {
  offset: number // 페이지 노출 시작 위치
  limit: number // 페이지 노출 수
  pageNumber: number // 현재 페이지
  totalPageNumber: number // 총 페이지 수
  totalDataCount: number // 총 데이터 수
  isNextPage: boolean // 다음 페이지 여부
  isPrevPage: boolean // 이전 페이지 여부
  data: PageSearchMessagesRoomsChats[] // 데이터 목록
}

// GET /v1/chats/rooms/messages/cursor CursorMessagesRoomsChatsParams
export interface ChatsRoomsMessagesCursorParams {
  roomId: number
  loadDirection?: 'OLD' | 'NEW' // 예시: 메시지 로딩 방향 ('OLD'는 오래된 메시지, 'NEW'는 최신 메시지)
  cursor?: string // 실제 커서 값이 문자열이라고 가정
  limit: number
}

// GET /v1/chats/rooms/messages/cursor CursorMessagesRoomsChats
export interface ChatsRoomsMessagesCursor {
  id: string // 메세지 고유 ID
  accountId: number // 전송자 계정 고유 번호
  contents: string // 메세지 내용
  createdAt: string // 전송일 (예: "2025-05-15 06:06:10" 형식)
  readAccountIds: number[] // 읽은 accountId 목록
  type: MESSAGE_TYPE
  fileUrls: string[] // 파일 url 목록 (선택적 필드, 메시지 타입이 IMAGE 등일 경우에만 존재)
}

// GET /v1/chats/rooms/messages/cursor CursorMessagesRoomsChatsResponse
export interface CursorMessagesRoomsChatsResponse {
  isNextPage: boolean
  lastCursor: number | string | null
  data: ChatsRoomsMessagesCursor[]
}

// GET /v1/accounts/users/my MyUsersAccounts
export interface MyUsersAccountsResponse {
  id: number
  name: string
  profileFileId: number
  phoneNumber: string
  nickName: string
}
