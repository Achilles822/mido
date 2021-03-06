// search.js
import httpUtil from '../../utils/http.js';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    }) 
    //基本网址
    let baseUrl = app.globalData.baseUrl;
    let newMoviesUrl = baseUrl + '/v2/movie/new_movies';
    httpUtil.request(newMoviesUrl, this.loadList);
    wx.hideToast();
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
  loadList(result) {
    console.log(result);
    this.setData({
      movies:result.subjects
    })
    console.log(this.data.movies)
  },
  catchTapMovie(e) {
    console.log(e);
    let id = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../index/detail/detail?movieId=' + id
    })
  }
})