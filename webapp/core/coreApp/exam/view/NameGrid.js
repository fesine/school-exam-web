Ext.define("core.employee.view.NameGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.nameGrid",
    store: "core.employee.store.NameStore",
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
        {xtype: 'button', text: '新增差错姓名', ref: 'addName', iconCls: 'table_add'},
        {xtype: 'button', text: '修改差错姓名', ref: 'updateName', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除差错姓名', ref: 'removeName', iconCls: 'table_remove'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'namePage',
        store: 'core.employee.store.NameStore',
        dock: 'bottom',
        displayInfo: true,
        items: [
            {
                xtype: 'combobox',
                width: 45,
                forceSelection: true,
                mode: 'local',
                store: Ext.create("core.common.store.PageSizeStore", {}),
                displayField: 'id',
                valueField: 'pageSize',
                ref: 'namePageSize',
                value: 10
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "员工号", dataIndex: "pacteraNo", width: 100, border: 50},
        {text: "员工姓名", dataIndex: "empName", width: 100, border: 50},
        {text: "行方注册姓名", dataIndex: "attName", width: 100, border: 50}

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});