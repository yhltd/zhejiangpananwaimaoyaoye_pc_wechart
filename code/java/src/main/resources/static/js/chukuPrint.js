let xiala_list = []

function getXiala() {
    $ajax({
        type: 'post',
        url: '/print/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            xiala_list = res.data
            console.log(xiala_list)
            var list = res.data
            for(var i=0; i<list.length; i++){
                if(list[i].type == "发货"){
                    item = "<option value=\"" + res.data[i].danwei + "\">" + res.data[i].danwei + "</option>"
                    $("#fahuo").append(item);
                }else if(list[i].type == "收货"){
                    item = "<option value=\"" + res.data[i].danwei + "\">" + res.data[i].danwei + "</option>"
                    $("#shouhuo").append(item);
                }
            }
        }
    })
}



$(function () {
    //重新加载页面
    getXiala();
    $('#clear-btn').click(function () {
        history.go(0);
    });

    //打印
    $('#print-btn').click(function () {
        var newstr = window.document.getElementById("div").innerHTML;
        var oldstr = window.document.body.innerHTML;
        document.body.innerHTML = newstr;
        window.print();
        document.body.innerHTML = oldstr;
        window.location.reload();
        return false;
    });

    //选择数据
    $('#select-btn').click(function () {
        $ajax({
            type: 'post',
            url: '/chuku/getList',
        }, false, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
                $('#chuku-modal').modal('show');
            }
        })
    });

    //提交按钮
    $('#chuku-submit-btn').click(function () {
        let rows = getData("#show-chuku-table")
        if (rows.length == 0) {
            swal('请选择数据！');
        } else {
            $ajax({
                type: 'post',
                url: '/chuku/print',
                data: JSON.stringify({
                    list: rows
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    $("[name='printData']").remove();
                    var tr = "";
                    for (var i = 0; i < res.data.length; i++) {
                        var j=i+1;
                        tr = "<tr name='printData'>" +
                            "<td>" + j + "</td>" +
                            "<td>" + res.data[i].productName + "</td>" +
                            "<td>" + res.data[i].spec + "</td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td>" + res.data[i].num + "</td>" +
                            "<td>" + res.data[i].unit + "</td>" +
                            "<td>" + res.data[i].price + "</td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td>" + res.data[i].pihao + "</td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input type='text'  class='form-control' style='height:25px;border: none' /></td>" +
                            "</tr>";
                        $("#data").append(tr);
                        $('#chuku-modal').modal('hide');
                    }
                }
            })
        }

    });

    //关闭按钮
    $('#chuku-close-btn').click(function () {
        $('#chuku-modal').modal('hide');
    })


    $('#shouhuo').change(function () {
        console.log(xiala_list)
        var list = xiala_list
        var this_value = $('#shouhuo').val();
        console.log(this_value)
        for(var i=0; i<list.length; i++){
            if(list[i].type == "收货" && list[i].danwei == this_value){
                $('#shouhuo_address').val(list[i].address);
                $('#shouhuo_name').val(list[i].name);
                $('#shouhuo_phone').val(list[i].phone);
                return;
            }
        }
        $('#shouhuo_address').val("");
        $('#shouhuo_name').val("");
        $('#shouhuo_phone').val("");
    });

    $('#fahuo').change(function () {
        console.log(xiala_list)
        var list = xiala_list
        var this_value = $('#fahuo').val();
        console.log(this_value)
        for(var i=0; i<list.length; i++){
            if(list[i].type == "发货" && list[i].danwei == this_value){
                $('#fahuo_address').val(list[i].address);
                $('#fahuo_name').val(list[i].name);
                $('#fahuo_phone').val(list[i].phone);
                return;
            }
        }
        $('#fahuo_address').val("");
        $('#fahuo_name').val("");
        $('#fahuo_phone').val("");
    });


});

function setTable(data) {
    if ($('#show-chuku-table').html() != '') {
        $('#show-chuku-table').bootstrapTable('load', data);
    }
    $('#show-chuku-table').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        clickToSelect: false,
        locale: 'zh-CN',
        singleSelect: true,
        columns: [
            {
                checkbox: true
            }, {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'customerId',
                title: '客户id',
                align: 'center',
                sortable: true,
                width: 100,
                visible: false,
            }, {
                field: 'riqi',
                title: '日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customer',
                title: '客户名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shStaff',
                title: '收货人员',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'salesman',
                title: '业务员',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pick',
                title: '拿货方式',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'warehouse',
                title: '仓库',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'express',
                title: '快递公司',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'wuliuOrder',
                title: '物流单号',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'saleType',
                title: '发货类型',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'pihao',
                title: '批号',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'spec',
                title: '规格',
                align: 'center',
                sortable: true,
                width: 200,
            },
            {
                field: 'unit',
                title: '单位',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '销售单价',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'num',
                title: '销售数量',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xiaoji',
                title: '小计',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'remarks',
                title: '备注',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'type',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            },
        ],
    })
}

function getData(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let index = $(tr).data('index');
        if (index != undefined) {
            if ($(tr).hasClass('selected')) {
                result.push({
                    riqi: tableData[index].riqi,
                    customerId: tableData[index].customerId,
                })
            }
        }
    });
    return result;
}