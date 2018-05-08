Ext.define("core.common.store.PageSizeStore", {
    alias: 'widget.pageSizeStore',
    extend: 'Ext.data.SimpleStore',
    fields: ["id", "pageSize"],
    data: [
        ['5', 5],
        ['10', 10],
        ['20', 20],
        ['50', 50]
    ]
});