/**
 * Created by Fesine on 2017/3/4.
 */
Ext.define('core.attendance.view.AnalyseWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.analyseWindow',
    id: 'analyseWindow',
    title: "异常处理",
    width: 450,
    height: 200,
    layout: "fit",
    modal: true,
    items: {
        xtype: "form",
        border: false,
        bodyStyle: 'padding:5 5 5 5',
        fieldDefaults: {
            width: 300,
            labelAlign: 'left',
            msgTarget: 'under',
            labelWidth: 80
        },
        // tbar: [{
        //     xtype: "button",
        //     ref: "return",
        //     iconCls: "return",
        //     text: "返回"
        // }],
        items: [{
            xtype: 'combobox',
            name: "workTime",
            fieldLabel: '工作时间',
            emptyText: '请选择工作时间',
            store: Ext.create("core.system.store.CodeStore", {}),
            forceSelection: true,
            //指定local，加载已经缓存的数据，不再远程请求，如果本地没数据，则远程请求
            queryMode: 'local',
            valueField: 'value',
            triggerAction: "all",
            displayField: 'text'
        },{
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            items: [
                {
                    xtype: "monthfield",
                    fieldLabel: "分析月份",
                    width: 220,
                    format: "Y年m月",
                    name: "startMonth"
                }, {
                    xtype: "button",
                    margin: '0 5',
                    text: "开始分析",
                    ref: "monthBtn"
                }
            ]
        }, {
            layout: 'column',
            frame: true,
            baseCls: 'my-panel-no-border',
            margin:'10 0',
            items: [
                {
                    xtype: "datefield",
                    fieldLabel: "分析工作日",
                    width: 220,
                    format: "Y年m月d日",
                    name: "startDate"
                }, {
                    xtype: "button",
                    margin: '0 5',
                    text: "开始分析",
                    ref: "dayBtn"
                }
            ]
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