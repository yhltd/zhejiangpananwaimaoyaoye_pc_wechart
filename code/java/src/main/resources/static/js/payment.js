let operation="";

function getList() {
    $('#customer').val("");
    $ajax({
        type: 'post',
        url: '/payment/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#paymentTable").colResizable({
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
                if (res.data[i].pay != null && res.data[i].pay != "") {
                    item = "<option value=\"" + res.data[i].pay + "\">" + res.data[i].pay + "</option>"
                    $("#add-pay").append(item);
                    $("#update-pay").append(item);
                }
            }
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


function kanbanSelect(){
    var tiaojian = $.session.get('kanban_goto');
    $.session.remove('kanban_goto');
    console.log(tiaojian)
    if(tiaojian != undefined){
        $ajax({
            type: 'post',
            url: '/payment/kanbanList',
            data: {
                riqi: tiaojian.split("`")[0],
                riqi1: tiaojian.split("`")[1],
                riqi2: tiaojian.split("`")[2],
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                console.log(res.data)
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

    $('#select-btn').click(function () {
        var customer = $('#customer').val();
        $ajax({
            type: 'post',
            url: '/payment/queryList',
            data: {
                customer: customer,
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

    //??????????????????????????????
    $("#add-btn").click(function () {
        var time = new Date();
        var day = ("0" + time.getDate()).slice(-2);
        var month = ("0" + (time.getMonth() + 1)).slice(-2);
        var today = time.getFullYear() + "-" + (month) + "-" + (day);
        $('#add-riqi').val(today);
        $('#add-modal').modal('show');
    });

    //?????????????????????????????????
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    });

    //?????????????????????????????????
    $("#add-submit-btn").click(function () {
        let params = formToJson("#add-form");
        if ($('#add-customer').val()!="") {
            $ajax({
                type: 'post',
                url: '/payment/add',
                data: JSON.stringify({
                    addInfo: params
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#add-form')[0].reset();
                    $('#add-customer').next().css('display','none');
                    getList();
                    $('#add-close-btn').click();
                } else {
                    swal("", res.msg, "error");
                }
            })
        }else{
            $('#add-customer').next().css('display','block');
        }
    });

    //??????????????????????????????
    $('#update-btn').click(function () {
        let rows = getTableSelection('#paymentTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('???????????????????????????!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-customer').val(rows[0].data.customer);
        $('#update-rJine').val(rows[0].data.rjine);
        $('#update-fJine').val(rows[0].data.fjine);
        $("#update-pay").val(rows[0].data.pay);
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
            if (checkForm('#update-form')) {
                let params = formToJson('#update-form');
                $ajax({
                    type: 'post',
                    url: '/payment/update',
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

    //??????????????????
    $('#delete-btn').click(function () {
        var msg = confirm("?????????????????????");
        if (msg) {
            let rows = getTableSelection("#paymentTable");
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
                url: '/payment/delete',
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
            return;
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
    })

    $('#file').change(function () {
        var file = document.getElementById("file").files;
        var oFReader = new FileReader();
        var this_file = file[0];
        var fileName = file[0].name;
        var obj = [];
        oFReader.readAsDataURL(this_file);
        oFReader.onloadend = function (oFRevent) {
            this_file = oFRevent.target.result;
            obj = {
                "otherId": customerId,
                "fileName": fileName,
                "files": this_file,
                "type": "???????????????",
            };
            $ajax({
                type: 'post',
                url: '/file_table/add',
                data: JSON.stringify({
                    addInfo: obj
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                async: false,
            }, false, '', function (res) {
                if (res.code == 200) {
                    fileShow(customerId);
                    swal("", res.msg, "success");
                } else {
                    swal("", res.msg, "error");
                }
                var fileInput = document.getElementById('file');
                fileInput.value = '';
            })
        };
    });

    $('#file-down-btn').click(function () {
        let rows = getTableSelection('#show-table-file');
        if (rows.length > 1 || rows.length == 0) {
            alert('???????????????????????????');
            return;
        }
        $ajax({
            type: 'post',
            url: '/file_table/getFile',
            data: {
                id: rows[0].data.id,
            },
            async: false,
        }, false, '', function (res) {
            if (res.data[0].fileName != '' && res.data[0].fileName != null) {
                downloadFileByBase64(res.data[0].fileName, res.data[0].files.split(',')[1])
            }
        })
    });

    $('#file-up-btn').click(function () {
        $('#file').trigger('click');
    });

    $('#file-delete-btn').click(function () {
        var msg = confirm("?????????????????????");
        if (msg) {
            let rows = getTableSelection("#show-table-file");
            if (rows.length == 0) {
                alert('??????????????????????????????');
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            });
            $ajax({
                type: 'post',
                url: '/file_table/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal('', res.msg, 'success');
                    fileShow(customerId);
                }
            })
        }
    });

    $('#file-close-btn').click(function () {
        $('#show-file-modal').modal('hide');
        customerId = 0;
    });

});

function setTable(data) {
    if ($('#paymentTable').html != '') {
        $('#paymentTable').bootstrapTable('load', data);
    }

    $('#paymentTable').bootstrapTable({
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
                field: 'riqi',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customer',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'customerNum',
                title: '?????????',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'area',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'leibie',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'quota',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'fjine',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'rjine',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'discount',
                title: '????????????',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'pay',
                title: '????????????',
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
                field: '',
                title: '??????',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-sm btn-primary">??????</button>'
                }
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
        url: '/payment/updateState',
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
        url: '/payment/updateState',
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

function fileShow(id) {
    $('#customer').val("");
    $ajax({
        type: 'post',
        url: '/file_table/getList',
        data: {
            otherId: id,
            type: "???????????????",
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            customerId = id;
            setFileTable(res.data);
            $('#show-file-modal').modal('show');
        }
    })
}

function setFileTable(data) {
    if ($('#show-table-file').html != '') {
        $('#show-table-file').bootstrapTable('load', data);
    }

    $('#show-table-file').bootstrapTable({
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
                field: 'fileName',
                title: '?????????',
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