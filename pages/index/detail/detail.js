// detail.js
//index.js
var httpUtil = require('../../../utils/http.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trainer:null,
    images:null,
    title: null,
    genres: null,
    countries: null,
    durations: null,
    pubdates: null,
    wish_count: null,
    original_title:null,
    collect_count:null,
    summary:null,
    height:null,
    flag:false,
    casts:null,
    popular_reviews:null,
    rating:null,
    popular_comments:null,
    ratings_count:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.movieId);
    let url = app.globalData.baseUrl +'/v2/movie/subject/'+options.movieId;
    httpUtil.request(url, this.loadList)
  },

  loadList(result) {
    console.log(result);
    this.setData({
      trainer: result.trailer_urls,
      images: result.images.large,
      title:result.title,
      genres:result.genres,
      countries:result.countries,
      durations:result.durations,
      pubdates:result.pubdates[0],
      wish_count:result.wish_count,
      original_title: result.original_title,
      summary: result.summary,
      casts: result.casts,
      popular_reviews: result.popular_reviews,
      collect_count: result.collect_count,
      rating: result.rating,
      popular_comments: result.popular_comments,
      ratings_count:result.ratings_count
    })
  },
// 改变summary高度
  changeHeight(){
    this.setData({
      flag:!this.data.flag
    })
    if(this.data.flag==true){
      this.setData({
        height:'auto'
      })
    }
    else{
      this.setData({
        height: '114rpx'
      })
    }
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
  }
})