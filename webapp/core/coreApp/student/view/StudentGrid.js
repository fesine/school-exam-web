Ext.define("core.student.view.StudentGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.studentGrid",
    store: "core.student.store.StudentStore",
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
        {xtype: 'button', text: '新增学生', ref: 'addStudent', iconCls: 'table_add'},
        {xtype: 'button', text: '修改学生', ref: 'updateStudent', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除学生', ref: 'removeStudent', iconCls: 'table_remove'},
        "-",
        {xtype: 'textfield', emptyText: '按学号查询', ref: 'stuNoKey'},
        {xtype: 'textfield', emptyText: '按姓名查询', ref: 'stuNameKey'},
        "-",
        {xtype: 'button', text: '搜索', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'studentPage',
        store: 'core.student.store.StudentStore',
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
                ref: 'studentPageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "学号", dataIndex: "stuNo", width: 100, border: 50},
        {text: "姓名", dataIndex: "stuName", width: 80, border: 50},
        {
            text: "性别", dataIndex: "stuSex", width: 50, renderer: function (v) {
                if (v == "1") {
                    return "<font color=green>男</font>";
                } else if (v == "2") {
                    return "<font color=red>女</font>";//
                } else if (v == "0") {
                    return "未知";//
                }
            }
        },
        {
            text: "出生日期", dataIndex: "stuBirthday", width: 120, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日');
            }
        },
        {text: "手机号码", dataIndex: "stuCell", width: 100, border: 50},
        {text: "地址", dataIndex: "stuAddress", width: 250, border: 50},
        {text: "email", dataIndex: "stuEmail", width: 150, border: 50},
        {text: "年级", dataIndex: "gradeName", width: 60, border: 50},
        {text: "班级", dataIndex: "classroomName", width: 60, border: 50}

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