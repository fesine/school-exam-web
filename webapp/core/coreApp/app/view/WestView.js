/**
 * 西部菜单功能
 */
Ext.define("core.app.view.WestView",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.westview',
	collapsible: true,
	split: true,
	defaults: {
		bodyStyle: 'padding:2px'
	}, 	
	border:1,
	margins: '2 2 0 0',
	width: 200,
	minSize: 100,
	maxSize: 250,
	title:"功能模块导航",
	layout : 'accordion',
	layoutConfig :{
				titleCollapse: false,
				animate: true,
				activeOnTop: true
			},
	items:[{
        title: "我的考勤",
        items: [{
            xtype: "treepanel",
            rootVisible: false,// 不展示根节点
            displayField: "text",
            border: 0,
            root: {
                expanded: true,
                children: [
                    {
                        id: "myAttManager",
                        text: "我的考勤",
                        leaf: true
                    }, {
                        id: "wantOver",
                        text: "我要加班",
                        leaf: true
                    }, {
                        id: "wantLeave",
                        text: "我要请假",
                        leaf: true
                    }
                ]
            }
        }]
	},{
        title: "考勤管理",
        items: [{
            xtype: "treepanel",
            rootVisible: false,// 不展示根节点
            displayField: "text",
            border: 0,
            root: {
                expanded: true,
                children: [
                    {
                        id: "attendancemanager",
                        text: "考勤管理",
                        leaf: true
                    },{
                        id: "overManager",
                        text: "加班管理",
                        leaf: true
                    },{
                        id: "leaveManager",
                        text: "请假管理",
                        leaf: true
                    }
                ]
            }
        }]
        }, {
            title: "用户管理",
            items: [{
                xtype: "treepanel",
                rootVisible: false,// 不展示根节点
                displayField: "text",
                border: 0,
                root: {
                    expanded: true,
                    children: [
                        {
                            id: "usermanager",
                            text: "用户管理",
                            leaf: true
                        },
                        {
                            id: "namemanager",
                            text: "姓名匹配",
                            leaf: true
                        }
                    ]
                }
            }]

        },{
        title: "系统设置",
        items: [{
            xtype: "treepanel",
            rootVisible: false,// 不展示根节点
            displayField: "text",
            border: 0,
            root: {
                expanded: true,
                children: [
                    {
                        id: "sysmanager",
                        text: "修改密码",
                        leaf: true
                    },
                    {
                        id: "authmanager",
                        text: "权限管理",
                        leaf: true
                    },
                    {
                        id: "menumanager",
                        text: "菜单管理",
                        leaf: true
                    }
                ]
            }
        }]
    }
	],
    initComponent: function(){
        this.callParent(arguments);
    }
});



