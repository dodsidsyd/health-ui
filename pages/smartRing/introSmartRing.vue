<template>
  <BaseBody page-title="스마트링 소개" :show-back-button="true">
    <div class="main-visual-wrap">
      <p>스마트한 건강관리의 시작!</p>
      <h2>LeMON 스마트링</h2>
      <!-- <div class="img-wrap"></div> -->
      <h3>
        일상에 편리함과 스타일을<br />
        더해줄 스마트링과 함께<br />
        현재의 건강상태를 파악하고<br />
        <strong>더 나은 내일을 준비</strong>하세요.
      </h3>
    </div>
    <div class="main-feature-wrap">
      <div class="img-wrap"></div>
      <div class="sub-txt">
        <h4>신체데이터 수집・분석을 통한<br /><strong> 건강 인사이트</strong> 제공</h4>
        <p>
          스트레스 지수, 체온, 수면 패턴 분석, 심박 변화 및 혈중 산소포화도까지 일일/주간/월간 활력 점수를 시각화하여
          제공하고 매일매일 활력 강화를 위한 건강 팁을 확인하세요!
        </p>
      </div>
      <div class="banner-wrap">
        <div class="banner-box">
          <img src="~/assets/images/smartRing/ico-feather.png" alt="" />
          <div>
            <p>단단하지만 더 가볍게</p>
            <span>2.9g 초소형 스마트 기술</span>
          </div>
        </div>
        <div class="banner-box">
          <img src="~/assets/images/smartRing/ico-heart-beep.png" alt="" />
          <div>
            <p>보다 더욱 섬세하게</p>
            <span>심박수/혈중산도 모니터링</span>
          </div>
        </div>
        <div class="banner-box">
          <img src="~/assets/images/smartRing/ico-battery.png" alt="" />
          <div>
            <p>일주일간 걱정없이</p>
            <span>1회 충전 후, 최대 6일 사용</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-detail-wrap">
      <div class="sub-txt">
        <h4>
          LeMON 스마트링은 <br /><strong>24시간, 365일</strong><br />
          당신의 건강을 살펴봅니다.
        </h4>
      </div>
      <div class="card-wrap">
        <div class="card-box function1">
          <p class="card-tit">심박수를 체크해요</p>
          <p class="card-txt">
            심박수와 심박변이도(HRV)를<br />
            바라보며 질병 또는 스트레스 상황을<br />
            체크해요.
          </p>
        </div>
        <div class="card-box function2">
          <p class="card-tit">
            산소포화도에<br />
            집중해요
          </p>
          <p class="card-txt">
            호흡기능 유지에 집중하여<br />
            실시간으로 저산소혈증을 확인해요.
          </p>
        </div>
        <div class="card-box function3">
          <p class="card-tit">운동 강도를<br />조절해요</p>
          <p class="card-txt">
            당신의 움직임을 체크하고<br />
            심박수, 운동 자각도를 활용하여 <br />
            적절한 운동강도를 안내합니다.
          </p>
        </div>
      </div>
    </div>
    <div class="main-functions-wrap">
      <div class="sub-txt">
        <h4>
          건강의 신과 스마트링의 콜라보로<br />보다 <strong>스마트한 건강관리</strong>를<br />
          만나보세요
        </h4>
      </div>
      <div class="swiper-box">
        <CommonSwiper
          :slides="smartRingFeaturesSlides"
          slide-type="custom"
          :slides-per-view="1.81"
          :space-between="12"
          :navigation="false"
          :pagination="false"
          :scrollbar="false"
          :autoplay="false"
          :loop="true"
          :show-slide-length="false"
          :show-play-pause-button="false"
        >
          <!-- 스마트링 특징 슬라이드 커스텀 템플릿 -->
          <template #default="{ slide, index }">
            <div class="features-box">
              <div class="content-area">
                <div v-if="slide.image" class="img-wrap">
                  <img :src="slide.image" :alt="slide.title" />
                </div>
                <div class="tit">{{ slide.title }}</div>
                <div class="detail">{{ slide.detail }}</div>
              </div>
            </div>
          </template>
        </CommonSwiper>
      </div>
    </div>
    <div class="main-product-wrap">
      <h4>Product Specification</h4>
      <div class="img-box">
        <img src="~/assets/images/smartRing/img-main-ring01.png" alt="" />
        <img src="~/assets/images/smartRing/img-main-ring02.png" alt="" />
        <img src="~/assets/images/smartRing/img-main-ring03.png" alt="" />
      </div>
      <div class="specification">
        <dl>
          <dt>재질</dt>
          <dd>스테인레스 스틸, 세라믹+실리콘</dd>
        </dl>
        <dl>
          <dt>무게</dt>
          <dd>2.9g (12호 기준)</dd>
        </dl>
        <dl>
          <dt>색상</dt>
          <dd>Silver, Gold, Black</dd>
        </dl>
        <dl>
          <dt>통신</dt>
          <dd>블루투스 5.1 (BLE)</dd>
        </dl>
        <dl>
          <dt>센서</dt>
          <dd>PPG, 온도, 가속도 (3축)</dd>
        </dl>
        <dl>
          <dt>배터리</dt>
          <dd>18 mAh</dd>
        </dl>
        <dl>
          <dt>작동온도</dt>
          <dd>0~50℃</dd>
        </dl>
        <dl>
          <dt>충전</dt>
          <dd>1~1.5시간</dd>
        </dl>
        <dl>
          <dt>최대 대기 시간</dt>
          <dd>8~10일</dd>
        </dl>
        <dl>
          <dt>최대 사용 시간</dt>
          <dd>6일</dd>
        </dl>
      </div>
    </div>
    <ButtonGroup asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="연동하기" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="button" aria-label="구매하기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import smartRingMainSlide01 from '~/assets/images/smartRing/img-main-slide01.png'
