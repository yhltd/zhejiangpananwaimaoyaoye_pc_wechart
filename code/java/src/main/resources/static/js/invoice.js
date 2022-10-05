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
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '开票单位',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
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
