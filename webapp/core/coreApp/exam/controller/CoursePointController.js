Ext.define("core.exam.controller.CoursePointController", {
    extend: "Ext.app.Controller",
    requires:['core.common.controller.CommonCRUD'],

    init: function () {
        var self = this;
        this.control({
            "coursePointGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("coursePointWindow");
                    var form = win.down("form");
                    //把选择的数据加载到form中去
                    form.loadRecord(record);//加载数据
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    win.show();
                }

            },
            /**
             * 添加用户
             */
            "coursePointGrid button[ref=addCoursePoint]": {
                click: function (btn) {
                    var win = Ext.widget("coursePointWindow");
                    win.setTitle("添加考试信息");
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
             * 修改用户,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "coursePointGrid button[ref=updateCoursePoint]": {
                click: function (_btn) {
                    var grid = _btn.up("coursePointGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var win = Ext.widget("coursePointWindow");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    //把选择的数据加载到form中去
                    form.loadRecord(records[0]);//加载数据，第1条
                    win.show();
                }
            },
            /**
             * 删除栏目
             */
            "coursePointGrid button[ref=removeCoursePoint]": {
                click: function (btn) {
                    var grid = btn.up("coursePointGrid");
                    //你选择的将要删除的记录
                    commonDelete(grid, "/v1/coursePoints");
                }
            },
            /**
             * 刷新按钮
             */
            "coursePointGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.load();
                }
            },
            /**
             * 查找功能
             */
            "coursePointGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var coursePointKey = tbar.down("textfield[ref = coursePointKey]").value;
                    store.load({
                        params: {coursePoint: coursePointKey}
                    });
                }
            },
            //重置事件
            "coursePointGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    tbar.down("textfield[ref = coursePointKey]").setValue("");
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "coursePointWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var url = _hostUrl + "/v1/coursePoint";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        url = url + "/" + id;
                        method = "PUT";
                    }
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: url,
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                // Ext.getCmp("coursePointWindow").close();
                                var _grid = Ext.widget("coursePointGrid");
                                var store = _grid.getStore();
                                store.load();
                                _grid.show();
                                // Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },

            //重置事件
            "coursePointWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "coursePointWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("coursePointWindow").close();
                }
            },
            "coursePointGrid combobox[ref=coursePointPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("coursePointGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.exam.view.CoursePointLayout",
        "core.exam.view.CoursePointGrid",
        "core.exam.view.CoursePointWindow"
    ],
    stores: ["core.exam.store.CoursePointStore"],
    models: ["core.exam.model.CoursePointModel"]
});
//获取课程列表
getCourseName = function (obj) {
    var _form = obj.ownerCt;
    var gradeId = _form.getForm().findField('gradeId').value;
    var courseId = _form.getForm().findField('courseId');
    courseId.getStore().load({
        params:{
            gradeId:gradeId,
            limit:1000
        }
    });
};
