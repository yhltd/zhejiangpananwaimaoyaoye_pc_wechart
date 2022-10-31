function getList() {
    $('#query').val("");
    $ajax({
        type: 'post',
        url: '/product/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#productTable").colResizable({
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
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].attributes != null && res.data[i].attributes != "") {
                    item = "<option value=\"" + res.data[i].attributes + "\">" + res.data[i].attributes + "</option>"
                    $("#add-attribute").append(item);
                    $("#update-attribute").append(item);
                }
                if (res.data[i].attributes != null && res.data[i].attributes != "") {
                    item = "<option value=\"" + res.data[i].attributes + "\">" + res.data[i].attributes + "</option>"
                    $("#add-attribute").append(item);
                    $("#update-attribute").append(item);
                }
            }
        }
    })
}

$(function () {
    getList();
    getSelect();
    $('#select-btn').click(function () {
        var query = $('#query').val();
        $ajax({
            type: 'post',
            url: '/product/queryList',
            data: {
                query: query,
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
                url: '/product/add',
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
        let rows = getTableSelection('#productTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $("#update-attribute").val(rows[0].data.attribute);
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
                    url: '/product/update',
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
            let rows = getTableSelection("#productTable");
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
                url: '/product/delete',
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
                        url: '/product/upload',
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
    if ($('#productTable').html != '') {
        $('#productTable').bootstrapTable('load', data);
    }

    $('#productTable').bootstrapTable({
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
        style:'table-layout:fixed',
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
            },{
                field: 'pinhao',
                title: '品号',
                align: 'center',
                sortable: true,
                width: 150,
            },{
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 180,
            }, {
                field: 'spec',
                title: '规格型号',
                align: 'center',
                sortable: true,
                width: 300,
            }, {
                field: 'attribute',
                title: '产品属性',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'container',
                title: '整箱量',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'unit',
                title: '单位',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'price',
                title: '零售价',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'pinyin',
                title: '拼音简码',
                align: 'center',
                sortable: true,
                width: 120,
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