## 커뮤니티 화면 경로 설명

| no. | 경로                                                     | 설명                                    |
|-----|--------------------------------------------------------|---------------------------------------|
| 1   | /community/home/index.vue                              | 커뮤니티 홈 메인                             |
| 2   | /community/explore/index.vue                           | 커뮤니티 둘러보기                             |
| 3   | /community/diary/index.vue                             | 마음일기 메인                               |
| 4   | /community/diary/list.vue                              | 마음일기 전체 목록                            |
| 5   | /community/diary/create.vue                            | 마음일기 생성화면                             |
| 6   | /community/diary/emojiPicker.vue                       | 마음일기 이모지선택                            |
| 7   | /community/diary/[diaryId]/index.vue                   | 마음일기 상세화면                             |
| 8   | /community/diary/[diaryId]/edit.vue                    | 마음일기 수정화면                             |
| 9   | /community/familycare/index.vue                        | 패밀리케어 메인                              |
| 10  | /community/familycare/invitation.vue                   | 패밀리케어 초대장                             |
| 11  | /community/familycare/talk/[familyGroupId].vue         | 패밀리케어 패밀리 대화                          |
| 12  | /community/familycare/setting/group.vue                | 패밀리케어 그룹관리                            |
| 13  | /community/familycare/setting/member.vue               | 패밀리케어 멤버목록/관리                         |
| 14  | /community/familycare/homework/index.vue               | 패밀리케어 패밀리숙제 메인                        |
| 15  | /community/familycare/homework/add.vue                 | 패밀리케어 패밀리숙제 추가                        |
| 16  | /community/familycare/homework/my.vue                  | 패밀리케어 패밀리숙제 내가만든숙제                    |
| 17  | /community/familycare/homework/[homeworkId]/index.vue  | 패밀리케어 패밀리숙제 숙제 상세                     |
| 18  | /community/familycare/schedule/index.vue               | 패밀리케어 패밀리일정                           |
| 19  | /community/familycare/schedule/add.vue                 | 패밀리케어 패밀리일정 등록                        |
| 20  | /community/[communityId]/news.vue                      | 커뮤니티 도움되는 뉴스                          |
| 21  | /community/[communityId]/ranking.vue                   | 커뮤니티 랭킹 top30/My ranking              |
| 22  | /community/[communityId]/type/[type]                   | 커뮤니티 타입별 커뮤니티 상세(경쟁형/병원형/청구의신형) 전용 화면 |
| 23  | /community/[communityId]/board/[boardId]               | 게시글 목록(게시판 상세)                        |                 
| 24  | /community/[communityId]/board/[boardId]/create        | 게시판 내 새 글 작성(게시글 생성) 화면               |
| 25  | /community/[communityId]/board/[boardId]/[postId]      | 게시글 상세 보기                             |
| 26  | /community/[communityId]/board/[boardId]/[postId]/edit | 게시글 수정 화면                             |


* ex. **[slug]** 경로 개발화면 진입 예시 - No.22
  * 경쟁형 http://localhost:3000/ui/mobile/community/1/type/competition
  * 병원형 http://localhost:3000/ui/mobile/community/1/type/hospital
  * 청구의신형 http://localhost:3000/ui/mobile/community/1/type/insu


#### 트리맵
```tree
/community
├── home/
│   └── index.vue                # 커뮤니티 홈 메인
├── explore/
│   └── index.vue                # 커뮤니티 둘러보기
├── diary/
│   ├── index.vue                # 마음일기 메인
│   ├── list.vue                 # 마음일기 전체 목록
│   ├── create.vue               # 마음일기 생성화면
│   ├── emojiPicker.vue          # 마음일기 이모지선택
│   ├── [diaryId]/
│   │   ├── index.vue            # 마음일기 상세화면
│   │   └── edit.vue             # 마음일기 수정화면
├── familycare/
│   ├── index.vue                # 패밀리케어 메인
│   ├── invitation.vue           # 패밀리케어 초대장
│   ├── talk/
│   │   └── [familyGroupId].vue  # 패밀리케어 패밀리 대화
│   ├── setting/
│   │   ├── group.vue            # 패밀리케어 그룹관리
│   │   └── member.vue           # 패밀리케어 멤버목록/관리
│   ├── homework/
│   │   ├── index.vue            # 패밀리케어 숙제 메인
│   │   ├── add.vue              # 패밀리케어 숙제 추가
│   │   ├── my.vue               # 패밀리케어 내가만든숙제
│   │   └── [homeworkId]/
│   │       └── index.vue        # 패밀리케어 숙제 상세
│   └── schedule/
│       ├── index.vue            # 패밀리케어 일정
│       └── add.vue              # 패밀리케어 일정 등록
├── [communityId]/
│   ├── news.vue                 # 커뮤니티 도움되는 뉴스
│   ├── ranking.vue              # 커뮤니티 랭킹 top30/My ranking
│   ├── type/
│   │   └── [type].vue           # 커뮤니티 타입별 상세(병원형/정보형/경쟁형)
│   └── board/
│       └── [boardId]/
│           ├── index.vue        # 게시글 목록(게시판 상세)
│           ├── create.vue       # 게시글 생성
│           └── [postId]/
│               ├── index.vue    # 게시글 상세
│               └── edit.vue     # 게시글 수정
...
```