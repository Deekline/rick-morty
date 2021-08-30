<template>
  <div class="main">
    <p v-if="favoritesQuantity === 0">There is no favorites</p>
    <Card v-else v-for="favChar in favoriteCharacters" :key="favChar.id" :character="favChar"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Card from '../components/Card'

export default {
  components: { Card },
  computed: {
    ...mapState(['favoriteCharacters']),
    ...mapGetters(['favoritesQuantity'])
  }
}
</script>

<style scoped>

</style>
