<script setup lang="ts">
const searchConfig = {
  globalFilters: [{ field: 'field_organisation_type', values: ['Department'] }],
  searchFields: {
    title: {
      weight: 10
    },
    field_landing_page_summary: {},
    summary_processed: {}
  },
  filterInputs: [
    {
      id: 'topic',
      component: 'TideSearchFilterAz',
      facets: {
        field_topic_name: {
          type: 'value',
          size: 30
        }
      },
      filterType: 'any',
      filterUpdateHook: ['singleFieldSelect', 'field_topic_name', 'any'],
      props: {
        label: 'Select a topic',
        field: 'field_topic_name',
        placeholder: 'Select',
        type: 'RplFormOptionButtons',
        multiple: true
      }
    }
  ],
  pageConfig: {
    searchPlaceholder: 'Start typing...',
    resultsLayout: 'TideSearchList',
    resultsPerPage: 9,
    hideFilters: false
  },
  resultsConfig: {
    '*': {
      component: 'TideSearchResult'
    }
  }
}

const searchDriverOptions = {
  initialState: {
    resultsPerPage: searchConfig.pageConfig?.resultsPerPage
  },
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    filters: searchConfig.globalFilters,
    search_fields: searchConfig.searchFields
  }
}

const titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const searchResultsMappingFn = (item) => {
  return {
    id: item._meta.id,
    name: titleCase(item.taxonomy_term_name?.raw[0]),
    url: item.field_organisation_link?.raw[0]
  }
}
</script>

<template>
  <TideSearchPage
    title="Departments and agencies"
    summary="An A-Z list of Victorian Government organisations"
    :filterInputs="searchConfig?.filterInputs"
    :pageConfig="searchConfig?.pageConfig"
    :searchDriverOptions="searchDriverOptions"
    :searchResultsMappingFn="searchResultsMappingFn"
  >
    <template #results="{ results }">
      <div>
        <h3 class="rpl-type-h3 rpl-u-margin-b-2">Departments</h3>
        <ul>
          <li>
            <RplSearchResult
              class="tide-search-result"
              title="Department of trees"
              url="#"
            />
          </li>
        </ul>
        <h3 class="rpl-type-h3 rpl-u-margin-b-2">
          All departments and agencies
        </h3>
        <ul>
          <li :key="item.id" v-for="item in results">
            <RplSearchResult
              class="tide-search-result"
              :title="item.name"
              :url="item.url"
            />
          </li>
        </ul>
      </div>
    </template>
  </TideSearchPage>
</template>
