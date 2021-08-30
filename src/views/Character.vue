<template>
  <div class="character">
     <CharacterCard :character="character"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CharacterCard from '../components/CharacterCard'
export default {
  components: { CharacterCard },
  props: ['id'],
  computed: mapState(['character']),
  created () {
    this.fetchCharacter(this.id)
  },
  methods: mapActions(['fetchCharacter'])
}
</script>

<style scoped>

</style>
