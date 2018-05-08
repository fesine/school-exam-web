/**
 * 用户信息展示列表
 * */
Ext.define("core.attendance.view.OvertimeGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.overtimeGrid",
    store: "core.attendance.store.OvertimeStore",
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
        {xtype: 'button', text: '申请加班', ref: 'addOvertime', iconCls: 'table_add'},
        {xtype: 'button', text: '修改申请', ref: 'updateOvertime', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除申请', ref: 'removeOvertime', iconCls: 'table_remove'},
        // {xtype: 'textfield',
        //     width: 80,
        //     emptyText: '输入姓名搜索', ref: 'nameKey',disabled: Ext.util.Cookies.get('hiddenMenu')
        // },
        {
            xtype: 'combobox', width: 80, ref: "nameKey", emptyText: '选择姓名',
            mode: 'remote',
            store: Ext.create("core.employee.store.EmpStore", {}),
            displayField: 'name',
            valueField: 'name',
            disabled: Ext.util.Cookies.get('hiddenMenu')
        },
        {
            xtype: 'combobox', width: 80, ref: "statusKey", emptyText: '选择状态',
            mode: 'local',
            store: Ext.create("core.common.store.ApplyStatusStore", {}),
            displayField: 'text',
            valueField: 'id'
        },
        "-",
        {xtype: 'datefield', emptyText: '选择日期', format: 'Y年m月d日', ref: 'dateKey'},
        "-",
        {xtype: 'button', text: '搜索', ref: 'search', iconCls: 'table_search'},
        {xtype: 'button', text: '重置', ref: 'reset', iconCls: 'wfreturn'},
        "-",
        {xtype: 'button', text: '通过', ref: 'accept', iconCls: 'tree_ok'},
        "-",
        {xtype: 'button', text: '拒绝', ref: 'refuse', iconCls: 'tree_delete'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: 'core.attendance.store.OvertimeStore',
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
                ref: 'overtimePageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "姓名", dataIndex: "name", width: 80, border: 50},
        {text: "员工号", dataIndex: "pacteraNo", width: 100, border: 50},
        {
            text: "开始时间", dataIndex: "startTime", width: 180, border: 50,
            renderer: function (v) {
                return this.formatOverTime(v);
            }
        },
        {
            text: "结束时间", dataIndex: "endTime", width: 180, border: 50,
            renderer: function (v) {
                return this.formatOverTime(v);
            }
        },
        {text: "时长(小时)", dataIndex: "timeCount", width: 70, border: 50},
        {text: "法定假日", dataIndex: "holidayFlag", width: 60, border: 50,
        renderer:function (v) {
            var store =Ext.create("core.common.store.HolidayFlagStore", {});
            return store.findRecord("id", v).data["text"];
        }
        },
        {text: "结算方式", dataIndex: "adjustFlag", width: 80, border: 50,
            renderer: function (v) {
                var store = Ext.create("core.common.store.AdjustFlagStore", {});
                return store.findRecord("id", v).data["text"];
            }
            },
        {text: "状态", dataIndex: "status", width: 60, border: 50,
            renderer: function (v, metaData) {
                return this.statusConvent(v,metaData);
            }
            },
        {
            text: "最后修改时间", dataIndex: "updateTime", width: 180, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        }

    ],
    listeners: {
        afterrender: function () {
            if (Ext.util.Cookies.get('grade') < 1) {
                var grid = this;
                var nameKey = grid.down("textfield[ref=nameKey]");
                var tbar = nameKey.ownerCt;
                tbar.remove(nameKey);
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