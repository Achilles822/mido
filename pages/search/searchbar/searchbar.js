// pages/search/searchbar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      key:null,
      result:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 调用搜索接口并显示
  doSearch(){
    let key = this.data.key;
    let url = app.globalData.baseUrl;
    let that = this;
    wx.request({
      url: url +'/v2/movie/search?q='+key,
      header: { 'Content-Type': 'json' },
      success: function (res) {
        // console.log(res);
        console.log(res.data.subjects)
        that.setData({
          result:res.data.subjects
        })
      }
    })
  },
  // 获取输入框内容
  bindKeyInput: function (e) {
    if (e.detail.value==''){
      this.setData({
        result:null
      })
    }
    this.setData({
      key: e.detail.value
    })
  },
  // 点击结果跳转到详情页
  catchTapMovie(e) {
    console.log(e);
    let id = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../../index/detail/detail?movieId=' + id
    })
  },
})