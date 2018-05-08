/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.system.view.MenuWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.menuWindow',
    id:'menuWindow',
    title: "菜单编辑",
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
            fieldLabel: "栏目编号",
            name: "menuId",
            allowBlank: false,//不允许为空
            blankText: '栏目编号不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: "textfield",
            fieldLabel: "栏目名称",
            name: "text",
            allowBlank: false,//不允许为空
            blankText: '栏目名称不能为空',//错误提示内容
            readOnly: false
        }, {
            xtype: 'combobox',
            name: "parentId",
            fieldLabel: '上级栏目',
            emptyText: '根栏目',
            store: Ext.create("core.system.store.MenuStore", {}),
            forceSelection: true,
            //指定local，加载已经缓存的数据，不再远程请求，如果本地没数据，则远程请求
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            displayField: 'text'
            // onTriggerClick: function () {
            //     alert('abc');
            // }
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
            fieldLabel: '栏目权限',
            store: Ext.create("core.common.store.MenuAuthStore", {}),
            forceSelection: true,
            queryMode: 'local',
            displayField: 'text',
            valueField: 'id'
        }, {
            xtype: "textfield",
            fieldLabel: "视图别名",
            name: "funViewXtype"
        }, {
            xtype: "textfield",
            fieldLabel: "控制器类名",
            name: "funController"
        }, {
            xtype: "textfield",
            fieldLabel: "视图类名",
            name: "funViewName"
        }, {
            xtype: "textfield",
            fieldLabel: "栏目图标",
            name: "iconCls"
        }, {
            xtype: "textfield",
            fieldLabel: "跳转链接",
            name: "url"
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