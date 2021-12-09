<template>
  <el-input type="text"
            :value="value"
            @change="onChange"></el-input>
</template>
<script>
export default {
  name: 'NormalText',
  props: {
    attribute: {
      type: String,
      default: ''
    },
    element: {
      type: Object,
      default() {
        return {}
      }
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    value() {
      return this.element[this.attribute]
    }
  },
  methods: {
    onChange(value) {
      this.element[this.attribute] = value
    }
  }
}
</script>