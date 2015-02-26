Ext.define('d3m0.view.hierarchy.Partition', {
	extend: 'd3m0.view.hierarchy.Hierarchy',
	xtype: 'partition',

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

	arcTween: function(a) {
		var i = d3.interpolate({
			x: a.x0 || 0,
			dx: a.dx0 || 0,
			y: a.y0 || 0,
			dy: a.dy0 || 0
		}, a);
		var me = this;
		return function(t) {
			var b = i(t);
			a.x0 = b.x;
			a.dx0 = b.dx;
			a.y0 = b.y;
			a.dy0 = b.dy;
			return me.arc(b);
		};
	},

	start: function() {

		console.log('Partition.init', arguments);

		var layout = d3.layout.partition()
			.sort(null);
		this.d3Layout = layout;

		layout.value(function(d) {
			return d.childNodes.length + 1;
		});

		return this.callParent(arguments);
	},

	setLayoutSize: function(w, h) {
		var radius = Math.min(w, h) / 2;
		h = radius * radius;
		w = 2 * Math.PI;

		var scene = this.getScene();
		scene.attr('transform', 'translate(' + radius + ',' + radius + ')');
		var layout = this.d3Layout;

		if (layout){
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
