/**主控制器*/
Ext.define("core.app.controller.MainController",{
	extend : "Ext.app.Controller",
	init : function(){
		var self = this;
		this.addFunItem=function(funInfo){
			if(funInfo){
				var mainView=funInfo.mainView;
				var funPanel=mainView.down(funInfo.funViewXtype);
				if(!funPanel){
					self.application.getController(funInfo.funController).init();
					funPanel=Ext.create(funInfo.funViewName);
					mainView.add(funPanel);
					mainView.setActiveTab(funPanel);
				}else{
					mainView.setActiveTab(funPanel);
				}
			}
		},
		///**下在是控制部分*/
		this.control({
			/**注销*/
			"topview button[ref=logout]" : {
				click: function(btn){
					Ext.Ajax.request({
						waitMsg: '正在注销……',
						url: _hostUrl+"/v1/user/logout",
						method: "GET",
						timeout: 4000,
						success: function (response, opts) {
							var resObj = Ext.decode(response.responseText);
							if (resObj.code == 200) {
                                Ext.util.Cookies.clear("userId");
                                Ext.util.Cookies.clear("gradeName");
                                Ext.util.Cookies.clear("grade");
                                Ext.util.Cookies.clear("hiddenMenu");
                                if(Ext.util.Cookies.get("rememberMe")=='false'){
                                    Ext.util.Cookies.clear("userName");
                                    Ext.util.Cookies.clear("rememberMe");
                                }
								function callBack() {
									location.href = "login.html";
								}
								Ext.Msg.alert("提示", "注销成功!", callBack);
							} else {
								Ext.Msg.alert("提示", resObj.msg);
							}
						}
					});
				}
			},
		//
		//	//别名 xtype选择器，对象，响应点击事件
			"menuTreeView treepanel":{
				itemclick:function(tree,record,item,index,e,eOpts){
					var mainView=tree.up("mainviewlayout").down("centerview");
                    Ext.Array.some(menuArr, function (item) {
						if(record.data['id']==item.id){
                            self.addFunItem({
                                mainView: mainView,
                                funViewXtype: item.funViewXtype,
                                funController: item.funController,
                                funViewName: item.funViewName
                            });
                            return true;
						}
                    });
				}//itemclick end
			}//"westview treepanel" end
		});
	},
	views : [
		"core.app.view.TopView",
		"core.app.view.MenuTreeView",
		"core.app.view.CenterView",
		"core.app.view.MainViewLayout"
	],
	store : [],
	model : []
});
//组建树
var buildTree = function (json) {
    return Ext.create('Ext.tree.Panel', {
        rootVisible: false,
        border: false,
        lines: false,
        autoScroll: true,
        store: Ext.create('Ext.data.TreeStore', {
            model: 'core.app.model.WestMenuModel',
            root: {
                expanded: true,
                children: json.children
            }
        })
    });
};

var menuArr = [];
var menuObj = null;