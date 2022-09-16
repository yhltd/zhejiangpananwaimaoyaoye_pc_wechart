let operation="";

function getList() {
    $('#product').val("");
    $('#customer').val("");
    $('#pihao').val("");
    $('#ks').val("");
    $('#js').val("");
    $ajax({
        type: 'post',
        url: '/sale/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#saleTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

function getSelect() {
    $ajax({
        type: 'post',
        url: '/general/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            var item = "";
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].warehouse != null && res.data[i].warehouse != "") {
                    item = "<option value=\"" + res.data[i].warehouse + "\">" + res.data[i].warehouse + "</option>"
                    $("#add-warehouse").append(item);
                    $("#update-warehouse").append(item);
                }
                if (res.data[i].pick != null && res.data[i].pick != "") {
                    item = "<option value=\"" + res.data[i].pick + "\">" + res.data[i].pick + "</option>"
                    $("#add-pick").append(item);
                    $("#update-pick").append(item);
                }
                if (res.data[i].express != null && res.data[i].express != "") {
                    item = "<option value=\"" + res.data[i].express + "\">" + res.data[i].express + "</option>"
                    $("#add-express").append(item);
                    $("#update-express").append(item);
                }

            }
        }
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
    getSelect();

    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var customer = $('#customer').val();
        var product = $('#product').val();
        var pihao = $('#pihao').val();

        $ajax({
            type: 'post',
            url: '/sale/queryList',
            data: {
                ks:ks,
                js:js,
                customer:customer,
                product: product,
                pihao:pihao,
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
    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        if ($('#add-productName').val()=="") {
            $('#add-productName').next().css('display','block');
            return;
        }else{
            $('#add-productName').next().css('display','none');
        }
        if ($('#add-customer').val()=="") {
            $('#add-customer').next().css('display','block');
            return;
        }else{
            $('#add-customer').next().css('display','none');
        }
        if ($('#add-type').val()=="") {
            $('#add-type').next().css('display','block');
            return;
        }else{
            $('#add-type').next().css('display','none');
        }
        if ($('#add-fahuo').val()=="") {
            $('#add-fahuo').next().css('display','block');
            return;
        }else{
            $('#add-fahuo').next().css('display','none');
        }
        var add_num = $('#add-num').val();
        if (add_num=="" ||  add_num==0){
            alert("数量不能为空且不能为为0！");
        }else{
            $ajax({
                type: 'post',
                url: '/sale/add',
                data: JSON.stringify({
                    addInfo: params
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#add-form')[0].reset();
                    $('#add-productName').next().css('display','none');
                    $('#add-type').next().css('display','none');
                    $('#add-customer').next().css('display','none');
                    $('#add-fahuo').next().css('display','none');
                    getList();
                    $('#add-close-btn').click();
                } else {
                    swal("", res.msg, "error");
                }
            })
        }

    });

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#saleTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-productId').val(rows[0].data.productId);
        $('#update-productName').val(rows[0].data.productName);
        $('#update-spec').val(rows[0].data.spec);
        $('#update-unit').val(rows[0].data.unit);
        $('#update-price').val(rows[0].data.price);
        $('#update-customerId').val(rows[0].data.customerId);
        $('#update-customer').val(rows[0].data.customer);

        $("#update-express").val(rows[0].data.express);
        $("#update-pick").val(rows[0].data.pick);
        $("#update-warehouse").val(rows[0].data.warehouse);
        $("#update-type").val(rows[0].data.type);
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
            if ($('#update-productName').val()=="") {
                $('#update-productName').next().css('display','block');
                return;
            }else{
                $('#update-productName').next().css('display','none');
            }
            if ($('#update-customer').val()=="") {
                $('#update-customer').next().css('display','block');
                return;
            }else{
                $('#update-customer').next().css('display','none');
            }
            if ($('#update-type').val()=="") {
                $('#update-type').next().css('display','block');
                return;
            }else{
                $('#update-type').next().css('display','none');
            }
            if ($('#update-fahuo').val()=="") {
                $('#update-fahuo').next().css('display','block');
                return;
            }else{
                $('#update-fahuo').next().css('display','none');
            }

            let params = formToJson('#update-form');
            var update_num = $('#update-num').val();
            if (update_num=="" ||  update_num==0){
                alert("数量不能为空且不能为为0！");
            }else {
                $ajax({
                    type: 'post',
                    url: '/sale/update',
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
            let rows = getTableSelection("#saleTable");
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
                url: '/sale/delete',
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

    //添加窗体点击产品名文本框
    $("#add-productName").click(function () {
        operation = "添加";
        getProduct();
    });

    //修改窗体点击产品文本框
    $("#update-productName").click(function () {
        operation = "修改";
        getProduct();
    });

    //产品窗体关闭按钮
    $("#product-close-btn").click(function () {
        $('#show-product-modal').modal('hide');
    });

    //产品窗体提交按钮
    $("#product-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-product");
        if (rows.length != 1) {
            swal('请选择一条数据');
        } else {
            if (operation == "添加") {
                $.each(rows, function (index, row) {
                    $("#add-productId").val(row.data.id);
                    $("#add-productName").val(row.data.productName);
                    $("#add-unit").val(row.data.unit);
                    $("#add-spec").val(row.data.spec);
                    $("#add-price").val(row.data.price);

                    var xiaoji=$('#add-price').val()*$('#add-num').val();
                    $('#add-xiaoji').val(xiaoji)
                });
            } else if (operation == "修改") {
                $.each(rows, function (index, row) {
                    $("#update-productId").val(row.data.id);
                    $("#update-productName").val(row.data.productName);
                    $("#update-unit").val(row.data.unit);
                    $("#update-spec").val(row.data.spec);
                    $("#update-price").val(row.data.price);

                    var xiaoji=$('#update-price').val()*$('#update-num').val();
                    $('#update-xiaoji').val(xiaoji)
                });
            }
            $('#show-product-modal').modal('hide');
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
            swal('请选择一条数据');
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
    });

    //小计自动计算
    $('#add-num').change(function () {
        var xiaoji=$('#add-price').val()*$('#add-num').val();
        $('#add-xiaoji').val(xiaoji)
    });

    $('#update-num').change(function () {
        var xiaoji=$('#update-price').val()*$('#update-num').val();
        $('#update-xiaoji').val(xiaoji)
    });

});

function setTable(data) {
    if ($('#saleTable').html != '') {
        $('#saleTable').bootstrapTable('load', data);
    }

    $('#saleTable').bootstrapTable({
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
            }, {
                field: 'express',
                title: '快递公司',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
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
            }, {
                field: 'wuliuOrder',
                title: '物流单号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
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
                width: 100,
            }, {
                field: 'pihao',
                title: '批号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
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
            }, {
                field: 'warehouse',
                title: '仓库',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'type',
                title: '销售方式',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'fahuo',
                title: '发货状态',
                align: 'center',
                sortable: true,
                width: 100,
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