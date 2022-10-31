let operation = "";
let opt = "";

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
                    opt = opt + "<option value=\"" + res.data[i].warehouse + "\">" + res.data[i].warehouse + "</option>";
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

function kanbanSelect(){
    var tiaojian = $.session.get('kanban_goto');
    console.log(tiaojian)
    if(tiaojian != undefined){
        var riqi = tiaojian.split("`")[0]
        var salesman = tiaojian.split("`")[2]
        var type = tiaojian.split("`")[3]
        console.log(riqi)
        console.log(salesman)
        console.log(type)
        $.session.remove('kanban_goto');
        $ajax({
            type: 'post',
            url: '/ruku/getList_kanban',
            data: {
                riqi: riqi,
                salesman: salesman,
                type: type,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    }

}


window.onload = function(){
    kanbanSelect();
};


$(function () {
    getList();
    getSelect();
    kanbanSelect();

    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var product = $('#product').val();
        var pihao = $('#pihao').val();
        $ajax({
            type: 'post',
            url: '/ruku/queryList',
            data: {
                ks: ks,
                js: js,
                product: product,
                pihao: pihao,
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

    //审核中
    $("#shenhezhong-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/ruku/getList_shenhezhong',
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
    });

    //审核通过
    $("#tongguo-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/ruku/getList_tongguo',
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
    });

    //审核未通过
    $("#weitongguo-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/ruku/getList_weitongguo',
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
    });

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        //$('#add-modal').modal('show');

        $ajax({
            type: 'post',
            url: '/product/getSelect',
        }, false, '', function (res) {
            if (res.code == 200) {
                setAddRuku(res.data);
                $('#add-ruku-modal').modal('show');
            }
            console.log(res)
        });
    });

    //添加窗口点击关闭
    $('#add-ruku-close-btn').click(function () {
        $('#add-ruku-modal').modal('hide');
    });

    //添加窗口点击添加
    $('#add-ruku-submit-btn').click(function () {
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
                    productDate: row.productDate,
                    productId: row.data.id,
                    pihao: row.pihao,
                    num: row.num,
                    remarks: row.remarks,
                }
            }, false, '', function (res) {

            })
        });
        swal("新增成功！");
        $('#add-ruku-modal').modal('hide');
        getList();
    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        var add_num = $('#add-num').val();
        if (add_num == "" || add_num == 0) {
            alert("数量不能为空且不能为为0！");
        } else {
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
            if ($('#update-productName').val() != "") {
                let params = formToJson('#update-form');
                var update_num = $('#update-num').val();
                if (update_num == "" || update_num == 0) {
                    alert("数量不能为空且不能为为0！");
                } else {
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

            } else {
                $('#update-productName').next().css('display', 'block');
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
            let shenhe = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id);
                shenhe.push(row.data.state);
            });
            $ajax({
                type: 'post',
                url: '/ruku/delete',
                data: JSON.stringify({
                    idList: idList,
                    shenhe: shenhe
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
    });

    //上传excel
    $('#import-btn').click(function () {
        $('#file').trigger('click');
    });

    //判断文件名改变
    $('#file').change(function () {
        var url = null;
        if ($('#file').val() != '') {
            if ($('#file').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("file").files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    $ajax({
                        type: 'post',
                        url: '/ruku/upload',
                        data: {
                            excel: url
                        },
                    }, false, '', function (res) {
                        $('#file').val('');
                        swal(res.msg);
                        if (res.code == 200) {
                            getList();
                        }
                    })
                }
            } else {
                swal("请选择正确的Excel文件！")
                $('#file').val('');
            }
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
        height: document.body.clientHeight * 0.9,
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
                field: 'productDate',
                title: '生产日期',
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
                field: 'pinhao',
                title: '品号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'spec',
                title: '规格',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '产品属性',
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
                field: 'num',
                title: '数量',
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

function pass(id) {
    $ajax({
        type: 'post',
        url: '/ruku/updateState',
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
        url: '/ruku/updateState',
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

function getXiaLa() {
    var select = "<select name=\"warehouse\" class=\"form-control\" >";
    select = select + opt;
    select = select + "<select/>";
    return select;
}

function getRows(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let warehouse = $(tr).children().eq(2).children().val();
        let productDate = $(tr).children().eq(3).children().val();
        let num = $(tr).children().eq(8).children().val();
        let pihao = $(tr).children().eq(10).children().val();
        let remarks = $(tr).children().eq(11).children().val();
        let index = $(tr).data('index');
        if (index != undefined) {
            if ($(tr).hasClass('selected')) {
                result.push({
                    index: index,
                    data: tableData[index],
                    warehouse: warehouse,
                    productDate: productDate,
                    num: num,
                    pihao: pihao,
                    remarks: remarks,
                })
            }
        }
    });
    return result;
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
        pageSize: 10,//单页记录数
        clickToSelect: false,
        locale: 'zh-CN',
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
                field: 'warehouse',
                title: '仓库',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return getXiaLa();
                },
            }, {
                field: 'productDate',
                title: '生产日期',
                align: 'left',
                sortable: true,
                width: 180,
                formatter: function (value, row, index) {
                    var time = new Date();
                    var day = ("0" + time.getDate()).slice(-2);
                    var month = ("0" + (time.getMonth() + 1)).slice(-2);
                    var today = time.getFullYear() + "-" + (month) + "-" + (day);
                    return '<input type="date" value="'+ today +'" class="form-control" name="productDate" />'
                }
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 150,
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
                width: 150,
            }, {
                field: 'price',
                title: '价格',
                align: 'left',
                sortable: true,
                width: 150,
            }, {
                field: '',
                title: '数量',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input type="number" name="num" class="form-control" value="' + value + '" />'
                }
            }
            , {
                field: 'pinyin',
                title: '拼音代码',
                align: 'left',
                sortable: true,
                width: 150,
            }, {
                field: 'pihao',
                title: '批号',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input type="text" name="pihao" class="form-control" />'
                }
            }, {
                field: 'remarks',
                title: '备注',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return '<input type="text" name="remarks" class="form-control" />'
                }
            }
        ],
        // onClickRow: function (row, el) {
        //     let isSelect = $(el).hasClass('selected')
        //     if (isSelect) {
        //         $(el).removeClass('selected')
        //     } else {
        //         $(el).addClass('selected')
        //     }
        // }
    })
}