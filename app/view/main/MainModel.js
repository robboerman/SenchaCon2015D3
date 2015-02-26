/**
 * This class is the view model for the Main view of the application.
 */
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
			storeId: 'Tree',
			model: 'd3m0.model.Tree',
			autoLoad: true,
			defaultRootText: "Ext.Base"
		},

		selectionStore: {
			source: '{dataStore}'
		}
	},

	data: {
		name: 'd3m0'
	}

	//TODO - add data, formulas and/or methods to support your view
});
