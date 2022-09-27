let customerId = 0;

function getList() {
    $('#customer').val("");
    $ajax({
        type: 'post',
        url: '/customer/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#customerTable").colResizable({
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
                if (res.data[i].customerType != null && res.data[i].customerType != "") {
                    item = "<option value=\"" + res.data[i].customerType + "\">" + res.data[i].customerType + "</option>"
                    $("#add-leibie").append(item);
                    $("#update-leibie").append(item);
                    $("#leibie").append(item);
                }
                if (res.data[i].area != null && res.data[i].area != "") {
                    item = "<option value=\"" + res.data[i].area + "\">" + res.data[i].area + "</option>"
                    $("#add-area").append(item);
                    $("#update-area").append(item);
                    $("#area").append(item);
                }
            }
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
            type: "客户信息",
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            customerId = id;
            setFileTable(res.data);
            $('#show-file-modal').modal('show');
        }
    })
}

$(function () {
    getList();
    getSelect();
    $('#select-btn').click(function () {
        var customer = $('#customer').val();
        var leibie = $('#leibie').val();
        var area = $('#area').val();
        $ajax({
            type: 'post',
            url: '/customer/queryList',
            data: {
                customer: customer,
                leibie:leibie,
                area:area,
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
        if (checkForm('#add-form')) {
            $ajax({
                type: 'post',
                url: '/customer/add',
                data: JSON.stringify({
                    addInfo: params
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#add-form')[0].reset();
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
        let rows = getTableSelection('#customerTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-leibie').val(rows[0].data.leibie)
        $('#update-area').val(rows[0].data.area)
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
                    url: '/customer/update',
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
            let rows = getTableSelection("#customerTable");
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
                url: '/customer/delete',
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
                "type": "客户信息",
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
                fileInput.outerHTML = fileInput.outerHTML;
            })
        };
    });

    $('#file-down-btn').click(function () {
        let rows = getTableSelection('#show-table-file');
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一个文件下载');
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
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#show-table-file");
            if (rows.length == 0) {
                alert('请选择要删除的数据！');
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

    //上传excel
    $('#import-btn').click(function () {
        $('#file2').trigger('click');
    });

    //判断文件名改变
    $('#file2').change(function () {
        var url = null;
        if ($('#file2').val() != '') {
            if ($('#file2').val().substr(-5) == '.xlsx') {
                var excel = document.getElementById("file2").files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(excel);
                oFReader.onloadend = function (oFRevent) {
                    url = oFRevent.target.result;
                    $ajax({
                        type: 'post',
                        url: '/customer/upload',
                        data: {
                            excel: url
                        },
                    }, false, '', function (res) {
                        $('#file2').val('');
                        swal(res.msg);
                        if (res.code == 200) {
                            getList();
                        }
                    })
                }
            } else {
                swal("请选择正确的Excel文件！")
                $('#file2').val('');
            }
        }
    })

});

function setTable(data) {
    if ($('#customerTable').html != '') {
        $('#customerTable').bootstrapTable('load', data);
    }

    $('#customerTable').bootstrapTable({
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
                title: '添加日期',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'customerNum',
                title: '客户号',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'leibie',
                title: '客户类别',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'area',
                title: '区域',
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
                field: 'pinyin',
                title: '字母代码',
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
                field: 'price',
                title: '价格',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'phone',
                title: '联系电话',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'address',
                title: '收货地址',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'ghye',
                title: '往期购货余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zsye',
                title: '往期赠送余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'remarks',
                title: '备注',
                align: 'center',
                sortable: true,
                width: 300,
            }, {
                field: '',
                title: '文件',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-sm btn-primary">查看</button>'
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
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'fileName',
                title: '文件名',
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

function fileDown(id) {
    $ajax({
        type: 'post',
        url: '/customer/getFile',
        data: {
            id: id,
        },
        async: false,
    }, false, '', function (res) {
        if (res.data[0].fileName != '' && res.data[0].fileName != null) {
            downloadFileByBase64(res.data[0].fileName, res.data[0].file.split(',')[1])
        } else {
            swal('请先上传文件！')
        }
    })
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