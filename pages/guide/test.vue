<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="flex flex-col gap-16 mt-24">
      <h1 class="c-tit">
        <span class="text"> 주소를 입력해 주세요 </span>
        <!-- ToDo: 사인 해야 하는 페이지일때 제목 -->
        <!-- <span class="text">
          본인 자필 서명을 입력해 주세요
        </span> -->
      </h1>
      <div class="c-tit-sub">기본정보는 실손청구가 처음인 경우만 입력해요.</div>
    </div>
    <div class="flex flex-col gap-12 mt-40">
      <!-- 🖐️ 서명 부분 시작 🖐️ -->
      <div style="position: relative; display: inline-block; height: 260px">
        <img
          v-if="src"
          :src="src"
          alt="signature"
          style="height: 200px; width: 100%; border: 1px solid gainsboro; touch-action: none"
        />
        <div v-else-if="!src" class="wrap-signature">
          <div class="input-tit">본인 자필 서명</div>
          <canvas
            ref="canvas"
            width="500"
            height="200"
            style="height: 200px; touch-action: none; border-radius: 0.8rem; border: 0.1rem solid #e2e2e2"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            @touchcancel="touchCancel"
          ></canvas>
          <div ref="placeholder" style="position: absolute; width: 100%; top: 21px; pointer-events: none">
            <div class="wrap-signature-square">손가락으로 직접<br />여기에 서명해 주세요.</div>
          </div>
          <div class="input-desc">
            자필 서명을 위조해서 입력하는 경우 관련 법률에 의거 법적 처벌을 받을 수 있습니다.
          </div>
        </div>
      </div>
      <!-- 🖐️ 서명 부분 끝 🖐️ -->

      <!--      <div class="wrap-signature">-->
      <!--        <div class="input-tit">본인 자필 서명</div>-->
      <!--        <div class="wrap-signature-square">손가락으로 직접<br />여기에 서명해 주세요.</div>-->
      <!--        <div class="input-desc">자필 서명을 위조해서 입력하는 경우 관련 법률에 의거 법적 처벌을 받을 수 있습니다.</div>-->
      <!--      </div>-->
      <Select
        label="직업"
        class="require"
        modal-title="직업"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '직장인', label: '직장인' },
          { value: '공무원', label: '공무원' },
          { value: '전문직', label: '전문직' },
          { value: '자영업자', label: '자영업자' },
          { value: '주부', label: '주부' },
          { value: '초・중고생', label: '초・중고생' },
          { value: '기타', label: '기타' }
        ]"
      />
      <Select
        label="의료급여 수급권자"
        class="require"
        modal-title="의료급여 수급권자"
        :is-show-cancel-button="false"
        :custom-opts="[
          { value: '해당없음', label: '해당없음' },
          { value: '1종 또는 2종', label: '1종 또는 2종' }
        ]"
      />
      <InputAddress label="주소" :is-valid="false" class="require" placeholder="주소를 검색해주세요" />
      <InputText
        label="이름"
        :is-valid="false"
        class="require"
        valid-text="성과 이름을 입력해주세요."
        placeholder="이름을 입력해주세요."
      />
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="확인" class="lg w-full medium btn-sticky">
      확인
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'

const isShowModal = ref(false)

const movePage = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickDiff = () => {
  movePage()
}

const clickSame = () => {
  movePage()
}

const clickNext = () => {
  // 사진찍어 청구: 피보험자, 수익자 동일인 여부 모달 띄우기
  isShowModal.value = true
  // 그외
  // return navigateTo('/insu/claim/inputAccidentData')
}

// ===== 서명부분 로직 ======
const src = ref('')

const canvas = ref()
const ctx = ref()
const startX = ref(0)
const startY = ref(0)
const drawing = ref(false)

const placeholder = ref<HTMLElement | null>(null)

// placeholder 부분 보이지 않게 처리
const hidePlaceholder = () => {
  if (placeholder.value) {
    placeholder.value.style.display = 'none'
  }
}

const getTouchPos = (e: TouchEvent) => {
  const touch = e.touches[0] || e.changedTouches[0]
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height

  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY
  }
}

const touchStart = (e: TouchEvent) => {
  e.preventDefault()
  const pos = getTouchPos(e)
  startX.value = pos.x
  startY.value = pos.y
  drawing.value = true
}

const touchMove = (e: TouchEvent) => {
  if (!drawing.value) return

  hidePlaceholder()

  const pos = getTouchPos(e)
  draw(pos.x, pos.y)

  startX.value = pos.x
  startY.value = pos.y
}

const touchEnd = async (e: TouchEvent) => {
  drawing.value = false

  // 이미지로 만들기
  const img = await getCanvasBlob()
  console.log('이미지', img)
  // emit('get-signature', e)
}

const touchCancel = (e: TouchEvent) => {
  drawing.value = false
}

// 선그리기: startX, startY부터 입력받은 curX, curY 까지로 선을 그린다.
const draw = (curX: number, curY: number) => {
  ctx.value.beginPath()
  ctx.value.moveTo(startX.value, startY.value)
  ctx.value.lineTo(curX, curY)
  ctx.value.stroke()
}

const getCanvasBlob = async (): Promise<Blob> => {
  return new Promise(resolve => {
    canvas.value.toBlob((blob: any) => {
      if (blob) resolve(blob)
    }, 'image/png') // 'image/jpeg' 도 가능
  })
}

// canvas 초기값 설정
const setCanvasInitial = () => {
  ctx.value = canvas.value.getContext('2d')
  ctx.value.fillStyle = 'white'
  ctx.value.lineWidth = 2
  ctx.value.fillRect(0, 0, 500, 500)
}

onMounted(() => {
  if (import.meta.client) {
    setCanvasInitial()
  }
})
// ========================
</script>

<style scoped lang="scss">
.wrap-signature {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  .input-tit {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.3;
    color: #555555;
    position: relative;
    &::after {
      content: '*';
      font-size: 1.2rem;
      display: inline-block;
      margin-left: 0.3rem;
      color: #f14960;
    }
  }
  .wrap-signature-square {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7.7rem 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #e2e2e2;
    background-color: #f4f4f4;
    font-size: 1.6rem;
    font-weight: 500;
    color: #959595;
    text-align: center;
  }
  .input-desc {
    font-size: 1.3rem;
    font-weight: 400;
    color: #959595;
  }
}
</style>
