/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.attendance.view.AttendanceWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.attendanceWindow',
    id: 'attendanceWindow',
    title: "考勤管理编辑",
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
        items: [
            {
                border: 0,
                layout: 'column',
                items: [
                    {
                        columnWidth: 0.6,
                        margin: '3,0,0,0',
                        xtype: 'fieldset',
                        title: '用户基本信息',
                        items: [{
                            xtype: "textfield",
                            fieldLabel: "ID",
                            name: "id",
                            hidden: true
                        }, {
                            xtype: "textfield",
                            fieldLabel: "用户名",
                            name: "attendanceName",
                            id: "attendanceName",
                            allowBlank: false,//不允许为空
                            blankText: '用户名不能为空'
                        }, {
                            xtype: "textfield",
                            fieldLabel: "密码",
                            inputType: 'password',
                            name: "password",
                            allowBlank: false,//不允许为空
                            blankText: '密码不能为空'
                        }, {
                            xtype: "textfield",
                            fieldLabel: "确认密码",
                            name: "checkPwd",
                            inputType: 'password',
                            allowBlank: false,//不允许为空
                            blankText: '确认密码不能为空',//错误提示内容
                            validator: function (value) {
                                var pw = this.previousSibling().value;
                                if (value != pw) {
                                    return '两次输入的密码不一致';
                                } else {
                                    return true;
                                }
                            }
                        }, {
                            xtype: "textfield",
                            fieldLabel: "昵称",
                            name: 'nickName',
                            allowBlank: false,//不允许为空
                            blankText: '昵称不能为空'
                        }, {
                            xtype: 'combobox',
                            fieldLabel: '性别',
                            width:150,
                            name: 'sex',
                            store: Ext.create("Ext.data.Store", {
                                fields: ["value", "name"],
                                data: [
                                    {value: '1', name: "男"},
                                    {value: '2', name: "女"},
                                    {value: '3', name: "未知"}
                                ]
                            }),
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            emptyText: '请选择',
                            allowBlank: false,//不允许为空
                            blankText: '性别不能为空'
                        }, {
                            xtype: "textfield",
                            name: 'cellPhone',
                            fieldLabel: "手机"
                        }, {
                            xtype: 'filefield',
                            name: 'photos',
                            anchor: '100%',
                            buttonText: '选择头像'
                        }, {
                            height: 10,
                            bodyStyle: 'background:transparent',//设置为透明,不妨碍更换主题了
                            border: 0
                        }]
                    }, {
                        columnWidth: 0.4,
                        margin:'10,10,10,10',
                        xtype: 'fieldset',
                        items: [{
                            xtype: 'image',
                            width: 120,
                            height: 120
                        }]
                    }
                ]
            }, {
                fieldLabel: '地址',
                xtype: 'textarea',
                name: 'address',
                width: 400,
                minHeight: 60
            }, {
                fieldLabel: '描述',
                xtype: 'textarea',
                name: 'infoDesc',
                width: 400,
                minHeight: 100
            }
        ]
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});