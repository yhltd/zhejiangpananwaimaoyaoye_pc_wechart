

function getList(){
    var customerId =0;
    $ajax({
        type: 'post',
        url: '/kanban/getList',
        data: {
            customerId: customerId,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setXSTable(res.data);
            setZSTable(res.data);
            $("#xsTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
            $("#zsTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
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

$(function () {
    getList();

    $("#customer").click(function () {
        getCustomer();
    });

    $('#select-btn').click(function () {
        var customerId = $('#customerId').val();

        if(customerId == ""){
            swal("请选择客户")
            return;
        }

        $ajax({
            type: 'post',
            url: '/kanban/getList',
            data: {
                customerId: customerId,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setXSTable(res.data);
                setZSTable(res.data);
            }
        })
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
            $.each(rows, function (index, row) {
                $("#customerId").val(row.data.id);
                $("#customer").val(row.data.customer);
            });
            $('#show-customer-modal').modal('hide');
        }
    });

});

function setXSTable(data) {
    if ($('#xsTable').html != '') {
        $('#xsTable').bootstrapTable('load', data);
    }

    $('#xsTable').bootstrapTable({
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
                field: 'xs',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqgh',
                title: '本期购货',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqth',
                title: '本期退货',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'yf',
                title: '已付',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zhekou',
                title: '折扣',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'fkjine',
                title: '返款金额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xsyue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}

function setZSTable(data) {
    if ($('#zsTable').html != '') {
        $('#zsTable').bootstrapTable('load', data);
    }

    $('#zsTable').bootstrapTable({
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
                field: 'zs',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqzs',
                title: '本期赠送',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zsyue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'kpjine',
                title: '已开票金额',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
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