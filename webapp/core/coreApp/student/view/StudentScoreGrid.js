/**
 * 用户信息展示列表
 * */
Ext.define('core.student.view.StudentScoreGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentScoreGrid',
    store: 'core.student.store.StudentScoreStore',
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
        {
            xtype: 'combobox', width: 100, ref: "gradeKey", emptyText: '选择年级',
            mode: 'remote',
            store: Ext.create("core.school.store.GradeStore", {}),
            displayField: 'gradeName',
            valueField: 'id'
        },
        {
            xtype: 'combobox', width: 100, ref: "classroomKey", emptyText: '选择班级',
            mode: 'remote',
            store: Ext.create("core.school.store.ClassroomStore", {}),
            displayField: 'classroomName',
            valueField: 'id'
        },
        {xtype: 'textfield', emptyText: '按学号查询', ref: 'stuNoKey'},
        {xtype: 'textfield', emptyText: '按姓名查询', ref: 'stuNameKey'},
        "-",
        {xtype: 'button', text: '查询', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'},
        "-",
        "双击记录综合分析学生成绩"
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'studentScorePage',
        store: 'core.student.store.StudentScoreStore',
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
                ref: 'studentScorePageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: '年级', dataIndex: 'gradeName', width: 80, border: 50,
            draggable: false, align: 'center'},
        {text: '班级', dataIndex: 'classroomName', width: 100, border: 50,
            draggable: false, align: 'center'},
        {text: '学号', dataIndex: 'stuNo', width: 80, border: 50, draggable: false, align: 'center'},
        {text: '姓名', dataIndex: 'stuName', width: 100, border: 50, draggable: false, align: 'center'},
        {text: '语文', dataIndex: 'chinese', width: 80, border: 50, draggable: false,align: 'center',
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }},
        {text: '数学', dataIndex: 'math', width: 80, border: 50, draggable: false,align: 'center',
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }},
        {text: '英语', dataIndex: 'english', width: 80, border: 50, align: 'center', draggable: false,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }},
        {text: '物理', dataIndex: 'physics', width: 80, border: 50, align: 'center', draggable: false,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }},
        {text: '化学', dataIndex: 'chemistry', width: 80, border: 50, align: 'center',
            draggable: false,
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }},
        {text: '总分', dataIndex: 'sum', width: 100, border: 50, draggable: false,align: 'center'},
        {text: '平均分', dataIndex: 'avg', width: 100, border: 50, draggable: false,align: 'center'},
        {text: '排名', dataIndex: 'rowNo', width: 100, border: 50, draggable: false, align: 'center'}

    ],
    listeners: {
        // afterrender: function () {
        //     var grid = this
        //     var item = grid.down('button[ref=refresh]')
        //     var tbar = item.ownerCt
        //     tbar.remove(tbar.items.last())
        //     tbar.remove(tbar.items.last())
        //     tbar.remove(tbar.items.last())
        //
        // }
    },
    initComponent: function () {
        this.callParent(arguments)
    }
})