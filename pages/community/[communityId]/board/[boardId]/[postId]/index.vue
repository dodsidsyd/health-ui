<template>
  <BaseBody
    :has-scrap="true"
    :has-share="true"
    page-title="커뮤니티명"
    :show-back-button="true"
    style="background-color: #fefefe"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <PostDetailTitleHeader
      :nickname="'당근먹는다람쥐'"
      :title="'러닝 후 간단히 먹을 수 있는 다이어트 를 위한 저녁식단 추천해요.'"
    />
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import PostDetailTitleHeader from '~/components/publishing/community/board/PostDetailTitleHeader.vue'
</script>