import smartRingMainSlide02 from '~/assets/images/smartRing/img-main-slide02.png'
import smartRingMainSlide03 from '~/assets/images/smartRing/img-main-slide03.png'
import smartRingMainSlide04 from '~/assets/images/smartRing/img-main-slide04.png'
import smartRingMainSlide05 from '~/assets/images/smartRing/img-main-slide05.png'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
// 스마트링 특징 슬라이드 커스텀 템플릿
const smartRingFeaturesSlides = ref([
  {
    title: '수면습관',
    detail: '수면패턴분석',
    image: smartRingMainSlide01
  },
  {
    title: '건강 모니터링',
    detail: '실시간 신체 데이터 측정',
    image: smartRingMainSlide02
  },
  {
    title: '활력지수 제공',
    detail: '신체 데이터 수집/분석',
    image: smartRingMainSlide03
  },
  {
    title: '추가 리워드',
    detail: '데일리 건강 미션 수행 시',
    image: smartRingMainSlide04
  },
  {
    title: '보너스 부스터',
    detail: '걷기왕 챌린지 참여',
    image: smartRingMainSlide05
  }
])
</script>

<style scoped lang="scss">
.main-visual-wrap {
  position: relative;
  margin: 0 -2rem;
  padding-top: 6rem;
  height: 61.6rem;
  box-sizing: border-box;
  background: url('~/assets/images/smartRing/img-main01.png') center / cover no-repeat;
  .img-wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  p,
  h2 {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.5rem;
    animation: fadeInUp 0.8s ease-out 0.3s both;
  }
  h2 {
    margin-top: 0.4rem;
    font-size: 3.4rem;
    font-weight: 700;
    line-height: 4.4rem;
    animation: fadeInUp 1.2s ease-out 1s both;
  }
  h3 {
    position: absolute;
    z-index: 5;
    bottom: 0;
    padding: 0 3.2rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    word-break: keep-all;
    animation: fadeInRight 0.8s ease-out 1.6s both;
    strong {
      color: var(--blue-primary);
    }
  }
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20.2rem;
    background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 11.1rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #eaeaea 100%);
  }
}
.main-feature-wrap {
  position: relative;
  margin: 0 -2rem;
  padding-bottom: 6rem;
  background-color: #f4f4f4;
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 11.1rem;
    background: linear-gradient(180deg, #eaeaea 0%, #f4f4f4 100%);
  }

  .img-wrap {
    position: relative;
    z-index: 0;
    width: 100%;
    margin-top: 2rem;
    height: 38rem;
    background: url('~/assets/images/smartRing/img-main02.png') center / 100% no-repeat;
    mix-blend-mode: darken;
  }
  .sub-txt {
    padding: 0 3.65rem;
    background-color: #f4f4f4;
    &::after {
      content: '';
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: 100%;
      right: 0;
      height: 7.8rem;
      background: linear-gradient(0deg, #f4f4f4 0%, rgba(255, 255, 255, 0) 100%);
    }
    h4 {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.4rem;
      strong {
        color: var(--blue-primary);
      }
    }
    p {
      margin-top: 1.2rem;
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: #555;
    }
  }
}
.banner-wrap {
  padding: 4.8rem 2rem 0 2rem;
  background: #f4f4f4;
  box-sizing: border-box;
}
.banner-box {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 1.2rem;
  padding: 3.2rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  &:last-child {
    margin-bottom: 0;
  }
  img {
    width: 8rem;
  }
  p {
    margin-bottom: 0.8rem;
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.6rem;
  }
  span {
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
  }
}
.main-detail-wrap {
  position: relative;
  padding: 6rem 0;
  &::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: -2rem;
    right: -2rem;
    height: 20.2rem;
    background: linear-gradient(180deg, #f4f4f4 0%, rgba(255, 255, 255, 0) 100%);
  }
  .card-wrap {
    margin-top: 3.1rem;
    .card-box {
      height: 44rem;
      padding: 4.1rem 3rem 0 3rem;
      margin-bottom: 1.9rem;
      border-radius: 2rem;
      box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
      overflow: hidden;
      &.function1 {
        background: url('~/assets/images/smartRing/img-main04.png') center bottom / cover no-repeat;
      }
      &.function2 {
        background: url('~/assets/images/smartRing/img-main05.png') center bottom/ cover no-repeat;
      }
      &.function3 {
        background: url('~/assets/images/smartRing/img-main06.png') center bottom/ cover no-repeat;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
    .card-tit {
      margin-bottom: 0.8rem;
      font-size: 3rem;
      font-weight: 700;
      line-height: 3.9rem;
    }
    .card-txt {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.5rem;
    }
  }
}
.sub-txt {
  position: relative;
  z-index: 1;
  padding: 0 1.2rem;
  h4 {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    strong {
      color: var(--blue-primary);
    }
  }
}
.swiper-box {
  margin: 3.2rem -2rem 5rem;
  :deep(swiper-slide) {
    flex-shrink: 0;
  }
  :deep(swiper-slide:first-child) {
    margin-left: 2rem;
  }
  .content-area {
    .img-wrap {
      width: 100%;
    }
    .tit {
      margin-top: 1rem;
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 2.5rem;
    }
    .detail {
      margin-top: 0.4rem;
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.5rem;
      color: #555;
    }
  }
}
.main-product-wrap {
  padding: 6rem 0 4rem;
  h4 {
    margin-bottom: 1.6rem;
    text-align: center;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 11.2rem;
    }
  }
  .specification {
    margin-top: 1.6rem;
    padding: 0 2.8rem;
    dl {
      display: flex;
      justify-content: space-between;
      padding: 1.6rem 0;
      border-bottom: 0.1rem solid #e2e2e2;
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 2.2rem;
      &:last-child {
        border-bottom: none;
      }

      dd {
        color: #555;
      }
    }
  }
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(0.4rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(0.4rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
