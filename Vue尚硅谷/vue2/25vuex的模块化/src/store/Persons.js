// 人员管理的相关配置
import axios from 'axios';
const personOptions = {
  namespaced:true,
  actions: {
    addPresons(context, value) {
      context.commit('addPresons',value)//发送给下一个
    },
    addPresonsWang(context, value) {
      if (value.indexOf('刘') === 0) {
        context.commit('addPresons',value)//转发
      }
    },
    async addPresonServer(context) {
      const {data} = await axios.get('https://api.uixsj.cn/hitokoto/get?type=social')
       context.commit('addPresons',data)
       console.log(data);
    }
  },
  mutations: {
    addPresons(state, value) {
      console.log('添加人员的方法调用了');
     state.personList.push({name:value})
    }
},
  state: {
    personList: [
      {name:'张三'}
    ]
},
  getters: {
    firstPersonsName(state) {
      return state.personList[0].name;
  }
}
}
export default personOptions;