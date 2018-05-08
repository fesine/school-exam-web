/**
 * 用户信息展示列表
 * */
Ext.define("core.attendance.view.ErrorGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.errorGrid",
    store: "core.attendance.store.ErrorStore",
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
        {xtype: 'button', text: '添加异常', ref: 'addError', iconCls: 'table_add'},
        {xtype: 'button', text: '修改异常', ref: 'updateError', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除异常', ref: 'removeError', iconCls: 'table_remove'},
        {
            xtype: 'button', text: '异常分析', ref: 'analyse', iconCls: 'analyse',
            disabled: Ext.util.Cookies.get('hiddenMenu')
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'errorPage',
        store: 'core.attendance.store.ErrorStore',
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
                ref: 'errorPageSize',
                value: 20
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "姓名", dataIndex: "name", width: 100, border: 50},
        {text: "员工号", dataIndex: "pacteraNo", width: 100, border: 50},
        {
            text: "异常日期", dataIndex: "errorDate", width: 200, border: 50,
            renderer: function (v) {
                return this.formatDate(v);
            }
        },
        {text: "异常类型", dataIndex: "errorType", width: 100, border: 50,
            renderer: function (v) {
                var store = Ext.create("core.common.store.ErrorTypeStore", {});
                return store.findRecord("id", v).data["text"];
            }
        },
        {text: "异常内容", dataIndex: "errorMsg", width: 200, border: 50}

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