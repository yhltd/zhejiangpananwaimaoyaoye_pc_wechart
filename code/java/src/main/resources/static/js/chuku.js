let operation = "";
let productList = [];
let opt = "";
let cangku = "";

let sale_list = [];
let state_list = [];
let saleSubmit_list = [];
let linshi_data = [];

function getList() {
    $('#product').val("");
    $('#customer').val("");
    $('#pihao').val("");
    $('#ks').val("");
    $('#js').val("");

    moneySel = $.session.get('power');
    if(moneySel == null || moneySel == undefined){
        moneySel = false
    }
    else if(moneySel == "是"){
        moneySel = true
    }else{
        moneySel = false
    }

    $ajax({
        type: 'post',
        url: '/chuku/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data)
            sale_list = res.data
            setTable(res.data);
            $("#chukuTable").colResizable({
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
            cangku = ""
            opt = ""
            $("#add-warehouse option").remove();
            $("#update-warehouse option").remove();
            $("#add-pick option").remove();
            $("#update-pick option").remove();
            $("#add-saleType option").remove();
            $("#update-saleType option").remove();
            $("#update-express option").remove();
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].warehouse != null && res.data[i].warehouse != "") {
                    item = "<option value=\"" + res.data[i].warehouse + "\">" + res.data[i].warehouse + "</option>"
                    $("#add-warehouse").append(item);
                    $("#update-warehouse").append(item);
                    cangku = cangku + "<option value=\"" + res.data[i].warehouse + "\">" + res.data[i].warehouse + "</option>";
                }
                if (res.data[i].pick != null && res.data[i].pick != "") {
                    item = "<option value=\"" + res.data[i].pick + "\">" + res.data[i].pick + "</option>"
                    $("#add-pick").append(item);
                    $("#update-pick").append(item);
                }
                if (res.data[i].saleType != null && res.data[i].saleType != "") {
                    item = "<option value=\"" + res.data[i].saleType + "\">" + res.data[i].saleType + "</option>"
                    $("#add-saleType").append(item);
                    $("#update-saleType").append(item);
                    opt = opt + "<option value=\"" + res.data[i].saleType + "\">" + res.data[i].saleType + "</option>";
                }
                if (res.data[i].express != null && res.data[i].express != "") {
                    item = "<option value=\"" + res.data[i].express + "\">" + res.data[i].express + "</option>"
                    $("#update-express").append(item);
                    $("#fahuo-express").append(item);
                    opt = opt + "<option value=\"" + res.data[i].express + "\">" + res.data[i].express + "</option>";
                }
            }
        }
    })
}

