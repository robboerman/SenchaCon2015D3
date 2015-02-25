/**
 * @class d3m0.view.tree.Tree
 * @extends {d3m0.view.graph.Graph}
 * The main view for the tree.
 */
Ext.define('d3m0.view.hierarchy.Hierarchy', {
	extend: "Ext.container.Container",
	xtype: 'hierarchy',

	config: {
		dataset: null,
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
		this.setSize(w, h);

		return this.callParent(arguments);
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

	setDataset: function(dataset) {
		console.log('setDataset', arguments);
		this.updateDataset(dataset);
		return this.callParent(arguments);
	},

	updateDataset: function(data, prev) {
		console.log('updateDataset', arguments);

		if (this.initializing) {
			this.init();
		}

		if (data) {
			this.draw(data);
		}
	},

	init: function() {
		var svg = this.getSvg(),
			childrenFn = this.getChildrenFn(),
			layout = this.d3Layout;

		layout.children(childrenFn);

		var s = this.getSize();
		this.setSize(s.width, s.height);
		this.initializing = false;
	},

	draw: function(root) {
		root = root || this.getDataset();
		console.log('draw', arguments);

		if(this.initializing) return;

		var layout = this.d3Layout,
			scene = this.getScene(),
			nodes = layout(root),
			links = layout.links(nodes);

		var nodeElements = scene.selectAll('.node').data(nodes, function(d) {
				return d.id;
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
