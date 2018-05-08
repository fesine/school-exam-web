/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.system.view.CodeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.codeWindow',
    id:'codeWindow',
    title: "代码编辑",
    width: 400,
    height: 450,
    layout: "fit",
    modal:true,
    items: {
        xtype: "form",
        margin: 5,
        border: false,
        bodyStyle: 'padding:5 5 5 5',
        fieldDefaults: {
            width: 300,
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
            fieldLabel: "代码编号",
            name: "codeId",
            allowBlank: false,//不允许为空
            blankText: '代码编号不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "代码名称",
            name: "text",
            allowBlank: false,//不允许为空
            blankText: '代码名称不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "代码值",
            name: "value",
            readOnly: false
        }, {
            xtype: 'combobox',
            name: "parentId",
            fieldLabel: '上级代码',
            emptyText: '根代码',
            store: Ext.create("core.system.store.CodeStore", {}),
            forceSelection: true,
            //指定local，加载已经缓存的数据，不再远程请求，如果本地没数据，则远程请求
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            displayField: 'text'
        }, {
            xtype: "numberfield",
            fieldLabel: "排序号",
            name: "orderNo",
            minValue: 1,
            allowBlank: false,//不允许为空
            blankText: '排序号不能为空'//错误提示内容
        }, {
            name: 'grade',
            xtype: 'combobox',
            fieldLabel: '代码权限',
            store: Ext.create("core.common.store.MenuAuthStore", {}),
            forceSelection: true,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'id'
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