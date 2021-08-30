<template>
  <div class="filters">
    <div class="filters-categories">
      <button class="category"
              v-for="category in categories"
              :key="category"
              v-on:click.prevent="setCat(category)"
              v-bind:class="{active: category === selectedCategory}"
      >
        {{category}}
      </button>
    </div>
    <div class="filters-search">
      <input v-model="search" @input="updateValue" placeholder="Search by name..." type="text"/>
      <button v-on:click.prevent="searchByName">Search</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['categories', 'selectedCategory', 'search'])
  },
  methods: {
    setCat (category) {
      this.removeSearch()
      this.setCategory(category)
      console.log(this.$route.query.page, 'PAGE')
      if (this.$route.query.page) {
        return this.$router.push('/')
      }
      return this.fetchCharacters({
        page: 1,
        category: category || this.$store.state.selectedCategory
      })
    },
    searchByName () {
      this.setCategory('All')
      this.fetchCharacters({
        page: 1,
        category: this.$store.state.selectedCategory,
        name: this.search
      })
    },
    updateValue (e) {
      this.updateSearch(e.target.value)
    },
    ...mapActions(['fetchCharacters', 'updateSearch', 'removeSearch', 'setCategory'])
  }
}
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  padding: 20px 15px;
  background-color: lightgray;
  margin-bottom: 30px;
  &-categories {
    display: flex;
  }
  &-search {
    display: flex;
    margin-left: 20px;
  }

}
.category {
  padding: 10px 15px;
  &.active {
    background-color: black;
    color: white
  }
}
</style>
