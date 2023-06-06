<script setup lang="ts">
interface Props {
  id: string
  field: string
  placeholder: string
  label: string
  staticFacetOptions: any
  options?: any[]
}
const props = defineProps<Props>()

const options = Array(26)
  .fill(0)
  .map((_, i) => String.fromCharCode(97 + i))
  .map((char) => {
    return {
      id: char,
      label: char.toUpperCase()
    }
  })
</script>

<template>
  <FormKit
    :id="id"
    :name="id"
    type="RplFormOptionButtons"
    :label="label"
    :options="options"
  />
</template>
