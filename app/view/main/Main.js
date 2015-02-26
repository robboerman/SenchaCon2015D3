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
        'd3m0.view.main.MainController',
        'd3m0.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    height: '100%',
    width: '100%',

    session: true,

    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    items: [{
        xtype: 'treepanel',
        bind: {
            store: "{dataStore}"
        },
        flex: 1
    }, {
        xtype: 'container',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        flex: 4,
        items: [{
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
            {
                xtype: 'partition',

                bind: {
                    dataStore: {
                        bindTo: '{dataStore}',
                        deep: true
                    }
                },
                flex: 1
            }, {
                xtype: 'pack',

                bind: {
                    dataStore: {
                        bindTo: '{dataStore}',
                        deep: true
                    }
                },
                flex: 1
            }, {
                xtype: 'sunburst',

                bind: {
                    dataStore: {
                        bindTo: '{dataStore}',
                        deep: true
                    }
                },
                flex: 1
            }]
        }, {
            xtype: 'tree',
            bind: {
                dataStore: {
                    bindTo: '{dataStore}',
                    deep: true
                }
            },
            flex: 1
        }]

    }]
});
