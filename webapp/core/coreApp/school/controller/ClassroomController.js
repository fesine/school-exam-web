Ext.define("core.school.controller.ClassroomController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var url;
        var nameTemp;

        var editRecord = function (record) {
            var win = Ext.widget("classroomWindow");
            var form = win.down("form");
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据
            var btn = form.down("button[ref=reset]");
            btn.disable();
            win.show();
        };
        this.control({
            "classroomGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    if (Ext.util.Cookies.get('grade') < 1) {
                        return;
                    }
                    editRecord(record);
                }
            },
            /**
             * 修改班级,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "classroomGrid button[ref=updateClassroom]": {
                click: function (_btn) {
                    var grid = _btn.up("classroomGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    editRecord(records[0]);
                }
            },
            /**
             * 添加班级
             */
            "classroomGrid button[ref=addClassroom]": {
                click: function (btn) {
                    var win = Ext.widget("classroomWindow");
                    win.setTitle("添加班级信息");
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
            "classroomGrid button[ref=removeClassroom]": {
                click: function (btn) {
                    var grid = btn.up("classroomGrid");
                    commonDelete(grid, "/v1/classrooms");
                }
            },
            /**
             * 刷新按钮
             */
            "classroomGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.currentPage = 1;
                    store.load();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "classroomWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var _url = _hostUrl + "/v1/classroom";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        _url = _url + "/" + id;
                        method = "PUT";
                    }
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("classroomWindow").close();
                                var _grid = Ext.widget("classroomGrid");
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
            "classroomWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "classroomWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("classroomWindow").close();
                }
            },

            "classroomGrid combobox[ref=classroomPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("classroomGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.school.view.ClassroomLayout",
        "core.school.view.ClassroomGrid",
        "core.school.view.ClassroomWindow"
    ],
    stores: ["core.school.store.ClassroomStore"],
    models: ["core.school.model.ClassroomModel"]
});