Ext.define("core.app.view.MenuTreeView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menuTreeView',
    id:'menuTreeView',
    height: '70%',
    region: 'north',
    layout: {
        // layout-specific configs go here
        type: 'accordion',
        titleCollapse: true,
        animate: true,// 动画切换效果
        activeOnTop: false
        // 折叠展开是否改变菜单顺序
    },
    layoutConfig: {
        animate: true
    },
    split: true
})