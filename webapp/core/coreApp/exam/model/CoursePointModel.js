/*
 * 用户实体类
 */
Ext.define("core.exam.model.CoursePointModel", {
    extend: "Ext.data.Model",
    fields: [
        {name: "id", type: "number", sortable: true},
        {name: "gradeId", type: "number", sortable: true},
        {name: "gradeName", type: "string", sortable: true},
        {name: "courseId", type: "number", sortable: true},
        {name: "courseName", type: "string", sortable: true},
        {name: "coursePoint", type: "string", sortable: true}
    ]
});