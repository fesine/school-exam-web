Ext.define("core.system.view.AuthGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.authGrid",
    store: "core.system.store.AuthStore",
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
        {xtype: 'button', text: '新增管理员', ref: 'addAuth', iconCls: 'table_add'},
        {xtype: 'button', text: '修改管理员', ref: 'updateAuth', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除管理员', ref: 'removeAuth', iconCls: 'table_remove'}
    ],
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "员工号", dataIndex: "pacteraNo", width: 100, border: 50},
        {text: "员工姓名", dataIndex: "name", width: 100, border: 50},
        {text: "权限", dataIndex: "grade", width: 100, border: 50,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.authConvent(v,metaData);
            }}

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});