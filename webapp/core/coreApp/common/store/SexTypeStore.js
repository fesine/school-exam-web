/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.SexTypeStore", {
    alias: 'widget.setTypeStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '女'],
        [1, '男'],
        [2, '未知']
    ]
});