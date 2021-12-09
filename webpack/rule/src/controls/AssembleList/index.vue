<template>
  <div class="assemble-list-container">
    <div class="assemble-list-container-title">{{text}}</div>
    <div class="assemble-list-item-box">
      <div v-for="(item, index) in list"
           :key="attribute+index"
           class="assemble-list-item">
        <div class="assemble-list-item-title">
          {{itemTitle}}{{index+1}}
        </div>
        <ControlWrap v-if="fields && element"
                     :WidgetConfig="fields"
                     :attribute="attribute"
                     :element="element"
                     :assembleList="list"
                     :index="index"></ControlWrap>
        <div class="move-operation-content">
          <span class="move-arrow move-arrow-up"
                @click="moveHandle({
                  oldIndex: index,
                  newIndex: index - 1
                })">上</span>
          <span class="move-arrow move-arrow-down"
                @click="moveHandle({
                  oldIndex: index,
                  newIndex: index + 1
                })">下</span>
        </div>
        <span class="remove-icon"
              @click="removeItem(index)">x</span>
      </div>
    </div>
    <div class="assemble-list-add"
         @click="addItem">添加</div>

  </div>
</template>
<script>
// import ControlWrap from './../ControlWrap/index.vue'
export default {
  name: 'AssembleList',
  props: {
    element: {
      type: Object,
      default() {
        return {}
      }
    },
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    itemTitle: {
      type: String,
      default: ''
    },
    attribute: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    itemTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    list() {
      return this.element[this.attribute]
    }
  },
  components: {
    // ControlWrap
  },
  data() {
    return {
      // list: []
    }
  },
  methods: {
    getDefaultItemData(fields = {}) {
      const item = {};
      Object.keys(fields).forEach((key) => {
        item[key] =
          fields[key].type === 'AssembleList'
            ? [this.getDefaultItemData(fields[key].fields)]
            : fields[key].value;
      });
      return item;
    },
    addItem() {
      const item = this.getDefaultItemData(this.fields, this.list);
      // this.list.push(item);
      this.element[this.attribute].push(item);
    },
    removeItem(index) {
      this.element[this.attribute].splice(index, 1);
    },
    moveHandle({ oldIndex, newIndex }) {
      const list = this.element[this.attribute];
      if (oldIndex == newIndex || list.length == 1 || newIndex == -1 || newIndex == list.length) {
        return
      }
      const originOrderAll = JSON.parse(JSON.stringify(list))
      const oldIndexId = originOrderAll[oldIndex]
      const newIndexId = originOrderAll[newIndex]
      // // 1. 先干掉老的位置的元素
      const entireListIds = originOrderAll.filter(id => id !== oldIndexId)
      // // 2. 找到新位置在列表中的下标
      let insertIndex = entireListIds.findIndex(id => id === newIndexId)
      // // 3. 根据移动方向设置插入位置
      if (newIndex > oldIndex) {
        insertIndex += 1
      }
      entireListIds.splice(insertIndex, 0, oldIndexId)
      this.element[this.attribute] = entireListIds
    }
  }
}
</script>
<style lang="less">
.assemble-list-container {
  width: 100%;
  border: 1px solid #666;
  padding: 10px;
  box-sizing: border-box;
  .assemble-list-container-title {
    width: 100%;
  }
}
.assemble-list-item {
  width: 100%;
  border: 1px solid #666;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  position: relative;
  .remove-icon {
    position: absolute;
    right: 2px;
    top: -3px;
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
}
.assemble-list-add {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: 1px solid #666;
  cursor: pointer;
}
.move-operation-content {
  display: none;
  right: 20px;
  top: 0;
  width: 50px;
  height: 40px;
  background: transparent;
  position: absolute;
  .move-arrow {
    position: absolute;
    right: 36px;
    top: 0px;
    // width: 10px;
    // height: 10px;
    cursor: pointer;
    font-size: 12px;
  }
  .move-arrow-up {
    right: 20px;
  }
  .move-arrow-down {
    right: 0px;
  }
}
.assemble-list-item:hover {
  .move-operation-content {
    display: block;
    .move-arrow {
      &:hover {
        color: #4a82f7;
      }
    }
  }
}
.assemble-list-item:first-child {
  .move-operation-content .move-arrow-up {
    cursor: not-allowed;
  }
  &:hover {
    .move-operation-content {
      .move-arrow-up {
        color: #ccc;
        &:hover {
          color: #ccc;
        }
      }
    }
  }
}
.assemble-list-item:last-of-type {
  .move-operation-content .move-arrow-down {
    cursor: not-allowed;
    color: #4a82f7;
  }
  &:hover {
    .move-operation-content {
      .move-arrow-down {
        color: #ccc;
        &:hover {
          color: #ccc;
        }
      }
    }
  }
}
</style>