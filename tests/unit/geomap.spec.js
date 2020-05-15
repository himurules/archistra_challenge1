jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
}));
window.URL.createObjectURL = function() {};
import { shallowMount } from '@vue/test-utils'
import GeoMap from '@/components/GeoMap.vue'


describe('GeoMap.vue', () => {
    const wrapper = shallowMount(GeoMap, {
        propsData: {
            initialData: {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "id": "7426971",
                        "project": {
                            "Project ID": "7426971",
                            "Title": "HELLENIC CLUB",
                            "Type": "RESTAURANT - altns & addns",
                            "Address": "238-240 Castlereagh St (Lot 1 DP187103)",
                            "Suburb": "SYDNEY",
                            "State": "New South Wales",
                            "Stage": "DA Approved",
                            "Category": "HOSPITALITY",
                            "SubCategory": "RESTAURANTS, CANTEENS",
                            "Status": "Possible",
                            "Council": "SYDNEY",
                            "Dev. Type": "Addition",
                            "Floor Area": "2042.000",
                            "Site Area": "567.690",
                            "Storeys": "0.000",
                            "Units": "0.000",
                            "Commence Date": "06\/05\/20",
                            "Completion Date": "06\/11\/21",
                            "Last Updated": "10\/09\/19",
                            "Value": "2720.000",
                            "Ownership": "PRIVATE",
                            "Description": "Alterations & additions of unused Levels 2-3 at the existing Australian Workers Union building & Hellenic Club restaurant. Level 1 - New cool room & freezer room to the mezzanine. Level 2 - New balcony in the existing void, new service bar & glass store, new water closets, new kitchen prep area & creation of Level 2 mezzanine with storerooms. Level 3 - Demolition of some existing external walls & 2 dilapidated trusses. Refurbishment & rehabilitation of 2 existing trusses. Creation of a service kitchen, lounge bar, boardroom, courtyard seating area & new water closets & 3 meeting rooms. Refurbishment & relocation of windows from the existing meeting room wall to the relocated meeting room. Creation of a Level 3 mezzanine with meeting room, office, water closet & staff change rooms. Roof - Install new plant equipment & lift services on the roof. Demolish existing central hipped roof & install glazed & operable skylights in the roof. Metal profiled sheet for wall cladding & roofing, aluminium flashings, window framing & gutters, glass panels & timber framed windows & doors.",
                            "Notes": "DEVELOPMENT APPROVAL (CONDITIONAL)",
                            "Additional Details": "Development Application Number D\/2019\/521.",
                            "Lat": -33.875305,
                            "Long": 151.209152
                        },
                        "color": "#26A31B"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [151.209152, -33.875305]
                    }
                }]
            }
        }
    })
    console.log(wrapper)
    test('should contain canvas', () => {
        expect(wrapper.find('canvas').exists()).toBe(true)
    })
})
