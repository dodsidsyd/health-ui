<template>
  <BaseBody page-title="친구 초대하기" :has-close-btn="true" style="background-color: #f4f4f4">
    <FlexColDiv class="gap-12 ml-n20 mr-n20 pd-20y">
      <FriendsCheckBox id="checkBox1" v-model="checkboxes[0]" :friends-steps="250000" :target-steps="500000" />
      <FriendsCheckBox id="checkBox2" v-model="checkboxes[1]" />
      <FriendsCheckBox id="checkBox3" v-model="checkboxes[2]" :friends-steps="450000" :target-steps="500000" />
      <FriendsCheckBox id="checkBox4" v-model="checkboxes[3]" />
      <FriendsCheckBox id="checkBox5" v-model="checkboxes[4]" :friends-steps="550000" :target-steps="500000" />
      <FriendsCheckBox id="checkBox6" v-model="checkboxes[5]" />
      <FriendsCheckBox id="checkBox6" v-model="checkboxes[6]" :friends-steps="0" :target-steps="500000" />
      <FriendsCheckBox id="checkBox6" v-model="checkboxes[7]" />
    </FlexColDiv>
    <ButtonGroup asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="취소" class="lg btn-sticky" />
      <Button btn-type="primary" element-type="button" aria-label="초대하기" class="lg btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FriendsCheckBox from '~/components/publishing/walkking/FriendsCheckBox.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
const checkboxes = ref(Array(8).fill(false))
</script>

<style scoped lang="scss"></style>
