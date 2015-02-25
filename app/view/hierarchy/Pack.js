Ext.define('d3m0.view.hierarchy.Pack', {
	extend: 'd3m0.view.hierarchy.Hierarchy',
	xtype: 'pack',

	config: {},

	init: function() {

		console.log('Pack.init', arguments);
		window.pack = this;

		var layout = d3.layout.pack();
		this.d3Layout = layout;

		layout.value(function(d) {
			return d.childNodes.length + 1;
		});

		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var diameter = Math.min(w, h) - 2 * this.getPadding();

		w = h = diameter;

		// var scene = this.getScene();
		// scene.attr('transform', 'translate(' + radius + ',' + radius + ')');
		var layout = this.d3Layout;

		if (!layout) return;
		layout.size([w, h]);
	},

	addNodes: function(selection) {
		var group = selection.append('g'),
			colors = this.colors,
			textFn = this.getTextFn();

		group
			.attr('class', 'node')
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

		group.append("circle")
			.attr("r", function(d) {
				return d.r;
			})
			.style("stroke", "#fff")
			.style("fill", function(d) {
				return colors(textFn(d));
			})
			.on('click', function(d) {
				if (!d.isExpanded()) {
					d.expand();
				} else {
					d.collapse();
				}
			});
	},

	updateNodes: function(selection) {
		selection
			.transition()
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

		selection.select('circle')
			.transition()
			.attr("r", function(d) {
				return d.r;
			});

	}

});
