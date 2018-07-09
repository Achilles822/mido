/* http请求工具函数 */
// successCallback为调用成功后的回调
function request(url, successCallback) {
  wx.request({
    url: url,
    header: { 'Content-Type': 'json' },
    success: function (res) {
      successCallback(res.data);
    }
  })
}

/* 首页三个栏目的数据，统一用该函数请求并返回 */
function requestBlock(url, key, title, successCallback) {
  wx.request({
    url: url,
    header: { 'Content-Type': 'json' },
    success: function (res) {
      successCallback(res.data, key, title);
    }
  })
}
module.exports = {
  request: request,
  requestBlock: requestBlock
}