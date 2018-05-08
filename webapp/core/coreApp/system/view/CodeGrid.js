Ext.define("core.system.view.CodeGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.codeGrid",
    store: "core.system.store.CodeStore",
    mixins: ['core.util.ConstsUtils'],
    selModel: {
        selType: "checkboxmodel"
    },
    border: 0,
    multiSelect: true,
    frame: true,
    viewConfig: {
        enableTextSelection: true//单元格内容可以被选中，便于复制
    },
    tbar: [
        {xtype: 'button',text:"刷新",ref:'refresh',  iconCls: 'table_refresh'},
        {xtype: 'button', text: '新增代码', ref: 'addCode', iconCls: 'table_add'},
        {xtype: 'button', text: '修改代码', ref: 'updateCode', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除代码', ref: 'removeCode', iconCls: 'table_remove'}
    ],
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "代码编号", dataIndex: "codeId", width: 150, border: 50},
        {text: "代码名称", dataIndex: "text", width: 100, border: 50},
        {text: "代码值", dataIndex: "value", width: 100, border: 50},
        {text: "父代码", dataIndex: "remark1", width: 100, border: 50},
        {text: "父结点", dataIndex: "parentId", hidden:true},
        {text: "排序号", dataIndex: "orderNo", width: 60, border: 50},
        {text: "代码权限", dataIndex: "grade", width: 100, border: 50,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.authConvent(v,metaData);
            }}

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});