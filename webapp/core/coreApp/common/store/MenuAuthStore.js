/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.MenuAuthStore", {
    alias: 'widget.menuAuthStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '普通权限'],
        [1, '管理员权限'],
        [2, '超级管理员权限']
    ]
});