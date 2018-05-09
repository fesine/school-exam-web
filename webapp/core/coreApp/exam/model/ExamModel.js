/*
 * 用户实体类
 */
Ext.define("core.exam.model.ExamModel", {
    extend: "Ext.data.Model",
    fields: [
        {name: "id", type: "number", sortable: true},
        {name: "examType", type: "number", sortable: true},
        {name: "gradeId", type: "number", sortable: true},
        {name: "gradeName", type: "string", sortable: true},
        {name: "courseId", type: "number", sortable: true},
        {name: "courseName", type: "string", sortable: true},
        {name: "startTime", type: "string", sortable: true},
        {name: "endTime", type: "string", sortable: true}
    ]
});