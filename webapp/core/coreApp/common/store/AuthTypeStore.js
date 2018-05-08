/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.AuthTypeStore", {
    alias: 'widget.authTypeStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [1, '管理员'],
        [2, '超级管理员']
    ]
});