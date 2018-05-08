/**
 * 用户信息展示列表
 * */
Ext.define("core.attendance.view.AttendanceGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.attendanceGrid",
    store: "core.attendance.store.AttendanceStore",
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
        // {xtype: 'textfield', emptyText: '输入姓名搜索', ref: 'nameKey',disabled: Ext.util.Cookies.get('hiddenMenu')},
        {xtype: 'button', text: "刷新", ref: 'refresh', iconCls: 'table_refresh'},
        {
            xtype: 'combobox', width: 100, ref: "nameKey", emptyText: '选择姓名',
            mode: 'remote',
            store: Ext.create("core.employee.store.EmpStore", {}),
            displayField: 'name',
            valueField: 'name',
            disabled: Ext.util.Cookies.get('hiddenMenu')
        },
        "-",
        {xtype: 'monthfield', emptyText: '选择日期', format: 'Y年m月', ref: 'dateKey'},
        "-",
        {xtype: 'button', text: '搜索', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'},
        "-上传考勤记录-",
        {
            xtype: "form",
            style: 'border-width:0 0 0 0;',
            height:22,
            items:[
                {xtype: 'filefield', emptyText: '请选择excel文件',name:'file',
                    ref: 'file', allowBlank: false, disabled: Ext.util.Cookies.get('hiddenMenu')}
            ]
        },

        {xtype: 'button', text: '上传', ref: 'upload', iconCls: 'upload',
            disabled: Ext.util.Cookies.get('hiddenMenu')},
        {xtype: 'button', text: '分析', ref: 'analyse', iconCls: 'analyse',
            disabled: Ext.util.Cookies.get('hiddenMenu')}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'attendancePage',
        store: 'core.attendance.store.AttendanceStore',
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
                ref: 'attendancePageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "姓名", dataIndex: "name", width: 100, border: 50},
        {text: "持卡号", dataIndex: "cardNo", width: 100, border: 50},
        {
            text: "打卡时间", dataIndex: "eventTime", width: 200, border: 50,
            renderer: function (v) {
                return this.formatDateTime(v);
            }
        },
        {text: "事件源", dataIndex: "eventSource", width: 100, border: 50},
        {text: "事件类型", dataIndex: "eventType", width: 200, border: 50},
        {text: "控制器名称", dataIndex: "controllerName", width: 150, border: 50},
        {text: "数据状态", dataIndex: "remark2", width: 60, border: 50,
            renderer: function (v) {
                var store = Ext.create("core.common.store.DataStatusStore", {});
                return store.findRecord("id", v).data["text"];
            }
        }

    ],
    listeners: {
        afterrender: function () {
            if (Ext.util.Cookies.get('grade') < 1) {
                var grid = this;
                var item = grid.down("textfield[ref=nameKey]");
                var tbar = item.ownerCt;
                tbar.remove(item);
                tbar.remove(tbar.items.last());
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