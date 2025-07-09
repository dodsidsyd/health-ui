<template>
  <BaseBody :show-back-button="true" page-title="개인데이터 이용내역" logo-type="text">
    <FlexColDiv class="gap-20 mt-20">
      <TotalCountTextType :count="7">
        <template #modal-content>
          <div class="condition-box">
            <dl>
              <dt>구분</dt>
              <dd>
                <SegmentedTabs
                  class="division"
                  :tabs="segmentedTabsType"
                  :active-key="activeSegmentedTabType"
                  :columns="3"
                  @tab-change="onSegmentedTabChangeType"
                />
              </dd>
            </dl>
            <dl>
              <dt>기간</dt>
              <dd>
                <SegmentedTabs
                  :tabs="segmentedTabsPeriod"
                  :active-key="activeSegmentedTabPeriod"
                  @tab-change="onSegmentedTabChangePeriod"
                />
              </dd>
            </dl>
          </div>
        </template>
      </TotalCountTextType>
    </FlexColDiv>
    <div>
      <DataDetail title="동의 영수증" date-text="2025.06.01" />
      <DataDetail title="내려받기 영수증" date-text="2025.06.01" />
      <DataDetail title="공유 영수증" date-text="2025.06.01" />
      <DataDetail title="동의 영수증" date-text="2025.06.01" />
      <DataDetail title="내려받기 영수증" date-text="2025.06.01" />
      <DataDetail title="동의 영수증" date-text="2025.06.01" />
      <DataDetail title="동의 영수증" date-text="2025.06.01" />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import TotalCountTextType from '~/components/publishing/common/temp/TotalCountTextType.vue'
import SegmentedTabs, { type SegmentTab } from '~/components/tabbar/SegmentedTabs.vue'
import DataDetail from '~/components/publishing/setting/DataDetail.vue'

const activeSegmentedTabType = ref('segment1')
const activeSegmentedTabPeriod = ref('month1')

const segmentedTabsType = ref<SegmentTab[]>([
  { title: '전체', key: 'segment1' },
  { title: '동의', key: 'segment2' },
  { title: '수집/이용', key: 'segment3' },
  { title: '내려받기', key: 'segment4' },
  { title: '동의변경', key: 'segment5' },
  { title: '공유', key: 'segment6' }
])

const segmentedTabsPeriod = ref<SegmentTab[]>([
  { title: '3개월', key: 'month1' },
  { title: '6개월', key: 'month2' },
  { title: '1년', key: 'month3' }
])

const onSegmentedTabChangeType = (key: string) => {
  activeSegmentedTabType.value = key
}
const onSegmentedTabChangePeriod = (key: string) => {
  activeSegmentedTabPeriod.value = key
}
</script>

<style scoped lang="scss">
.condition-box {
  text-align: left;

  dl {
    dt {
      margin-bottom: 0.6rem;
      font-size: var(--num-12);
    }
    & + dl {
      margin-top: 1.2rem;
    }
  }
}

::v-deep(.segmented-tabs) {
  .tabs-container {
    padding: 0;
  }
  &.division {
    .tabs-container {
      box-sizing: border-box;
      .tab-link {
        border-top-color: transparent;
        &:nth-child(-n + 3) {
          border-top-color: #e2e2e2;
        }
        &.active {
          border-color: #555;
          border-top-color: #555; // active 되면 상단 border도 덮어쓰기
          z-index: 1;
        }
        &:first-child {
          box-sizing: border-box;
          border-bottom-left-radius: 0;
        }
        &:nth-child(3) {
          border-right-width: 0.1rem;
          border-top-right-radius: 0.8rem;
        }
        &:nth-child(4) {
          border-bottom-left-radius: 0.8rem;
        }
        &:nth-child(n + 4) {
          &.active {
            border-top-width: 0.1rem;
          }
        }
        &:last-child {
          border-top-right-radius: 0;
        }
      }
    }
  }
}
</style>
