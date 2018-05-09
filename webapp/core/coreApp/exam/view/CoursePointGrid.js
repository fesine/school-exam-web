Ext.define("core.exam.view.CoursePointGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.coursePointGrid",
    store: "core.exam.store.CoursePointStore",
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
        {xtype: 'button', text: '新增知识点', ref: 'addCoursePoint', iconCls: 'table_add'},
        {xtype: 'button', text: '修改知识点', ref: 'updateCoursePoint', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除知识点', ref: 'removeCoursePoint', iconCls: 'table_remove'},
        "-",
        {xtype: 'textfield', emptyText: '按知识点查询', ref: 'coursePointKey'},
        "-",
        {xtype: 'button', text: '搜索', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'coursePointPage',
        store: 'core.exam.store.CoursePointStore',
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
                ref: 'coursePointPageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "年级", dataIndex: "gradeName", width: 100, border: 50},
        {text: "课程", dataIndex: "courseName", width: 100, border: 50},
        {text: "知识点", dataIndex: "coursePoint", width: 300, border: 50}

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});