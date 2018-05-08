/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.AuthTypeStore", {
    alias: 'widget.authTypeStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '管理员'],
        [1, '权限管理员'],
        [2, '超级管理员']
    ]
});