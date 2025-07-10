<template>
  <div class="news-section">
    <TitleBox class="mt-32" title="도움되는 뉴스" />

    <div class="news-list">
      <FlexRowDiv class="flex flex-row gap-12">
        <NewsItem
          :is-show-img="true"
          :is-col-link="true"
          src="community/img-news-01.png"
          news-cate="네이트"
          news-text="위고비의 효능과 부작용 에 대해서 알아봐요"
        />
        <NewsItem
          :is-show-img="true"
          :is-col-link="true"
          src="community/img-news-02.png"
          news-cate="헬스조선"
          news-text="체중관리에서 중요한 원칙 3가지 균형잡힌 체중관리체중관리에서 중요한 원칙 3가지 균형잡힌 체중관리"
        />
      </FlexRowDiv>
      <NewsItem
        news-cate="헬스조선"
        news-text="‘적게 먹고 많이 움직여라' 통계로 보는 다이어트‘적게 먹고 많이 움직여라' 통계로 보는 다이어트"
      />
      <NewsItem
        newsCate="뷰어스"
        news-text="채소라고 무조건 좋은것은 아니다. 체질별로 주의 채소라고 무조건 좋은것은 아니다. 체질별로 주의"
      />
    </div>

    <Button btn-type="line" element-type="a" href="#"
      ><template #default> 더 많은 <strong>체중관리</strong> 정보 보러가기 </template></Button
    >
  </div>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
// import FlexColDiv from '~/components/page/FlexColDiv.vue'
// import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
import NewsItem from '~/components/publishing/community/competitive/NewsItem.vue'

const ariaLabel = `<strong>체중관리</strong>`
</script>
