Ext.define("core.system.controller.SysController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        this.control({
            //修改密码
            "sysGrid button[ref=updatePassword]": {
                click: function (_btn) {
                    var grid = _btn.up("sysGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var win = Ext.widget("sysWindow");
                    var form = win.down("form");
                    var item = form.getForm().findField("name");
                    item.setReadOnly(true);
                    //把选择的数据加载到form中去
                    form.loadRecord(records[0]);//加载数据
                    form.getForm().findField("password").setValue("");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    win.show();
                }

            },
            //修改员工信息
            "sysGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("sysUpdateWindow");
                    var form = win.down("form");
                    form.getForm().findField("name").setReadOnly(true);
                    form.getForm().findField("pacteraNo").setReadOnly(true);
                    form.getForm().findField("jobNo").setReadOnly(true);
                    //把选择的数据加载到form中去
                    form.loadRecord(record);//加载数据
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    win.show();
                }

            },
            /**
             * 添加用户form的保存按钮
             */
            "sysUpdateWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _hostUrl + "/v1/employee",
                        method: 'PUT',
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                _form.up("sysUpdateWindow").close();
                                Ext.Msg.alert("提示", "修改成功!");
                                var _grid = Ext.widget("sysGrid");
                                var store = _grid.getStore();
                                store.load();

                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },
            /**
             * 添加用户form的保存按钮
             */
            "sysWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _hostUrl + "/v1/employee/" + _form.getForm().findField("id").getValue(),
                        method: 'PUT',
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("sysWindow").close();
                                function callBack() {
                                    Ext.Ajax.request({
                                        waitMsg: '正在注销……',
                                        url: _hostUrl + "/v1/user/logout",
                                        method: "GET",
                                        timeout: 4000,
                                        success: function (response, opts) {
                                            var resObj = Ext.decode(response.responseText);
                                            if (resObj.code == 200) {
                                                Ext.util.Cookies.clear("userId");
                                                Ext.util.Cookies.clear("cardNo");
                                                Ext.util.Cookies.clear("userName");
                                                Ext.util.Cookies.clear("gradeName");
                                                Ext.util.Cookies.clear("grade");
                                                Ext.util.Cookies.clear("hiddenMenu");
                                                location.href = "login.html";
                                            }
                                        }
                                    });
                                }
                                Ext.Msg.alert("提示", "密码修改成功，请重新登录!", callBack);


                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },

            //重置事件
            "sysWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "sysWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("sysWindow").close();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "sysUpdateWindow button[ref=return]": {
                click: function (btn) {
                    btn.up("sysUpdateWindow").close();
                }
            }
        });
    },
    views: [
        "core.system.view.SysLayout",
        "core.system.view.SysGrid",
        'core.system.view.SysUpdateWindow',
        "core.system.view.SysWindow"
    ],
    stores: ["core.system.store.SysStore"],
    models: ["core.user.model.UserModel"]
});