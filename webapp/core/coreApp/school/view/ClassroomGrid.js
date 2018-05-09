/**
 * 用户信息展示列表
 * */
Ext.define("core.school.view.ClassroomGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.classroomGrid",
    store: "core.school.store.ClassroomStore",
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
        {xtype: 'button', text: "刷新", ref: 'refresh', iconCls: 'table_refresh'},
        {xtype: 'button', text: '新增班级', ref: 'addClassroom', iconCls: 'table_add'},
        {xtype: 'button', text: '修改班级', ref: 'updateClassroom', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除班级', ref: 'removeClassroom', iconCls: 'table_remove'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'classroomPage',
        store: 'core.school.store.ClassroomStore',
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
                ref: 'classroomPageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 100, border: 50},
        {text: "班级名称", dataIndex: "classroomName", width: 150, border: 50}

    ],
    listeners: {
        afterrender: function () {
            if (Ext.util.Cookies.get('grade') < 1) {
                var grid = this;
                var item = grid.down("button[ref=refresh]");
                var tbar = item.ownerCt;
                tbar.remove(tbar.items.last());
                tbar.remove(tbar.items.last());
                tbar.remove(tbar.items.last());
            }

        }
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});