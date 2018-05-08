/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.system.view.SysWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.sysWindow',
    id:'sysWindow',
    title: "修改密码",
    width: 350,
    height: 300,
    layout: "fit",
    modal:true,
    items: {
        xtype: "form",
        margin: 5,
        border: false,
        bodyStyle: 'padding:5 5 5 5',
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 60
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
            allowBlank: false,//不允许为空
            blankText: '用户名不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "密码",
            inputType: 'password',
            name: "password",
            allowBlank: false,//不允许为空
            blankText: '密码不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "确认密码",
            inputType: 'password',
            allowBlank: false,//不允许为空
            blankText: '密码不能为空',//错误提示内容
            validator: function (value) {
                var pw = this.previousSibling().value;
                var btn = this.findParentByType("form").down("button[ref=save]");
                if (value != pw) {
                    return '两次输入的密码不一致';
                } else {
                    btn.enable();
                    return true;
                }
            }
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