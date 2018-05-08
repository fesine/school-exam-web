/**
 * Created by Fesine on 2016/2/24.
 */
Ext.define("core.app.view.MainViewLayout",{
   extend:'Ext.panel.Panel',
    border:0,
    layout:'border',
    alias: 'widget.mainviewlayout',
    width: 60,
    height: 60,
    items: [{
        region: 'north',
        xtype: 'topview'
    }, {
        // xtype: 'westview',
        region: 'west',
        layout: 'border',
        title: '菜单',
        id: 'layout-browser',
        border: false,
        split: true,
        margins: '2 0 5 5',
        width: 200,
        minSize: 100,
        maxSize: 500,
        autoScroll: false,
        collapsible: true, // 是否折叠
        items: [{
            xtype: 'menuTreeView'
        }, {
            id: 'details-panel',
            iconCls: "tree_user",
            collapsible: false, // 是否折叠
            title: '信息',
            region: 'center',
            bodyStyle: 'padding-bottom:15px;background:#eee;',
            autoScroll: true,
            html: '<p class="details-info" style="margin: 5px 15px">' +
            '姓&nbsp;&nbsp;&nbsp;名：' +
            Ext.util.Cookies.get('userName')
            +'<br />角&nbsp;&nbsp;&nbsp;色：' +
            Ext.util.Cookies.get("gradeName") +
            '<br />昵&nbsp;&nbsp;&nbsp;称：' +
            Ext.util.Cookies.get('nickName') +
            '</p>'
        }]
    }, {
        xtype: 'panel',
        region: 'center',
        layout: 'fit',
        margins: '2 0 0 0',
        border: 0,
        items: [{
            xtype: 'centerview',
            border: 0
        }]
    }],
    listeners: {
        afterrender: function () {
            if (!menuObj) {
                Ext.getBody().mask('正在加载系统菜单....');
                Ext.Ajax.request({
                    url: _hostUrl + '/v1/menus/0',
                    timeout: 4000,
                    success: function (response) {
                        menuArr = [];
                        Ext.getBody().unmask();
                        var json = Ext.JSON.decode(response.responseText);
                        if (json.code == 200) {
                            menuObj = json.data;
                            Ext.each(json.data, function (el) {
                                var panel = Ext.create('Ext.panel.Panel', {
                                    id: el.id,
                                    title: el.text,
                                    iconCls: el.iconCls,
                                    leaf: el.leaf,
                                    layout: 'fit'
                                });
                                Ext.Array.each(el.children, function (model) {
                                    menuArr.push(model);
                                });
                                panel.add(buildTree(el));
                                Ext.getCmp("menuTreeView").add(panel);
                            });
                        }
                    }, failure: function (request) {
                        Ext.MessageBox.show({
                            title: '操作提示',
                            msg: "连接服务器失败",
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    },
                    method: 'GET'
                });
            }else {
                Ext.each(menuObj, function (el) {
                    var panel = Ext.create('Ext.panel.Panel', {
                        id: el.id,
                        title: el.text,
                        iconCls: el.iconCls,
                        leaf: el.leaf,
                        layout: 'fit'
                    });
                    Ext.Array.each(el.children, function (model) {
                        menuArr.push(model);
                    });
                    panel.add(buildTree(el));
                    Ext.getCmp("menuTreeView").add(panel);
                });
            }
        }
    },
    //初始化组件
    initComponent: function () {
        this.callParent(arguments);
    }
});