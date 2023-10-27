<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import type { IRplMapFeature } from './../../types'
import { onMounted, ref, inject } from 'vue'
import { Map } from 'ol'
import Icon from 'ol/style/Icon'
import RplMapPopUp from './../popup/RplMapPopUp.vue'
import RplMapCluster from './../cluster/RplMapCluster.vue'
import markerIconDefaultSrc from './../feature-pin/icon-pin.svg?url'
import zoomInIcon from './../../assets/icons/icon-zoom-in.svg?raw'
import zoomOutIcon from './../../assets/icons/icon-zoom-out.svg?raw'
import onMapClick from './../../composables/onMapClick'

interface Props {
  features?: IRplMapFeature[]
  projection?: 'EPSG:4326' | 'EPSG:3857'
  initialZoom?: number
  initialCenter?: [number, number]
  closeOnMapClick?: boolean
  pinStyle?: Function
  mapHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  closeOnMapClick: true,
  projection: 'EPSG:4326',
  features: () => [],
  initialZoom: 7.3,
  mapHeight: 600,
  initialCenter: () => [144.9631, -36.8136], // melbourne CBD
  pinStyle: (feature) => {
    const ic = new Icon({
      src: markerIconDefaultSrc,
      color: feature.get('color') || 'red'
    })
    ic.load()
    return ic
  }
})

const center = ref(props.initialCenter)
const zoom = ref(props.initialZoom)
const rotation = ref(0)
const view = ref(null)

const { setRplMapRef } = inject('rplMapInstance')

// Reference to ol/map instance
const mapRef = ref<{ map: Map } | null>(null)

onMounted(() => {
  setRplMapRef(mapRef.value.map)
})

const { popupIsOpen, selectedFeatures } = onMapClick(
  mapRef,
  props.closeOnMapClick
)

function onPopUpClose() {
  popupIsOpen.value = false
}

const createHTMLElementFromString = (text) => {
  const div = document.createElement('div')
  div.innerHTML = text.trim()
  return div.firstElementChild
}

const zoomInLabel = createHTMLElementFromString(zoomInIcon)
const zoomOutLabel = createHTMLElementFromString(zoomOutIcon)
</script>

<template>
  <div class="rpl-map">
    <RplMapPopUp :is-open="popupIsOpen" @close="onPopUpClose">
      <template v-if="selectedFeatures && selectedFeatures.length > 0" #header>
        <slot name="popupTitle" :selectedFeatures="selectedFeatures">
          {{ selectedFeatures[0].title }}
        </slot>
      </template>
      <template v-if="selectedFeatures && selectedFeatures.length > 0">
        <slot name="popupContent" :selectedFeatures="selectedFeatures">
          <p class="rpl-type-p-small">
            {{ selectedFeatures[0].description }}
          </p>
        </slot>
      </template>
    </RplMapPopUp>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      :style="`height: ${mapHeight}px`"
      :controls="[]"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
      />
      <slot name="map-provider"> </slot>

      <ol-vector-layer v-if="features && features.length > 0">
        <slot name="features" :features="features">
          <ol-animated-clusterlayer :animationDuration="500" :distance="40">
            <ol-source-vector>
              <ol-feature
                v-for="feature in features"
                :key="feature.id"
                :properties="feature"
              >
                <ol-geom-point
                  :coordinates="[feature.lng, feature.lat]"
                ></ol-geom-point>
                <ol-style> </ol-style>
              </ol-feature>
            </ol-source-vector>
            <slot name="pin">
              <RplMapCluster :pinStyle="pinStyle"></RplMapCluster>
            </slot>
          </ol-animated-clusterlayer>
        </slot>
      </ol-vector-layer>
      <ol-zoom-control
        className="rpl-map__control rpl-map__control-zoom"
        :zoomInLabel="zoomInLabel"
        :zoomOutLabel="zoomOutLabel"
      />
      <ol-fullscreen-control
        className="rpl-map__control rpl-map__control-fullscreen"
      />
    </ol-map>
    <div class="rpl-map__legend">
      <slot name="legend"></slot>
    </div>
  </div>
</template>

<style src="./RplMap.css" />
