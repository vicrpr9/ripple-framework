<script setup lang="ts">
import {
  getActiveFilterURL,
  getActiveFiltersTally,
  ref,
  toRaw,
  computed
} from '#imports'
import { submitForm } from '@formkit/vue'
import useTideSearch from './../composables/useTideSearch'
import type { TidePageBase, TideSiteData } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideSearchListingPage,
  MappedSearchResult,
  TideSearchListingResultLayout,
  TideSearchListingSortOption
} from './../types'
import type { ITideSecondaryCampaign } from '@dpc-sdp/ripple-tide-landing-page/mapping/secondary-campaign/secondary-campaign-mapping'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { watch } from 'vue'

interface TideContentPage extends TidePageBase {
  afterResults: string
  secondaryCampaign: ITideSecondaryCampaign
}

interface Props {
  id: string
  title: string
  introText?: string
  searchListingConfig?: TideSearchListingPage['searchListingConfig']
  sortOptions?: TideSearchListingSortOption[]
  autocompleteQuery?: boolean
  autocompleteMinimumCharacters?: number
  queryConfig: Record<string, any>
  globalFilters?: any[]
  userFilters?: any[]
  resultsLayout: TideSearchListingResultLayout
  searchResultsMappingFn?: (item: any) => MappedSearchResult<any>
  contentPage: TideContentPage
  site: TideSiteData
}

const props = withDefaults(defineProps<Props>(), {
  id: 'tide-search-listing',
  title: 'Search',
  introText: '',
  autocompleteQuery: true,
  autocompleteMinimumCharacters: 3,
  globalFilters: () => [],
  userFilters: () => [],
  queryConfig: () => ({
    multi_match: {
      query: '{{query}}',
      fields: [
        'title^3',
        'field_landing_page_summary^2',
        'body',
        'field_paragraph_body',
        'summary_processed'
      ]
    }
  }),
  searchListingConfig: () => ({
    hideSearchForm: false,
    resultsPerPage: 9,
    labels: {
      submit: 'Submit',
      reset: 'Reset',
      placeholder: 'Enter a search term'
    },
    suggestions: {
      key: 'title',
      enabled: true
    }
  }),
  resultsLayout: () => ({
    component: 'TideSearchResultsList'
  }),
  searchResultsMappingFn: (item): MappedSearchResult<any> => {
    return {
      id: item._id,
      component: 'TideSearchResult',
      props: {
        result: item._source
      }
    }
  },
  sortOptions: () => []
})

