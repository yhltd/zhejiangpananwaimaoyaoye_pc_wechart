function getList() {
    $('#name').val("");
    $ajax({
        type: 'post',
        url: '/user_power/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#userPowerTable").colResizable({
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
                if (res.data[i].id != null && res.data[i].id != "") {
                    item = "<option value=\"" + res.data[i].id + "\">" + res.data[i].name + "</option>"
                    $("#add-userId").append(item);
                    $("#update-userId").append(item);
                }
            }
        }
    })
}

$(function () {
    getList();
    getSelect();

    $('#select-btn').click(function () {
        var name = $('#name').val();
        $ajax({
            type: 'post',
            url: '/user_power/queryList',
            data: {
                name: name,
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
                url: '/user_power/add',
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
        let rows = getTableSelection('#userPowerTable');
        if (rows.length > 1 || rows.length == 0) {
            swal('请选择一条数据修改!');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
        $('#update-userId').val(rows[0].data.userId);
        $('#update-viewName').val(rows[0].data.viewName);
        $('#update-zeng').val(rows[0].data.zeng);
        $('#update-shan').val(rows[0].data.shan);
        $('#update-gai').val(rows[0].data.gai);
        $('#update-cha').val(rows[0].data.cha);
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
                    url: '/user_power/update',
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
            let rows = getTableSelection("#userPowerTable");
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
                url: '/user_power/delete',
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
    if ($('#userPowerTable').html != '') {
        $('#userPowerTable').bootstrapTable('load', data);
    }

    $('#userPowerTable').bootstrapTable({
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
                width: 30,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'userId',
                title: 'userId',
                visible: false,
            }, {
                field: 'name',
                title: '用户名',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'viewName',
                title: '页面名称',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zeng',
                title: '新增',
                align: 'center',
                sortable: true,
                width: 50,
                formatter:function(value, row , index){
                    if(value == "可操作"){
                        return '<select id="zeng' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'zeng\'' + ')" class="form-control">' +
                            '<option value="可操作" selected="selected">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else if(value == "无权限"){
                        return '<select id="zeng' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'zeng\'' + ')" class="form-control">' +
                            '<option value="可操作" >可操作</option>'+
                            '<option value="无权限" selected="selected">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else{
                        return '<select id="zeng' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'zeng\'' + ')" class="form-control">' +
                            '<option value="可操作">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value="" selected="selected"></option>'+
                            '</select> '
                    }
                }
            }, {
                field: 'shan',
                title: '删除',
                align: 'center',
                sortable: true,
                width: 50,
                formatter:function(value, row , index){
                    if(value == "可操作"){
                        return '<select id="shan' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'shan\'' + ')" class="form-control">' +
                            '<option value="可操作" selected="selected">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else if(value == "无权限"){
                        return '<select id="shan' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'shan\'' + ')" class="form-control">' +
                            '<option value="可操作" >可操作</option>'+
                            '<option value="无权限" selected="selected">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else{
                        return '<select id="shan' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'shan\'' + ')" class="form-control">' +
                            '<option value="可操作">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value="" selected="selected"></option>'+
                            '</select> '
                    }
                }
            }, {
                field: 'gai',
                title: '修改',
                align: 'center',
                sortable: true,
                width: 50,
                formatter:function(value, row , index){
                    if(value == "可操作"){
                        return '<select id="gai' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'gai\'' + ')" class="form-control">' +
                            '<option value="可操作" selected="selected">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else if(value == "无权限"){
                        return '<select id="gai' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'gai\'' + ')" class="form-control">' +
                            '<option value="可操作" >可操作</option>'+
                            '<option value="无权限" selected="selected">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else{
                        return '<select id="gai' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'gai\'' + ')" class="form-control">' +
                            '<option value="可操作">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value="" selected="selected"></option>'+
                            '</select> '
                    }
                }
            }, {
                field: 'cha',
                title: '查看',
                align: 'center',
                sortable: true,
                width: 50,
                formatter:function(value, row , index){
                    if(value == "可操作"){
                        return '<select id="cha' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'cha\'' + ')" class="form-control">' +
                            '<option value="可操作" selected="selected">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else if(value == "无权限"){
                        return '<select id="cha' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'cha\'' + ')" class="form-control">' +
                            '<option value="可操作" >可操作</option>'+
                            '<option value="无权限" selected="selected">无权限</option>'+
                            '<option value=""></option>'+
                            '</select> '
                    }else{
                        return '<select id="cha' + row.id + '" onchange="javascript:columnUpd(' + row.id +',' + '\'cha\'' + ')" class="form-control">' +
                            '<option value="可操作">可操作</option>'+
                            '<option value="无权限">无权限</option>'+
                            '<option value="" selected="selected"></option>'+
                            '</select> '
                    }
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






    // $('#userPowerTable').bootstrapTable({
    //     data: data,
    //     sortStable: true,
    //     classes: 'table table-hover text-nowrap table table-bordered',
    //     idField: 'id',
    //     pagination: true,
    //     pageSize: 15,//单页记录数
    //     clickToSelect: true,
    //     locale: 'zh-CN',
    //     toolbar: '#table-toolbar',
    //     toolbarAlign: 'left',
    //     theadClasses: "thead-light",//这里设置表头样式
    //     style: 'table-layout:fixed',
    //     columns: [
    //         {
    //             field: '',
    //             title: '序号',
    //             align: 'center',
    //             width: 30,
    //             formatter: function (value, row, index) {
    //                 return index + 1;
    //             }
    //         }, {
    //             field: 'userId',
    //             title: 'userId',
    //             visible: false,
    //         }, {
    //             field: 'name',
    //             title: '用户名',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }, {
    //             field: 'viewName',
    //             title: '页面名称',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }, {
    //             field: 'zeng',
    //             title: '新增',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }, {
    //             field: 'shan',
    //             title: '删除',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }, {
    //             field: 'gai',
    //             title: '修改',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }, {
    //             field: 'cha',
    //             title: '查看',
    //             align: 'center',
    //             sortable: true,
    //             width: 100,
    //         }
    //     ],
    //     onClickRow: function (row, el) {
    //         let isSelect = $(el).hasClass('selected')
    //         if (isSelect) {
    //             $(el).removeClass('selected')
    //         } else {
    //             $(el).addClass('selected')
    //         }
    //     }
    // })
}



function columnUpd(id,column){
    var this_value = $('#' + column + id).val();
    $ajax({
        type: 'post',
        url: '/user_power/update',
        data: {
            column:column,
            id:id,
            this_value:this_value
        },
    }, false, '', function (res) {
        // alert(res.msg);
        if (res.code == 200) {
            var obj = ""
            if(res.msg == '修改成功'){
                obj = document.getElementById("upd_1");
            }else if(res.msg == '无权限'){
                obj = document.getElementById("upd_3");
            }else{
                obj = document.getElementById("upd_2");
            }
            obj.hidden = false
            setTimeout(function(){
                obj.hidden = true
            },3000);
        }
    })
}
