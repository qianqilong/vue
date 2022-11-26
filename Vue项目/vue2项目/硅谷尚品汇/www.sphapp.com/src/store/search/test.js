const axios = require('axios')
axios({
  url: 'http://gmall-h5-api.atguigu.cn/api/list',
  method: 'POST',
  data: {
    
  }
}).then(res => {
  console.log(res);
})