/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.attendance.view.LeaveWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.leaveWindow',
    id: 'leaveWindow',
    title: "请假申请编辑",
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
            readOnly: true
        }, {
            fieldLabel: '姓名',
            name: 'name',
            xtype: 'combobox',
            emptyText: '选择姓名',
            mode: 'remote',
            store: Ext.create('core.employee.store.EmpStore', {}),
            displayField: 'name',
            valueField: 'name',
            listeners: {
                select: function (combo, records) {
                    this.up('form').getForm().findField('pacteraNo').setValue(records[0].data.pacteraNo)
                }
            }
            // xtype: "textfield",
            // fieldLabel: "姓名",
            // name: "name",
            // readOnly: true
        }, {
            xtype: "datefield",
            fieldLabel: "开始时间",
            width: 220,
            format: "Y年m月d日",
            name: "startDate",
            blankText: '开始日期不能为空',//错误提示内容,
            allowBlank: false,//不允许为空
            listeners: {
                blur: function (obj) {
                    setTimeCount(obj);
                }
            }
        }, {
            xtype: "datefield",
            fieldLabel: "结束日期",
            width: 220,
            format: "Y年m月d日",
            name: "endDate",
            blankText: '结束日期不能为空',//错误提示内容,
            allowBlank: false,//不允许为空
            listeners: {
                blur: function (obj) {
                    setTimeCount(obj);
                }
            }
        }, {
            xtype: "numberfield",
            fieldLabel: "请假天数",
            allowBlank: false,//不允许为空
            name: "dayCount"
        }, {
            fieldLabel: "请假类型",
            name: "leaveType",
            xtype: 'combobox',
            store: Ext.create("core.common.store.LeaveTypeStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'text'
        }, {
            xtype: "textarea",
            fieldLabel: "请假原因",
            minHeight: 100,
            allowBlank: false,//不允许为空
            name: "reason"
        }, {
            fieldLabel: "当前状态",
            name: "status",
            xtype: 'combobox',
            store: Ext.create("core.common.store.ApplyStatusStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            displayField: 'text',
            readOnly:true
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