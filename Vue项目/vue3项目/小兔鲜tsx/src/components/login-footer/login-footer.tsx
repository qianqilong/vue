import { defineComponent } from 'vue'
import './login-footer.less'
export default defineComponent({
  name: 'LoginFooter',
  setup () {
    return () => (
        <footer class="login-footer">
        <div class='container'>
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight &copy; 小兔鲜儿</p>
        </div>
      </footer>
    )
  }

})
