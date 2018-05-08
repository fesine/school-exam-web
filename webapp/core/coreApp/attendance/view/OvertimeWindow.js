/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.attendance.view.OvertimeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.overtimeWindow',
    id: 'overtimeWindow',
    title: '加班申请编辑',
    width: 450,
    height: 500,
    layout: 'fit',
    modal: true,
    items: {
        xtype: 'form',
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
            xtype: 'button',
            ref: 'save',
            iconCls: 'table_save',
            formBind: true,
            text: '保存'
        }, {
            text: '重置',
            iconCls: 'wfreturn',
            ref: 'reset'
        }, {
            xtype: 'button',
            ref: 'return',
            iconCls: 'return',
            text: '返回'
        }],
        items: [{
            xtype: 'textfield',
            fieldLabel: 'ID',
            name: 'id',
            hidden: true
            // }, {
            //     id:'pact_combo',
            //     fieldLabel: '员工号',
            //     name: 'pacteraNo',
            //     xtype: 'combobox',
            //     emptyText: '选择员工号',
            //     mode: 'remote',
            //     store: Ext.create('core.employee.store.EmpStore', {}),
            //     displayField: 'pacteraNo',
            //     valueField: 'pacteraNo',
            //     readOnly: true
        }, {
            id: 'pact_text',
            xtype: 'textfield',
            fieldLabel: '员工号',
            name: 'pacteraNo',
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
            // }, {
            //     xtype: 'textfield',
            //     fieldLabel: '姓名',
            //     readOnly: true,
            //     name: 'name'
        }, {
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '开始时间',
                    width: 220,
                    format: 'Y年m月d日',
                    name: 'startDate',
                    blankText: '开始日期不能为空',//错误提示内容,
                    allowBlank: false,//不允许为空
                    listeners: {
                        blur: function (obj) {
                            setTimeCount(obj)
                        }
                    }
                }, {
                    xtype: 'timefield',
                    name: 'startTimeStr',
                    width: 80,
                    format: 'G:i',
                    increment: 60,
                    blankText: '时间不能为空',//错误提示内容,
                    allowBlank: false,//不允许为空
                    listeners: {
                        blur: function (obj) {
                            setTimeCount(obj)
                        }
                    }
                }
            ]
        }, {
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '结束日期',
                    width: 220,
                    format: 'Y年m月d日',
                    name: 'endDate',
                    blankText: '结束日期不能为空',//错误提示内容,
                    allowBlank: false,//不允许为空
                    listeners: {
                        blur: function (obj) {
                            setTimeCount(obj)
                        }
                    }
                }, {
                    xtype: 'timefield',
                    name: 'endTimeStr',
                    width: 80,
                    format: 'G:i',
                    increment: 60,
                    allowBlank: false,//不允许为空
                    blankText: '时间不能为空',//错误提示内容
                    listeners: {
                        blur: function (obj) {
                            setTimeCount(obj)
                        }
                    }
                }
            ]
        }, {
            xtype: 'numberfield',
            fieldLabel: '加班时长',
            decimalPrecision: 1,
            step: 0.1,
            allowBlank: false,//不允许为空
            name: 'timeCount'
        }, {
            fieldLabel: '法定假日',
            name: 'holidayFlag',
            xtype: 'combobox',
            store: Ext.create('core.common.store.HolidayFlagStore', {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: 'all',
            allowBlank: false,//不允许为空
            displayField: 'text'
        }, {
            fieldLabel: '结算方式',
            name: 'adjustFlag',
            xtype: 'combobox',
            store: Ext.create('core.common.store.AdjustFlagStore', {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: 'all',
            allowBlank: false,//不允许为空
            displayField: 'text'
        }, {
            xtype: 'textarea',
            fieldLabel: '加班理由',
            minHeight: 100,
            allowBlank: false,//不允许为空
            name: 'reason'
        }, {
            fieldLabel: '当前状态',
            name: 'status',
            xtype: 'combobox',
            store: Ext.create('core.common.store.ApplyStatusStore', {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: 'all',
            displayField: 'text',
            readOnly: true
        }, {
            height: 10,
            bodyStyle: 'background:transparent',//设置为透明,不妨碍更换主题了
            border: 0
        }]
    },
    initComponent: function () {
        this.callParent(arguments)
    }
})