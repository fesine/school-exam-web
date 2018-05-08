Ext.define("core.attendance.controller.AttendanceController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;

        var url;
        var nameTemp;
        this.control({
            /**
             * 上传文件
             */
            "attendanceGrid button[ref=upload]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var file = tbar.down("filefield[ref = file]").getValue();
                    if (null == file || Ext.util.Format.trim(file) == ""){
                        Ext.Msg.alert("提示", "请选择文件！");
                        return;
                    }
                    //1获得form
                    var _form = tbar.down("form");
                    var _url = _hostUrl+"/v1/attendance/file";
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: false,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        method: 'POST',
                        failure: function (form, action) {
                            var resObj = action.result;
                            if (resObj.code == 200) {
                                var store = tbar.ownerCt.getStore();
                                store.load();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },
            "attendanceGrid button[ref=analyse]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    //1获得form
                    var _form = tbar.down("form");
                    var _url = _hostUrl+"/v1/event/analyse";
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: false,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        method: 'POST',
                        failure: function (form, action) {
                            var store = tbar.ownerCt.getStore();
                            store.load();
                            var resObj = action.result;
                            Ext.Msg.alert("提示", resObj.msg);
                        }
                    });

                }
            },
            /**
             * 刷新按钮
             */
            "attendanceGrid button[ref=refresh]": {
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
                            store.getProxy().url=url;
                        }else {
                            //临时设置请求地址
                            store.getProxy().url = _hostUrl + "/v1/attendances/query";
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
            /**
             * 查找功能
             */
            "attendanceGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    var nameKey= Ext.util.Cookies.get("userName");
                    if (nameField){
                        nameKey = nameField.getValue();
                        if (nameKey != nameTemp) {
                            store.currentPage = 1;
                        }
                        if (null == nameKey || Ext.util.Format.trim(nameKey) == "") {
                            nameKey = null;
                        }else {
                            nameTemp = nameKey;
                        }
                    }
                    var dateKey = tbar.down("textfield[ref = dateKey]").value;

                    var dateStr;
                    if (!(null == dateKey)) {
                        var format = 'Y-m-d H:i:s';
                        dateStr = Ext.Date.format(dateKey, format);
                    }
                    //临时设置请求地址
                    if(!url){
                        url = store.getProxy().url;
                    }
                    store.getProxy().url=_hostUrl+"/v1/attendances/query";
                    store.getProxy().extraParams.name= nameKey;
                    store.getProxy().extraParams.dateStr= dateStr;
                    store.load();
                }
            },
            //重置事件
            "attendanceGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    if(nameField){
                        nameField.setValue("");
                    }
                    tbar.down("monthfield[ref = dateKey]").setValue("");
                    var store = tbar.ownerCt.getStore();
                    store.getProxy().url = url;
                }
            },
            "attendanceGrid combobox[ref=attendancePageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("attendanceGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.attendance.view.AttendanceLayout",
        "core.attendance.view.AttendanceGrid",
        "core.attendance.view.AttendanceWindow"
    ],
    stores: ["core.attendance.store.AttendanceStore"],
    models: ["core.attendance.model.AttendanceModel"]
});