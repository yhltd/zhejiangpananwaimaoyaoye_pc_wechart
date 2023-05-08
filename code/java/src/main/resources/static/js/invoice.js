let operation = "";

function getList() {
    $('#customer').val("");
    $('#unit').val("");
    $ajax({
        type: 'post',
        url: '/invoice/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#invoiceTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

function getCustomer() {
    $ajax({
        type: 'post',
        url: '/customer/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            setCustomerTable(res.data);
            $('#show-customer-modal').modal('show');
        }
        console.log(res)
    })
}

function getProduct() {
    $ajax({
        type: 'post',
        url: '/product/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            setProductTable(res.data);
            $('#show-product-modal').modal('show');
        }
        console.log(res)
    })
}

$(function () {
    getList();
    $('#select-btn').click(function () {
        var customer = $('#customer').val();
        var unit = $('#unit').val();
        var unit1 = $('#unit1').val();
        $ajax({
            type: 'post',
            url: '/invoice/queryList',
            data: {
                customer: customer,
                unit: unit,
                unit1: unit1,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        var time = new Date();
        var day = ("0" + time.getDate()).slice(-2);
        var month = ("0" + (time.getMonth() + 1)).slice(-2);
        var today = time.getFullYear() + "-" + (month) + "-" + (day);
        $('#add-riqi').val(today);
        $('#add-modal').modal('show');
        var item4 = '';
        $ajax({
            type: 'post',
            url: '/product/getListByProduct',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].productName != '') {
                        item4 = " <option value=\"" + res.data[i].productName + "\">" + res.data[i].productName + "</option>"
                        $("#add-nameofarticle").append(item4);
                    }
                }
            }
        })

    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");

        if ($('#add-customer').val() != "") {
            $ajax({
                type: 'post',
                url: '/invoice/add',
                data: JSON.stringify({
                    addInfo: params,
                    // add_nameofarticle:add_nameofarticle
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#add-form')[0].reset();
                    $('#add-customer').next().css('display', 'none');
                    getList();
                    $('#add-close-btn').click();
                } else {
                    swal("", res.msg, "error");
                }
            })
        } else {
            $('#add-customer').next().css('display', 'block');
        }
    });

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#invoiceTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-customer').val(rows[0].data.customer);

        var item4 = '';
        $ajax({
            type: 'post',
            url: '/product/getListByProduct',
        }, false, '', function (res) {
            if (res.code == 200) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].productName != '') {
                        item4 = " <option value=\"" + res.data[i].productName + "\">" + res.data[i].productName + "</option>"
                        $("#update-nameofarticle").append(item4);
                    }
                }
            }
        })
    });

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    });

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？");
        if (msg) {
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/invoice/update',
                    data: {
                        updateJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    if (res.code == 200) {
                        swal("", res.msg, "success");
                        $('#update-close-btn').click();
                        $('#update-modal').modal('hide');
                        getList();
                    } else {
                        swal("", res.msg, "error");
                    }
                })
            }
        }
    });

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#invoiceTable");
            if (rows.length == 0) {
                swal('请选择要删除的数据！');
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            });
            $ajax({
                type: 'post',
                url: '/invoice/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    getList();
                } else {
                    swal("", res.msg, "error");
                }
            })
        }
    });

    //添加窗体点击客户文本框
    $("#add-customer").click(function () {
        operation = "添加";
        getCustomer();
    });

    //修改窗体点击客户文本框
    $("#update-customer").click(function () {
        operation = "修改";
        getCustomer();
    });

    //客户窗体关闭按钮
    $("#customer-close-btn").click(function () {
        $('#show-customer-modal').modal('hide');
    });

    //客户窗体提交按钮
    $("#customer-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-customer");
        if (rows.length != 1) {
            alert('请选择一条数据');
            return;
        } else {
            if (operation == "添加") {
                $.each(rows, function (index, row) {
                    $("#add-customerId").val(row.data.id);
                    $("#add-customer").val(row.data.customer);
                });
            } else if (operation == "修改") {
                $.each(rows, function (index, row) {
                    $("#update-customerId").val(row.data.id);
                    $("#update-customer").val(row.data.customer);
                });
            }
            $('#show-customer-modal').modal('hide');
        }
    })

    //修改窗体点击产品文本框
    $("#update-nameofarticle").click(function () {
        getProduct();
    });

    $("#add-nameofarticle").click(function () {
        getProduct();
    })

    //产品窗体提交按钮
    $("#product-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-product");
        if (rows.length < 1) {
            swal('请至少选择一条数据');
        } else {

            var name = ""
            var price = ""
            $.each(rows, function (index, row) {
                console.log(row.data)
                if(name == ""){
                    name = row.data.productName
                }else{
                    name = name + "," + row.data.productName
                }
                if(price == ""){
                    price = row.data.price
                }else{
                    price = price + "," + row.data.price
                }
            });
            $("#add-nameofarticle").val(name);
            $("#update-nameofarticle").val(name);
            $("#add-unitprice").val(price);
            $("#update-unitprice").val(price);
            $('#show-product-modal').modal('hide');
        }
    });

    //产品窗体关闭按钮
    $("#product-close-btn").click(function () {
        $('#show-product-modal').modal('hide');
    });

});

