/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.system.view.SysUpdateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.sysUpdateWindow',
    title: "个人信息编辑",
    width: 300,
    height: 350,
    layout: "fit",
    modal:true,
    items: {
        xtype: "form",
        margin: 5,
        border: false,
        bodyStyle: 'padding:5 5 5 5',
        fieldDefaults: {
            width: 260,
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 80
        },
        tbar: [{
            xtype: "button",
            ref: "save",
            iconCls: "table_save",
            formBind: true,
            text: "保存"
        }, {
            text: '重置',
            iconCls: "wfreturn",
            ref: "reset"
        }, {
            xtype: "button",
            ref: "return",
            iconCls: "return",
            text: "返回"
        }],
        items: [{
            xtype: "textfield",
            fieldLabel: "ID",
            name: "id",
            hidden: true
        }, {
            xtype: "textfield",
            fieldLabel: "姓名",
            name: "name",
            emptyText:'李永伟',
            allowBlank: false,//不允许为空
            readOnly: false
        }, {
            xtype: "combobox",
            fieldLabel: "性别",
            name: "sex",
            store: Ext.create("core.common.store.SexTypeStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'text'
        }, {
            xtype: "textfield",
            fieldLabel: "员工号",
            name: "pacteraNo",
            allowBlank: false,//不允许为空
            blankText: '员工号不能为空',//错误提示内容
            emptyText:'P0050379',
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "卡号",
            name: "jobNo",
            allowBlank: false,//不允许为空
            blankText: '卡号不能为空',//错误提示内容
            emptyText:'2779172541',
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "手机",
            name: "cellphone",
            emptyText:'13812341234',
            readOnly: false
        }, {
            height: 10,
            bodyStyle: 'background:transparent',//设置为透明,不妨碍更换主题了
            border: 0
        }]
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});