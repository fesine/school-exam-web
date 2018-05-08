/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.attendance.view.ErrorWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.errorWindow',
    id: 'errorWindow',
    title: "异常处理编辑",
    width: 450,
    height: 500,
    layout: "fit",
    modal: true,
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
            fieldLabel: "员工号",
            name: "pacteraNo",
            blankText: '员工号不能为空',//错误提示内容,
            allowBlank: false//不允许为空
        }, {
            xtype: "textfield",
            fieldLabel: "姓名",
            name: "name",
            blankText: '姓名不能为空',//错误提示内容,
            allowBlank: false//不允许为空
        }, {
            xtype: "datefield",
            fieldLabel: "异常时间",
            width: 220,
            format: "Y年m月d日",
            name: "startDate",
            blankText: '异常日期不能为空',//错误提示内容,
            allowBlank: false//不允许为空
        }, {
            fieldLabel: "异常类型",
            name: "errorType",
            xtype: 'combobox',
            store: Ext.create("core.common.store.ErrorTypeStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'text'
        }, {
            xtype: "textarea",
            fieldLabel: "异常内容",
            minHeight: 100,
            allowBlank: false,//不允许为空
            name: "errorMsg"
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