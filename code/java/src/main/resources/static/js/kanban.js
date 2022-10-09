function getList() {

    var riqi = getNowDate();

    var this_date = getNowDate()
    var year = this_date.split("-")[0] * 1
    var month = this_date.split("-")[1] * 1
    var stop_day = getDays(year,month)
    var year = this_date.split("-")[0]
    var month = this_date.split("-")[1]
    var riqi1 = year + "-" + month + "-" + "01"
    var riqi2 = year + "-" + month + "-" + stop_day

    $ajax({
        type: 'post',
        url: '/gerenkanban/getList',
        data: {
            riqi: riqi,
            riqi1: riqi1,
            riqi2: riqi2,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            $("#kanbanTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })

    $ajax({
        type: 'post',
        url: '/payment/getKanban',
        data: {
            riqi: riqi,
            riqi1: riqi1,
            riqi2: riqi2,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data)
            if(res.data[0] != null){
                $('#shoukuan').val(res.data[0].rjine);
            }else{
                $('#shoukuan').val(0);
            }


        }
    })

    $ajax({
        type: 'post',
        url: '/sale/getKanban',
        data: {
            riqi: riqi,
            riqi1: riqi1,
            riqi2: riqi2,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data)
            if(res.data[0] != null){
                $('#xiaoshou').val(res.data[0].price);
            }else{
                $('#xiaoshou').val(0);
            }
        }
    })
}

$(function () {
    getList();
    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });
});

function setTable(data) {
    if ($('#kanbanTable').html != '') {
        $('#kanbanTable').bootstrapTable('load', data);
    }

    $('#kanbanTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover text-nowrap table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize: 15,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style:'table-layout:fixed',
        columns: [
            {
                field: 'type',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'riqi',
                title: '日期',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'salesman',
                title: '业务员',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'state',
                title: '状态',
                align: 'center',
                sortable: true,
                width: 120,
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}

function getNowDate() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day  = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    var week = weekArr[date.getDay()];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
    var currentdate = year + sign1 + month + sign1 + day ;
    return currentdate;
}


function getDays(year, month) {
    let days = [31,28,31,30,31,30,31,31,30,31,30,31]
    if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
        days[1] = 29
    }
    return days[month]
}

