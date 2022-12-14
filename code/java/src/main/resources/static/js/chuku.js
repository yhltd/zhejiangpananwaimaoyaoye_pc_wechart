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

    //??????
    $("#refresh-btn").click(function () {
        getList();
        getSelect();
        getProductAdd();
    });

    //?????????
    $("#shenhezhong-btn").click(function () {
        $ajax({
            type: 'post',
            url: '/chuku/getList_shenhezhong',
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

    //????????????
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

    //???????????????
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

    //??????????????????????????????
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

    //?????????????????????????????????
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //?????????????????????????????????
    $('#state-close-btn').click(function () {
        $('#state-modal').modal('hide');
    });

    //?????????????????????????????????
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");

        if (productList.length == 0) {
            swal("??????????????????");
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

        swal("", "???????????????", "success");
        $('#add-customer').next().css('display', 'none');

        getList();
        getProductAdd();
        $('#add-close-btn').click();

    });


    //???????????????????????????????????????
    $("#state-tongguo-btn").click(function () {
        saleSubmit_list = state_list
        console.log(saleSubmit_list)
        if (saleSubmit_list.length == 0) {
            swal("??????????????????");
            return;
        }
        $.each(saleSubmit_list, function (index, row) {
            $ajax({
                type: 'post',
                url: '/chuku/updateState',
                async: false,
                data: {
                    id: row.id,
                    chukuState: '????????????'
                },
            }, false, '', function (res) {
            })
        });

        swal("", "???????????????", "success");
        getList();
        getProductAdd();
        $('#state-close-btn').click();
    });

    //??????????????????????????????????????????
    $("#state-weitongguo-btn").click(function () {
        saleSubmit_list = state_list;
        console.log(saleSubmit_list);
        if (saleSubmit_list.length == 0) {
            swal("??????????????????");
            return;
        }
        $.each(saleSubmit_list, function (index, row) {
            $ajax({
                type: 'post',
                url: '/chuku/updateState',
                async: false,
                data: {
                    id: row.id,
                    chukuState: '???????????????'
                },
            }, false, '', function (res) {
            })
        });

        swal("", "???????????????", "success");
        getList();
        getProductAdd();
        $('#state-close-btn').click();
    });

    //??????????????????????????????
    $('#update-btn').click(function () {
        let rows = getTableSelection('#chukuTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('???????????????????????????!');
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

    //??????????????????????????????
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    });

    //?????????????????????????????????
    $('#update-submit-btn').click(function () {
        var msg = confirm("?????????????????????");
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
                alert("?????????????????????????????????0???");
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

    //??????????????????????????????
    $('#fahuo-close-btn').click(function () {
        $('#fahuo-modal').modal('hide');
    });

    //?????????????????????????????????
    $('#fahuo-submit-btn').click(function () {
        var msg = confirm("?????????????????????");
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

    //??????????????????
    $('#delete-btn').click(function () {
        var msg = confirm("?????????????????????");
        if (msg) {
            let rows = getTableSelection("#chukuTable");
            if (rows.length == 0) {
                swal('??????????????????????????????');
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

    //??????????????????????????????
    $("#select-product-btn").click(function () {
        $('#show-product-modal-add').modal('show');
    });

    //????????????????????????
    $('#product-submit-btn-add').click(function () {
        productList = getRows("#show-table-product-add");
        if (productList.length == 0) {
            swal('??????????????????????????????');
        } else {
            $('#show-product-modal-add').modal('hide');
        }
    });

    //????????????????????????
    $('#product-close-btn-add').click(function () {
        $('#show-product-modal-add').modal('hide');
    });


    //?????????????????????????????????
    $("#update-productName").click(function () {
        operation = "??????";
        getProduct();
    });

    //????????????????????????
    $("#product-close-btn").click(function () {
        $('#show-product-modal').modal('hide');
    });

    //????????????????????????
    $("#product-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-product");
        if (rows.length != 1) {
            swal('?????????????????????');
        } else {
            if (operation == "??????") {
                $.each(rows, function (index, row) {
                    $("#add-productId").val(row.data.id);
                    $("#add-productName").val(row.data.productName);
                    $("#add-unit").val(row.data.unit);
                    $("#add-spec").val(row.data.spec);
                    $("#add-price").val(row.data.price);

                    var xiaoji = $('#add-price').val() * $('#add-num').val();
                    $('#add-xiaoji').val(xiaoji)
                });
            } else if (operation == "??????") {
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


    //?????????????????????????????????
    $("#add-customer").click(function () {
        operation = "??????";
        getCustomer();
    });

    //?????????????????????????????????
    $("#update-customer").click(function () {
        operation = "??????";
        getCustomer();
    });

    //????????????????????????
    $("#customer-close-btn").click(function () {
        $('#show-customer-modal').modal('hide');
    });

    //????????????????????????
    $("#customer-submit-btn").click(function () {
        let rows = getTableSelection("#show-table-customer");
        if (rows.length != 1) {
            swal('?????????????????????');
        } else {
            if (operation == "??????") {
                $.each(rows, function (index, row) {
                    $("#add-customerId").val(row.data.id);
                    $("#add-customer").val(row.data.customer);
                });
            } else if (operation == "??????") {
                $.each(rows, function (index, row) {
                    $("#update-customerId").val(row.data.id);
                    $("#update-customer").val(row.data.customer);
                });
            }
            $('#show-customer-modal').modal('hide');
        }
    });

    //??????????????????
    $('#add-num').change(function () {
        var xiaoji = $('#add-price').val() * $('#add-num').val();
        $('#add-xiaoji').val(xiaoji)
    });

    $('#update-num').change(function () {
        var xiaoji = $('#update-price').val() * $('#update-num').val();
        $('#update-xiaoji').val(xiaoji)
    });

    //??????excel
    $('#import-btn').click(function () {
        $('#file').trigger('click');
    });

    //?????????????????????
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
                swal("??????????????????Excel?????????");
                $('#file').val('');
            }
        }
    });

    //?????????????????????excel
    $('#export-btn2').click(function () {
        let list = getData("#chukuTable");
        if (list.length != 1) {
            swal('????????????????????????');
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
                    downloadFileByBase64("???????????????????????????????????????????????????.xlsx", res.data.split(',')[1])
                }
            })
        }
    });

    //??????
    //?????????????????????excel
    $('#print-btn').click(function () {
        let list = getData("#chukuTable");
        if (list.length == 0) {
            swal('????????????,???????????????');
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
        pageSize: 15,//???????????????
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//????????????????????????
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.8,
        columns: [
            {
                field: '',
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'customerId',
                title: '??????id',
                align: 'center',
                sortable: true,
                width: 100,
                visible: false,
            }, {
                field: 'riqi',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customer',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customerNum',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'area',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'leibie',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shStaff',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'address',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'salesman',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pick',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'warehouse',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'express',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'wuliuOrder',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'saleType',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'pihao',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'productName',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pinhao',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'spec',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'num',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xiaoji',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'remarks',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'type',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            // {
            //     field: 'chukuState',
            //     title: '??????????????????',
            //     align: 'center',
            //     sortable: true,
            //     width: 150,
            //     formatter: function (value, row, index) {
            //         return "<div title='" + value + "'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\"" + row.id + "\",true)'><span id='" + row.id + "' style='text-decoration:underline;' onclick='javascript:state_select(" + row.id + ")'>" + value + "</span></div>";
            //     }
            // },
            {
                field: 'fahuo',
                title: '????????????',
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
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customer',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'shStaff',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'address',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'salesman',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pick',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'warehouse',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'express',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'wuliuOrder',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'saleType',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'pihao',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'productName',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'spec',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            },
            {
                field: 'unit',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'num',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xiaoji',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'remarks',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'type',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },
            {
                field: 'chukuState',
                title: '??????????????????',
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
        pageSize: 10,//???????????????
        clickToSelect: true,
        locale: 'zh-CN',
        columns: [
            {
                field: '',
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'productName',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'spec',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'pinyin',
                title: '????????????',
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
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'customer',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pinyin',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'phone',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'address',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '??????',
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
        pageSize: 5,//???????????????
        clickToSelect: false,
        locale: 'zh-CN',
        columns: [
            {
                checkbox: true
            }, {
                field: '',
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'saleType',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    return getXiaLa(row.id);
                },
            }, {
                field: 'productName',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 150,
            }, {
                field: 'spec',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'unit',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 150,
            }, {
                field: 'price',
                title: '??????',
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
                title: '??????',
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
                title: '??????',
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

    if (this_state != '?????????') {
        swal("??????????????????????????????")
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

    // if(this_chuku_state != '????????????'){
    //     swal('??????????????????????????????????????????')
    //     return;
    // }

    if (this_fahuo == '?????????') {
        swal('???????????????????????????')
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


function dataURLtoBlob(dataurl, name) {//name:?????????
    var mime = name.substring(name.lastIndexOf('.') + 1)//?????????
    var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function downloadFile(url, name = '???????????????') {
    var a = document.createElement("a")//??????a????????????????????????
    a.setAttribute("href", url)//??????
    a.setAttribute("download", name);
    a.setAttribute("target", "_blank");
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

//?????????
function downloadFileByBase64(name, base64) {
    var myBlob = dataURLtoBlob(base64, name);
    var myUrl = URL.createObjectURL(myBlob);
    downloadFile(myUrl, name)
}

//????????????
function getType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1 + 1, index2);
    return type;
}

//?????????????????? ??????base64????????????
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