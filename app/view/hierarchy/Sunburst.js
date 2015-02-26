Ext.define('d3m0.view.hierarchy.Sunburst', {
	extend: 'd3m0.view.hierarchy.Partition',
	xtype: 'sunburst',

	config: {},

	arc: d3.svg.arc()
		.startAngle(function(d) {
			return d.x;
		})
		.endAngle(function(d) {
			return d.x + d.dx;
		})
		.innerRadius(function(d) {
			return Math.sqrt(d.y);
		})
		.outerRadius(function(d) {
			return Math.sqrt(d.y + d.dy);
		}),

	addNodes: function(selection) {
		var arc = this.arc,
			colors = this.colors,
			textFn = this.getTextFn();

		selection.append("path")
			.attr('class', 'node')
			.attr("d", arc)
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
			})
			.each(function(d) {
				d.x0 = d.x;
				d.dx0 = d.dx;
				d.y0 = d.y;
				d.dy0 = d.dy;
			});
	},

	updateNodes: function(selection) {
		selection
			.transition()
			.attrTween("d", this.arcTween.bind(this));
	}

});
