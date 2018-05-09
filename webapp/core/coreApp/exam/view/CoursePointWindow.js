/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.exam.view.CoursePointWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.coursePointWindow',
    id:'coursePointWindow',
    title: "知识点信息编辑",
    width: 450,
    height: 400,
    layout: "fit",
    modal:true,
    items: {
        xtype: "form",
        margin: 5,
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
            xtype: "combobox",
            fieldLabel: "年级",
            name: "gradeId",
            store: Ext.create("core.school.store.GradeStore", {}),
            forceSelection: true,
            queryMode: 'remote',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'gradeName',
            listeners: {
                blur: function (obj) {
                    getCourseName(obj);
                }
            }
        }, {
            xtype: "combobox",
            fieldLabel: "课程名称",
            name: "courseId",
            store: Ext.create("core.school.store.CourseStore", {}),
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            triggerAction: "all",
            allowBlank: false,//不允许为空
            displayField: 'courseName',
            listeners: {
                expand: function (obj) {
                    var gradeId = obj.ownerCt.getForm().findField("gradeId").getValue();
                    if(!gradeId){
                        obj.getStore().removeAll();
                    }
                }
            }
        }, {
            xtype: "textarea",
            fieldLabel: "知识点",
            name: "coursePoint",
            emptyText: '请输入知识点',
            width: 400,
            height:100,
            minHeight: 60
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