/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.exam.view.ExamWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.examWindow',
    id:'examWindow',
    title: "考试信息编辑",
    width: 300,
    height: 350,
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
                onTriggerClick: function (obj) {
                    var gradeId = obj.ownerCt.getForm().findField("gradeId").getValue();
                    if(!gradeId){
                        return;
                    }
                }
            }
        }, {
            xtype: 'combobox',
            fieldLabel: '考试形式',
            name: 'examType',
            store: Ext.create("Ext.data.Store", {
                fields: ["value", "name"],
                data: [
                    {value: 1, name: "闭卷"},
                    {value: 2, name: "开卷"},
                ]
            }),
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            emptyText: '请选择',
            allowBlank: false,//不允许为空
            blankText: '考试形式不能为空'
        }, {
            xtype: "datefield",
            fieldLabel: "考试日期",
            format: "Y年m月d日",
            name: "startDate",
            blankText: '考试日期不能为空',//错误提示内容,
            allowBlank: false
        }, {
            xtype: "timefield",
            fieldLabel: "开始时间",
            format: "G:i",
            increment: 30,
            minValue: '8:00',
            maxValue: '17:00',
            name: "startTimeStr",
            blankText: '开始时间不能为空',//错误提示内容,
            allowBlank: false,//不允许为空
            listeners: {
                blur: function (obj) {
                    setTimeCount(obj);
                }
            }
        }, {
            xtype: "timefield",
            fieldLabel: "结束时间",
            format: "G:i",
            increment: 30,
            minValue: '8:00',
            maxValue: '17:00',
            name: "endTimeStr",
            blankText: '结束时间不能为空',//错误提示内容,
            allowBlank: false,//不允许为空
            listeners: {
                blur: function (obj) {
                    setTimeCount(obj);
                }
            }
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