/**
 * @class d3m0.view.tree.Tree
 * @extends {d3m0.view.graph.Graph}
 * The main view for the tree.
 */
Ext.define('d3m0.view.hierarchy.Hierarchy', {
	extend: "Ext.container.Container",
	xtype: 'hierarchy',

	config: {
		dataStore: null,
		childrenFn: function(d) {
			return d.get('expanded') ? d.childNodes : null;
		},
		textFn: function(d) {
			return d.data.text || d.data.name || d.name
		},
		padding: 20
	},

	svg: null,
	d3Layout: null,
	initializing: true,

	colors: d3.scale.category20(),

	afterRender: function() {
		console.log('afterRender', arguments);
		var w = this.width,
			h = this.height;

		this.callParent(arguments);
		this.setSize(w, h);
	},

	setSize: function(w, h) {
		console.log('setSize', arguments);
		var svg = this.getSvg(),
			scene = this.getScene();

		svg.attr('width', w);
		scene.attr('width', w);
		svg.attr('height', h);
		scene.attr('height', h);
		this.setLayoutSize(w, h);
		this.draw();
		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var layout = this.d3Layout,
			padding = this.getPadding() || 0;

		if (!layout) return;
		layout.size([w - 2 * padding, h - 2 * padding]);
	},

	onResize: function(w, h) {
		console.log('onResize', arguments);
		this.callParent(arguments);
		this.setSize(w, h);
	},

	getSvg: function() {
		console.log('getSvg', arguments);
		if (!this.svg) {
			var el = (this.getEl() && this.getEl().dom) || '#' + this.renderTo;

			this.svg = d3.select(el)
				.append('svg')
				.style({
					'z-index': 1,
					position: 'absolute',
					top: 0,
					left: 0
				});
			this.svg.append('g').classed('scene', true);
		}

		return this.svg;
	},

	getScene: function() {
		var svg = this.getSvg();
		return svg.select('.scene');
	},

	setDataStore: function(store) {
		console.log('setDataset', arguments);
		this.updateDataStore(store);
		return this.callParent(arguments);
	},

	updateDataStore: function(store, prev) {
		console.log('updateDataset', arguments);

		if (store && store.isStore) {
			store.on('load', this.start.bind(this));
		}
	},

	start: function() {
		var svg = this.getSvg(),
			childrenFn = this.getChildrenFn(),
			layout = this.d3Layout,
			store = this.getDataStore();

		layout.children(childrenFn);

		var s = this.getSize();
		this.setSize(s.width, s.height);
		this.initializing = false;
		store.on('datachanged', this.draw.bind(this));
	},

	draw: function() {
		console.log('draw', arguments);

		var store = this.getDataStore(),
			root = store && store.getRootNode();

		if(!root || this.initializing) return;

		var layout = this.d3Layout,
			scene = this.getScene(),
			nodes = layout(root),
			links = layout.links(nodes),
			idPrefix = this.getId();

		var nodeElements = scene.selectAll('.node').data(nodes, function(d){
			return idPrefix+d.id;
		}),
			linkElements = scene.selectAll('.link').data(links);

		this.addLinks(linkElements.enter());
		this.updateLinks(linkElements);
		this.removeLinks(linkElements.exit());

		this.addNodes(nodeElements.enter());
		this.updateNodes(nodeElements);
		this.removeNodes(nodeElements.exit());
	},

	addNodes: function() {},
	updateNodes: function() {},
	addLinks: function() {},
	updateLinks: function() {},

	removeNodes: function(selection) {
		selection.remove();
	},
	removeLinks: function(selection) {
		selection.remove();
	}

});
