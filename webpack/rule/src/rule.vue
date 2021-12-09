<template>
  <div class="example">
    <div class="title"> 规则数据配置展示</div>
    <ControlWrap v-if="ruleConfig"
                 :WidgetConfig="ruleConfig"
                 :element="ruleData"></ControlWrap>
    <div @click="save"
         class="save-btn">保存</div>
  </div>
</template>

<script>
import { getRuleConfig, getRuleData } from './uitls'
import rule from './../common/index'
// import ControlWrap from './controls/ControlWrap'
const ruleData = getRuleData(rule)
const ruleConfig = getRuleConfig(rule)
console.log('rule', rule)
export default {
  name: 'demo',
  components: {

  },
  data() {
    return {
      rule,
      ruleData,
      ruleConfig
    };
  },
  components: {
    // ControlWrap
  },
  methods: {
    save() {
      console.log('保存的数据', this.ruleData)
    }
  },
  created() {
    console.log('this.rule', this.ruleConfig)
  }
};
</script>

<style>
.example {
  color: #333;
  width: 800px;
}
.title {
  margin-bottom: 10px;
  text-align: center;
}
.save-btn {
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: 1px solid #333;
  margin-left: 200px;
}
</style>
