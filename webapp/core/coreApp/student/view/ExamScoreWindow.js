/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.student.view.ExamScoreWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.examScoreWindow',
    id: 'examScoreWindow',
    title: "成绩管理编辑",
    width: 300,
    height: 200,
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
        items: [{
            xtype: "textfield",
            fieldLabel: "ID",
            name: "id",
            hidden: true
        }, {
            xtype: "textfield",
            fieldLabel: "年级",
            name: "gradeId",
            hidden: true
        }, {
            xtype: "combobox",
            fieldLabel: "班级",
            name: "classroomId",
            store: Ext.create("core.school.store.ClassroomStore", {}),
            forceSelection: true,
            queryMode: 'remote',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'classroomName',
            listeners: {
                blur: function (obj) {
                    getStudentName(obj);
                }
            }
        }, {
            xtype: "combobox",
            fieldLabel: "学生",
            name: "stuNo",
            store: Ext.create("core.student.store.StudentStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'stuName',
            listeners: {
                expand: function (obj) {
                    var gradeId = obj.ownerCt.getForm().findField("gradeId").getValue();
                    var classroomId = obj.ownerCt.getForm().findField("classroomId").getValue();
                    if (!gradeId || !classroomId) {
                        obj.getStore().removeAll();
                    }
                }
            }
        }, {
            xtype: "textfield",
            fieldLabel: "成绩",
            name: "score",
            blankText: '成绩不能为空',//错误提示内容,
            allowBlank: false//不允许为空
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