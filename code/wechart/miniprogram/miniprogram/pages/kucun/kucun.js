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
        text: "单位",
        width: "200rpx",
        columnName: "unit",
        type: "text",
        isupd: true
      },
      {
        text: "单价",
        width: "200rpx",
        columnName: "price",
        type: "text",
        isupd: true
      },
      {
        text: "数量",
        width: "200rpx",
        columnName: "num",
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
    type_list:['销售','退货'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })

    var sql = "select '产品:' + product_name + ';规格:' + spec + ';单位:' + unit as name,id,product_name,spec,unit,price from product"
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

    var sql = "select express from general where express != ''"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].express)
        }
        _this.setData({
          express_list: name_list
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

    var sql = "select pick from general where pick != ''"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var name_list = []
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].pick)
        }
        _this.setData({
          pick_list: name_list
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

  bindPickerChange2: function(e){
    var _this = this
    console.log(_this.data.customer_list[e.detail.value].customer + " " + _this.data.customer_list[e.detail.value].id)
    _this.setData({
      [e.target.dataset.column_name]: _this.data.customer_list[e.detail.value].customer,
      customer_id: _this.data.customer_list[e.detail.value].id
    })
  },

  bindPickerChange: function(e){
    var _this = this
    console.log(_this.data.warehouse_list[e.detail.value])
    _this.setData({
      warehouse: _this.data.warehouse_list[e.detail.value]
    })
  },

  bindPickerChange3: function(e){
    var _this = this
    console.log(_this.data.express_list[e.detail.value])
    _this.setData({
      express: _this.data.express_list[e.detail.value]
    })
  },

  bindPickerChange4: function(e){
    var _this = this
    console.log(_this.data.pick_list[e.detail.value])
    _this.setData({
      pick: _this.data.pick_list[e.detail.value]
    })
  },

  bindPickerChange5: function(e){
    var _this = this
    console.log(_this.data.type_list[e.detail.value])
    _this.setData({
      type: _this.data.type_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,product_id,product_name,spec,unit,price,pinyin,r.num from (select product_id,sum(case when state='审核通过' then convert(float,num) else 0 end) as num from ruku  where convert(date,riqi)>=convert(date,'"+ e[0] +"') and convert(date,riqi)<=convert(date,'"+ e[1] +"')  group by product_id) as r left join product p on r.product_id=p.id where product_name like '%"+ e[2] +"%' or pinyin like '%"+ e[2] +"%';select id,product_id,product_name,spec,unit,price,pinyin,s.num from (select product_id,sum(case when type='销售' then convert(float,num) else -convert(float,num) end) as num from sale where convert(date,riqi)>=convert(date,'"+ e[0] +"') and convert(date,riqi)<=convert(date,'"+ e[1] +"') group by product_id) as s left join product p on s.product_id=p.id where product_name like '%%' or pinyin like '%"+ e[2] +"%'"
      },
      success: res => {
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        console.log(list1)
        console.log(list2)
        for(var i=0; i<list1.length; i++){
          for(var j=0; j<list2.length; j++){
            if(list1[i].id == list2[j].id){
              list1[i].num = (list1[i].num * 1) - (list2[j].num * 1)
            }
          }
        }
        _this.setData({
          list: list1
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime(),
      id: '',
      riqi: '',
      customer: '',
      customer_id: '',
      sh_staff: '',
      express: '',
      pick: '',
      wuliu_order: '',
      warehouse: '',
      staff: '',
      product_id: '',
      product_name: '',
      spec: '',
      unit: '',
      price: '',
      xiaoji:'',
      pihao: '',
      num: '',
      remarks:'',
      type:'',
    })
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      riqi: _this.data.list[e.currentTarget.dataset.index].riqi, 
      customer: _this.data.list[e.currentTarget.dataset.index].customer,
      customer_id: _this.data.list[e.currentTarget.dataset.index].customer_id,
      sh_staff: _this.data.list[e.currentTarget.dataset.index].sh_staff,
      express: _this.data.list[e.currentTarget.dataset.index].express,
      pick: _this.data.list[e.currentTarget.dataset.index].pick,
      wuliu_order: _this.data.list[e.currentTarget.dataset.index].wuliu_order,
      warehouse: _this.data.list[e.currentTarget.dataset.index].warehouse,
      staff: _this.data.list[e.currentTarget.dataset.index].staff,
      product_id: _this.data.list[e.currentTarget.dataset.index].product_id,
      product_name: _this.data.list[e.currentTarget.dataset.index].product_name,
      spec: _this.data.list[e.currentTarget.dataset.index].spec,
      unit: _this.data.list[e.currentTarget.dataset.index].unit,
      price: _this.data.list[e.currentTarget.dataset.index].price,
      xiaoji: _this.data.list[e.currentTarget.dataset.index].xiaoji,
      pihao: _this.data.list[e.currentTarget.dataset.index].pihao,
      num: _this.data.list[e.currentTarget.dataset.index].num,
      remarks: _this.data.list[e.currentTarget.dataset.index].remarks,
      type:_this.data.list[e.currentTarget.dataset.index].type,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    var e = ['1900-01-01','2100-12-31','']
    _this.tableShow(e)
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into sale(riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,remarks,warehouse,type,express) values('" + _this.data.riqi + "','" + _this.data.customer_id + "','" + _this.data.sh_staff + "','" + _this.data.pick + "','" + _this.data.wuliu_order + "','" + _this.data.product_id + "','" + _this.data.pihao + "','" + _this.data.num + "','" + _this.data.xiaoji + "','" + _this.data.remarks + "','" + _this.data.warehouse + "','" + _this.data.type + "','" + _this.data.express + "')"
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            express: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
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
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update ruku set riqi='" + _this.data.riqi + "',customer_id='" + _this.data.customer_id + "',sh_staff='" + _this.data.sh_staff + "',pick=" + _this.data.pick + ",wuliu_order='" + _this.data.wuliu_order + "',product_id='" + _this.data.product_id + "',pihao='" + _this.data.pihao + "',num='" + _this.data.num + "',xiaoji='" + _this.data.xiaoji + "',remarks='" + _this.data.remarks + "',warehouse='" + _this.data.warehouse + "',type='" + _this.data.type + "',express='" + _this.data.express + "' where id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id: '',
          riqi: '',
          customer: '',
          customer_id: '',
          sh_staff: '',
          express: '',
          pick: '',
          wuliu_order: '',
          warehouse: '',
          staff: '',
          product_id: '',
          product_name: '',
          spec: '',
          unit: '',
          price: '',
          xiaoji:'',
          pihao: '',
          num: '',
          remarks:'',
          type:'',
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
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "delete from sale where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            express: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
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
        price:e.detail.price,
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
            id: '',
            riqi: '',
            customer: '',
            customer_id: '',
            sh_staff: '',
            express: '',
            pick: '',
            wuliu_order: '',
            warehouse: '',
            staff: '',
            product_id: '',
            product_name: '',
            spec: '',
            unit: '',
            price: '',
            xiaoji:'',
            pihao: '',
            num: '',
            remarks:'',
            type:'',
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