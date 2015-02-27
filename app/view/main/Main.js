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
            data: "{dataStore}",
            rootNode: "{dataStore.root}"
        }
    }, {
        xtype: 'dashboard',
        region: 'center',

        parts: {
            partition: {
                viewTemplate: {
                    title: 'Partition',
                    items: [{
                        xtype: 'partition',

                        bind: {
                            dataStore: {
                                bindTo: '{dataStore}'
                            }
                        }
                    }]
                }
            },
            pack: {
                viewTemplate: {
                    title: 'Pack',
                    items: [{
                        xtype: 'pack',

                        bind: {
                            dataStore: {
                                bindTo: '{dataStore}'
                            }
                        }
                    }]
                }
            },
            sunburst: {
                viewTemplate: {
                    title: 'SunBurst',
                    items: [{
                        xtype: 'sunburst',

                        bind: {
                            dataStore: {
                                bindTo: '{dataStore}'
                            }
                        }
                    }]
                }
            },
            tree: {
                viewTemplate: {
                    title: 'Tree',
                    items: [{
                        xtype: 'tree',

                        bind: {
                            dataStore: {
                                bindTo: '{dataStore}'
                            }
                        }
                    }]
                }
            }
        },

        defaultContent: [{
            type: 'partition',
            columnIndex: 0,
            height: 400
        },
        {
            type: 'pack',
            columnIndex: 1,
            height: 400
        },
        {
            type: 'tree',
            columnIndex: 0,
            height: 400
        },
        {
            type: 'sunburst',
            columnIndex: 1,
            height: 400
        }]

    }],

    /**
     * @method initComponent
     * @inheritdoc
     * @return {void}
     */
    initComponent: function() {
        var vm = this.lookupViewModel(),
            store = vm.get('dataStore'),
            me = this;

        store.on("load", function(store){
            me.lookupReference('extTree').setStore(store);
        })

        this.callParent(arguments);
    }
});
