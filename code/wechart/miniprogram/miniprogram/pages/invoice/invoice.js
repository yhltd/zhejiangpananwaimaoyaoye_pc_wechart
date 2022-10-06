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
  xlShow5: false,
  data: {
    list: [],
    title: [{
        text: "日期",
        width: "275rpx",
        columnName: "riqi",
        type: "text",
        isupd: true
      },
      {
        text: "客户名称",
        width: "600rpx",
        columnName: "customer",
        type: "text",
        isupd: true
      },
      {
        text: "开票单位",
        width: "600rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "发票号",
        width: "300rpx",
        columnName: "thebillingnumber",
        type: "text",
        isupd: true
      },
      {
        text: "品名",
        width: "300rpx",
        columnName: "nameofarticle",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "200rpx",
        columnName: "unitprice",
        type: "text",
        isupd: true
      },
      {
        text: "开票金额",
        width: "200rpx",
        columnName: "jine",
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
    customer_list:[],
    customer_picker_list:[],
    customer_id:'',
    pay_list:[],
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
    var e = ['1900-01-01','2100-12-31','']
    _this.tableShow(e)

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,customer from customerInfo where customer != ''"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        var picker_list = []
        for(var i=0; i<list.length; i++){
          picker_list.push(
            list[i].customer
          )
        }
        _this.setData({
          customer_list: list,
          customer_picker_list: picker_list
        })
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

  tableShow: function (e) {
    var _this = this
    var sql = "select kaipiao.id,kaipiao.customer_id,kehu.customer,kaipiao.riqi,kaipiao.unit,kaipiao.jine,kaipiao.remarks,kehu.salesman from invoice as kaipiao left join (select id,customer,salesman from customerInfo)as kehu on kaipiao.customer_id = kehu.id where convert(date,kaipiao.riqi) >= convert(date,'"+ e[0] +"') and convert(date,kaipiao.riqi) <= convert(date,'"+ e[1] +"') and kehu.customer like '%"+ e[2] +"%' order by kaipiao.riqi desc"
    if (_this.data.userInfo.power != '管理员'){
      sql = "select kaipiao.id,kaipiao.customer_id,kehu.customer,kaipiao.riqi,kaipiao.unit,kaipiao.jine,kaipiao.remarks,kehu.salesman from invoice as kaipiao left join (select id,customer,salesman from customerInfo)as kehu on kaipiao.customer_id = kehu.id where convert(date,kaipiao.riqi) >= convert(date,'"+ e[0] +"') and convert(date,kaipiao.riqi) <= convert(date,'"+ e[1] +"') and kehu.customer like '%"+ e[2] +"%' and kehu.salesman ='" + _this.data.userInfo.name + "' order by kaipiao.riqi desc"
    }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
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

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].customer + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].customer,
      customer_id: _this.data.customer_list[e.detail.value].id
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
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
      customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      jine: _this.data.list[e.currentTarget.dataset.index].jine,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      thebillingnumber: _this.data.list[e.currentTarget.dataset.index].thebillingnumber,
      nameofarticle:_this.data.list[e.currentTarget.dataset.index].nameofarticle,
      unitprice:_this.data.list[e.currentTarget.dataset.index].unitprice,
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
      id: '',
      customer_id: '',
      riqi: '', 
      customer: '',
      unit: '',
      jine: '',
      remarks: '',
      thebillingnumber:'',
      nameofarticle:'',
      unitprice:'',
    })
  },

  add1: function(){
    var _this = this
    if(_this.data.riqi == '' || _this.data.riqi == undefined){
      wx.showToast({
        title: '未填写日期！',
        icon: 'none'
      })
    }
    if(_this.data.customer_id == '' || _this.data.customer_id == undefined){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
    }
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into invoice(riqi,customer_id,unit,jine,remarks,thebillingnumber,nameofarticle,unitprice) values('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.unit + "','" + _this.data.jine + "','" + _this.data.remarks + "','" + _this.data.thebillingnumber + "','" + _this.data.nameofarticle + "','" + _this.data.unitprice + "')"
        },
        success: res => {
          _this.setData({
            id: '',
            customer_id: '',
            riqi: '', 
            customer: '',
            unit: '',
            jine: '',
            remarks: '',
            thebillingnumber:'',
            nameofarticle:'',
            unitprice:'',
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
    var _this = this
    if(_this.data.riqi == '' || _this.data.riqi == undefined){
      wx.showToast({
        title: '未填写日期！',
        icon: 'none'
      })
    }
    if(_this.data.customer_id == '' || _this.data.customer_id == undefined){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
    }
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update invoice set riqi='" + _this.data.riqi + "',customer_id='" + _this.data.customer_id + "',unit='" + _this.data.unit + "',jine='" + _this.data.jine + "',remarks='" + _this.data.remarks + "',thebillingnumber='" + _this.data.thebillingnumber + "',nameofarticle='" + _this.data.nameofarticle + "',unitprice='" + _this.data.unitprice + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id: '',
          customer_id: '',
          riqi: '', 
          customer: '',
          unit: '',
          jine: '',
          remarks: '',
          thebillingnumber:'',
          nameofarticle:'',
          unitprice:'',
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
          query: "delete from invoice where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id: '',
            customer_id: '',
            riqi: '', 
            customer: '',
            unit: '',
            jine: '',
            remarks: '',
            thebillingnumber:'',
            nameofarticle:'',
            unitprice:'',
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
      customer:"",
      start_date:"",
      stop_date:"",
    })
  },

  sel1:function(){
    var _this = this
    var start_date = _this.data.start_date
    var stop_date = _this.data.stop_date
    if(start_date == '' || start_date == undefined){
      start_date = '1900-01-01'
    }
    if(stop_date == '' || stop_date == undefined){
      stop_date = '2100-12-31'
    }

    var e = [start_date,stop_date,_this.data.customer]
    _this.tableShow(e)
    _this.qxShow()
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  selKH: function () {
    var _this = this
    var sql = "select customer as name,id,customer from customerInfo where customer like '%" + _this.data.customer + "%' or pinyin like'%" + _this.data.customer + "%'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          listKeHu: list
        })
        console.log(list)
        _this.setData({
          xlShow5: true
        })
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

  select5: function (e) {
    var _this = this
    if (e.type == "select") {
      _this.setData({
        xlShow5: false,
        customer: e.detail.customer,
        customer_id: e.detail.id,
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow5: false,
      })
    }
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    var title = _this.data.title
    var cloudList = {
      name : '化验明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0])/10,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
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