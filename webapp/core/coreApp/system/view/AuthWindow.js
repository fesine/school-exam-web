/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.system.view.AuthWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.authWindow',
    id:'authWindow',
    title: "用户编辑",
    width: 350,
    height: 400,
    layout: "fit",
    modal:true,
    items: {
        xtype: "form",
        margin: 10,
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
            fieldLabel: "用户名",
            name: "username",
            allowBlank: false,//不允许为空
            emptyText: '请输入用户名',
            blankText: '用户名不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "昵称",
            name: "nickName",
            allowBlank: false,//不允许为空
            blankText: '昵称不能为空',//错误提示内容
            emptyText:'请输入昵称',
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "手机",
            name: "cell",
            allowBlank: false,//不允许为空
            blankText: '手机不能为空',//错误提示内容
            emptyText:'请输入手机号码',
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "email",
            name: "email",
            allowBlank: false,//不允许为空
            blankText: 'email不能为空',//错误提示内容
            emptyText:'请输入email',
            readOnly: false
        }, {
            name: 'grade',
            xtype: 'combobox',
            fieldLabel: '管理权限',
            store: Ext.create("core.system.store.CodeStore", {}),
            forceSelection: true,
            //指定local，加载已经缓存的数据，不再远程请求，如果本地没数据，则远程请求
            queryMode: 'local',
            valueField: 'value',
            triggerAction: "all",
            displayField: 'text'
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