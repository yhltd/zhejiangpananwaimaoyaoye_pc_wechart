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
            for (var i = 0; i < list.length; i++) {
                if (list[i].type == "发货") {
                    item = "<option value=\"" + res.data[i].danwei + "\">" + res.data[i].danwei + "</option>"
                    $("#fahuo").append(item);
                } else if (list[i].type == "收货") {
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

    //打印信息填写窗口
    $("#xiala-btn").click(function () {
        $('#add-modal').modal('show');
    });

    $("#shangpin-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/product/getSelect',
        }, false, '', function (res) {
            if (res.code == 200) {
                linshi_data = [];
                setAddRuku(res.data);
                $('#add-ruku-modal').modal('show');
            }
            console.log(res)
        });
    });

    //打印信息填写窗口点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });
    $('#add-close-btn1').click(function () {
        $('#addd-modal').modal('hide');
    });
    //添加窗口点击关闭
    $('#add-ruku-close-btn').click(function () {
        $('#add-ruku-modal').modal('hide');
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

    $('#add-submit-btn').click(function () {
        var bianhao = $('#bianhao').val();
        $('#td8').html(bianhao);
        var riqi = $('#riqi').val();
        $('#td9').html(riqi);
        $('#add-modal').modal('hide');
    });
    $('#add-submit-btn1').click(function () {
        var ad1 = $('#ad1').val();
        $('#add').html(ad1);
        var ad2 = $('#ad2').val();
        $('#add1').html(ad2);
        var ad3 = $('#ad3').val();
        $('#add2').html(ad3);
        var ad4 = $('#ad4').val();
        $('#add3').html(ad4);
        var ad5 = $('#ad5').val();
        $('#add4').html(ad5);
        var ad6 = $('#ad6').val();
        $('#add5').html(ad6);
        var ad7 = $('#ad7').val();
        $('#add6').html(ad7);
        var ad8 = $('#ad8').val();
        $('#add7').html(ad8);
        var ad9 = $('#ad9').val();
        $('#add8').html(ad9);

        $('#addd-modal').modal('hide');
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
                        var idd="idd"+i;
                        var idd1="idd1"+i;
                        var idd2="idd2"+i;
                        var idd3="idd3"+i;
                        var idd4="idd4"+i;
                        var idd5="idd5"+i;
                        var idd6="idd6"+i;
                        var idd7="idd7"+i;
                        var idd8="idd8"+i;
                        var j = i + 1;
                        tr = "<tr name='printData'>" +
                            "<td>" + j + "</td>" +
                            "<td>" + res.data[i].productName + "</td>" +
                            "<td>" + res.data[i].spec + "</td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd + "')\" type='text' id='idd" + i + "'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd1 + "')\" type='text' id='idd1" + i + "'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd2 + "')\" type='text' id='idd2" + i + "'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd3 + "')\" type='text' id='idd3" + i + "'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td>" + res.data[i].num + "</td>" +
                            "<td>" + res.data[i].unit + "</td>" +
                            "<td>" + res.data[i].price + "</td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd4 + "')\" type='text' id='idd4" + i + "'  class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd5 + "')\" type='text' id='idd5" + i + "'   class='form-control' style='height:25px;border: none' /></td>" +
                            "<td><input onchange=\"javascript:inputChange('" + idd6 + "')\" type='text' id='idd6" + i + "'   class='form-control' style='height:25px;border: none' /></td>" +
                            "<td>" + res.data[i].pihao + "</td>" +
                            "<td>" + res.data[i].product_date + "</td>" +
                            "<td>" + res.data[i].validity + "</td>" +
                            // "<td><input onchange=\"javascript:inputChange('" + idd7 + "')\" type='text' id='idd7" + i + "'   class='form-control' style='height:25px;border: none' /></td>" +
                            // "<td><input onchange=\"javascript:inputChange('" + idd8 + "')\" type='text' id='idd8" + i + "'   class='form-control' style='height:25px;border: none' /></td>" +
                            "</tr>";
                        $("#data").append(tr);
                        $('#chuku-modal').modal('hide');
                    }
                }
            })
        }
    });


    $('#add-ruku-submit-btn').click(function () {
        var cishu=1;
        let rows = getRows("#add-table-ruku");
        if (rows.length == 0) {
            alert('请选择要保存的数据！');
            return;
        }
        $.each(rows, function (index, row) {
            $ajax({
                type: 'post',
                url: '/ruku/insert',
                data: {
                    warehouse: row.warehouse,
                    product_date: row.product_date,
                    productId: row.id,
                    pihao: row.pihao,
                    num: row.num,
                    remarks: row.remarks,
                    validity: row.validity,
                }
            }, false, '', function (res) {
                if (cishu==1){
                    swal(res.msg);
                    cishu=cishu+1;
                }
            })
        });
        //swal("新增成功！");
        $('#add-ruku-modal').modal('hide');
    });



    //关闭按钮
    $('#chuku-close-btn').click(function () {
        $('#chuku-modal').modal('hide');
    })


    $('#shouhuo').change(function () {
        console.log(xiala_list)
        var list = xiala_list
        var this_value = $('#shouhuo').val();
        $('#shouhuo_xiala').html(this_value);
        console.log(this_value)
        for (var i = 0; i < list.length; i++) {
            if (list[i].type == "收货" && list[i].danwei == this_value) {
                $('#td4').html(list[i].address);
                $('#td5').html(list[i].name);
                $('#td6').html(list[i].phone);
                // $('#shouhuo_address').val(list[i].address);
                // $('#shouhuo_name').val(list[i].name);
                // $('#shouhuo_phone').val(list[i].phone);
                return;
            }
        }
        $('#shouhuo_address').val("");
        $('#shouhuo_name').val("");
        $('#shouhuo_phone').val("");
    });

    $('#biaoti').change(function () {
        console.log(xiala_list)
        var  this_value= $('#biaoti').val();
        $('#td7').html(this_value);
    });

    $('#biaoti').change(function () {
        console.log(xiala_list)
        var  this_value= $('#biaoti').val();
        $('#td7').html(this_value);
    });

    $('#fahuo').change(function () {
        console.log(xiala_list)
        var list = xiala_list
        var  this_value= $('#fahuo').val();
        $('#fahuo_xiala').html(this_value);

        console.log(this_value)
        for (var i = 0; i < list.length; i++) {
            if (list[i].type == "发货" && list[i].danwei == this_value) {
                $('#td1').html(list[i].address);
                $('#td2').html(list[i].name);
                $('#td3').html(list[i].phone);
                //$('#fahuo_address').val(list[i].address);
                // $('#fahuo_name').val(list[i].name);
                // $('#fahuo_phone').val(list[i].phone);
                return;
            }
        }
        $('#fahuo_address').val("");
        $('#fahuo_name').val("");
        $('#fahuo_phone').val("");
    });


});

