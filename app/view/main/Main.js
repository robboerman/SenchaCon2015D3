Ext.define('d3m0.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Border',
        'Ext.dashboard.Dashboard',
        'Ext.toolbar.Breadcrumb',
        'd3m0.view.main.MainController',
        'd3m0.view.main.MainModel',
        'd3m0.view.hierarchy.Partition',
        'd3m0.view.hierarchy.Sunburst',
        'd3m0.view.hierarchy.Tree',
        'd3m0.view.hierarchy.Pack'
    ],

    xtype: 'app-main',

    title: 'D3M0',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    // height: '100%',
    // width: '100%',

    session: true,

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'treepanel',
        region: 'west',
        split: true,
        width: 400,
        reference: 'extTree',
        bind: {
            store: "{dataStore}",
            selection: '{selection}'
        }
    }, {
        xtype: 'dashboard',
        region: 'center',

        dockedItems: [{
            xtype: 'breadcrumb',
            dock: 'top',
            bind: {
                store: '{dataStore}',
                selection: '{selection}'
            },
            publishes: 'selection'
        }],
        parts: {
            partition: {
                viewTemplate: {
                    title: 'Partition',
                    items: [{
                        xtype: 'partition'
                    }]
                }
            },
            pack: {
                viewTemplate: {
                    title: 'Pack',
                    items: [{
                        xtype: 'pack'
                    }]
                }
            },
            sunburst: {
                viewTemplate: {
                    title: 'SunBurst',
                    items: [{
                        xtype: 'sunburst'
                    }]
                }
            },
            tree: {
                viewTemplate: {
                    title: 'Tree',
                    items: [{
                        xtype: 'tree'
                    }]
                }
            }
        },

        defaultContent: [{
            type: 'partition',
            columnIndex: 0,
            height: 320
        }, {
            type: 'pack',
            columnIndex: 1,
            height: 320
        }, {
            type: 'tree',
            columnIndex: 0,
            height: 320
        }, {
            type: 'sunburst',
            columnIndex: 1,
            height: 320
        }]
    }]
});
