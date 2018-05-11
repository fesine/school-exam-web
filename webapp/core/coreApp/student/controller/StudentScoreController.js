Ext.define("core.student.controller.StudentScoreController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var gradeId;

        this.control({
            "studentScoreGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("studentScoreWindow");
                    win.setTitle(record.data.stuName+"学生成绩综合分析");
                    var form = win.down("form");
                    // 清空数据
                    form.getForm().reset();
                    Ext.Ajax.request({
                        waitMsg: '正在分析……',
                        url: _hostUrl + "/v1/studentScoresByStuNo",
                        method: "GET",
                        timeout: 10000,
                        params:{
                            gradeId: record.data.gradeId,
                            classroomId: record.data.classroomId,
                            stuNo: record.data.stuNo
                        },
                        success: function (response, opts) {
                            var resObj = Ext.decode(response.responseText);
                            if (resObj.code == 200) {
                                form.down("textfield[name=gradeNo]").setValue(resObj.data.gradeNo);
                                form.down("textfield[name=classroomNo]").setValue(resObj.data.classroomNo);
                                form.down("textfield[name=msg]").setValue(resObj.data.msg);
                                win.show();
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },
            /**
             * 返回按钮
             */
            "studentScoreWindow button[ref=return]": {
                click:function (btn) {
                    Ext.widget("studentScoreWindow").close();
                }
            },

            // "studentScoreGrid button[ref=refresh]": {
            //     click: function (btn) {
            //         var grid = btn.ownerCt.ownerCt;
            //         var gradeKey = grid.down("combobox[ref=gradeKey]").value;
            //         if (!gradeKey) {
            //             Ext.Msg.alert("提示", "请先选择年级再查询!");
            //             return;
            //         } else {
            //             gradeId = gradeKey;
            //         }
            //         var store = grid.getStore();
            //         store.currentPage = 1;
            //         store.load(
            //             {
            //                 params:{
            //                     gradeId:gradeId
            //                 }
            //             }
            //         );
            //         //数据加载完判断列显示
            //         if (gradeId === 1) {
            //             grid.columns[9].hide();
            //             grid.columns[10].hide();
            //         } else if (gradeId === 2) {
            //             grid.columns[9].show();
            //             grid.columns[10].hide();
            //         }
            //     }
            //
            // },
            /**
             * 查找功能
             */
            "studentScoreGrid button[ref=search]": {
                click: function (_btn) {
                    var grid = _btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    var stuNoKey = grid.down("textfield[ref = stuNoKey]").value;
                    var stuNameKey = grid.down("textfield[ref = stuNameKey]").value;
                    var gradeKey = grid.down("combobox[ref = gradeKey]").value;
                    if (!gradeKey) {
                        Ext.Msg.alert("提示", "请先选择年级再查询!");
                        return;
                    } else {
                        gradeId = gradeKey;
                    }
                    var classroomKey = grid.down("combobox[ref = classroomKey]").value;
                    if (null == stuNoKey || Ext.util.Format.trim(stuNoKey) == ""){
                        stuNoKey = null;
                    }
                    if (null == stuNameKey || Ext.util.Format.trim(stuNameKey) == ""){
                        stuNameKey = null;
                    }
                    store.load({
                        params: {
                            stuNo: stuNoKey,
                            stuName: stuNameKey,
                            gradeId: gradeKey,
                            classroomId: classroomKey
                        }
                    });
                    //数据加载完判断列显示
                    if (gradeId === 1) {
                        grid.columns[9].hide();
                        grid.columns[10].hide();
                    } else if (gradeId === 2) {
                        grid.columns[9].show();
                        grid.columns[10].hide();
                    }
                }
            },
            //重置事件
            "studentScoreGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    tbar.down("textfield[ref = stuNoKey]").setValue("");
                    tbar.down("textfield[ref = stuNameKey]").setValue("");
                    tbar.down("textfield[ref = gradeKey]").setValue("");
                    tbar.down("textfield[ref = classroomKey]").setValue("");
                }
            },

            "studentScoreGrid combobox[ref=studentScorePageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    if (!gradeId) {
                        Ext.Msg.alert("提示", "请先选择年级再查询!");
                        return;
                    }
                    var grid = _this.up("studentScoreGrid");
                    var store = grid.getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load({
                        params: {
                            gradeId: gradeId
                        }
                    });//用来加载数据
                    //数据加载完判断列显示
                    if (gradeId === 1) {
                        grid.columns[9].hide();
                        grid.columns[10].hide();
                    } else if (gradeId === 2) {
                        grid.columns[9].show();
                        grid.columns[10].hide();
                    }
                }
            }
        });
    },
    views: [
        "core.student.view.StudentScoreLayout",
        "core.student.view.StudentScoreGrid",
        "core.student.view.StudentScoreWindow"
    ],
    stores: ["core.student.store.StudentScoreStore"],
    models: ["core.student.model.StudentScoreModel"]
});
//获取学生列表
getStudentName = function (obj) {
    var _form = obj.ownerCt;
    var gradeId = _form.getForm().findField('gradeId').value;
    var classroomId = _form.getForm().findField('classroomId').value;
    var stuNo = _form.getForm().findField('stuNo');
    stuNo.getStore().load({
        params: {
            gradeId: gradeId,
            classroomId: classroomId,
            limit: 1000
        }
    });
};