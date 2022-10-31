let approvalId = 0;

function getList() {
    $('#type').val("");
    $ajax({
        type: 'post',
        url: '/approval/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#approvalTable").colResizable({
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
        url: '/user/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            var item = "";
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].name != null && res.data[i].name != "") {
                    item = "<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"
                    $("#userId").append(item);
                }
            }
        }
    })
}



$(function () {
    getList();
    getSelect();
    $('#select-btn').click(function () {
        var type = $('#type').val();
        var state = $('#state').val();
        $ajax({
            type: 'post',
            url: '/approval/queryList',
            data: {
                type: type,
                state:state,
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
                url: '/approval/add',
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
        let rows = getTableSelection('#approvalTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
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
                    url: '/approval/update',
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
            let rows = getTableSelection("#approvalTable");
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
                url: '/approval/delete',
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
                "otherId": approvalId,
                "fileName": fileName,
                "files": this_file,
                "type": "审核",
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
                    fileShow(approvalId);
                    swal("", res.msg, "success");
                } else {
                    swal("", res.msg, "error");
                }
                var fileInput = document.getElementById('file');
                fileInput.outerHTML = fileInput.outerHTML;
            })
        };
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
                    fileShow(approvalId);
                }
            })
        }
    });

    $('#file-close-btn').click(function () {
        $('#show-file-modal').modal('hide');
        approvalId = 0;
    });

    $('#approval-close-btn').click(function () {
        $('#show-approval-modal').modal('hide');

    });

    $('#approval-up-btn').click(function () {
        $('#add-modal2').modal('show');
    });

    //新增弹窗里点击关闭按钮
    $('#add-close-btn2').click(function () {
        $('#add-modal2').modal('hide');
    });

    //新增弹窗里点击提交按钮
    $("#add-submit-btn2").click(function () {
        var userId = $('#userId').val();
        if (checkForm('#add-form2')) {
            $ajax({
                type: 'post',
                url: '/approvalItem/add',
                data:{
                    userId: userId,
                    approvalId:approvalId,
                },
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal("", res.msg, "success");
                    $('#add-form2')[0].reset();
                    approvalShow(approvalId);
                    $('#add-close-btn2').click();
                } else {
                    swal("", res.msg, "error");
                }
            })
        }
    });

    $('#approval-delete-btn').click(function () {
        var msg = confirm("确认要删除吗？");
        if (msg) {
            let rows = getTableSelection("#show-table-approval");
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
                url: '/approvalItem/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                if (res.code == 200) {
                    swal('', res.msg, 'success');
                    approvalShow(approvalId);
                }
            })
        }
    });

});

function fileShow(id) {
    $ajax({
        type: 'post',
        url: '/file_table/getList',
        data: {
            otherId: id,
            type: "审核",
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            approvalId = id;
            setFileTable(res.data);
            $('#show-file-modal').modal('show');
        }
    })
}

function approvalShow(id) {
    $ajax({
        type: 'post',
        url: '/approvalItem/getList',
        data: {
            approvalId: id,
        }
    }, false, '', function (res) {
        if (res.code == 200) {
            setApprovalTable(res.data);
            $('#show-approval-modal').modal('show');
            approvalId=id;
        }
    })
}

function pass(id,userId){
    $ajax({
        type: 'post',
        url: '/approvalItem/updateState',
        data:{
            state:"审核通过",
            id:id,
            userId:userId,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            approvalShow(approvalId);
        }
    })
}

function refuse(id,userId){
    $ajax({
        type: 'post',
        url: '/approvalItem/updateState',
        data:{
            state:"审核未通过",
            id:id,
            userId:userId,
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            approvalShow(approvalId);
        }
    })
}

function setTable(data) {
    if ($('#approvalTable').html != '') {
        $('#approvalTable').bootstrapTable('load', data);
    }

    $('#approvalTable').bootstrapTable({
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
                field: 'staff',
                title: '姓名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'type',
                title: '类别',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: '',
                title: '文件',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:fileShow(' + row.id + ')" class="btn-sm btn-primary">查看</button>'
                }
            }, {
                field: '',
                title: '操作',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:approvalShow(' + row.id + ')" class="btn-sm btn-primary">审核</button>'
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

function setApprovalTable(data) {
    if ($('#show-table-approval').html != '') {
        $('#show-table-approval').bootstrapTable('load', data);
    }

    $('#show-table-approval').bootstrapTable({
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
                field: 'userId',
                title: '',
                align: 'center',
                sortable: true,
                visible: false,
            }, {
                field: 'name',
                title: '审核人',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'state',
                title: '审核状态',
                align: 'center',
                sortable: true,
                width: 100,

            }, {
                field: '',
                title: '操作',
                align: 'center',
                sortable: true,
                width: 100,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:pass(' + row.id + ','+ row.userId +')" class="btn-sm btn-primary">通过</button> <button onclick="javascript:refuse(' + row.id + ','+ row.userId +')" class="btn-sm btn-primary">拒绝</button>'
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