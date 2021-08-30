<template>

</template>

<script>
import { mapState } from 'vuex'

export default {
  props: { category: String },
  computed: {

    ...mapState(['selectedCategory'])
  }
}
</script>

<style scoped lang="scss">

</style>
