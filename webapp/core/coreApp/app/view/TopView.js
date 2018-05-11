/**北部*/
Ext.define("core.app.view.TopView", {
    extend: "Ext.panel.Panel",
    alias: 'widget.topview',
    id: "topView",
    height: 60,
    bodyStyle: {
        background: '#7598e0',
        padding: '80px'
    },
    layout: "absolute",
    items: [{
        x: 50,
        y: 0,
        width: 900,
        bodyStyle: {
            background: '#7598e0',
            border: 0,
            padding: '10px'
        },
        html: "<h1><font color=white size=6> 农大附中学习辅助系统管理系统</font>" +
        "<font color=white size=3> V1.0 beta</font></h1>"
    }, {
        x: 1100,
        y: 35,
        xtype: "button",
        ref: "logout",
        text: "注 销 系 统"
    }, {
        x: 1180,
        y: 35,
        xtype: "button",
        ref: "clear",
        text: "清 空 缓 存"
    }]
});
