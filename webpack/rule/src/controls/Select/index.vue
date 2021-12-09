<template>
  <!-- <el-form-item label="活动区域"> -->
  <el-select @change="onChange"
             :value="value"
             :placeholder="'请选择'+ text">
    <el-option v-for="item in options"
               :key="item.value"
               :label="item.text"
               :value="item.value"></el-option>
  </el-select>
  <!-- </el-form-item> -->
</template>
<script>
export default {
  name: 'Select',
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
    },
    options: {
      type: Array,
      default() {
        return []
      }
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