function setTable(data) {
    if ($('#invoiceTable').html != '') {
        $('#invoiceTable').bootstrapTable('load', data);
    }

    $('#invoiceTable').bootstrapTable({
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
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.87,
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'riqi',
                title: '日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'thebillingnumber',
                title: '发票号码',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shuihao',
                title: '税号',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'customerNum',
                title: '客户号',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'area',
                title: '区域',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'leibie',
                title: '类别',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'unit',
                title: '开票单位',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'address',
                title: '单位地址',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'phone',
                title: '电话号码',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'yinhang',
                title: '开户银行',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'zhanghu',
                title: '银行账户',
                align: 'center',
                sortable: true,
                width: 200,
            },{
                field: 'nameofarticle',
                title: '品名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'unitprice',
                title: '单价',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'jine',
                title: '开票金额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'state',
                title: '审批状态',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: '',
                title: '操作',
                align: 'center',
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:pass(' + row.id + ')" class="btn-sm btn-primary">通过</button> <button onclick="javascript:refuse(' + row.id + ')" class="btn-sm btn-primary">拒绝</button>'
                }
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected');
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}

function setCustomerTable(data) {
    if ($('#show-table-customer').html() != '') {
        $('#show-table-customer').bootstrapTable('load', data);
    }
    $('#show-table-customer').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pinyin',
                title: '字母代码',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '价格',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'phone',
                title: '联系电话',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'address',
                title: '收货地址',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'left',
                sortable: true,
                width: 100,
            },
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

function setProductTable(data) {
    if ($('#show-table-product').html() != '') {
        $('#show-table-product').bootstrapTable('load', data);
    }
    $('#show-table-product').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: true,
        search: true,
        searchAlign: 'left',
        pageSize: 10,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'spec',
                title: '规格',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '单位',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '价格',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'pinyin',
                title: '拼音代码',
                align: 'left',
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

function pass(id) {
    $ajax({
        type: 'post',
        url: '/invoice/updateState',
        data: {
            state: "审核通过",
            id: id,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            getList();
        }
    })
}

function refuse(id) {
    $ajax({
        type: 'post',
        url: '/invoice/updateState',
        data: {
            state: "审核未通过",
            id: id,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            getList();
        }
    })
}


function toExcel() {

    var customer = $('#customer').val();
    var unit = $('#unit').val();
    var unit1 = $('#unit1').val();
    $ajax({
        type: 'post',
        url: '/invoice/queryList',
        data: {
            customer: customer,
            unit: unit,
            unit1: unit1,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            var array = res.data
            var header = []
            for (var i = 0; i < array.length; i++) {
                var body = {
                    riqi: array[i].riqi,
                    thebillingnumber: array[i].thebillingnumber,
                    shuihao:array[i].shuihao,
                    customer: array[i].customer,
                    customerNum: array[i].customerNum,
                    area: array[i].area,
                    leibie: array[i].leibie,
                    unit: array[i].unit,
                    address: array[i].address,
                    phone: array[i].phone,
                    yinhang: array[i].yinhang,
                    zhanghu: array[i].zhanghu,
                    nameofarticle: array[i].nameofarticle,
                    unitprice: array[i].unitprice,
                    jine: array[i].jine,
                    remarks: array[i].remarks,
                    state: array[i].state,
                }
                header.push(body)
            }
            console.log(header)
            title = ['日期','发票号码','税号', '客户', '客户号', '区域', '类别', '开票单位', '单位地址','电话号码','开户银行','银行账户', '品名','单价', '开票金额', '备注', '审批状态']
            JSONToExcelConvertor(header, "发票", title)

        }
    })

}


function JSONToExcelConvertor(JSONData, FileName, title, filter) {
    if (!JSONData)
        return;
    //转化json为object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var excel = "<table>";

    //设置表头
    var row = "<tr>";

    if (title) {
        //使用标题项
        for (var i in title) {
            row += "<th align='center'>" + title[i] + '</th>';
        }

    }
    else {
        //不使用标题项
        for (var i in arrData[0]) {
            row += "<th align='center'>" + i + '</th>';
        }
    }

    excel += row + "</tr>";

    //设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index in arrData[i]) {
            //判断是否有过滤行
            if (filter) {
                if (filter.indexOf(index) == -1) {
                    var value = arrData[i][index] == null ? "" : arrData[i][index];
                    row += '<td>' + value + '</td>';
                }
            }
            else {
                var value = arrData[i][index] == null ? "" : arrData[i][index];
                row += "<td align='center'>" + value + "</td>";
            }
        }

        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
