/**
 * 用户信息展示列表
 * */
Ext.define('core.school.view.CourseGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.courseGrid',
    store: 'core.school.store.CourseStore',
    mixins: ['core.util.ConstsUtils'],
    selModel: {
        selType: 'checkboxmodel'
    },
    border: 0,
    multiSelect: true,
    frame: true,
    viewConfig: {
        enableTextSelection: true//单元格内容可以被选中，便于复制
    },
    tbar: [
        {xtype: 'button', text: '刷新', ref: 'refresh', iconCls: 'table_refresh'},
        {xtype: 'button', text: '新增课程', ref: 'addCourse', iconCls: 'table_add'},
        {xtype: 'button', text: '修改课程', ref: 'updateCourse', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除课程', ref: 'removeCourse', iconCls: 'table_remove'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'coursePage',
        store: 'core.school.store.CourseStore',
        dock: 'bottom',
        displayInfo: true,
        items: [
            {
                xtype: 'combobox',
                width: 45,
                forceSelection: true,
                mode: 'local',
                store: Ext.create('core.common.store.PageSizeStore', {}),
                displayField: 'id',
                valueField: 'pageSize',
                ref: 'coursePageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: '编号', dataIndex: 'id', width: 100, border: 50},
        {text: '年级名称', dataIndex: 'gradeName', width: 150, border: 50},
        {text: '课程名称', dataIndex: 'courseName', width: 150, border: 50}

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
        this.callParent(arguments)
    }
})