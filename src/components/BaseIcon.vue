<template>
  <div class="icon-wrapper">
    <div v-html="svg">
      <svg class="icon" :width="width" :height="height" :stroke="stroke">
        <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }"></use>
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    stroke: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    svg () {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width,
        height: this.height,
        stroke: this.stroke
      })
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
