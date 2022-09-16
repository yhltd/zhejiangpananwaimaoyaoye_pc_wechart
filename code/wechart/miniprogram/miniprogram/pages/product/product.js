// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    list: [],
    title: [
      {
      text: "品号",
      width: "275rpx",
      columnName: "pinhao",
      type: "text",
      isupd: true
    },{
        text: "产品名称",
        width: "275rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "规格型号",
        width: "600rpx",
        columnName: "spec",
        type: "text",
        isupd: true
      },
      {
        text: "单位",
        width: "200rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "零售价",
        width: "275rpx",
        columnName: "price",
        type: "text",
        isupd: true
      },{
        text: "拼音简码",
        width: "200rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var userPower = JSON.parse(options.userPower)
    console.log(userPower)
    _this.setData({
      userInfo:userInfo,
      userPower:userPower
    })
    var e = ['']
    _this.tableShow(e)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select * from product where product_name like '%" + e[0] + "%' or pinyin like '%" + e[0] + "%'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      product_name: _this.data.list[e.currentTarget.dataset.index].product_name, 
      spec: _this.data.list[e.currentTarget.dataset.index].spec,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      price: _this.data.list[e.currentTarget.dataset.index].price,
      pinyin: _this.data.list[e.currentTarget.dataset.index].pinyin,
      pinhao: _this.data.list[e.currentTarget.dataset.index].pinhao,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    if(_this.data.userPower.zeng != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      id:'',
      product_name: '', 
      spec: '',
      unit: '',
      price:'',
      pinyin:'',
      pinhao:'',
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into product(product_name,spec,unit,price,pinyin,pinhao) values('" + _this.data.product_name + "','" + _this.data.spec + "','" + _this.data.unit + "','" + _this.data.price + "','" + _this.data.pinyin + "','" + _this.data.pinhao + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            product_name: '', 
            spec: '',
            unit: '',
            price:'',
            pinyin:'',
            pinhao:'',
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  upd1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update product set product_name='" + _this.data.product_name + "',spec='" + _this.data.spec + "',unit='" + _this.data.unit + "',price='" + _this.data.price + "',pinyin='" + _this.data.pinyin + "',pinhao='" + _this.data.pinhao + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          product_name: '', 
          spec: '',
          unit: '',
          price:'',
          pinyin:'',
          pinhao:'',
        })
        _this.qxShow()
        var e = ['']
         _this.tableShow(e)

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  del1:function(){
    var _this = this
    if(_this.data.userPower.shan != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "delete from product where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            product_name: '', 
            spec: '',
            unit: '',
            price:'',
            pinyin:'',
            pinhao:'',
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      product_name:"",
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.product_name]
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})