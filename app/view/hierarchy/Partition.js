Ext.define('d3m0.view.hierarchy.Partition', {
	extend: 'd3m0.view.hierarchy.Hierarchy',
	xtype: 'partition',

	config: {},

	arc: d3.svg.arc()
		.startAngle(function(d) {
			return d.partx;
		})
		.endAngle(function(d) {
			return d.partx + d.partdx;
		})
		.innerRadius(function(d) {
			return Math.sqrt(d.party);
		})
		.outerRadius(function(d) {
			return Math.sqrt(d.party + d.partdy);
		}),

	arcTween: function(a) {
		var i = d3.interpolate({
			partx: a.partx0 || 0,
			partdx: a.partdx0 || 0,
			party: a.party0 || 0,
			partdy: a.partdy0 || 0
		}, a);
		var me = this;
		return function(t) {
			var b = i(t);
			a.partx0 = b.partx;
			a.partdx0 = b.partdx;
			a.party0 = b.party;
			a.partdy0 = b.partdy;
			return me.arc(b);
		};
	},

	constructor: function(config) {
		if (!this.d3Layout) {
			var layout = d3.layout.partition()
				.sort(null)
				.value(function(d) {
					return d.childNodes.length + 1;
				});
			this.d3Layout = layout;
		}

		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var radius = (Math.min(w, h) - this.getPadding()) / 2;
		h = radius * radius;
		w = 2 * Math.PI;

		var scene = this.getScene();
		scene.attr('transform', 'translate(' + radius + ',' + radius + ')');
		var layout = this.d3Layout;

		if (layout) {
			layout.size([w, h]);
			console.log("layout", layout)
		} else {
			console.log("NO LAYOUT")
		}
		if (!this.initializing) {
			this.draw();
		} else {
			console.log("INITIALIZING - NO DRAW")
		}
	},

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
				} else if (!d.isRoot()) {
					d.collapse();
				}
			})
			.each(function(d) {
				d.partx0 = d.partx;
				d.partdx0 = d.partdx;
				d.party0 = d.party;
				d.partdy0 = d.partdy;
			});
	},

	updateNodes: function(selection) {
		selection
			.transition()
			.attrTween("d", this.arcTween.bind(this));
	}

});
