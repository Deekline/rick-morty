<template>
  <div class="char-wrapper" v-if="character">
    <div class="char-spec">
      <h3>{{character.name}}</h3>
      <p>
        {{character.species}} - {{character.status}}
      </p>
      <p>
        Last known location - {{character.location.name}}
      </p>
      <p>First seen in - {{character.episode[0]}}</p>
      <AddButton v-on:toggleFavorite ='toggleFavoriteChar'>
        <slot v-if="!isFavorite">Add to Favorite</slot>
        <slot v-else>Remove from Favorite</slot>
      </AddButton>
    </div>
    <div class="char-img">
      <img v-bind:src="`${character.image}`"  alt="">
    </div>
  </div>
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
    }
  }
}
</script>

<style scoped>
  .char-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;
    border: 1px solid lightgray;
  }
  .char-spec {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }
  .char-img {
    height: 200px;
    width: 200px;
  }
  img {
    height: 200px;
    width: 200px;
  }
</style>
