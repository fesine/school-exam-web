/**
 * 用户信息展示列表
 * */
Ext.define('core.student.view.ExamScoreGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.examScoreGrid',
    store: 'core.student.store.ExamScoreStore',
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
        "-",
        "双击修改成绩",
        "-",
        {xtype: 'textfield', emptyText: '按学号查询', ref: 'stuNoKey'},
        {xtype: 'textfield', emptyText: '按姓名查询', ref: 'stuNameKey'},
        {
            xtype: 'combobox', width: 100, ref: "gradeKey", emptyText: '选择年级',
            mode: 'remote',
            store: Ext.create("core.school.store.GradeStore", {}),
            displayField: 'gradeName',
            valueField: 'id',
            listeners: {
                select: function (obj) {
                    obj.ownerCt.down("combobox[ref = courseKey]").enable();
                    obj.ownerCt.down("combobox[ref = courseKey]").value="";
                    getCourseName(obj);
                }
            }
        },
        {
            xtype: 'combobox', width: 100, ref: "classroomKey", emptyText: '选择班级',
            mode: 'remote',
            store: Ext.create("core.school.store.ClassroomStore", {}),
            displayField: 'classroomName',
            valueField: 'id'
        },
        {
            xtype: 'combobox', width: 100, ref: "courseKey", emptyText: '选择课程',
            mode: 'remote',
            store: Ext.create("core.school.store.CourseStore", {}),
            displayField: 'courseName',
            valueField: 'id',
            disabled: true,
            listeners: {
                expand: function (obj) {
                    var gradeId = obj.ownerCt.down("combobox[ref = gradeKey]").value;
                    if (!gradeId || null == gradeId || Ext.util.Format.trim(gradeId) == "") {
                        obj.getStore().removeAll();
                    }
                }
            }
        },
        "-",
        {xtype: 'button', text: '搜索', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'examScorePage',
        store: 'core.student.store.ExamScoreStore',
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
                ref: 'examScorePageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: '编号', dataIndex: 'id', width: 100, border: 50, align: 'center'},
        {text: '年级', dataIndex: 'gradeName', width: 100, border: 50, align: 'center'},
        {text: '班级', dataIndex: 'classroomName', width: 100, border: 50, align: 'center'},
        {text: '学号', dataIndex: 'stuNo', width: 100, border: 50, align: 'center'},
        {text: '姓名', dataIndex: 'stuName', width: 100, border: 50, align: 'center'},
        {text: '课程', dataIndex: 'courseName', width: 100, border: 50, align: 'center'},
        {text: '成绩', dataIndex: 'score', width: 100, border: 50, align: 'center',
            renderer: function (v, metaData, record, rowIndex, colIndex, store, view) {
                return this.scoreConvent(v, metaData);
            }
        }

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