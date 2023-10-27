<template>
  <div v-show="isOpen" class="rpl-map-popup">
    <div class="rpl-map-popup__header">
      <h3 class="rpl-type-h4">
        <slot name="header"></slot>
      </h3>
      <button
        @click="onClose"
        class="rpl-map-popup__close rpl-u-focusable-inline"
        :class="hoverClass"
      >
        <RplIcon name="icon-cancel"></RplIcon>
      </button>
    </div>
    <div ref="content" class="rpl-map-popup__body">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits<{
  (e: 'close', payload: rplEventPayload & { action: 'close' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-popup', emit)

const hoverClass = ref('')

function onClose() {
  emitRplEvent('close')
}
</script>
<style src="./RplMapPopUp.css" />
