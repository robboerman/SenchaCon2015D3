Ext.define('d3m0.view.hierarchy.Tree', {
	extend: 'd3m0.view.hierarchy.Hierarchy',
	xtype: 'tree',

	config: {
		diagonal: d3.svg.diagonal().projection(function(d) {
			return [d.y, d.x];
		})
	},

	start: function() {

		console.log('Tree.init', arguments);

		window.tree = this;

		var layout = d3.layout.tree()
			.sort(null);
		this.d3Layout = layout;

		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var tmp = w;
		w = h;
		h = tmp;
		return this.callParent(arguments);
	},

	addNodes: function(selection) {
		var group = selection.append('g'),
			colors = this.colors,
			textFn = this.getTextFn();

		group
			.attr('class', 'node')
			.attr("transform", function(d) {
				return "translate(" + d.y + ", " + d.x + ")";
			}).on('click', function(d) {
				if (!d.isExpanded()) {
					d.expand();
				} else {
					if (!d.isRoot) {
						d.collapse();
					}
				}
			});

		group.append('circle')
			.attr('class', 'circle')
			.attr('r', 0)
			.style("fill", function(d) {
				return colors(textFn(d));
			})
			.attr('title', this.getTextFn())
			.transition()
			.attr('r', 10);
	},

	updateNodes: function(selection) {
		selection
			.transition()
			.attr("transform", function(d) {
				return "translate(" + d.y + ", " + d.x + ")";
			});
	},

	addLinks: function(selection) {
		selection.append('path')
			.classed('link', true)
			.attr('d', this.getDiagonal());
	},

	updateLinks: function(selection) {
		selection
			.transition()
			.attr('d', this.getDiagonal());
	}

});
