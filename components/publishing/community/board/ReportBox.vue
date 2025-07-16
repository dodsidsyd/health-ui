<template>
  <FlexSection class="gap-12">
    <FlexColDiv class="gap-8">
      <p class="category-label">신고 유형 선택</p>
      <Radio
        id="rdo1"
        name="rdo6"
        custom-style="button"
        aria-label="욕설이나 비방/혐오의 게시글"
        class="w-full small"
      />
      <Radio
        id="rdo2"
        name="rdo6"
        custom-style="button"
        aria-label="음란하거나 선정적인 내용의 게시글"
        class="w-full small"
      />
      <Radio
        id="rdo3"
        name="rdo6"
        custom-style="button"
        aria-label="광고 목적이거나 스팸, 홍보성 내용의 게시글"
        class="w-full small"
      />
      <Radio
        id="rdo4"
        name="rdo6"
        custom-style="button"
        aria-label="허위 정보/사기/불법 내용 포함된 게시글"
        class="w-full small"
      />
      <Radio id="rdo5" name="rdo6" custom-style="button" aria-label="게시판 주제와 무관한 글" class="w-full small" />
    </FlexColDiv>
    <FlexColDiv class="gap-6">
      <p class="category-label">신고사유 작성(선택)</p>
      <FieldSet :max-length="300" :placeholder="'신고사유를 간략하게 입력해주세요'" />
    </FlexColDiv>
  </FlexSection>
</template>

<script setup lang="ts">
import FlexSection from '~/components/page/FlexSection.vue'
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import Radio from '~/components/publishing/input/radio.vue'
</script>

<style scoped lang="scss">
.category-label {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: left;
  color: #555;
}
</style>
