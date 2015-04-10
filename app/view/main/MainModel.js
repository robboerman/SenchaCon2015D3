Ext.define('d3m0.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	requires: [
		'd3m0.model.Tree',
		'Ext.data.TreeStore'
	],

	alias: 'viewmodel.main',

	stores: {
		dataStore: {
			type: 'tree',
			model: 'd3m0.model.Tree',
			autoLoad: true,
			root: {
				text: 'Ext.Base'
			}
		}
	},

	data: {
		name: 'd3m0',
		selection: undefined
	}

	//TODO - add data, formulas and/or methods to support your view
});
