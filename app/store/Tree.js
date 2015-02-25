/**
 * @class d3m0.store.Tree
 * @extends {Ext.data.TreeStore}
 * A store that holds a tree data structure.
 */
Ext.define('d3m0.store.Tree', {
	extend: 'Ext.data.TreeStore',
	storeId: 'Tree',
	model: 'd3m0.model.Tree',
	autoLoad: true,
	defaultRootText: "Ext.Base"
});
