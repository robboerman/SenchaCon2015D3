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
        'd3m0.view.main.MainModel',
        'd3m0.store.Tree'
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
        store: 'Tree',
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
            xtype: 'tree',
            bind: {
                dataset: {
                    bindTo: '{dataset}',
                    deep: true
                }
            },
            flex: 1
        }, {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'pack',

                bind: {
                    dataset: {
                        bindTo: '{dataset}',
                        deep: true
                    }
                },
                flex: 1
            }, {
                xtype: 'partition',

                bind: {
                    dataset: {
                        bindTo: '{dataset}',
                        deep: true
                    }
                },
                flex: 1
            }]
        }]

    }],

    /**
     * @method initComponent
     * @inheritdoc
     * @return {void}
     */
    initComponent: function() {
        var store = d3m0.app.getStore('Tree');
        var vm = this.lookupViewModel();

        store.on({
            datachanged: function(store) {
                vm.applyData({
                    dataset: store.getRootNode()
                });
            }
        });

        this.callParent(arguments);
    }
});
