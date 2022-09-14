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
    title: [{
        text: "添加日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "客户",
        width: "300rpx",
        columnName: "customer",
        type: "text",
        isupd: true
      },
      {
        text: "字母代码",
        width: "200rpx",
        columnName: "pinyin",
        type: "text",
        isupd: true
      },
      {
        text: "业务员",
        width: "200rpx",
        columnName: "salesman",
        type: "text",
        isupd: true
      },{
        text: "价格",
        width: "600rpx",
        columnName: "price",
        type: "text",
        isupd: true
      },{
        text: "联系电话",
        width: "200rpx",
        columnName: "phone",
        type: "text",
        isupd: true
      },{
        text: "收货地址",
        width: "300rpx",
        columnName: "address",
        type: "text",
        isupd: true
      },{
        text: "往期购货余额",
        width: "250rpx",
        columnName: "ghye",
        type: "text",
        isupd: true
      },{
        text: "往期赠送余额",
        width: "250rpx",
        columnName: "zsye",
        type: "text",
        isupd: true
      },{
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      }
    ],

    id:'',
    riqi: '', 
    customer: '',
    pinyin: '',
    salesman:'',
    price:'',
    phone:'',
    address:'',
    remarks:'',
    ghye:'',
    zsye:'',

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
        query: "select * from customerInfo where customer like '%" + e[0] + "%' or pinyin like '%" + e[0] + "%'"
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
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      pinyin: _this.data.list[e.currentTarget.dataset.index].pinyin,
      salesman: _this.data.list[e.currentTarget.dataset.index].salesman,
      price: _this.data.list[e.currentTarget.dataset.index].price,
      phone: _this.data.list[e.currentTarget.dataset.index].phone,
      address: _this.data.list[e.currentTarget.dataset.index].address,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      ghye: _this.data.list[e.currentTarget.dataset.index].ghye,
      zsye: _this.data.list[e.currentTarget.dataset.index].zsye,
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
      riqi: '', 
      customer: '',
      pinyin: '',
      salesman:'',
      price:'',
      phone:'',
      address:'',
      remarks:'',
      ghye:'',
      zsye:'',
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into customerInfo(riqi,customer,pinyin,salesman,price,phone,address,ghye,zsye,remarks) values('" + _this.data.riqi + "','" + _this.data.customer + "','" + _this.data.pinyin + "','" + _this.data.salesman + "','" + _this.data.price + "','" + _this.data.phone + "','" + _this.data.address + "','" + _this.data.ghye + "','" + _this.data.zsye + "','" + _this.data.remarks + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
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
        query: "update customerInfo set riqi='" + _this.data.riqi + "',customer='" + _this.data.customer + "',pinyin='" + _this.data.pinyin + "',salesman='" + _this.data.salesman + "',price='" + _this.data.price + "',phone='" + _this.data.phone + "',address='" + _this.data.address + "',remarks='" + _this.data.remarks + "',ghye='" + _this.data.ghye + "',zsye='" + _this.data.zsye + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
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
          query: "delete from customerInfo where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            customer: '',
            pinyin: '',
            salesman:'',
            price:'',
            phone:'',
            address:'',
            remarks:'',
            ghye:'',
            zsye:'',
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
      customer:"",
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.customer]
    _this.tableShow(e)
    _this.qxShow()
  },

  goto_file: function () {
    var _this = this
    if(_this.data.userPower.gai != '可操作' && _this.data.userInfo.power != '管理员'){
      wx.showToast({
        title: '无权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    var this_id = _this.data.id
    var type = '客户信息'
    wx.navigateTo({
      url: '../file_table/file_table?this_id=' + this_id + '&type=' + type,
    })
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