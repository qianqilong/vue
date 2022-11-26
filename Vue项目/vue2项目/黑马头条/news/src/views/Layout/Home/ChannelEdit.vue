<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="closeFn"/>
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span class="small-title">
            点击{{ !show?'进入':'删除'}}频道
          </span>
        </span>
        <span @click="show=true" v-if="!show">编辑</span>
        <span @click="show=false" v-if="show">完成</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in Userchannels " :key="item.id" >
          <div class="channel-item van-hairline--surround"   @click="removeChannels(item.id)" >
          {{item.name}}
            <!-- 删除的徽标,推荐标记没有删除按键 -->
            <van-badge color="transparent" class="cross-badge" v-if="show && item.name!=='推荐'" >
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"

                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in unCheckChannelList " :key="item.id" @click="addChannelsList(item)">
          <div class="channel-item van-hairline--surround">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Dialog from '@/utils/Dialog.js'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      show: false
    }
  },
  props: {
    Userchannels: Array,
    unCheckChannelList: Array
  },
  methods: {
    /*
    1.因为父组件把值传输给了子组件造成只是传输了一个地址，修改子组件中的内容也就相当于修改了父组件内容
    2.一般而言不让组件修改props中的值，数组只是vue检测不到数组数据的变化,违反了单向数据流
    // 添加频道的方法，移除没有选择的频道
    addChannelsList (item) {
      if (this.show) { this.Userchannels.push(item) }
      // 自定义事件把用户选择的数据发送给父组件
      // this.$emit('UpdateChannelList', this.Userchannels)
    },
    // 移除用户频道的方法,添加到没有选择的频道
    removeChannels (id) {
      this.Userchannels.some((item, index) => {
        if (item.id === id) {
          this.Userchannels.splice(index, 1)
        }
      })
    } */

    // 通过自定义事件把要添加的频道传入父组件
    addChannelsList (item) {
      if (this.show) {
        this.$emit('addChannlEV', item)
      }
    },
    // 点击x号可以移除频道
    removeChannels (id) {
      if (this.show) {
        if (id === 0) {
          return Dialog.alert({
            message: '推荐频道无法删除'
          })
        }
        this.$emit('removeChannelEV', id)
      } else {
        this.$emit('closeEV', false)// 关闭弹出层
        this.$emit('input', id)// 触发v-model绑定的input事件，把值传出去个v-model绑定
      }
    },
    closeFn () {
      this.$emit('closeEV', false)
    }
  }

}

</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
