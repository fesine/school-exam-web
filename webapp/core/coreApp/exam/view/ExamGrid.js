Ext.define("core.exam.view.ExamGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.examGrid",
    store: "core.exam.store.ExamStore",
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
        {xtype: 'button', text: '新增考试', ref: 'addExam', iconCls: 'table_add'},
        {xtype: 'button', text: '修改考试', ref: 'updateExam', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除考试', ref: 'removeExam', iconCls: 'table_remove'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'examPage',
        store: 'core.exam.store.ExamStore',
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
                ref: 'examPageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "年级", dataIndex: "gradeName", width: 100, border: 50},
        {text: "考试科目", dataIndex: "courseName", width: 100, border: 50},
        {text: "考试形式", dataIndex: "examType", width: 100, border: 50,
            renderer: function (v) {
                if (v == "2") {
                    return "<font color=green>开卷</font>";
                } else if (v == "1") {
                    return "<font color=red>闭卷</font>";//
                }
            }
        },
        {text: "开始时间", dataIndex: "startTime", width: 180, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        },
        {text: "结束时间", dataIndex: "endTime", width: 180, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        }

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});