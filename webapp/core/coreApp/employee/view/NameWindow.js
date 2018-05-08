/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.employee.view.NameWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.nameWindow',
    id:'nameWindow',
    title: "差错信息编辑",
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
            name: "empName",
            nametyText:'李永伟',
            allowBlank: false,//不允许为空
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "员工号",
            name: "pacteraNo",
            allowBlank: false,//不允许为空
            blankText: '员工号不能为空',//错误提示内容
            nametyText:'P0050379',
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "行方注册姓名",
            name: "attName",
            allowBlank: false,//不允许为空
            blankText: '注册姓名不能为空',//错误提示内容
            nametyText:'文思李永伟',
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