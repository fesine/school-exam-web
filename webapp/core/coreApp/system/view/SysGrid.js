Ext.define("core.system.view.SysGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.sysGrid",
    store: "core.system.store.SysStore",
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
        {xtype: 'button', text: "双击数据修改信息", iconCls: 'table_edit'},
        {xtype: 'button', text: "点我修改密码",ref:'updatePassword', iconCls: 'table_edit'}
    ],
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "员工号", dataIndex: "pacteraNo", width: 80, border: 50},
        {text: "姓名", dataIndex: "name", width: 80, border: 50},
        {
            text: "性别", dataIndex: "sex", width: 50,
            renderer: function (v) {
                var store = Ext.create("core.common.store.SexTypeStore", {});
                return store.findRecord("id", v).data["text"];
            }
        },
        {text: "卡号", dataIndex: "jobNo", width: 100, border: 50},
        {text: "手机", dataIndex: "cellphone", width: 100, border: 50},
        {
            text: "创建时间", dataIndex: "createTime", width: 170, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        },
        {
            text: "最后修改时间", dataIndex: "updateTime", width: 170, border: 50,
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