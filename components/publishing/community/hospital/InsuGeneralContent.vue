<template>
  <section class="insu-section ml-n20 mr-n20">
    <div class="title-wrap">
      <p class="txt">건강의신 Pick</p>
      <TitleBox
        title="건강을 위한 투자가 필요해요"
        text="30대 여성 김레몬 님을 위해 준비했어요 "
        :center="true"
        class="flex-col"
      />
    </div>
    <div class="link-list">
      <LinkItemInsu
        src="/community/ico-insu-hanwha.svg"
        text="여성에게 꼭 필요한 보장만 실속있게!"
        insu="한화손해보험 여성보험"
      />
      <LinkItemInsu
        src="/community/ico-insu-samsung.svg"
        text="선진 암치료법 기반 고품격 치료 보장"
        insu="삼성생명 신간편암치료보험"
      />
    </div>
  </section>
  <section>
    <TitleBox
      :is-title="true"
      :html-title="`복잡하고 어려운 보험<br/><span class='planner' style='color: #4c7ff7;'>${planner}</span>가 도와드려요`"
    />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="plannerTabs"
        :active-key="activePlannerTab"
        variant="fill-type"
        @tab-change="onBoxTabChange"
        class="pt-20 mb-20"
      />
    </StickyTabsContainer>
    <div>
      <ProfileItem
        v-for="item in plannerItems"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :data="item.data"
        :flow="item.flow"
      />
    </div>
  </section>
  <hr class="hr-section mb-10 ml-n20 mr-n20" />
  <section>
    <TitleBox title="전문가가 알려드려요!" :is-showLink="true" aria-label="전체보기" />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabs"
        :active-key="activeBoxTab"
        variant="fill-type"
        @tab-change="onBoxTabChange2"
        class=""
      />
    </StickyTabsContainer>
    <div class="list">
      <CommItem v-for="item in commList" :key="item.id" :item="item" :type-format="item.type" />
    </div>
    <div class="btn-box">
      <Button element-type="a" href="#" aria-label="전문 설계사에게 질문하기" class="btn-qa" />
    </div>
  </section>
</template>
<script setup lang="ts">
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import Button from '~/components/publishing/Button/Button.vue'
import LinkItemInsu from '~/components/publishing/community/common/LinkItemInsu.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import ProfileItem from '~/components/publishing/community/hospital/ProfileItem.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'
const props = withDefaults(
  defineProps<{
    planner?: string
  }>(),
  {
    planner: '전문 설계사'
  }
)

const plannerTabs = ref<BoxTab[]>([
  { title: '추천', key: 'option0' },
  { title: '대리청구', key: 'option1' },
  { title: '게시글', key: 'option2' },
  { title: '답변', key: 'option3' }
])
const activePlannerTab = ref('option0')

const onBoxTabChange = (key: string) => {
  activePlannerTab.value = key
}

const boxTabs = ref<BoxTab[]>([
  { title: '내 또래의 질문', key: 'option0' },
  { title: '조회순', key: 'option1' },
  { title: '최신순', key: 'option2' }
])
const activeBoxTab = ref('option0')

const onBoxTabChange2 = (key: string) => {
  activePlannerTab.value = key
}

const plannerItems = [
  { id: 1, name: '양정환 설계사', level: 6, data: '삼성생명/7년차' },
  { id: 2, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 3, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 4, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 5, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 6, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 7, name: '양정환 설계사', level: 6, data: '삼성생명/7년차', flow: 1111 },
  { id: 8, name: '양정환 설계사', level: 6, data: '', flow: 1111 }
]

const commList = [
  {
    id: 1,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    comments: [
      {
        id: 101,
        authorImageUrl: '/community/img-rank-profile.png',
        author: '황재근 설계사',
        text: '저도 궁금해요',
        level: 6,
        dateNum: '2시간',
        isExpert: true
      }
    ]
  },
  {
    id: 2,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 3,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 4,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 5,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 6,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  },
  {
    id: 7,
    cate: [
      { label: '스마트링', type: 'blue' },
      { label: '자유게시판', type: '' }
    ],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 3,
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간'
  }
]
</script>
<style scoped lang="scss">
.insu-section {
  background: #dbe5fd;
  .title-wrap {
    padding-top: 3.2rem;
  }
  .txt {
    margin-bottom: 0.8rem;
    text-align: center;
    font-weight: 500;
    line-height: 2.2rem;
    color: #4c7ff7;
  }
}
.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 2rem 3.2rem;
}
.btn-box {
  padding-top: 2rem;
  border-top: 1px solid #eee;
}
</style>