function getProductAdd() {
    $ajax({
        type: 'post',
        url: '/product/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            setProductTable_Add(res.data);
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

function kanbanSelect() {
    var tiaojian = $.session.get('kanban_goto');
    console.log(tiaojian)
    if (tiaojian != undefined) {
        var riqi = tiaojian.split("`")[0]
        if (riqi == '' || riqi == 'null' || riqi == null) {
            riqi = ''
        }
        var customer = tiaojian.split("`")[1]
        if (customer == '' || customer == 'null' || customer == null) {
            customer = ''
        }
        var salesman = tiaojian.split("`")[2]
        if (salesman == '' || salesman == 'null' || salesman == null) {
            salesman = ''
        }
        var type = tiaojian.split("`")[3]
        $.session.remove('kanban_goto');
        $ajax({
            type: 'post',
            url: '/chuku/getList_kanban',
            data: {
                riqi: riqi,
                customer: customer,
                salesman: salesman,
                type: type,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    } else {
        $('#refresh-btn').trigger('click');
    }

}


window.onload = function () {
    kanbanSelect();
};

$(function () {
    getList();
    getSelect();
    getProductAdd();

    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var customer = $('#customer').val();
        var product = $('#product').val();
        var pihao = $('#pihao').val();
        var saleType = $('#saleType').val();
        $ajax({
            type: 'post',
            url: '/chuku/queryList',
            data: {
                ks: ks,
                js: js,
                customer: customer,
                product: product,
                pihao: pihao,
                saleType: saleType,
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
        getSelect();
        getProductAdd();
    });

    // //审核中
    // $("#shenhezhong-btn").click(function () {
    //     $ajax({
    //         type: 'post',
    //         url: '/chuku/getList_shenhezhong',
    //     }, false, '', function (res) {
    //         if (res.code == 200) {
    //             setTable(res.data);
    //             $("#rukuTable").colResizable({
    //                 liveDrag: true,
    //                 gripInnerHtml: "<div class='grip'></div>",
    //                 draggingClass: "dragging",
    //                 resizeMode: 'fit'
    //             });
    //         }
    //     })
    // });

    //已发货
    $("#tongguo-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/chuku/getList_tongguo',
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

    //未发货
    $("#weitongguo-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/chuku/getList_weitongguo',
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
        var time = new Date();
        var day = ("0" + time.getDate()).slice(-2);
        var month = ("0" + (time.getMonth() + 1)).slice(-2);
        var today = time.getFullYear() + "-" + (month) + "-" + (day);
        $('#add-riqi').val(today);
        getProductAdd();
        linshi_data = [];
        $('#add-modal').modal('show');
    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //审核弹窗里点击关闭按钮
    $('#state-close-btn').click(function () {
        $('#state-modal').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");

        if (productList.length == 0) {
            swal("未选择产品！");
            return;
        }
        var cishu=1;
        $.each(productList, function (index, row) {
            $ajax({
                type: 'post',
                url: '/chuku/insert',
                async: false,
                data: {
                    riqi: $('#add-riqi').val(),
                    productId: row.id,
                    saleType: row.saleType,
                    price: row.price,
                    num: row.num,
                    remarks: row.remarks,
                },
            }, false, '', function (res) {
                if (cishu==1){
                    swal(res.msg);
                    cishu=cishu+1;
                }
            })
        });

        swal("", "新增成功！", "success");
        $('#add-customer').next().css('display', 'none');

        getList();
        getProductAdd();
        $('#add-close-btn').click();

    });


    //审核弹窗里点击审核通过按钮
    $("#state-tongguo-btn").click(function () {
        saleSubmit_list = state_list
        console.log(saleSubmit_list)
        if (saleSubmit_list.length == 0) {
            swal("无审核内容！");
            return;
        }
        $.each(saleSubmit_list, function (index, row) {
            $ajax({
                type: 'post',
                url: '/chuku/updateState',
                async: false,
                data: {
                    id: row.id,
                    chukuState: '审核通过'
                },
            }, false, '', function (res) {
            })
        });

        swal("", "审核成功！", "success");
        getList();
        getProductAdd();
        $('#state-close-btn').click();
    });

    //审核弹窗里点击审核未通过按钮
    $("#state-weitongguo-btn").click(function () {
        saleSubmit_list = state_list;
        console.log(saleSubmit_list);
        if (saleSubmit_list.length == 0) {
            swal("无审核内容！");
            return;
        }
        $.each(saleSubmit_list, function (index, row) {
            $ajax({
                type: 'post',
                url: '/chuku/updateState',
                async: false,
                data: {
                    id: row.id,
                    chukuState: '审核未通过'
                },
            }, false, '', function (res) {
            })
        });

        swal("", "审核成功！", "success");
        getList();
        getProductAdd();
        $('#state-close-btn').click();
    });

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#chukuTable');
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

        $("#update-express").val(rows[0].data.express);
        $("#update-pick").val(rows[0].data.pick);
        $("#update-warehouse").val(rows[0].data.warehouse);
        $("#update-type").val(rows[0].data.type);
        $("#update-fahuo").val(rows[0].data.fahuo);
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
            if ($('#update-productName').val() == "") {
                $('#update-productName').next().css('display', 'block');
                return;
            } else {
                $('#update-productName').next().css('display', 'none');
            }
            if ($('#update-customer').val() == "") {
                $('#update-customer').next().css('display', 'block');
                return;
            } else {
                $('#update-customer').next().css('display', 'none');
            }
            if ($('#update-type').val() == "") {
                $('#update-type').next().css('display', 'block');
                return;
            } else {
                $('#update-type').next().css('display', 'none');
            }
            if ($('#update-fahuo').val() == "") {
                $('#update-fahuo').next().css('display', 'block');
                return;
            } else {
                $('#update-fahuo').next().css('display', 'none');
            }

            let params = formToJson('#update-form');
            console.log(params)
            var update_num = $('#update-num').val();
            if (update_num == "" || update_num == 0) {
                alert("数量不能为空且不能为为0！");
            } else {
                $ajax({
                    type: 'post',
                    url: '/chuku/update',
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

    //修改弹窗点击关闭按钮
    $('#fahuo-close-btn').click(function () {
        $('#fahuo-modal').modal('hide');
    });

    //修改弹窗里点击提交按钮
    $('#fahuo-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？");
        if (msg) {
            if ($('#fahuo-pihao').val() == "") {
                $('#fahuo-pihao').next().css('display', 'block');
                return;
            } else {
                $('#fahuo-pihao').next().css('display', 'none');
            }
            if ($('#fahuo-express').val() == "") {
                $('#fahuo-express').next().css('display', 'block');
                return;
            } else {
                $('#fahuo-express').next().css('display', 'none');
            }
            if ($('#fahuo-wuliuOrder').val() == "") {
                $('#fahuo-wuliuOrder').next().css('display', 'block');
                return;
            } else {
                $('#fahuo-wuliuOrder').next().css('display', 'none');
            }

            var id = $("#fahuo-id").val();
            var pihao = $("#fahuo-pihao").val();
            var express = $("#fahuo-express").val();
            var wuliuOrder = $("#fahuo-wuliuOrder").val();
            var params = {
                id: id,
                pihao: pihao,
                express: express,
                wuliuOrder: wuliuOrder
            }

            $ajax({
                type: 'post',
                url: '/chuku/updateFahuo',
                data: {
                    id: id,
                    pihao: pihao,
                    express: express,
                    wuliuOrder: wuliuOrder
                },
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#fahuo-close-btn').click();
                    $('#fahuo-modal').modal('hide');
                    getList();
                } else {
                    swal("", res.msg, "error");
                }
            })


        }
    });

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#chukuTable");
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

    //添加窗体选择产品按钮
    $("#select-product-btn").click(function () {
        $('#show-product-modal-add').modal('show');
    });

    //产品选择点击确定
    $('#product-submit-btn-add').click(function () {
        productList = getRows("#show-table-product-add");
        if (productList.length == 0) {
            swal('请选择要保存的数据！');
        } else {
            $('#show-product-modal-add').modal('hide');
        }
    });

    //产品选择点击关闭
    $('#product-close-btn-add').click(function () {
        $('#show-product-modal-add').modal('hide');
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

                    var xiaoji = $('#add-price').val() * $('#add-num').val();
                    $('#add-xiaoji').val(xiaoji)
                });
            } else if (operation == "修改") {
                $.each(rows, function (index, row) {
                    $("#update-productId").val(row.data.id);
                    $("#update-productName").val(row.data.productName);
                    $("#update-unit").val(row.data.unit);
                    $("#update-spec").val(row.data.spec);
                    $("#update-price").val(row.data.price);

                    var xiaoji = $('#update-price').val() * $('#update-num').val();
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
        var xiaoji = $('#add-price').val() * $('#add-num').val();
        $('#add-xiaoji').val(xiaoji)
    });

    $('#update-num').change(function () {
        var xiaoji = $('#update-price').val() * $('#update-num').val();
        $('#update-xiaoji').val(xiaoji)
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
                        url: '/sale/upload',
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
                swal("请选择正确的Excel文件！");
                $('#file').val('');
            }
        }
    });

    //按指定格式导出excel
    $('#export-btn2').click(function () {
        let list = getData("#chukuTable");
        if (list.length != 1) {
            swal('请选择一条数据！');
        } else {
            $ajax({
                type: 'post',
                url: '/chuku/export',
                data: JSON.stringify({
                    list: list
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    downloadFileByBase64("浙江省磐安外贸药业有限公司发货清单.xlsx", res.data.split(',')[1])
                }
            })
        }
    });

    //打印
    //按指定格式导出excel
    $('#print-btn').click(function () {
        let list = getData("#chukuTable");
        if (list.length == 0) {
            swal('没有数据,无法打印！');
        } else {
            $ajax({
                type: 'post',
                url: '/chuku/print',
                data: JSON.stringify({
                    list: list
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {

            })
        }
    })

});

function setTable(data) {
    if ($('#chukuTable').html != '') {
        $('#chukuTable').bootstrapTable('load', data);
    }

    $('#chukuTable').bootstrapTable({
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
        height: document.body.clientHeight * 0.8,
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
                field: 'customerNum',
                title: '客户号',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'area',
                title: '区域',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'leibie',
                title: '类别',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shStaff',
                title: '收货人员',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'address',
                title: '收货地址',
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
                title: '备注',
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
                field: 'pinhao',
                title: '品号',
                align: 'center',
                sortable: true,
                width: 200,
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
                width: 200,
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
                visible:moneySel
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
                visible:moneySel
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
            // {
            //     field: 'chukuState',
            //     title: '出库审核状态',
            //     align: 'center',
            //     sortable: true,
            //     width: 150,
            //     formatter: function (value, row, index) {
            //         return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='" + row.id + "' style='text-decoration:underline;' onclick='javascript:state_select(" + row.id + ")'>" + value + "</span></div>";
            //     }
            // },
            {
                field: 'fahuo',
                title: '发货状态',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='" + row.id + "' style='text-decoration:underline;' onclick='javascript:fahuo_update(" + row.id + ")'>" + value + "</span></div>";
                }
            },
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


function setStateTable(data) {
    if ($('#show-state-table').html != '') {
        $('#show-state-table').bootstrapTable('load', data);
    }

    $('#show-state-table').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover',
        idField: 'id',
        pagination: false,
        search: true,
        searchAlign: 'left',
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
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
                field: 'address',
                title: '收货地址',
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
                title: '备注',
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
            {
                field: 'chukuState',
                title: '出库审核状态',
                align: 'center',
                sortable: true,
                width: 100,
            },
        ],
        // onClickRow: function (row, el) {
        //     let isSelect = $(el).hasClass('selected');
        //     if (isSelect) {
        //         $(el).removeClass('selected')
        //     } else {
        //         $(el).addClass('selected')
        //     }
        // }
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

function setProductTable_Add(data) {
    if ($('#show-table-product-add').html() != '') {
        $('#show-table-product-add').bootstrapTable('load', data);
    }
    $('#show-table-product-add').bootstrapTable({
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
                field: 'saleType',
                title: '发货类型',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return getXiaLa(row.id);
                },
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'left',
                sortable: true,
                width: 150,
            }, {
                field: 'spec',
                title: '规格',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '产品属性',
                align: 'center',
                sortable: true,
                width: 150,
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
                formatter: function (value, row, index) {
                    var price = value;
                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            price = val.price
                        }
                    });

                    return '<input type="number" name="price" id="price' + row.id + '" class="form-control" value="' + price + '" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            }, {
                field: '',
                title: '数量',
                align: 'left',
                sortable: true,
                width: 150,
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
                field: '',
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

                    return '<input type="text" name="remarks" id="remarks' + row.id + '" class="form-control" value="' + remarks + '" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            }
        ],
    })
}

function state_select(index) {
    state_list = []
    var this_list = []
    var this_date = ""
    var this_customer = ""
    var this_state = ""
    let rows = sale_list
    console.log(rows)
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].id == index) {
            this_date = rows[i].riqi
            this_customer = rows[i].customerId
            this_state = rows[i].chukuState
            break;
        }
    }
    console.log(this_date)
    console.log(this_customer)
    console.log(this_state)

    if (this_state != '审核中') {
        swal("此销售信息无需审核！")
        return;
    }

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].riqi == this_date && rows[i].customerId == this_customer && rows[i].chukuState == this_state) {
            this_list.push(rows[i])
        }
    }

    console.log(this_list)
    state_list = this_list
    setStateTable(this_list)
    $('#state-modal').modal('show');
}

function getLinshiData(id) {
    var pd = false;
    var productId = id;
    var saleType = $("#saleType" + productId).val();
    var price = $("#price" + productId).val();
    var num = $("#num" + productId).val();
    var remarks = $("#remarks" + productId).val();

    var obj = {
        "id": productId,
        "saleType": saleType,
        "price": price,
        "num": num,
        "remarks": remarks,
    };

    $(linshi_data).each(function (index, val) {
        if (productId == val.id) {
            pd = true;
            linshi_data[index].saleType = saleType;
            linshi_data[index].price = price;
            linshi_data[index].num = num;
            linshi_data[index].remarks = remarks;
        }
    });
    if (!pd) {
        linshi_data.push(obj);
    }

}

function fahuo_update(index) {
    state_list = []
    var this_id = ""
    var this_pihao = ""
    var this_express = ""
    var this_wuliuOrder = ""
    var this_fahuo = ""
    var this_chuku_state = ""
    let rows = sale_list
    console.log(rows)
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].id == index) {
            this_id = rows[i].id
            this_pihao = rows[i].pihao
            this_express = rows[i].express
            this_wuliuOrder = rows[i].wuliuOrder
            this_fahuo = rows[i].fahuo
            this_chuku_state = rows[i].chukuState
            break;
        }
    }

    // if(this_chuku_state != '审核通过'){
    //     swal('此产品未审核通过，不能发货。')
    //     return;
    // }

    if (this_fahuo == '已发货') {
        swal('此产品无需再次发货')
        return;
    }

    console.log(this_id)

    $('#fahuo-id').val(this_id);
    $('#fahuo-pihao').val(this_pihao);
    $('#fahuo-express').val(this_express);
    $('#fahuo-wuliuOrder').val(this_wuliuOrder);

    $('#fahuo-modal').modal('show');
}

function getRows(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    for (var i = 0; i < tableData.length; i++) {
        if (tableData[i][0] == true) {
            for (var j = 0; j < linshi_data.length; j++) {
                if (tableData[i].id == linshi_data[j].id) {
                    result.push({
                        id: linshi_data[j].id,
                        saleType: linshi_data[j].saleType,
                        price: linshi_data[j].price,
                        num: linshi_data[j].num,
                        remarks: linshi_data[j].remarks,
                        riqi: '',
                        customerId: '',
                        shStaff: '',
                        pick: '',
                        type: '',
                    })
                }
            }
        }
    }



    // $(tableEl + ' tr').each(function (i, tr) {
    //     let saleType = $(tr).children().eq(2).children().val();
    //     let price = $(tr).children().eq(7).children().val();
    //     let num = $(tr).children().eq(8).children().val();
    //     let remarks = $(tr).children().eq(9).children().val();
    //     let index = $(tr).data('index');
    //     if (index != undefined) {
    //         if ($(tr).hasClass('selected')) {
    //             result.push({
    //                 index: index,
    //                 data: tableData[index],
    //                 saleType: saleType,
    //                 price: price,
    //                 num: num,
    //                 remarks: remarks,
    //                 riqi: '',
    //                 customerId: '',
    //                 shStaff: '',
    //                 pick: '',
    //                 type: '',
    //             })
    //         }
    //     }
    // });
    return result;
}

function getData(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let index = $(tr).data('index');
        if (index != undefined) {
            if ($(tr).hasClass('selected')) {
                result.push({
                    index: index,
                    productName: tableData[index].productName,
                    spec: tableData[index].spec,
                    num: tableData[index].num,
                    unit: tableData[index].unit,
                    price: tableData[index].price,
                    pihao: tableData[index].pihao,
                    riqi: tableData[index].riqi,
                    customerId: tableData[index].customerId,

                })
            }
        }
    });
    return result;
}


