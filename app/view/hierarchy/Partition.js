Ext.define('d3m0.view.hierarchy.Partition', {
	extend: 'd3m0.view.hierarchy.Hierarchy',
	xtype: 'partition',

	config: {},

	arc: d3.svg.arc()
		.startAngle(function(d) {
			return d.partition.x;
		})
		.endAngle(function(d) {
			return d.partition.x + d.partition.dx;
		})
		.innerRadius(function(d) {
			return Math.sqrt(d.partition.y);
		})
		.outerRadius(function(d) {
			return Math.sqrt(d.partition.y + d.partition.dy);
		}),

	arcTween: function(a) {
		a.partition = a.partition || {};
		var i = d3.interpolate({
			x: a.partition.x0 || 0,
			dx: a.partition.dx0 || 0,
			y: a.partition.y0 || 0,
			dy: a.partition.dy0 || 0
		}, a.partition);
		var me = this;
		return function(t) {
			var b = {partition: i(t)};
			a.partition.x0 = b.partition.x;
			a.partition.dx0 = b.partition.dx;
			a.partition.y0 = b.partition.y;
			a.partition.dy0 = b.partition.dy;
			return me.arc(b);
		};
	},

	constructor: function(config) {
		if (!this.d3Layout) {
			var layout = d3.layout.partition("partition")
				.sort(null)
				.value(function(d) {
					return d.childNodes.length + 1;
				});
			layout.namespace = "partition"
			this.d3Layout = layout;
		}

		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var radius = (Math.min(w, h) - this.getPadding()) / 2;
		h = radius * radius;
		w = 2 * Math.PI;
		this.radius = radius;

		var scene = this.getScene();
		scene.attr('transform', 'translate(' + radius + ',' + radius + ')');
		var layout = this.d3Layout;

		if (layout) {
			layout.size([w, h]);
			console.log("layout", layout);
		} else {
			console.log("NO LAYOUT");
		}
		if (!this.initializing) {
			this.draw();
		} else {
			console.log("INITIALIZING - NO DRAW");
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
			.on('click', this.setSelection.bind(this))
			.each(function(d) {
				d.partition.x0 = d.partition.x;
				d.partition.dx0 = d.partition.dx;
				d.partition.y0 = d.partition.y;
				d.partition.dy0 = d.partition.dy;
			});
	},

	updateNodes: function(selection) {
		selection
			.transition()
			.attrTween("d", this.arcTween.bind(this));
	}

});
