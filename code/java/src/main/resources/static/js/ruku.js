let operation = "";
let opt = "";
let ruku_data = [];
let linshi_data = [];

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

function kanbanSelect() {
    var tiaojian = $.session.get('kanban_goto');
    console.log(tiaojian);
    if (tiaojian != undefined) {
        var riqi = tiaojian.split("`")[0];
        var salesman = tiaojian.split("`")[2];
        var type = tiaojian.split("`")[3];
        console.log(riqi);
        console.log(salesman);
        console.log(type);
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


window.onload = function () {
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

    //??????
    $("#refresh-btn").click(function () {
        getList();
    });

    //?????????
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

    //????????????
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

    //???????????????
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

    //??????????????????????????????
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

    //????????????????????????
    $('#add-ruku-close-btn').click(function () {
        $('#add-ruku-modal').modal('hide');
    });

    //????????????????????????
    $('#add-ruku-submit-btn').click(function () {
        var cishu=1;
        let rows = getRows("#add-table-ruku");
        if (rows.length == 0) {
            alert('??????????????????????????????');
            return;
        }
        $.each(rows, function (index, row) {
            $ajax({
                type: 'post',
                url: '/ruku/insert',
                data: {
                    warehouse: row.warehouse,
                    productDate: row.productDate,
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
        //swal("???????????????");
        $('#add-ruku-modal').modal('hide');
        getList();
    });

    //?????????????????????????????????
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //?????????????????????????????????
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        var add_num = $('#add-num').val();
        if (add_num == "" || add_num == 0) {
            alert("?????????????????????????????????0???");
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

    //??????????????????????????????
    $('#update-btn').click(function () {
        let rows = getTableSelection('#rukuTable');
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


        $("#update-warehouse").val(rows[0].data.warehouse);
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
            if ($('#update-productName').val() != "") {
                let params = formToJson('#update-form');
                var update_num = $('#update-num').val();
                if (update_num == "" || update_num == 0) {
                    alert("?????????????????????????????????0???");
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

    //??????????????????
    $('#delete-btn').click(function () {
        var msg = confirm("?????????????????????");
        if (msg) {
            let rows = getTableSelection("#rukuTable");
            if (rows.length == 0) {
                swal('??????????????????????????????');
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

    //????????????????????????????????????
    $("#add-productName").click(function () {
        operation = "??????";
        getProduct();
    });

    //????????????????????????????????????
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
                });
            } else if (operation == "??????") {
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

    //??????excel
    $('#import-btn').click(function () {
        $('#file').trigger('click');
    });

    //?????????????????????
    $('#file').change(function () {
        var url = null;
        if ($('#file').val() != '') {
            if ($('#file').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("file").files[0];
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
                swal("??????????????????Excel?????????");
                $('#file').val('');
            }
        }
    });

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
        pageSize: 15,//???????????????
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//????????????????????????
        style: 'table-layout:fixed',
        height: document.body.clientHeight * 0.87,
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
                field: 'productId',
                title: '??????id',
                visible: false,
            }, {
                field: 'riqi',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'warehouse',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'staff',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'productDate',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'validity',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'productName',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'pinhao',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
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
                field: 'pihao',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'num',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'unit',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'state',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: '',
                title: '??????',
                align: 'center',
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:pass(' + row.id + ')" class="btn-sm btn-primary">??????</button> <button onclick="javascript:refuse(' + row.id + ')" class="btn-sm btn-primary">??????</button>'
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
        },
    })
}

function pass(id) {
    $ajax({
        type: 'post',
        url: '/ruku/updateState',
        data: {
            state: "????????????",
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
            state: "???????????????",
            id: id,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            getList();
        }
    })
}

function getXiaLa(id) {
    var select = "<select name=\"warehouse\" id='warehouse" + id + "'  class=\"form-control\" style=\"font-size: 13px\"  onchange=\"javascript:getLinshiData(" + id + ")\" >";
    select = select + opt;
    select = select + "<select/>";
    return select;
}

function getLinshiData(id) {
    var pd = false;
    var productId = id;
    var warehouse = $("#warehouse" + productId).val();
    var num = $("#num" + productId).val();
    var productDate = $("#today" + productId).val();
    var pihao = $("#pihao" + productId).val();
    var validity = $("#validity" + productId).val();
    var remarks = $("#remarks" + productId).val();

    var obj = {
        "id": productId,
        "warehouse": warehouse,
        "num": num,
        "productDate": productDate,
        "pihao": pihao,
        "validity": validity,
        "remarks": remarks
    };

    $(linshi_data).each(function (index, val) {
        if (productId == val.id) {
            pd = true;
            linshi_data[index].warehouse = warehouse;
            linshi_data[index].num = num;
            linshi_data[index].productDate = productDate;
            linshi_data[index].pihao = pihao;
            linshi_data[index].validity = validity;
            linshi_data[index].remarks = remarks;
        }
    });
    if (!pd) {
        linshi_data.push(obj);
    }

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
                        warehouse: linshi_data[j].warehouse,
                        productDate: linshi_data[j].productDate,
                        num: linshi_data[j].num,
                        pihao: linshi_data[j].pihao,
                        remarks: linshi_data[j].remarks,
                        validity: linshi_data[j].validity,
                    })
                }
            }
        }
    }
    // $(tableEl + ' tr').each(function (i, tr) {
    //     let warehouse = $(tr).children().eq(2).children().val();
    //     let productDate = $(tr).children().eq(3).children().val();
    //     let num = $(tr).children().eq(4).children().val();
    //     let pihao = $(tr).children().eq(5).children().val();
    //     let validity = $(tr).children().eq(6).children().val();
    //     let remarks = $(tr).children().eq(13).children().val();
    //     let index = $(tr).data('index');
    //     if (index != undefined) {
    //         if ($(tr).hasClass('selected')) {
    //             result.push({
    //                 index: index,
    //                 data: tableData[index],
    //                 warehouse: warehouse,
    //                 productDate: productDate,
    //                 num: num,
    //                 pihao: pihao,
    //                 remarks: remarks,
    //                 validity: validity,
    //             })
    //         }
    //     }
    // });
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
            let isSelect = $(el).hasClass('selected');
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
        pageSize: 5,//???????????????
        clickToSelect: false,
        locale: 'zh-CN',
        //maintainSelected: true,//??????????????????????????????????????? true ?????????????????????????????????????????????
        columns: [
            {
                checkbox: true,
            },{
                field: '',
                title: '??????',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'warehouse',
                title: '??????',
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
                field: 'productDate',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 150,
                formatter: function (value, row, index) {
                    var time = new Date();
                    var day = ("0" + time.getDate()).slice(-2);
                    var month = ("0" + (time.getMonth() + 1)).slice(-2);
                    var productDate = time.getFullYear() + "-" + (month) + "-" + (day);

                    $(linshi_data).each(function (index, val) {
                        if (row.id == val.id) {
                            productDate = val.productDate
                        }
                    });

                    return '<input type="date" value="' + productDate + '" id="today' + row.id + '" class="form-control" name="productDate" style="font-size: 13px"  onchange="javascript:getLinshiData(' + row.id + ')" />'

                }
            }, {
                field: '',
                title: '??????',
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
                title: '??????',
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
                title: '?????????',
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

                    return '<input type="date" value="' + validity + '" id="validity' + row.id + '" class="form-control" name="productDate" style="font-size: 13px" onchange="javascript:getLinshiData(' + row.id + ')" />'
                }
            }, {
                field: 'productName',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'spec',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 80,
            }, {
                field: 'price',
                title: '??????',
                align: 'left',
                sortable: true,
                width: 80,
            }, {
                field: 'pinyin',
                title: '????????????',
                align: 'left',
                sortable: true,
                width: 100,
            }, {
                field: 'remarks',
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

                    return '<input type="text" name="remarks" id="remarks' + row.id + '" value="' + remarks + '" class="form-control" style="font-size: 13px" oninput="javascript:getLinshiData(' + row.id + ')" />'
                }
            },
        ],
        // onCheck: function (row) {
        //     var warehouse = $('#warehouse' + row.id).val();
        //     var num = $('#num' + row.id).val();
        //     var productDate = $('#today' + row.id).val();
        //     var pihao = $('#pihao' + row.id).val();
        //     var remarks = $('#remarks' + row.id).val();
        //     var validity = $('#validity' + row.id).val();
        //
        //     ruku_data.push({
        //         num: num,
        //         productDate: productDate,
        //         pihao: pihao,
        //         remarks: remarks,
        //         validity: validity,
        //         warehouse: warehouse,
        //         productId: row.id,
        //     });
        // },
        // onUncheck: function (row) {
        //     for (var i = 0; i < ruku_data.length; i++) {
        //         if (ruku_data[i].productId == row.id) {
        //             ruku_data.splice(i, 1)
        //         }
        //     }
        // },
        // onClickRow: function (row, el) {
        //     let isSelect = $(el).hasClass('selected');
        //     if (isSelect) {
        //         $(el).removeClass('selected')
        //     } else {
        //         $(el).addClass('selected')
        //     }
        // }
    });


}