function getXiaLa(id) {
    var select = "<select name=\"saleType\" class=\"form-control\" id='saleType" + id + "' onchange=\"javascript:getLinshiData(" + id + ")\" style='font-size: 13px' >";
    select = select + opt;
    select = select + "<select/>";
    return select;
}


function dataURLtoBlob(dataurl, name) {//name:文件名
    var mime = name.substring(name.lastIndexOf('.') + 1)//后缀名
    var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function downloadFile(url, name = '默认文件名') {
    var a = document.createElement("a")//创建a标签触发点击下载
    a.setAttribute("href", url)//附上
    a.setAttribute("download", name);
    a.setAttribute("target", "_blank");
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

//主函数
function downloadFileByBase64(name, base64) {
    var myBlob = dataURLtoBlob(base64, name);
    var myUrl = URL.createObjectURL(myBlob);
    downloadFile(myUrl, name)
}

//获取后缀
function getType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1 + 1, index2);
    return type;
}

//根据文件后缀 获取base64前缀不同
function getBase64Type(type) {
    switch (type) {
        case 'data:text/plain;base64':
            return 'txt';
        case 'data:application/msword;base64':
            return 'doc';
        case 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64':
            return 'docx';
        case 'data:application/vnd.ms-excel;base64':
            return 'xls';
        case 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64':
            return 'xlsx';
        case 'data:application/pdf;base64':
            return 'pdf';
        case 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64':
            return 'pptx';
        case 'data:application/vnd.ms-powerpoint;base64':
            return 'ppt';
        case 'data:image/png;base64':
            return 'png';
        case 'data:image/jpeg;base64':
            return 'jpg';
        case 'data:image/gif;base64':
            return 'gif';
        case 'data:image/svg+xml;base64':
            return 'svg';
        case 'data:image/x-icon;base64':
            return 'ico';
        case 'data:image/bmp;base64':
            return 'bmp';
    }
}

