/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.student.view.StudentWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.studentWindow',
    id:'studentWindow',
    title: "学生编辑",
    width: 450,
    height: 450,
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
            fieldLabel: "学号",
            name: "stuNo",
            readOnly: true
        }, {
            xtype: "textfield",
            fieldLabel: "姓名",
            name: "stuName",
            allowBlank: false,//不允许为空
            blankText: '姓名不能为空',//错误提示内容
            emptyText:'请输入姓名'
        }, {
            xtype: 'combobox',
            fieldLabel: '性别',
            name: 'stuSex',
            store: Ext.create("Ext.data.Store", {
                fields: ["value", "name"],
                data: [
                    {value: 0, name: "未知"},
                    {value: 1, name: "男"},
                    {value: 2, name: "女"}
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
            xtype: "datefield",
            fieldLabel: "出生日期",
            name: "stuBirthdayStr",
            format: "Y年m月d日",
            emptyText:'请输入出生日期'
        }, {
            xtype: "textfield",
            fieldLabel: "手机号码",
            name: "stuCell",
            emptyText:'请输入手机号码'
        }, {
            xtype: "textfield",
            fieldLabel: "email",
            name: "stuEmail",
            emptyText:'请输入email'
        }, {
            xtype: "textarea",
            fieldLabel: "地址",
            name: "stuAddress",
            emptyText:'请输入地址',
            width: 400,
            minHeight: 60
        }, {
            xtype: "combobox",
            fieldLabel: "年级",
            name: "gradeId",
            store: Ext.create("core.school.store.GradeStore", {}),
            forceSelection: true,
            queryMode: 'remote',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'gradeName'
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
            displayField: 'classroomName'
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