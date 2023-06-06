<script setup lang="ts">
import { computed, getSearchResultValue, titleCase } from '#imports'
const titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)
interface Props {
  result: any
}

const props = defineProps<Props>()

const title = computed(() =>
  titleCase(getSearchResultValue(props.result, 'taxonomy_term_name'))
)
const url = computed(() =>
  getSearchResultValue(props.result, 'field_organisation_link').replace(
    /\/site-(\d+)/,
    ''
  )
)
</script>

<template>
  <RplSearchResult class="tide-search-result" :title="title" :url="url">
  </RplSearchResult>
</template>
