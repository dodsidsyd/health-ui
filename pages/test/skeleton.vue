<template>
  <div style="width: 100%; display: flex; flex-direction: column; gap: 1rem; padding: 1rem">
    <div style="display: flex">
      <SkeletonAvatar :size="48" color="" :show-icon="true" border-radius="50%" effect="fade" />
      <SkeletonBlock effect="pulse" />
    </div>
    <SkeletonBlock effect="wave" height="120px" />
    <SkeletonBlock effect="pulse" />
    <SkeletonText tag="span" effect="wave" width="400px" height="20px"> some text </SkeletonText>
    <SkeletonImage :width="400" :height="400" />
  </div>
</template>

<script setup lang="ts">
import { SkeletonAvatar, SkeletonBlock, SkeletonText, SkeletonImage } from 'skeleton-elements/vue'
</script>
