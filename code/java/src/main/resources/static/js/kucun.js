function getList() {
    $('#ks').val("");
    $('#js').val("");
    $('#product').val("");

    moneySel = $.session.get('power');
    if(moneySel == null || moneySel == undefined){
        moneySel = false
    }
    else if(moneySel == "是"){
        moneySel = true
    }else{
        moneySel = false
    }

    $ajax({
        type: 'post',
        url: '/kucun/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            $("#kucunTable").colResizable({
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
                    $("#warehouse").append(item);
                }
            }
        }
    })
}

$(function () {
    getList();
    getSelect();
    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    $('#select-btn').click(function () {
        var warehouse = $('#warehouse').val();
        var pihao = $('#pihao').val();
        var product = $('#product').val();
        $ajax({
            type: 'post',
            url: '/kucun/queryList',
            data: {
                warehouse: warehouse,
                pihao: pihao,
                product: product,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#kucunTable').html != '') {
        $('#kucunTable').bootstrapTable('load', data);
    }

    $('#kucunTable').bootstrapTable({
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
        height: document.body.clientHeight * 0.87,
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
                field: 'warehouse',
                title: '仓库',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'pihao',
                title: '批号',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'pinhao',
                title: '品号',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'spec',
                title: '规格',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'attribute',
                title: '产品属性',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '单位',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'price',
                title: '单价',
                align: 'center',
                sortable: true,
                width: 120,
                visible:moneySel
            }, {
                field: 'num',
                title: '数量',
                align: 'center',
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


function toExcel() {

    var warehouse = $('#warehouse').val();
    var pihao = $('#pihao').val();
    var product = $('#product').val();
    $ajax({
        type: 'post',
        url: '/kucun/queryList',
        data: {
            warehouse: warehouse,
            pihao: pihao,
            product: product,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            var array = res.data
            var header = []
            var title = []
            if(moneySel){
                for (var i = 0; i < array.length; i++) {
                    var body = {
                        warehouse: array[i].warehouse,
                        pihao: array[i].pihao,
                        productName:array[i].productName,
                        pinhao: array[i].pinhao,
                        spec: array[i].spec,
                        attribute: array[i].attribute,
                        unit: array[i].unit,
                        price: array[i].price,
                        num: array[i].num,
                    }
                    header.push(body)
                }
                console.log(header)
                title = ['仓库','批号','产品名称', '品号', '规格', '产品属性', '单位', '单价', '数量']
            }else{
                for (var i = 0; i < array.length; i++) {
                    var body = {
                        warehouse: array[i].warehouse,
                        pihao: array[i].pihao,
                        productName:array[i].productName,
                        pinhao: array[i].pinhao,
                        spec: array[i].spec,
                        attribute: array[i].attribute,
                        unit: array[i].unit,
                        num: array[i].num,
                    }
                    header.push(body)
                }
                console.log(header)
                title = ['仓库','批号','产品名称', '品号', '规格', '产品属性', '单位', '数量']
            }

            JSONToExcelConvertor(header, "库存", title)

        }
    })

}


function JSONToExcelConvertor(JSONData, FileName, title, filter) {
    if (!JSONData)
        return;
    //转化json为object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var excel = "<table>";

    //设置表头
    var row = "<tr>";

    if (title) {
        //使用标题项
        for (var i in title) {
            row += "<th align='center'>" + title[i] + '</th>';
        }

    }
    else {
        //不使用标题项
        for (var i in arrData[0]) {
            row += "<th align='center'>" + i + '</th>';
        }
    }

    excel += row + "</tr>";

    //设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index in arrData[i]) {
            //判断是否有过滤行
            if (filter) {
                if (filter.indexOf(index) == -1) {
                    var value = arrData[i][index] == null ? "" : arrData[i][index];
                    row += '<td>' + value + '</td>';
                }
            }
            else {
                var value = arrData[i][index] == null ? "" : arrData[i][index];
                row += "<td align='center'>" + value + "</td>";
            }
        }

        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

