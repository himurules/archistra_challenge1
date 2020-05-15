<template>
    <div style="height: 600px" id="map-container" class="mt-4">
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                container="map-container"
                :zoom="zoom"
                :center="center"
                @load="onMapLoaded">
            <MglNavigationControl position="top-right"/>
            <MglGeolocateControl position="top-right" />
            <MglGeojsonLayer
                    sourceId="mySourceId"
                    :source="geoJsonSource"
                    layerId="myLayerId"
                    :layer="geoJsonlayer"
            />
        </MglMap>
    </div>
</template>

<script>
    import { MglMap, MglNavigationControl, MglGeolocateControl, MglGeojsonLayer } from "vue-mapbox";

    export default {
        props: ['initialData'],
        components: {
            MglMap,
            MglNavigationControl,
            MglGeolocateControl,
            MglGeojsonLayer
        },
        name: "GeoMap",
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiaGltYW5zaHVrb3RuYWxhIiwiYSI6ImNrYTZjdWo2MTA2dnYyeG13YTJrNWU2c2QifQ.BB9yQNfypY45hNh8mb53bg', // your access token. Needed if you using Mapbox maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11' , //map style
                geoJsonSource: {
                    type: 'geojson',
                    data: this.initialData
                },
                center: null,
                zoom: 12,
                geoJsonlayer: {
                    type: "circle",
                    paint: {
                        "circle-color": "red"
                    }
                },
            };
        },
        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.map = null;
        },
        mounted() {
            //set the initial map coordinates
            if(this.initialData.features.length > 0)
                this.center = this.initialData.features[0]['geometry']['coordinates'];
        },
        methods: {
            onMapLoaded(event) {
                this.map = event.map;
                //for some reason overflow is set to invisible, this is my workaround to make the map visible
                document.querySelector('.mapboxgl-map').style.overflow = 'visible';
            }
        }
    }
</script>

<style scoped>
</style>
