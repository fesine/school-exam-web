/*
 * ClassName 用户数据集
 */
Ext.define("core.exam.store.CoursePointStore", {
    alias: 'widget.coursePointStore',
    extend: 'Ext.data.Store',
    model: 'core.exam.model.CoursePointModel',
    pageSize: 20,
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/coursePoints",
        reader: {
            type: "json",
            root: "data.resultList",
            totalProperty: 'data.totalRecord',
            messageProperty: 'error'
        },
        writer: {
            type: "json"
        }
    },
    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me.on("load", function (records, operation, success) {
            if (success === false) {
                checkLogin();
            }
        });
    },
    autoLoad: true
});