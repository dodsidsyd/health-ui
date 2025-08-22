<template>
  <div class="family-selection">
    <InputLabelText label="패밀리 선택" :required="true" />
    <div class="member-list">
      <span
        v-for="member in familyMembers"
        :key="member.id"
        class="member-box"
        :class="{ active: selectedMemberId === member.id }"
        @click="selectMember(member.id)"
      >
        <img :src="member.profileImg" :alt="member.name + ' 사진 이미지'" />
        <strong>{{ member.name }}</strong>
      </span>
      <!-- 추가 선택 버튼 -->
      <button type="button" class="add-select-btn" @click="() => (isShowFamilySelectModal = true)">
        <i class="icon" aria-hidden="true"></i>
        <strong>선택</strong>
      </button>
    </div>
    <!-- 패밀리 선택 모달 -->
    <FamilySelectModal
      :is-visible="isShowFamilySelectModal"
      :families="families"
      :selected-family-ids="selectedFamilyIds"
      @close="isShowFamilySelectModal = false"
      @confirm="handleFamilyConfirm"
      @update:selected-family-ids="selectedFamilyIds = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import dummyImage from '~/assets/images/img-community-01.png'
import FamilySelectModal from '~/components/publishing/community/familyCare/FamilySelectModal.vue'

const isShowFamilySelectModal = ref(false)
const selectedMemberId = ref<number | null>(null)
const selectedFamilyIds = ref<string[]>([])

// 타입 정의
interface FamilyMember {
  id: number
  name: string
  relation?: string
  profileImg?: string
}

interface Family {
  id: string
  name: string
  relation: string
  profileImage: string
}

// Props 정의
interface Props {
  initialMembers?: FamilyMember[]
  selectable?: boolean
  showAddButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialMembers: () => [],
  selectable: true,
  showAddButton: true
})

// 더미 데이터
const familyMembers = ref<FamilyMember[]>([
  {
    id: 1,
    name: '김동건',
    relation: '본인',
    profileImg: dummyImage
  },
  {
    id: 2,
    name: '김동건',
    relation: '자녀',
    profileImg: dummyImage
  },
  {
    id: 3,
    name: '김동건',
    relation: '자녀',
    profileImg: dummyImage
  },
  {
    id: 4,
    name: '김동건',
    relation: '자녀',
    profileImg: dummyImage
  },
  {
    id: 5,
    name: '아빠',
    relation: '부모',
    profileImg: dummyImage
  },
  {
    id: 6,
    name: '엄마',
    relation: '부모',
    profileImg: dummyImage
  }
])

// 패밀리 선택 모달용 데이터
const families = ref<Family[]>([
  {
    id: '1',
    name: '김동건',
    relation: '본인',
    profileImage: 'img-community-01.png'
  },
  {
    id: '2',
    name: '김동건',
    relation: '자녀',
    profileImage: 'img-community-01.png'
  },
  {
    id: '3',
    name: '김동건',
    relation: '자녀',
    profileImage: 'img-community-01.png'
  },
  {
    id: '4',
    name: '김동건',
    relation: '자녀',
    profileImage: 'img-community-01.png'
  },
  {
    id: '5',
    name: '아빠',
    relation: '부모',
    profileImage: 'img-community-01.png'
  },
  {
    id: '6',
    name: '엄마',
    relation: '부모',
    profileImage: 'img-community-01.png'
  }
])

// 함수들
const selectMember = (memberId: number) => {
  selectedMemberId.value = memberId
}

const handleFamilyConfirm = (selectedFamilies: Family[]) => {
  selectedFamilyIds.value = selectedFamilies.map(family => family.id)
  isShowFamilySelectModal.value = false
}
</script>

<style lang="scss" scoped>
.family-selection {
  .member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  .member-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    gap: 0.4rem 0;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0.8rem;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      object-fit: cover;
    }

    strong {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
    }
  }

  .add-select-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 0.8rem;
    cursor: pointer;

    .icon {
      display: block;
      position: relative;
      @include mixin.rippleEffectPrimary;
      border-radius: 50%;
      overflow: hidden;
      width: 4rem;
      height: 4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='19.5' fill='white'/%3E%3Crect x='0.5' y='0.5' width='39' height='39' rx='19.5' stroke='%23E2E2E2'/%3E%3Cpath d='M20 14L20 26M26 20L14 20' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }

    strong {
      font-size: 1.4rem;
      font-weight: 500;
      color: #555;
    }
  }
}
</style>
