/**
 * Created by Fesine on 2016/2/24.
 */
Ext.onReady(function () {

    /**开启ext自动提示*/
    Ext.QuickTips.init();
    Ext.Loader.setConfig({
        enabled: true
    });
    /**主程序开始*/
    Ext.application({
        name: 'core',//命名空间
        appFolder: 'core/coreApp',
        launch: function () {
            Ext.create("Ext.container.Viewport",{
                layout:'fit',
                border:0,
                items:[{
                    xtype: "mainviewlayout"
                }]
            });
        },
        controllers: ["core.app.controller.MainController"]

    });
});
