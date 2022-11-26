import { defineComponent } from 'vue'
import './app-footer.less'
export default defineComponent({
  name: 'Footer',
  setup () {
    // 获取用户的登录信息

    return () => (
        <footer class="app-footer">
        {/* <!-- 联系我们 --> */}
        <div class="contact">
          <div class="container">
            <dl>
              <dt>客户服务</dt>
              <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
              <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
            </dl>
            <dl>
              <dt>关注我们</dt>
              <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
              <dd><i class="iconfont icon-weibo"></i> 微博</dd>
            </dl>
            <dl>
              <dt>下载APP</dt>
              <dd class="qrcode"><img src={require('../../assets/images/qrcode.jpg')} /></dd>
              <dd class="download">
                <span>扫描二维码</span>
                <span>立马下载APP</span>
                <a href="javascript:;">下载页面</a>
              </dd>
            </dl>
            <dl>
              <dt>服务热线</dt>
              <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
            </dl>
          </div>
        </div>
        {/* <!-- 其它 --> */}
        <div class="extra">
          <div class="container">
            <div class="slogan">
              <a href="javascript:;">
                <i class="iconfont icon-footer01"></i>
                <span>价格亲民</span>
              </a>
              <a href="javascript:;">
                <i class="iconfont icon-footer02"></i>
                <span>物流快捷</span>
              </a>
              <a href="javascript:;">
                <i class="iconfont icon-footer03"></i>
                <span>品质新鲜</span>
              </a>
            </div>
            {/* <!-- 版权信息 --> */}
            <div class="copyright">
              <p>
                <a href="javascript:;">关于我们</a>
                <a href="javascript:;">帮助中心</a>
                <a href="javascript:;">售后服务</a>
                <a href="javascript:;">配送与验收</a>
                <a href="javascript:;">商务合作</a>
                <a href="javascript:;">搜索推荐</a>
                <a href="javascript:;">友情链接</a>
              </p>
              <p>CopyRight © 小兔鲜儿</p>
            </div>
          </div>
        </div>
        </footer>
    )
  }
})
