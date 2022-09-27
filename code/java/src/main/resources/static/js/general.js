function getList() {
    $ajax({
        type: 'post',
        url: '/general/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#generalTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

$(function () {
    getList();

    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        // $('#add-modal').modal('show');

        $ajax({
            type: 'post',
            url: '/general/addRow',
        }, false, '', function (res) {
            if (res.code == 200) {
                swal("", res.msg, "success");
            }
        });
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
                url: '/general/add',
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
        let rows = getTableSelection('#generalTable')
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
                    url: '/general/update',
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
            let rows = getTableSelection("#generalTable");
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
                url: '/general/delete',
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
    })
});

function setTable(data) {
    if ($('#generalTable').html != '') {
        $('#generalTable').bootstrapTable('load', data);
    }

    $('#generalTable').bootstrapTable({
        data: data,
        sortStable: true,
        //classes: 'table table-hover text-nowrap table table-bordered',
        classes: 'table',
        idField: 'id',
        pagination: true,
        pageSize: 15,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style:'table-layout:fixed',
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
                field: 'saleName',
                title: '销售人员姓名',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="sale_name' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'sale_name\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px"  >'
                }
            }, {
                field: 'testName',
                title: '化验人员名称',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="test_name' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'test_name\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'express',
                title: '快递方式',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="express' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'express\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'pick',
                title: '客户拿货方式',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="pick' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'pick\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'pay',
                title: '付款方式',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="pay' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'pay\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'warehouse',
                title: '仓库',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="warehouse' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'warehouse\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'department',
                title: '部门',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="department' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'department\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'customerType',
                title: '客户类别',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="customer_type' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'customer_type\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'area',
                title: '区域',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="area' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'area\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
            }, {
                field: 'attributes',
                title: '产品属性',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    return '<input id="attributes' + row.id + '" onblur="javascript:columnUpd(' + row.id +',' + '\'attributes\'' + ')" value="'+ value +'" class="form-control" style="width: 95%;font-size:13px" >'
                }
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

function columnUpd(id,column){
    var this_value = $('#' + column + id).val();
    $ajax({
        type: 'post',
        url: '/general/save',
        data: {
            value:this_value,
            column:column,
            id:id,
        },
    }, true, '', function (res) {
        if (res.code == 200) {
            // swal(res.msg);
            var obj = "";
            if(res.msg == '修改成功'){
                obj = document.getElementById("upd_1");
            }else{
                obj = document.getElementById("upd_2");
            }
            obj.hidden = false;
            setTimeout(function(){
                obj.hidden = true
            },3000);
        }
    })
}