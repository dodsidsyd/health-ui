<template>
  <template v-if="typeFormat === 'competitive'">
    <div :class="['card-item', 'card-a', { active: props.activeCard === 'A' }]" @click="emit('click')">
      <div class="card-content">
        <transition name="fade-slide" mode="out-in">
          <div v-if="activeCard === 'A'" key="expanded" class="expanded-content">
            <div class="flex flex-col gap-8">
              <span class="badge">{{ badge }}</span>
              <strong v-html="title" class="tit"></strong>
              <p v-html="text" class="text"></p>
            </div>
            <div>
              <p class="member">
                멤버 <span>{{ memberNumFormat }}명</span>
              </p>
            </div>
          </div>
          <div v-else key="collapsed" class="collapsed-content">
            <strong class="only-title">스마트링 커뮤니티 소개<i class="icon ico-info2"></i></strong>
          </div>
        </transition>
      </div>
    </div>
  </template>
  <template v-else>
    <div :class="['card-item', cardCustomClass]">
      <div class="card-content">
        <div class="flex flex-col gap-8">
          <span class="badge">{{ badge }}</span>
          <strong v-html="title" class="tit"></strong>
          <p v-html="text" class="text"></p>
        </div>
        <div>
          <p class="member">
            멤버 <span>{{ memberNumFormat }}명</span>
          </p>
        </div>
        <div class="img">
          <img :src="cardImg" alt="" />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    typeFormat?: 'competitive' | ''
    cardCustomClass?: string
    badge: string
    title: string
    text: string
    memberNum?: number
    activeCard?: 'A' | 'B'
    src: string
  }>(),
  {
    typeFormat: '',
    cardCustomClass: '',
    memberNum: 1234,
    activeCard: 'A'
  }
)
const emit = defineEmits(['click'])
const memberNumFormat = computed(() => props.memberNum.toLocaleString())

const IMAGE_BASE_PATH = '/_nuxt/assets/images/'

const cardImg = computed(() => {
  if (props.src) {
    return `${IMAGE_BASE_PATH}${props.src}`
  }
  return ''
})
</script>
<style lang="scss" scoped>
.card-item {
  position: relative;
  overflow: hidden;
  border-radius: 2.4rem;
  padding: 3.2rem 2.4rem;
  color: #fff;
  .badge {
    width: max-content;
    padding: 0.3rem 0.6rem;
    border-radius: 0.4rem;
    background: rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
  }
  .tit {
    font-size: 2.4rem;
    line-height: 3.1rem;
  }

  .text {
    font-weight: 500;
    line-height: 2.2rem;
    opacity: 0.8;
    white-space: pre-line;
  }
  .member {
    margin-top: 8.8rem;
    padding-left: 2.6rem;
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.2853 11.003C21.2859 8.96866 20.6832 6.97985 19.5535 5.28805C18.4237 3.59626 16.8177 2.27746 14.9384 1.49843C13.0592 0.719396 10.9911 0.515117 8.99579 0.91143C7.00045 1.30774 5.16743 2.28684 3.72855 3.72492C2.28966 5.163 1.30952 6.99546 0.912076 8.99058C0.514636 10.9857 0.717743 13.0539 1.49571 14.9336C2.27368 16.8133 3.59157 18.42 5.28273 19.5507C6.97389 20.6814 8.96236 21.2852 10.9967 21.2858C12.3475 21.2865 13.6853 21.0211 14.9335 20.5047C16.1818 19.9883 17.316 19.231 18.2715 18.2761C19.227 17.3212 19.9849 16.1873 20.502 14.9394C21.0191 13.6914 21.2853 12.3538 21.2853 11.003Z' fill='white'/%3E%3Cpath d='M11.0826 11C12.5226 11 13.6541 9.86861 13.6541 8.42861C13.6541 6.98861 12.5226 5.85718 11.0826 5.85718C9.64264 5.85718 8.51121 6.98861 8.51121 8.42861C8.51121 9.86861 9.64264 11 11.0826 11ZM15.8655 15.5257C15.1969 12.9029 12.5226 11.2572 9.89978 11.9257C8.15121 12.3886 6.76264 13.7257 6.29978 15.5257C6.24836 15.7829 6.40264 16.0915 6.71121 16.1429C6.76264 16.1429 6.81407 16.1429 6.81407 16.1429H15.3512C15.6598 16.1429 15.8655 15.9372 15.8655 15.6286C15.8655 15.5772 15.8655 15.5257 15.8655 15.5257Z' fill='%236C6C6C'/%3E%3C/svg%3E%0A");
    background-size: 2rem;
    background-repeat: no-repeat;
    background-position: left center;
    font-size: 1.4rem;
    line-height: 2.4rem;

    span {
      font-weight: 700;
    }
  }
  .img {
    position: absolute;
    bottom: 1.6rem;
    right: 2rem;
    width: 12rem;
    height: 12rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
