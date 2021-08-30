<template>
  <div id="app">
    <div class="header">
      <router-link to="/" class="header-link">Characters</router-link>
      <router-link to="/favorites" class="header-link">Favorites</router-link>
      <BaseIcon name="heart">
        <span class="count">{{favoritesQuantity}}</span>
      </BaseIcon>
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Storage from './helpers/index'
import BaseIcon from './components/BaseIcon'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    BaseIcon
  },
  mounted () {
    const favorites = Storage.getAllItems()
    this.setFavorites(favorites)
  },
  computed: mapGetters(['favoritesQuantity']),
  methods: mapActions(['setFavorites'])
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
  color: black
}
h3 {
  margin: 0;
  color: black
}
a {
  text-decoration: none;
  &:active {
    color: black
  }
}
.header {
  display: flex;
  background-color: black;

  &-link {
    color: white;
    padding: 20px;
    text-decoration: none;
  }
}

.icon-wrapper {
  display: flex;
  margin-left: auto;
  margin-right: 20px;
}

.count {
  margin-left: 10px;
  color: white;
}
</style>
