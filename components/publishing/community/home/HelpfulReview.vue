<template>
  <div :class="['helpful-review-card', customClass]">
    <FlexColDiv class="gap-4">
      <div class="profile-info">
        <div class="profile-img"><img :src="profileImgPath" alt="" /></div>
        <div class="profile-detail">
          <FlexRowDiv class="gap-4 align-center">
            <strong class="nickanme">{{ nickname }}</strong>
            <span class="level">Lv.{{ level }}</span>
          </FlexRowDiv>
          <span class="cate">{{ cate }}</span>
        </div>
      </div>
      <StarRating :scope="scope" />
      <strong class="review-title">{{ reviewTitle }}</strong>
      <p class="review-text">{{ reviewText }}</p>
    </FlexColDiv>
    <FlexColDiv classs="btn-box" :type="type">
      <Button :aria-label="`${ariaLabel}`" class="btn-community" />
      <NuxtLink :to="to" :class="['banner-box', dynamicBannerClass]">
        <strong class="banner-title">{{ bannerTitle }}</strong>
        <p v-html="bannerText" class="banner-text"></p>
      </NuxtLink>
    </FlexColDiv>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import Button from '~/components/publishing/button/Button.vue'
import StarRating from '~/components/publishing/community/common/StarRating.vue'

const props = withDefaults(
  defineProps<{
    type: string
    to?: string
    profileImage: string
    customClass: string
    scope: string
    reviewTitle: string
    reviewText: string
    ariaLabel?: string
    bannerTitle?: string
    bannerText?: string
    dynamicBannerClass: string
    nickname: string
    level: number
    cate: string
  }>(),
  {
    to: '#',
    profileImg: '',
    ariaLabel: '',
    bannerTitle: '',
    bannerText: ''
  }
)

const IMAGE_BASE_PATH = '/_nuxt/assets/images'

const profileImgPath = computed(() => {
  if (props.profileImage) {
    return `${IMAGE_BASE_PATH}/${props.profileImage}`
  }
  return ''
})

// 'banner-' + type 형태로 클래스 생성
const dynamicBannerClass = computed(() => {
  return `banner-${props.type}`
})
</script>
<style scoped lang="scss">
.helpful-review-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.4rem 2rem;
  margin: 2rem 1rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.04);
  .profile-info {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .profile-img {
    overflow: hidden;
    width: 3.2rem;
    height: 3.24rem;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile-detail {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    .nickname {
      display: block;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
      color: #555;
    }
    .level {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2rem;
      color: #959595;
    }
    .cate {
      display: block;
      font-size: 1.3rem;
      font-weight: 500;
      line-height: 1.8rem;
      color: #4c7ff7;
    }
  }
  .banner-box {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    overflow: hidden;
    padding: 1.6rem 2rem;
    border-radius: 1.2rem;
    &.banner-smartring {
      background: #fde999 url('~/assets/images/community/home/ico-smartring.svg') no-repeat right center;
    }
    &.banner-walkking {
      background: #d1ddf5 url('~/assets/images/community/home/ico-walkking.svg') no-repeat right center;
    }
    &.banner-claimmaster {
      background: #e6e4df url('~/assets/images/community/home/ico-claimmaster.svg') no-repeat right center;
    }
    &.banner-lemonhealth {
      background: #eeeeee url('~/assets/images/community/home/ico-lemonhealth.svg') no-repeat right center;
    }
    .banner-title {
      line-height: 2.2rem;
    }
    .banner-text {
      font-size: 1.4rem;
      width: 70%;
      min-height: 6rem;
      font-weight: 400;
      line-height: 2rem;
      color: #555;
    }
  }
  .star-rating-box {
    padding: 0.7rem 0;
  }
  .review-title {
    display: block;
    line-height: 2.2rem;
    color: #555;
  }
  .review-text {
    @include mixin.multi-ellipsis(3);
  }
  .btn-community {
    margin: 1.6rem 0;
  }
}

@media (max-width: 375px) {
  .helpful-review-card {
    .banner-box {
      .banner-text {
        display: flex;
        align-items: center;
        width: 70%;
        min-height: 6rem;
      }
    }
    .btn-community {
      margin: 1.6rem 0;
      :deep(.text) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
