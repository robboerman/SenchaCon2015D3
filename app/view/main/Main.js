/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
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
        width: 300,
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
            // useSplitButtons: false,
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
                        xtype: 'partition',
                        bind: {
                            selection: '{selection}'
                        },
                        publishes: 'selection'
                    }]
                }
            },
            pack: {
                viewTemplate: {
                    title: 'Pack',
                    items: [{
                        xtype: 'pack',
                        bind: {
                            selection: '{selection}'
                        },
                        publishes: 'selection'
                    }]
                }
            },
            sunburst: {
                viewTemplate: {
                    title: 'SunBurst',
                    items: [{
                        xtype: 'sunburst',
                        bind: {
                            selection: '{selection}'
                        },
                        publishes: 'selection'
                    }]
                }
            },
            tree: {
                viewTemplate: {
                    title: 'Tree',
                    items: [{
                        xtype: 'tree',
                        bind: {
                            selection: '{selection}'
                        },
                        publishes: 'selection'
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
