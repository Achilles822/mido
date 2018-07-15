//index.js
var httpUtil = require('../../utils/http.js');
/* 导入字符处理工具类 */
var stringUtil = require('../../utils/stringUtil.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //存储从三个区块的数据
    threeBlockInfo: {
      hot: {},//正在热映
      recent: {},//即将上映
      top250: {} //排行榜
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    //基本网址
    var baseUrl = app.globalData.baseUrl;
    //起止条数
    var startAndCount = "?start=0&count=7";
    //正在热映网址
    var hotUrl = baseUrl + "/v2/movie/in_theaters" + startAndCount;
    //即将上映网址
    var recentUrl = baseUrl + "/v2/movie/coming_soon" + startAndCount;
    //排行榜数据网址
    var top250Url = baseUrl + "/v2/movie/top250" + startAndCount;

    //获取正在热映电影数据
    httpUtil.requestBlock(hotUrl, "hot", "正在热映", this.processResult);
    //获取即将上映电影数据
    httpUtil.requestBlock(recentUrl, "recent", "即将上映", this.processResult);
    //获取排行版电影数据
    httpUtil.requestBlock(top250Url, "top250", "排行榜", this.processResult);
    wx.hideToast();
    // this.getHotList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  processResult: function (result, key, blockTitle) {
    console.log(result.subjects)
    //处理电影名称过长的问题，截取前8位
    stringUtil.processTitle(result.subjects, 8);

    //将处理过的结果放入threeBlockInfo中
    this.data.threeBlockInfo[key] = {
      blockTitle: blockTitle,
      blockMovies: result
    }

    //更新threeBlockInfo数据
    this.setData({
      threeBlockInfo: this.data.threeBlockInfo
    })
  },
  catchTapMovie(e) {
    console.log(e);
    let id = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'detail/detail?movieId=' + id
    })
  },
  catchMore: function (event) {
    console.log(event)
    //获得区块的标题
    var title = event.currentTarget.dataset.title
    //跳转到“更多页”，将区块标题通过category携带过去
    wx.navigateTo({
      url: 'more/more?category=' + title
    })
  }

})
