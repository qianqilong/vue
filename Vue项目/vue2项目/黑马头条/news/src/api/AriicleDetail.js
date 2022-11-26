import axios from '../utils/request'
// 获取文章列表
export const getAllarticleListAPI = ({
  channel_id,
  timestamp
}) =>
  axios({
    url: '/v1_0/articles',
    method: 'GET',

    params: {
      channel_id,
      timestamp
    }
  })
// 对文章不感兴趣
export const deislikeArticleAPI = ({ target }) =>
  axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
// 举报文章
export const reportsArticelAPI = ({ target, type, remark }) =>
  axios({
    url: '/v1_0/article/reports',
    method: 'POST',

    data: {
      target, type, remark
    }
  })
// 文章-获取详情
export const detailArticeAPI = ({ id }) =>
  axios({
    url: `/v1_0/articles/${id}`,
    method: 'GET'
  })
  // 文章---对文章点赞
export const praiseArticleAPI = ({ id }) =>
  axios({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
    })
// 文章--取消文章点赞
export const unpraiseArticleAPI = ({ id }) =>
  axios({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
// 文章--评论列表
export const commentsListAPI = ({ type = 'a', id, offset = null }) =>
  axios({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type,
      source: id,
      offset
    }
})  

// 评论--对评论点赞 /v1_0/comment/likings
export const commentLikeAPI = ({ id }) =>
  axios({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
  // 评论--对评论取消点赞

export const uncommentLikeAPI = ({ id }) =>
  axios({
    url: `/v1_0/comment/likings/${id}`,
    method: 'DELETE'
  })

  // 评论--发布评论
export const publishACommentAPI = ({
  target,
  content,
  art_id = null
  // data遇到空值不会处理，而是直接发送给后端(查询字符串会处理)
}) => {
  const data = {
    target,
    content
  }
  if (art_id !== null) {
    data.art_id = art_id
  }
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
