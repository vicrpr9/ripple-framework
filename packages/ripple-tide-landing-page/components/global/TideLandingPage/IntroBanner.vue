<script setup lang="ts">
import { TideUrlField } from '@dpc-sdp/ripple-tide-api/types'

defineProps<{
  title: string
  withIcon: boolean
  links: {
    title: string
    items: TideUrlField[]
    type: 'list' | 'button'
    more: TideUrlField
  }
  html: string | null
}>()
</script>

<template>
  <RplIntroHeader
    :title="title"
    :links="links"
    :iconName="withIcon ? 'icon-exclamation-circle-filled' : null"
  >
    <RplContent v-if="html" :html="html" />
  </RplIntroHeader>
</template>
