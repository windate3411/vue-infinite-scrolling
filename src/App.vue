<template>
  <div id="app">
    <h1>Infinite scrolling using scroll-view</h1>
    <Scroll-view>
      <template slot-scope="visible">
        <my-component v-for="i in items" :source="i.url" :key="i.id"></my-component>
      </template>
    </Scroll-view>
    <h3 v-if="loading" class="loading">Loading...</h3>
  </div>
</template>

<script>
import ComponentA from '@/components/ComponentA.vue'
import axios from 'axios'
import { $scrollview } from 'vue-scrollview'

export default {
  name: 'App',
  components: {
    'my-component': ComponentA
  },
  data() {
    return {
      page: 1,
      items: [],
      loading: false
    }
  },
  watch: {
    page: {
      immediate: true,
      handler: function () {
        // get some more items every time the page changes
        this.fetchMore()
      }
    }
  },
  methods: {
    fetchMore() {
      this.loading = true
      axios.get(`https://jsonplaceholder.typicode.com/albums/${this.page}/photos`)
        .then(({ data }) => {
          this.loading = false
          this.items = this.items.concat(data.slice(1, 6))
        })
    },
  },
  mounted() {
    $scrollview.onLastEntered = () => this.page++ // last component entered, increment the page
  }
}
</script>

<style>
h1,
.loading {
  text-align: center;
}
</style>
