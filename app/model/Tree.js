/**
 * @class d3m0.model.Tree
 * @extends {Ext.data.TreeModel}
 * A model for trees in a [d3m0.view.Tree] view.
 */
Ext.define('d3m0.model.Tree', {
	extend: 'Ext.data.TreeModel',
	proxy: {
		type: 'ajax',
		url: 'resources/data/components.json',
		// url: 'resources/data/structure.json',
		// url: 'resources/data/test.json'
	}
	, idProperty: 'name'
});