function inputChange (id){
    var input=$('#'+id).val();
    $('#'+id).attr('value',input);
}

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

$("#add-btn").click(function () {
    //$('#add-modal').modal('show');

    $ajax({
        type: 'post',
        url: '/product/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            linshi_data = [];
            setAddRuku(res.data);
            $('#add-ruku-modal').modal('show');
        }
        console.log(res)
    });
});

function setAddRuku(data) {
    if ($('#add-table-ruku').html() != '') {
        $('#add-table-ruku').bootstrapTable('load', data);
    }
    $('#add-table-ruku').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        pageSize: 5,//单页记录数
        clickToSelect: false,
        locale: 'zh-CN',
        //maintainSelected: true,//如果是客户端分页，这个设为 true 翻页后已经选中的复选框不会丢失
        columns: [
            {
                checkbox: true,
            },{
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'warehouse',
                title: '仓库',
                align: 'left',
                sortable: true,
                width: 170,
                formatter: function (value, row, index) {
                    var warehouse = "";
                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            warehouse = val.warehouse
                        }
                    });
                    $('#warehouse' + row.id).val(warehouse);

                    return getXiaLa(row.id);
                },
            }, {
                field: 'product_date',
                title: '生产日期',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    var time = new Date();
                    var day = ("0" + time.getDate()).slice(-2);
                    var month = ("0" + (time.getMonth() + 1)).slice(-2);
                    var product_date = time.getFullYear() + "-" + (month) + "-" + (day);

                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            product_date = val.product_date
                        }
                    });

                    return '<input type="date" value="' + product_date + '" id="today' + row.id + '" class="form-control" name="product_date" style="font-size: 13px"  onchange="javascript:getLinshiData(' + row.id + ')" />'

                }
            }, {
                field: '',
                title: '数量',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    var num = "";
                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            num = val.num
                        }
                    });
                    return '<input type="number" name="num" id="num' + row.id + '" class="form-control" value="' + num + '" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            }, {
                field: 'pihao',
                title: '批号',
                align: 'left',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    var pihao = "";
                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            pihao = val.pihao
                        }
                    });

                    return '<input type="text" name="pihao" id="pihao' + row.id + '" value="' + pihao + '" class="form-control" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            }, {
                field: 'validity',
                title: '有效期',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    var time = new Date();
                    var day = ("0" + time.getDate()).slice(-2);
                    var month = ("0" + (time.getMonth() + 1)).slice(-2);
                    var validity = time.getFullYear() + "-" + (month) + "-" + (day);

                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            validity = val.validity
                        }
                    });

                    return '<input type="date" value="' + validity + '" id="validity' + row.id + '" class="form-control" name="product_date" style="font-size: 13px" onchange="javascript:getLinshiData(' + row.id + ')" />'
                }
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'spec',
                title: '规格',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '产品属性',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '单位',
                align: 'left',
                sortable: true,
                width: 80,
            }, {
                field: 'price',
                title: '价格',
                align: 'left',
                sortable: true,
                width: 80,
            }, {
                field: 'pinyin',
                title: '拼音代码',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    var remarks = "";
                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            remarks = val.remarks
                        }
                    });

                    return '<input type="text" name="remarks" id="remarks' + row.id + '" value="' + remarks + '" class="form-control" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            },
        ],
    });
}