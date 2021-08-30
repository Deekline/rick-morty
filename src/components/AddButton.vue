<template>
  <button v-on:click.prevent="$emit('toggleFavorite')" class="add">
    <slot></slot>
  </button>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.add {
  width: 200px;
  padding: 10px 15px;
  background-color: black;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    background-color: darkgrey;
  }
}
</style>
