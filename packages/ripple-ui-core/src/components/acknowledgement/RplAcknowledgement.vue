<script setup lang="ts">
import aboriginalFlag from './../../assets/flags/flag-aboriginal.svg?url'
import torresStraitIslanderFlag from './../../assets/flags/flag-torres-strait-islander.svg?url'
import RplImage from '../image/RplImage.vue'

interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message:
    'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'
})
</script>

<template>
  <div class="rpl-acknowledgement rpl-u-screen-only">
    <div class="rpl-acknowledgement__flags">
      <RplImage
        class="rpl-acknowledgement__flag"
        :src="aboriginalFlag"
        :width="55"
        :height="38"
        alt="Aboriginal flag"
      />
      <RplImage
        class="rpl-acknowledgement__flag"
        :width="55"
        :height="38"
        :src="torresStraitIslanderFlag"
        alt="Torres Strait Islander flag"
      />
    </div>
    <p class="rpl-acknowledgement__message rpl-type-p rpl-type-weight-bold">
      {{ message }}
    </p>
  </div>
</template>

<style src="./RplAcknowledgement.css" />
