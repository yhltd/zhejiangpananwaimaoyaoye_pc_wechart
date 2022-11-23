function getList(){
    var nian="";
    var customer="";
    $ajax({
        type: 'post',
        url: '/tongji/getList',
        data: {
            nian:nian,
            customer: customer,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#tongjiTable").colResizable({
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
    $('#select-btn').click(function () {
        var nian= $('#nian').val();
        var customer = $('#customer').val();
        $ajax({
            type: 'post',
            url: '/tongji/getList',
            data: {
                nian:nian,
                customer: customer,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    $('#refresh-btn').click(function () {
        $('#nian').val("");
        $('#customer').val("");
        var nian= "";
        var customer = "";
        $ajax({
            type: 'post',
            url: '/tongji/getList',
            data: {
                nian:nian,
                customer: customer,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#tongjiTable').html != '') {
        $('#tongjiTable').bootstrapTable('load', data);
    }

    $('#tongjiTable').bootstrapTable({
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
        height: document.body.clientHeight * 0.87,
        columns: [
            {
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'customerNum',
                title: '客户号',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'area',
                title: '区域',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'leibie',
                title: '类别',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'xswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'xs',
                title: '本期购货',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'th',
                title: '本期退货',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'fankuan',
                title: '返款金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'fukuan',
                title: '付款金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zhekou',
                title: '折扣金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zswqye',
                title: '往期赠送余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zengsong',
                title: '赠送金额',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
    })
}