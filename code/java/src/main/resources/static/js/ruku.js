let operation="";

function getList() {
    $('#product').val("");
    $('#ks').val("");
    $('#js').val("");
    $ajax({
        type: 'post',
        url: '/ruku/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#rukuTable").colResizable({
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


$(function () {
    getList();
    getSelect();
    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var product = $('#product').val();
        $ajax({
            type: 'post',
            url: '/ruku/queryList',
            data: {
                ks:ks,
                js:js,
                product: product,
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
        var add_num = $('#add-num').val();
        if (add_num=="" ||  add_num==0){
            alert("数量不能为空且不能为为0！");
        }else {
            if ($('#add-productName').val() != "") {
                $ajax({
                    type: 'post',
                    url: '/ruku/add',
                    data: JSON.stringify({
                        addInfo: params
                    }),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
                }, false, '', function (res) {
                    if (res.code == 200) {
                        swal("", res.msg, "success");
                        $('#add-form')[0].reset();
                        $('#add-productName').next().css('display', 'none');
                        getList();
                        $('#add-close-btn').click();
                    } else {
                        swal("", res.msg, "error");
                    }
                })
            } else {
                $('#add-productName').next().css('display', 'block');
            }
        }
    });

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#rukuTable');
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


        $("#update-warehouse").val(rows[0].data.warehouse);
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
            if ($('#update-productName').val()!="") {
                let params = formToJson('#update-form');
                var update_num = $('#update-num').val();
                if (update_num=="" ||  update_num==0){
                    alert("数量不能为空且不能为为0！");
                }else {
                    $ajax({
                        type: 'post',
                        url: '/ruku/update',
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

            }else{
                $('#update-productName').next().css('display','block');
            }
        }
    });

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#rukuTable");
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
                url: '/ruku/delete',
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

    //修改窗体点击产品名文本框
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
                });
            } else if (operation == "修改") {
                $.each(rows, function (index, row) {
                    $("#update-productId").val(row.data.id);
                    $("#update-productName").val(row.data.productName);
                    $("#update-unit").val(row.data.unit);
                    $("#update-spec").val(row.data.spec);
                });
            }
            $('#show-product-modal').modal('hide');
        }
    })
});

function setTable(data) {
    if ($('#rukuTable').html != '') {
        $('#rukuTable').bootstrapTable('load', data);
    }

    $('#rukuTable').bootstrapTable({
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
                field: 'productId',
                title: '产品id',
                visible: false,
            }, {
                field: 'riqi',
                title: '日期',
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
                field: 'staff',
                title: '入库员',
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
                field: 'num',
                title: '数量',
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
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}

function pass(id){
    $ajax({
        type: 'post',
        url: '/ruku/updateState',
        data:{
            state:"审核通过",
            id:id,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            getList();
        }
    })
}

function refuse(id){
    $ajax({
        type: 'post',
        url: '/ruku/updateState',
        data:{
            state:"审核未通过",
            id:id,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            getList();
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