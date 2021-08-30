<template>
  <router-link
    :to="{ name: 'Character', params: { id: character.id } }"
  >
    <div class="card" v-bind:class="toggleFavoriteClass">
      <div class="card-image">
        <img v-bind:src="`${character.image}`"  alt="">
      </div>
      <div class="card-info">
        <h3 class="card-title">{{character.name}}</h3>
        <p class="card-description">{{ character.species }} - {{character.status}}</p>
        <AddButton v-on:toggleFavorite ='toggleFavoriteChar'>
          <slot v-if="!toggleFavoriteClass">Add to Favorite</slot>
          <slot v-else>Remove from Favorite</slot>
        </AddButton>
      </div>
    </div>
  </router-link>
</template>

<script>

import AddButton from './AddButton'
export default {
  components: { AddButton },
  props: {
    character: {
      type: Object
    }
  },
  methods: {
    toggleFavoriteChar () {
      if (this.$store.state.favoriteCharacters.find(char => char.id === this.character.id)) {
        this.$store.dispatch('removeFavorite', this.character.id)
      } else {
        this.$store.dispatch('addFavorite', this.character)
      }
    }
  },
  computed: {
    isFavorite () {
      return this.$store.state.favoriteCharacters.find(char => char.id === this.character.id)
    },
    toggleFavoriteClass () {
      return this.isFavorite ? 'fav' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid lightgray;
  margin: 20px;
  width: 250px;

  &-image {
    img {
      width: 100%;
    }
  }
  &-info {
    padding: 15px;
  }
}
</style>
