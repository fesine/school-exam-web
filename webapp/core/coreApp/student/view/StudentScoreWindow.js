/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.student.view.StudentScoreWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.studentScoreWindow',
    id: 'studentScoreWindow',
    title: "成绩综合分析",
    width: 400,
    height: 400,
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
            ref: "return",
            iconCls: "return",
            text: "返回"
        }],
        items: [{
            xtype: "textfield",
            fieldLabel: "年级排名",
            name: "gradeNo",
            readOnly: true
        }, {
            xtype: "textfield",
            fieldLabel: "班级排名",
            name: "classroomNo",
            readOnly: true
        }, {
            xtype: "textarea",
            fieldLabel: "建议",
            name: "msg",
            width: 350,
            minHeight: 100,
            readOnly: true
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