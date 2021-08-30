<template>
  <div class="main-container">
      <FilterBar />
      <div class="main">
        <template v-if="!loading">
          <Card v-for="character in characters" :key="character.id" :character="character"/>
        </template>
        <template v-else>
          <Loader />
        </template>
      </div>
    <div class="main-footer">
      Page {{page}} from {{info.pages}} &nbsp;
      <template v-if="isFirst">
      <router-link
        :to="{ name: 'Characters', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page &nbsp;
      </router-link>
      </template>
      <template v-if="isLast">
      <router-link
        :to="{ name: 'Characters', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import FilterBar from '../components/FilterBar'
import Loader from '../components/Loader'

import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Loader,
    Card,
    FilterBar
  },
  created () {
    this.fetchCharacters({
      page: this.page,
      category: this.selectedCategory === 'All' ? undefined : this.selectedCategory,
      name: this.search
    })
  },
  computed: {
    page () {
      return parseInt(this.$route.query.page) || 1
    },
    isFirst () {
      return this.info.prev
    },
    isLast () {
      return this.info.next
    },
    ...mapState(['characters', 'selectedCategory', 'info', 'search', 'loading'])
  },
  methods: mapActions(['fetchCharacters'])
}
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-footer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