const emit = defineEmits<{
  (e: 'submit', payload: rplEventPayload & { action: 'search' }): void
  (e: 'results', payload: rplEventPayload & { action: 'view' }): void
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
  (
    e: 'toggleFilters',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
  (e: 'reset', payload: rplEventPayload & { action: 'clear_search' }): void
}>()

const { emitRplEvent } = useRippleEvent('tide-search', emit)

const filtersExpanded = ref(false)

const {
  isBusy,
  searchError,
  getSuggestions,
  clearSuggestions,
  searchTerm,
  results,
  suggestions,
  filterForm,
  appliedFilters,
  resetFilters,
  submitSearch,
  goToPage,
  page,
  pageSize,
  userSelectedSort,
  changeSortOrder,
  totalResults,
  totalPages,
  pagingStart,
  pagingEnd,
  onAggregationUpdateHook
} = useTideSearch({
  queryConfig: props.queryConfig,
  userFilters: props.userFilters,
  globalFilters: props.globalFilters,
  searchResultsMappingFn: props.searchResultsMappingFn,
  searchListingConfig: props.searchListingConfig,
  sortOptions: props.sortOptions
})

const uiFilters = ref(props.userFilters)
const cachedSubmitEvent = ref({})

const baseEvent = () => ({
  contextId: props.id,
  name: props.title,
  index: page.value,
  label: searchTerm.value,
  value: totalResults.value,
  options: getActiveFilterURL(filterForm.value),
  section: 'search-listing'
})

// Updates filter options with aggregation value
onAggregationUpdateHook.value = (aggs) => {
  const updateTimestamp = Date.now()

  Object.keys(aggs).forEach((key) => {
    uiFilters.value.forEach((uiFilter, idx) => {
      if (uiFilter.id === key) {
        const getDynamicOptions = () => {
          const mappedOptions = aggs[key].map((item) => ({
            id: item,
            label: item,
            value: item
          }))

          if (uiFilters.value[idx].props.hasOwnProperty('options')) {
            return [
              ...toRaw(uiFilters.value[idx].props.options),
              ...mappedOptions
            ]
          }

          return mappedOptions
        }

        uiFilters.value[idx] = {
          ...uiFilters.value[idx],
          props: {
            ...uiFilters.value[idx].props,
            timestamp: updateTimestamp,
            dynamicOptions: getDynamicOptions()
          }
        }
      }
    })
  })
}

const emitSearchEvent = (event) => {
  emitRplEvent(
    'submit',
    {
      ...event,
      ...baseEvent(),
      action: 'search'
    },
    { global: true }
  )
}

const handleSearchSubmit = (event) => {
  if (props.userFilters && props.userFilters.length) {
    cachedSubmitEvent.value = event
    // Submitting the search term should also 'apply' the filters, but the filters live in a seperate form.
    // To solve this, when the search term form is submitted, we trigger a submission of the filters form,
    // it is there where the actual search request will be triggered.
    // This will only work if there is an actual filter form to submit.
    submitForm('tide-search-filter-form')
  } else {
    // If there's no filters in the form, we need to just do the search without submitting the filter form
    submitSearch()
    emitSearchEvent({ ...event, ...baseEvent() })
  }
}

const handleFilterSubmit = (event) => {
  filterForm.value = event.value
  submitSearch()

  emitSearchEvent({ ...event, ...cachedSubmitEvent.value, ...baseEvent() })

  cachedSubmitEvent.value = {}
}

const handleFilterReset = (event: rplEventPayload) => {
  emitRplEvent(
    'reset',
    {
      ...event,
      ...baseEvent(),
      action: 'clear_search'
    },
    { global: true }
  )

  searchTerm.value = ''
  resetFilters()
  submitSearch()
}

const handleUpdateSearchTerm = (term) => {
  searchTerm.value = term

  if (
    props.autocompleteQuery &&
    props.searchListingConfig?.suggestions?.enabled !== false
  ) {
    if (term.length >= props.autocompleteMinimumCharacters) {
      getSuggestions()
    } else if (suggestions.value?.length) {
      clearSuggestions()
    }
  }
}

const handlePageChange = (event) => {
  goToPage(event.value)
  emitRplEvent(
    'paginate',
    {
      ...event,
      ...baseEvent(),
      index: event.value
    },
    { global: true }
  )
}

const handleSortChange = (sortId) => {
  changeSortOrder(sortId)
}

const handleToggleFilters = () => {
  filtersExpanded.value = !filtersExpanded.value

  emitRplEvent(
    'toggleFilters',
    {
      ...baseEvent(),
      action: filtersExpanded.value ? 'open' : 'close',
      text: toggleFiltersLabel.value
    },
    { global: true }
  )
}

const numAppliedFilters = computed(() => {
  return getActiveFiltersTally(appliedFilters.value)
})

const toggleFiltersLabel = computed(() => {
  let label = 'Refine search'

  return numAppliedFilters.value
    ? `${label} (${numAppliedFilters.value})`
    : label
})

watch(
  () => isBusy.value,
  (loading, prevLoading) => {
    if (!loading && prevLoading) {
      emitRplEvent(
        'results',
        {
          ...baseEvent(),
          action: 'view'
        },
        { global: true }
      )
    }
  }
)
</script>

<template>
  <TideBaseLayout
    :id="id"
    :site="site"
    :page="contentPage"
    :siteSection="contentPage.siteSection"
    :background="contentPage.background"
    :pageTitle="contentPage.title"
    :pageLanguage="contentPage.lang"
    :updatedDate="contentPage.changed || contentPage.created"
    :showContentRating="contentPage.showContentRating"
  >
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        :title="title"
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
        :full-width="true"
        :corner-top="site?.cornerGraphic?.top?.src || true"
        :corner-bottom="false"
      >
        <p v-if="introText" class="rpl-type-p-large">{{ introText }}</p>
        <div
          v-if="!searchListingConfig.hideSearchForm"
          class="tide-search-header"
        >
          <RplSearchBar
            id="tide-search-bar"
            variant="default"
            :input-label="searchListingConfig.labels?.submit"
            :inputValue="searchTerm"
            :placeholder="searchListingConfig.labels?.placeholder"
            :suggestions="suggestions"
            :global-events="false"
            @submit="handleSearchSubmit"
            @update:input-value="handleUpdateSearchTerm"
          />
          <RplSearchBarRefine
            v-if="userFilters && userFilters.length > 0"
            class="tide-search-refine-btn"
            :expanded="filtersExpanded"
            aria-controls="tide-search-listing-filters"
            @click="handleToggleFilters"
            >{{ toggleFiltersLabel }}</RplSearchBarRefine
          >
          <RplExpandable
            v-if="userFilters && userFilters.length > 0"
            id="tide-search-listing-filters"
            :expanded="filtersExpanded"
            class="rpl-u-margin-t-4"
          >
            <TideSearchFilters
              :title="title"
              :filter-form-values="filterForm"
              :filterInputs="userFilters"
              @reset="handleFilterReset"
              @submit="handleFilterSubmit"
            >
            </TideSearchFilters>
          </RplExpandable>
        </div>
      </RplHeroHeader>
    </template>
    <template #body>
      <TideSearchAboveResults
        v-if="results?.length || (sortOptions && sortOptions.length)"
      >
        <template #left>
          <slot
            name="resultsCount"
            :results="results"
            :currentPage="page"
            :pageSize="pageSize"
            :totalPages="totalPages"
            :totalResults="totalResults"
          >
            <div data-component-type="search-listing-result-count">
              <TideSearchResultsCount
                v-if="!searchError && results?.length"
                :pagingStart="pagingStart + 1"
                :pagingEnd="pagingEnd + 1"
                :totalResults="totalResults"
              />
            </div>
          </slot>
        </template>

        <template #right>
          <TideSearchSortOptions
            v-if="sortOptions && sortOptions.length"
            :currentValue="userSelectedSort"
            :sortOptions="sortOptions"
            @change="handleSortChange"
          />
        </template>
      </TideSearchAboveResults>

      <RplPageComponent>
        <TideSearchResultsLoadingState :isActive="isBusy">
          <TideSearchError v-if="searchError" />
          <TideSearchNoResults v-else-if="!isBusy && !results?.length" />

          <slot name="results" :results="results">
            <component
              :is="resultsLayout.component"
              v-if="!searchError && results && results.length > 0"
              :key="`TideSearchListingResultsLayout${resultsLayout.component}`"
              v-bind="resultsLayout.props"
              :results="results"
            />
          </slot>
        </TideSearchResultsLoadingState>
      </RplPageComponent>
      <RplPageComponent>
        <slot
          name="pagination"
          :results="results"
          :currentPage="page"
          :pageSize="pageSize"
          :totalPages="totalPages"
          :totalResults="totalResults"
        >
          <TideSearchPagination
            v-if="!searchError"
            :currentPage="page"
            :totalPages="totalPages"
            @paginate="handlePageChange"
          />
        </slot>
      </RplPageComponent>
      <RplPageComponent v-if="contentPage.afterResults">
        <RplContent
          class="tide-content-after-results"
          :html="contentPage.afterResults"
        ></RplContent>
      </RplPageComponent>
    </template>
    <template #belowBody>
      <RplPageComponent v-if="contentPage.secondaryCampaign">
        <RplSecondaryCampaign v-bind="contentPage.secondaryCampaign" />
      </RplPageComponent>
    </template>
  </TideBaseLayout>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-header {
  display: flex;
  flex-direction: column;
  margin-top: var(--rpl-sp-6);
}

.tide-search-filters.rpl-grid {
  row-gap: var(--rpl-sp-6);
}

.tide-search-filters .rpl-form__outer {
  margin: 0;
}

.tide-search-refine-btn {
  align-self: flex-end;
  padding: 0;
  margin-top: var(--rpl-sp-5);
}

.tide-search-results--loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>
