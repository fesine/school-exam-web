Ext.define("core.attendance.controller.ErrorController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var url;
        var nameTemp;
        var workTimeGroup;

        function getRootMenu(form) {
            if (!workTimeGroup) {
                var combobox = form.getForm().findField("workTime");
                var store = combobox.getStore();
                var urlTemp = store.getProxy().url;
                store.getProxy().url = _hostUrl + "/v1/codes/workTimeGroup";
                store.load();
                workTimeGroup = store;
                store.getProxy().url = urlTemp;
            }
        }

        var editRecord = function (record) {
            var win = Ext.widget("errorWindow");
            var form = win.down("form");
            form.items.each(function (item) {
                item.readOnly = true;
            });
            var errorMsg = form.getForm().findField("errorMsg");
            errorMsg.readOnly = false;
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据
            setDateTime(record, form);
            var btn = form.down("button[ref=reset]");
            btn.disable();
            win.show();
        };
        var setDateTime = function (record, form) {
            var startTime = new Number(record.data.errorDate);
            form.getForm().findField("startDate").setValue(new Date(startTime));
        };
        this.control({
            "errorGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    editRecord(record);
                }
            },
            /**
             * 修改用户,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "errorGrid button[ref=updateError]": {
                click: function (_btn) {
                    var grid = _btn.up("errorGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    editRecord(records[0]);
                }
            },
            /**
             * 查找功能
             */
            "errorGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    var nameKey = Ext.util.Cookies.get("userName");
                    if (nameField) {
                        nameKey = nameField.getValue();
                        if (nameKey != nameTemp) {
                            store.currentPage = 1;
                        }
                        if (null == nameKey || Ext.util.Format.trim(nameKey) == "") {
                            nameKey = null;
                        } else {
                            nameTemp = nameKey;
                        }
                    }
                    var dateKey = tbar.down("monthfield[ref = dateKey]").value;
                    var dateStr;
                    if (null != dateKey) {
                        var format = 'Y-m-d H:i:s';
                        dateStr = Ext.Date.format(dateKey, format);
                    }

                    //临时设置请求地址
                    if (!url) {
                        url = store.getProxy().url;
                    }
                    //临时设置请求地址
                    store.getProxy().url = _hostUrl + "/v1/errors/query";
                    store.getProxy().extraParams.name = nameKey;
                    store.getProxy().extraParams.dateStr = dateStr;
                    store.load();
                }
            },
            /**
             * 添加用户
             */
            "errorGrid button[ref=addError]": {
                click: function (btn) {
                    var win = Ext.widget("errorWindow");
                    win.setTitle("添加异常信息");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").disable();
                    btn.enable(true);
                    // //清空数据
                    form.getForm().reset();
                    win.show();
                }
            },
            /**
             * 删除栏目
             */
            "errorGrid button[ref=removeError]": {
                click: function (btn) {
                    var grid = btn.up("errorGrid");
                    var flag = true;
                    commonDelete(grid, "/v1/errors");
                }
            },
            /**
             * 刷新按钮
             */
            "errorGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    var tbar = btn.ownerCt;
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    var nameKey = Ext.util.Cookies.get("userName");
                    if (!url) {
                        url = store.getProxy().url;
                    }
                    if (nameField) {
                        nameKey = nameField.getValue();
                        if (null == nameKey || Ext.util.Format.trim(nameKey) == "") {
                            nameKey = Ext.util.Cookies.get("userName");
                            store.getProxy().url = url;
                        } else {
                            //临时设置请求地址
                            store.getProxy().url = _hostUrl + "/v1/errors/query";
                            store.getProxy().extraParams.name = nameKey;
                        }
                    }
                    var dateKey = tbar.down("textfield[ref = dateKey]").value;
                    var dateStr;
                    if (!(null == dateKey)) {
                        var format = 'Y-m-d H:i:s';
                        dateStr = Ext.Date.format(dateKey, format);
                    }
                    store.getProxy().extraParams.name = nameKey;
                    store.getProxy().extraParams.dateStr = dateStr;
                    store.currentPage = 1;
                    store.load();
                }
            },
            //重置事件
            "errorGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    if (nameField) {
                        nameField.setValue("");
                    }
                    tbar.down("monthfield[ref = dateKey]").setValue("");
                    var store = tbar.ownerCt.getStore();
                    store.getProxy().url = url;
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "errorWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var _url = _hostUrl + "/v1/error";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        _url = _url + "/" + id;
                        method = "PUT";
                    }
                    var startTime = getTimeField(_form, 'startDate');
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        params: {
                            startDateStr: startTime
                        },
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("errorWindow").close();
                                var _grid = Ext.widget("errorGrid");
                                var store = _grid.getStore();
                                store.load();
                                _grid.show();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },

            //重置事件
            "errorWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "errorWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("errorWindow").close();
                }
            },
            /**
             * 分析数据窗口
             */
            "errorGrid button[ref=analyse]": {
                click: function (btn) {
                    var win = Ext.widget("analyseWindow");
                    win.setTitle("异常信息分析");
                    var form = win.down("form");
                    form.getForm().reset();
                    getRootMenu(form);
                    win.show();
                }
            },
            /**
             * 月份分析数据
             */
            "analyseWindow button[ref=monthBtn]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var workTime = _form.getForm().findField("workTime").getValue();
                    var startMonth = _form.getForm().findField('startMonth').getValue();
                    if (workTime == null || startMonth == null) {
                        Ext.Msg.alert("提示", "时间没有选择!");
                        return;
                    }
                    //value=08:30-17:30
                    var _url = _hostUrl + "/v1/events/error";
                    var method = "POST";
                    var monthStr = getTimeFormat(startMonth, 'Y-m');
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        params: {
                            monthStr: monthStr,
                            amTimeStr: workTime.split("-")[0],
                            pmTimeStr: workTime.split("-")[1]
                        },
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 200) {
                                Ext.getCmp("analyseWindow").close();
                                var _grid = Ext.widget("errorGrid");
                                var store = _grid.getStore();
                                store.load({
                                    params: {
                                        start: 0,
                                        limit: 20
                                    }
                                });
                                _grid.show();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });
                }
            },
            /**
             * 工作日分析数据
             */
            "analyseWindow button[ref=dayBtn]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var workTime = _form.getForm().findField("workTime").getValue();
                    var startDate = _form.getForm().findField('startDate').getValue();
                    if (workTime == null || startDate == null) {
                        Ext.Msg.alert("提示", "时间没有选择!");
                        return;
                    }
                    //value=08:30-17:30
                    var _url = _hostUrl + "/v1/event/error";
                    var method = "POST";
                    var dayStr = getTimeFormat(startDate, 'Y-m-d');
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        params: {
                            dayStr: dayStr,
                            amTimeStr: workTime.split("-")[0],
                            pmTimeStr: workTime.split("-")[1]
                        },
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 200) {
                                Ext.getCmp("analyseWindow").close();
                                var _grid = Ext.widget("errorGrid");
                                var store = _grid.getStore();
                                store.load({
                                    params:{
                                        start:0,
                                        limit:20
                                    }
                                });
                                _grid.show();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });
                }
            },

            "errorGrid combobox[ref=errorPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("errorGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.attendance.view.ErrorLayout",
        "core.attendance.view.ErrorGrid",
        "core.attendance.view.AnalyseWindow",
        "core.attendance.view.ErrorWindow"
    ],
    stores: ["core.attendance.store.ErrorStore"],
    models: ["core.attendance.model.ErrorModel"]
});
getTimeField = function (_form, date) {
    var dateFormat = 'Y-m-d';
    var dateValue = _form.getForm().findField(date).getValue();
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;
};
getTimeFormat = function (dateValue, dateFormat) {
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;
};