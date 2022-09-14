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
  xlShow4: false,
  xlShow1: false,
  data: {
    list: [],
    title: [{
        text: "日期",
        width: "200rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "仓库",
        width: "200rpx",
        columnName: "warehouse",
        type: "text",
        isupd: true
      },
      {
        text: "入库员",
        width: "200rpx",
        columnName: "staff",
        type: "text",
        isupd: true
      },
      {
        text: "产品名称",
        width: "300rpx",
        columnName: "product_name",
        type: "text",
        isupd: true
      },
      {
        text: "规格",
        width: "400rpx",
        columnName: "spec",
        type: "text",
        isupd: true
      },
      {
        text: "批号",
        width: "200rpx",
        columnName: "pihao",
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
        text: "数量",
        width: "200rpx",
        columnName: "num",
        type: "text",
        isupd: true
      },
      {
        text: "备注",
        width: "200rpx",
        columnName: "remarks",
        type: "text",
        isupd: true
      },
      {
        text: "审批状态",
        width: "200rpx",
        columnName: "state",
        type: "text",
        isupd: true
      }
    ],
    warehouse_list:[],
    id:'',
    warehouse: '', 
    pihao: '',
    listChanPin:[],
    listShenHe:[
      {name:'审核通过'},
      {name:'审核未通过'}
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

    var sql = "select '产品:' + product_name + ';规格:' + spec + ';单位:' + unit as name,id,product_name,spec,unit from product"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listChanPin: list
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

    var sql = "select warehouse from general where warehouse != ''"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].warehouse)
        }
        _this.setData({
          warehouse_list: name_list
        })
        console.log(name_list)
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

    var e = ['1900-01-01','2100-12-31','']
    _this.tableShow(e)
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.warehouse_list[e.detail.value])
    _this.setData({
      warehouse: _this.data.warehouse_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select rk.id,rk.riqi,rk.warehouse,rk.staff,rk.product_id,rk.pihao,rk.num,rk.remarks,rk.state,pd.product_name,pd.spec,pd.unit from ruku as rk left join product as pd on rk.product_id = pd.id where CONVERT(date,rk.riqi) >= CONVERT(date,'" + e[0] + "') and CONVERT(date,rk.riqi) <= CONVERT(date,'" + e[1] + "') and pd.product_name like '%" + e[2] + "%'"
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
      warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
      staff: _this.data.list[e.currentTarget.dataset.index].staff,
      product_id: _this.data.list[e.currentTarget.dataset.index].product_id,
      product_name: _this.data.list[e.currentTarget.dataset.index].product_name,
      spec: _this.data.list[e.currentTarget.dataset.index].spec,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
      num: _this.data.list[e.currentTarget.dataset.index].num,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
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
      warehouse: '',
      staff:'',
      product_id:'',
      product_name:'',
      spec:'',
      unit:'',
      pihao:'',
      num:'',
      remarks:'',
    })
  },

  add1: function(){
    var _this = this

    if(_this.data.riqi == ''){
      wx.showToast({
        title: '未选择日期！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.warehouse == ''){
      wx.showToast({
        title: '未选择仓库！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.product_id == ''){
      wx.showToast({
        title: '未选择产品！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.num == ''){
      wx.showToast({
        title: '未填写数量！',
        icon: 'none'
      })
      return;
    }
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into ruku(riqi,warehouse,staff,product_id,pihao,num,remarks,state) values('" + _this.data.riqi + "','" + _this.data.warehouse + "','" + _this.data.userInfo.name + "','" + _this.data.product_id + "','" + _this.data.pihao + "','" + _this.data.num + "','" + _this.data.remarks + "','审核中')"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
    if(_this.data.product_id == ''){
      wx.showToast({
        title: '未选择产品！',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update ruku set riqi='" + _this.data.riqi + "',warehouse='" + _this.data.warehouse + "',staff='" + _this.data.staff + "',product_id=" + _this.data.product_id + ",pihao='" + _this.data.pihao + "',num='" + _this.data.num + "',remarks='" + _this.data.remarks + "',state='审核中' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          riqi: '', 
          warehouse: '',
          staff:'',
          product_id:'',
          product_name:'',
          spec:'',
          unit:'',
          pihao:'',
          num:'',
          remarks:'',
        })
        _this.qxShow()
        var e = ['1900-01-01','2100-12-31','']
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
          query: "delete from ruku where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
      start_date:"",
      stop_date:"",
      product_name:"",
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
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == ''){
      start_date = '1900-01-01'
    }
    if(stop_date == ''){
      stop_date = '2100-12-31'
    }
    var e = [start_date,stop_date,_this.data.product_name]
    _this.tableShow(e)
    _this.qxShow()
  },

  select4: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow4: false,
        product_name: e.detail.product_name,
        spec: e.detail.spec,
        unit: e.detail.unit,
        product_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow4: false,
      })
    }
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var shenhe = e.detail.name
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update ruku set state='" + shenhe + "' where id=" + _this.data.id 
        },
        success: res => {
          _this.setData({
            id:'',
            riqi: '', 
            warehouse: '',
            staff:'',
            product_id:'',
            product_name:'',
            spec:'',
            unit:'',
            pihao:'',
            num:'',
            remarks:'',
            xlShow1: false,
          })
          _this.qxShow()
          var e = ['1900-01-01','2100-12-31','']
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
      _this.setData({
        xlShow1: false,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow1: false,
      })
    }
  },

  selCD: function () {
    var _this = this
    _this.setData({
      xlShow4: true
    })
  },

  selSH: function () {
    var _this = this
    _this.setData({
      xlShow1: true
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