function base64ToBlob(code) {
    code = code.replace(/[\n\r]/g, '');
    const raw = window.atob(code);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {type: 'application/pdf'})
}


function toExcel() {

    var ks = $('#ks').val();
    var js = $('#js').val();
    var customer = $('#customer').val();
    var product = $('#product').val();
    var pihao = $('#pihao').val();
    var saleType = $('#saleType').val();
    $ajax({
        type: 'post',
        url: '/chuku/queryList',
        data: {
            ks: ks,
            js: js,
            customer: customer,
            product: product,
            pihao: pihao,
            saleType: saleType,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            var array = res.data
            var header = []
            var title = []
            if(moneySel){
                for (var i = 0; i < array.length; i++) {
                    var body = {
                        riqi: array[i].riqi,
                        customer: array[i].customer,
                        customerNum:array[i].customerNum,
                        area: array[i].area,
                        leibie: array[i].leibie,
                        shStaff: array[i].shStaff,
                        address: array[i].address,
                        salesman: array[i].salesman,
                        pick: array[i].pick,
                        warehouse: array[i].warehouse,
                        express: array[i].express,
                        wuliuOrder: array[i].wuliuOrder,
                        saleType: array[i].saleType,
                        pihao: array[i].pihao,
                        productName: array[i].productName,
                        pinhao: array[i].pinhao,
                        spec: array[i].spec,
                        attribute: array[i].attribute,
                        unit: array[i].unit,
                        price: array[i].price,
                        num: array[i].num,
                        xiaoji: array[i].xiaoji,
                        remarks: array[i].remarks,
                        type: array[i].type,
                        fahuo: array[i].fahuo,
                    }
                    header.push(body)
                }
                console.log(header)
                title = ['日期','客户名称','客户号', '区域', '类别', '收货人员', '收货地址', '业务员', '拿货方式','仓库','快递公司','备注', '发货类型','批号', '产品名称', '品号', '规格', '产品属性', '单位', '销售单价', '销售数量', '小计', '备注', '类型', '发货状态']
            }else{
                for (var i = 0; i < array.length; i++) {
                    var body = {
                        riqi: array[i].riqi,
                        customer: array[i].customer,
                        customerNum:array[i].customerNum,
                        area: array[i].area,
                        leibie: array[i].leibie,
                        shStaff: array[i].shStaff,
                        address: array[i].address,
                        salesman: array[i].salesman,
                        pick: array[i].pick,
                        warehouse: array[i].warehouse,
                        express: array[i].express,
                        wuliuOrder: array[i].wuliuOrder,
                        saleType: array[i].saleType,
                        pihao: array[i].pihao,
                        productName: array[i].productName,
                        pinhao: array[i].pinhao,
                        spec: array[i].spec,
                        attribute: array[i].attribute,
                        unit: array[i].unit,
                        num: array[i].num,
                        remarks: array[i].remarks,
                        type: array[i].type,
                        fahuo: array[i].fahuo,
                    }
                    header.push(body)
                }
                console.log(header)
                title = ['日期','客户名称','客户号', '区域', '类别', '收货人员', '收货地址', '业务员', '拿货方式','仓库','快递公司','备注', '发货类型','批号', '产品名称', '品号', '规格', '产品属性', '单位', '销售数量', '备注', '类型', '发货状态']
            }

            JSONToExcelConvertor(header, "出库", title)

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