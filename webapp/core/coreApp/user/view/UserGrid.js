/**
 * 用户信息展示列表
 * */
Ext.define("core.user.view.UserGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.usergrid",
    store: "core.user.store.UserStore",
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
        {xtype: 'button', text: '新增用户', ref: 'addUser', iconCls: 'table_add'},
        {xtype: 'button', text: '修改用户', ref: 'updateUser', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除用户', ref: 'removeUser', iconCls: 'table_remove'},
        "->",
        "本页用户名过滤:",
        {
            xtype: 'triggerfield',
            triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
            listeners: {
                "change": function (_this, _new, _old, _opt) {
                    var _store = _this.ownerCt.ownerCt.getStore();
                    _store.clearFilter(false);
                    _store.filter("userName", _new);
                }
            },
            onTriggerClick: function () {
                var _store = this.ownerCt.ownerCt.getStore();
                _store.clearFilter(false);
                _store.filter("userName", this.getValue());
            }
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'userPage',
        store: 'core.user.store.UserStore',
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
                id: 'userPageSize',
                value: 10
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "用户名", dataIndex: "userName", width: 100, border: 50},
        {text: "昵称", dataIndex: "nickName", width: 100, border: 50},
        {
            text: "性别", dataIndex: "sex", width: 50, renderer: function (v) {
            if (v == "1") {
                return "<font color=green>男</font>";
            } else if (v == "2") {
                return "<font color=red>女</font>";//
            } else if (v == "3") {
                return "未知";//
            }
        }
        },
        {text: "手机", dataIndex: "cellPhone", width: 100, border: 50},
        {text: "地址", dataIndex: "address", width: 250, border: 50},
        {text: "描述", dataIndex: "infoDesc", width: 200, border: 50},
        {
            text: "创建时间", dataIndex: "createTime", width: 140, border: 50,
            renderer: function (v) {
                return this.formatDateTime(v);
            }
        },
        {
            text: "最后修改时间", dataIndex: "updateTime", width: 140, border: 50,
            renderer: function (v) {
                return this.formatDateTime(v);
            }
        }

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});