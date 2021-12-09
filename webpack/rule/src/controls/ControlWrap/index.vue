<template>
  <div class="controlwrap-box">
    <div v-for="(item, key) in configs"
         class="controlwrap-item">
      <div class="control-box">
        <div class="control-title">{{item.text}}</div>
        <div class="control-content">
          <component :is="item.type"
                     :attribute="key"
                     :element="index!=-1 ? assembleList[index] : element"
                     :fields="item.fields"
                     :itemTitle="item.itemTitle"
                     :options="item.options"
                     :text="item.text">
          </component>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import controls from './../index'
export default {
  name: 'ControlWrap',
  props: {
    WidgetConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    element: {
      type: Object,
      default() {
        return {}
      }
    },
    assembleList: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      configs: {}
    }
  },
  components: {
    ...controls
  },
  methods: {
    initConfigs() {
      let configs = {}
      for (const attribute in this.WidgetConfig) {
        const config = this.WidgetConfig[attribute];
        configs[attribute] = config;

      }
      this.configs = configs
    }
  },
  created() {
    this.initConfigs()
  }
}
</script>
<style lang="less">
.controlwrap-box {
  width: 100%;
  // border: 1px solid #666;
  padding: 10px;
  // box-sizing: border-box;
}
.controlwrap-item {
  width: 100%;
  margin-bottom: 10px;
}
.control-box {
  display: flex;
}
.control-title {
  width: 100px;
  flex-shrink: 0;
  // font-weight: bold;
}
</style>