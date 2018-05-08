Ext.define("core.system.view.MenuTreeGrid", {
    extend: "Ext.tree.Panel",
    alias: "widget.menuTreeGrid",
    store: Ext.create("core.system.store.MenuTreeStore",{
        renderTo:Ext.getBody()}),
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
        {xtype: 'button', text: '新增栏目', ref: 'addMenu', iconCls: 'table_add'},
        {xtype: 'button', text: '修改栏目', ref: 'updateMenu', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除栏目', ref: 'removeMenu', iconCls: 'table_remove'}
    ],
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "栏目编号", dataIndex: "menuId", width: 100, border: 50},
        {text: "栏目名称", dataIndex: "text", width: 100, border: 50},
        {text: "是否叶子", dataIndex: "leaf", width: 70, border: 50},
        // {text: "父结点", dataIndex: "parentId", width: 60, border: 50},
        {text: "排序号", dataIndex: "orderNo", width: 60, border: 50},
        {text: "栏目权限", dataIndex: "grade", width: 100, border: 50,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.authConvent(v,metaData);
            }},
        {text: "视图别名", dataIndex: "funViewXtype", width: 100, border: 50},
        {text: "控制器类名", dataIndex: "funController", width: 240, border: 50},
        {text: "视图类名", dataIndex: "funViewName", width: 200, border: 50}

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});