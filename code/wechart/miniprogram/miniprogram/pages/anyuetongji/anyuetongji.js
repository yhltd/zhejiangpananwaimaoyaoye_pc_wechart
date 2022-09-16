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
        text: "类型",
        width: "300rpx",
        columnName: "type",
        type: "text",
        isupd: true
      },
      {
        text: "1月",
        width: "400rpx",
        columnName: "yue1",
        type: "text",
        isupd: true
      },
      {
        text: "2月",
        width: "200rpx",
        columnName: "yue2",
        type: "text",
        isupd: true
      },
      {
        text: "3月",
        width: "200rpx",
        columnName: "yue3",
        type: "text",
        isupd: true
      },
      {
        text: "4月",
        width: "200rpx",
        columnName: "yue4",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "5月",
        width: "200rpx",
        columnName: "yue5",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "6月",
        width: "200rpx",
        columnName: "yue6",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "7月",
        width: "200rpx",
        columnName: "yue7",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "8月",
        width: "200rpx",
        columnName: "yue8",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "9月",
        width: "200rpx",
        columnName: "yue9",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "10月",
        width: "200rpx",
        columnName: "yue10",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "11月",
        width: "200rpx",
        columnName: "yue11",
        type: "text",
        isupd: true
      }
      ,
      {
        text: "12月",
        width: "200rpx",
        columnName: "yue12",
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
    var date = new Date(); 
    var year = date.getFullYear();
    _this.setData({
      year:year
    })
    var e = [year]
    _this.tableShow(e)
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value 
    })
    console.log(e.detail.value)
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from sale;select sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='退货' and convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,xiaoji) else 0 end) as yue12  from sale;select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,r_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,r_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,r_jine) else 0 end) as yue12 from payment;select sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-01-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-01-31') then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-02-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-02-28') then convert(float,f_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-03-01') and convert(date,riqi) <= convert(date,'"+ e[0] +"-03-31') then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-04-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-04-30') then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-05-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-05-31') then convert(float,f_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-06-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-06-30') then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-07-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-07-31') then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-08-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-08-31') then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-09-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-09-30') then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-10-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-10-31') then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-11-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-11-30') then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=convert(date,'"+ e[0] +"-12-01') and convert(date,riqi)<=convert(date,'"+ e[0] +"-12-31') then convert(float,f_jine) else 0 end) as yue12 from payment"
      },
      success: res => {
        var list1 = res.result.recordsets[0]
        var list2 = res.result.recordsets[1]
        var list3 = res.result.recordsets[2]
        var list4 = res.result.recordsets[3]
        var this_list = []
        this_list.push({
          type:'出货金额',
          yue1:list1[0].yue1,
          yue2:list1[0].yue2,
          yue3:list1[0].yue3,
          yue4:list1[0].yue4,
          yue5:list1[0].yue5,
          yue6:list1[0].yue6,
          yue7:list1[0].yue7,
          yue8:list1[0].yue8,
          yue9:list1[0].yue9,
          yue10:list1[0].yue10,
          yue11:list1[0].yue11,
          yue12:list1[0].yue12,
        })

        this_list.push({
          type:'退货金额',
          yue1:list2[0].yue1,
          yue2:list2[0].yue2,
          yue3:list2[0].yue3,
          yue4:list2[0].yue4,
          yue5:list2[0].yue5,
          yue6:list2[0].yue6,
          yue7:list2[0].yue7,
          yue8:list2[0].yue8,
          yue9:list2[0].yue9,
          yue10:list2[0].yue10,
          yue11:list2[0].yue11,
          yue12:list2[0].yue12,
        })

        this_list.push({
          type:'返款金额',
          yue1:list3[0].yue1,
          yue2:list3[0].yue2,
          yue3:list3[0].yue3,
          yue4:list3[0].yue4,
          yue5:list3[0].yue5,
          yue6:list3[0].yue6,
          yue7:list3[0].yue7,
          yue8:list3[0].yue8,
          yue9:list3[0].yue9,
          yue10:list3[0].yue10,
          yue11:list3[0].yue11,
          yue12:list3[0].yue12,
        })

        this_list.push({
          type:'回款金额',
          yue1:list4[0].yue1,
          yue2:list4[0].yue2,
          yue3:list4[0].yue3,
          yue4:list4[0].yue4,
          yue5:list4[0].yue5,
          yue6:list4[0].yue6,
          yue7:list4[0].yue7,
          yue8:list4[0].yue8,
          yue9:list4[0].yue9,
          yue10:list4[0].yue10,
          yue11:list4[0].yue11,
          yue12:list4[0].yue12,
        })

        _this.setData({
          list: this_list
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
    var year = _this.data.year
    var e = [year]
    _this.tableShow(e)
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      year:"",
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
    var year = _this.data.year
    if(year == '' || year == undefined){
      var date = new Date(); 
      year = date.getFullYear();
    }
    var e = [year]
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