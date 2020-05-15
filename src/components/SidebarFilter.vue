<template>
  <div class="mt-4">
    <b-button v-b-toggle.sidebar-border class="float-right">Show Filters</b-button>
    <b-form>
      <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger">
        <div class="px-3 py-2 form-group">
          <div class="form-group">
            <label class="text-center text-primary">Filter Properties By</label>
          </div>
          <b-form-group id="input-group-2" label="Category:" label-for="input-2">
            <b-form-select
                    id="input-2"
                    v-model="selectedCategory"
                    :options="optionsCategory"
                    @change="filterData">
            </b-form-select>
          </b-form-group>
          <b-form-group id="input-group-1" label="SubCategory:" label-for="input-1">
            <b-form-select
                    id="input-1"
                    v-model="selectedSubCategory"
                    :options="optionsSubCategory"
                    @change="filterData">
            </b-form-select>
          </b-form-group>
          <b-form-group id="input-group-3" label="Ownership:" label-for="input-3">
            <b-form-select
                    id="input-3"
                    v-model="selectedOwner"
                    :options="optionsOwner"
                    @change="filterData">
            </b-form-select>
          </b-form-group>
          <b-form-group id="input-group-4" label="Site Area:" label-for="input-4">
            <b-form-input
                    id="input-4"
                    v-model="siteArea.value"
                    type="range" min="0"
                    :max="siteArea.maxValue"
                    name="input-4"
                    @change="filterData">
            </b-form-input>
            <label>Greater than: {{siteArea.value}}</label>
          </b-form-group>
          <b-form-group id="input-group-5" label="Floor Area:" label-for="input-5">
            <b-form-input
                    id="input-5"
                    v-model="floorArea.value"
                    type="range" min="0"
                    :max="floorArea.maxValue"
                    name="input-5"
                    @change="filterData">
            </b-form-input>
            <label>Greater than: {{floorArea.value}}</label>
          </b-form-group>
          <b-form-group>
            <b-button @click="reset">Reset filters</b-button>
          </b-form-group>
        </div>
      </b-sidebar>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SidebarFilter',
  props: ['initialData'],
  data() {
    return {
      selectedOwner: '',
      selectedSubCategory: '',
      selectedCategory: '',
      optionsSubCategory: [
        {
          value: '',
          text: 'Select'
        }
      ],
      optionsOwner: [
        {
          value: '',
          text: 'Select'
        }
      ],
      optionsCategory: [
        {
          value: '',
          text: 'Select'
        }
      ],
      floorArea:{
        maxValue: 0,
        value: 0
      },
      siteArea:{
        maxValue: 0,
        value: 0
      },
      data: Object.assign({}, this.initialData)
    }
  },
  mounted() {
    this.initialData.features.forEach((item) => {
      //populate the category options
      if(!this.optionsCategory.includes(item.properties.project.Category))
        this.optionsCategory.push(item.properties.project.Category);

      //populate the title options
      if(!this.optionsSubCategory.includes(item.properties.project.SubCategory))
        this.optionsSubCategory.push(item.properties.project.SubCategory);

      //populate the ownership options
      if(!this.optionsOwner.includes(item.properties.project.Ownership))
        this.optionsOwner.push(item.properties.project.Ownership);

      //populate the Floor Area Filter Options
      let floorArea = parseFloat(item.properties.project["Floor Area"]);
      if(this.floorArea.maxValue <  floorArea)
        this.floorArea.maxValue = floorArea;

      //populate the Site Area Filter Options
      let siteArea = parseFloat(item.properties.project["Site Area"]);
      if(this.siteArea.maxValue < siteArea )
        this.siteArea.maxValue = siteArea;
    });
  },
  methods: {
    filterData(){
        //repopulate the original data to reset the previous filters
        this.initialData.features = this.data.features;

        //populate the current filters
        let ownership = this.selectedOwner;
        let selectedSubCategory = this.selectedSubCategory;
        let selectedCategory = this.selectedCategory;
        let floorArea = this.floorArea.value;
        let siteArea = this.siteArea.value;

        //apply the current filters
        this.initialData.features = this.initialData.features.filter(
            function (item) {
              return (
                  (ownership === '' ? item : item.properties.project.Ownership === ownership)
                    && (selectedSubCategory === '' ? item : item.properties.project.SubCategory === selectedSubCategory)
                    && (selectedCategory === '' ? item : item.properties.project.Category === selectedCategory)
                    && (item.properties.project['Floor Area'] >= floorArea)
                    && (item.properties.project['Site Area'] >= siteArea)
              )
            }
        )
    },
    reset() {
      //repopulate the original data to reset the previous filters
      this.initialData.features = this.data.features;

      //reset the current filters
      this.selectedOwner = this.selectedSubCategory = this.selectedCategory = '';
      this.floorArea.value = this.siteArea.value = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
