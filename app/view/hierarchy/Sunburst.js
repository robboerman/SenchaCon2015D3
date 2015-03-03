Ext.define('d3m0.view.hierarchy.Sunburst', {
	extend: 'd3m0.view.hierarchy.Partition',
	xtype: 'sunburst',

	config: {
		childrenFn: function(d) {
			return d.childNodes;
		}
	},


	arc: d3.svg.arc()
		.startAngle(function(d) {
			return d.sunburst.x;
		})
		.endAngle(function(d) {
			return d.sunburst.x + d.sunburst.dx;
		})
		.innerRadius(function(d) {
			return Math.sqrt(d.sunburst.y);
		})
		.outerRadius(function(d) {
			return Math.sqrt(d.sunburst.y + d.sunburst.dy);
		}),

	arcTween: function(a) {
		a.sunburst = a.sunburst || {};
		var i = d3.interpolate({
			x: a.sunburst.x0 || 0,
			dx: a.sunburst.dx0 || 0,
			y: a.sunburst.y0 || 0,
			dy: a.sunburst.dy0 || 0
		}, a.sunburst);
		var me = this;
		return function(t) {
			var b = {sunburst: i(t)};
			a.sunburst.x0 = b.sunburst.x;
			a.sunburst.dx0 = b.sunburst.dx;
			a.sunburst.y0 = b.sunburst.y;
			a.sunburst.dy0 = b.sunburst.dy;
			return me.arc(b);
		};
	},


	/**
	 * @method constructor
	 * @param  {Object} config Configuration
	 * @return {Object}
	 */
	constructor: function(config) {

		var layout = d3.layout.partition("sunburst")
			.sort(null)
			.children(this.config.childrenFn)
			.value(function(d) {
				return d.childNodes.length + 1;
			});
		layout.namespace = "sunburst"
		this.d3Layout = layout;

		return this.callParent(arguments);
	},

	start: function() {
		var childrenFn = this.getChildrenFn(),
			store = this.getDataStore();

		var s = this.getSize();
		this.size(s.width, s.height);

		this.initializing = false;
		if (store) {
			if (store.isLoaded()) {
				this.draw();
			}
			store.on('load', function() {
				this.draw();
			}.bind(this));
		}
	},

	updateSelection: function(selection) {
		if (selection) {
			this.draw(selection);
		}
		this.callParent(arguments);
	},

	draw: function(root) {
		console.log('draw', arguments);

		if (!root || this.initializing) {
			return;
		}

		var layout = this.d3Layout,
			scene = this.getScene(),
			nodes = layout(root),
			links = layout.links(nodes);

		var nodeElements = scene.selectAll('.node').data(nodes, function(d) {
				return d.id.replace('.', '-');
			}),
			linkElements = scene.selectAll('.link').data(links);


		this.addLinks(linkElements.enter());
		this.updateLinks(linkElements);
		this.removeLinks(linkElements.exit());

		this.addNodes(nodeElements.enter());
		this.removeNodes(nodeElements.exit());
		this.updateNodes(nodeElements);
	},

	addNodes: function(selection) {
		var arc = this.arc,
			colors = this.colors,
			textFn = this.getTextFn();

		var group = selection.append("g")
			.attr("id", function(d) {
				return "sun-" + d.id;
			})
			.attr('class', 'node')
			.on('click', this.setSelection.bind(this));

		group.append('path')
			.attr("id", function(d) {
				return "sun-path-" + d.id;
			})
			.attr("d", arc)
			.style("stroke", "#fff")
			.style("fill", function(d) {
				return colors(textFn(d));
			})
			.each(function(d) {
				d.sunburst.x0 = d.sunburst.x;
				d.sunburst.dx0 = d.sunburst.dx;
				d.sunburst.y0 = d.sunburst.y;
				d.sunburst.dy0 = d.sunburst.dy;
			});

		var text = group.append("text")
			.style("display", function(d) {
				return d.sunburst.dx > Math.PI / 2 ? "block" : "none";
			})
			.attr("x", 6)
			.attr("dy", 15);

		text.append("textPath")
			.attr("stroke", "black")
			.attr("stroke-width", "1")
			.attr("xlink:href", function(d) {
				return "#sun-path-" + d.id;
			})
			.text(function(d) {
				return d.data.name;
			});
	},

	updateNodes: function(selection) {
		var radius = this.radius;
		console.log(radius);
		selection.select('path')
			.transition()
			.attrTween("d", this.arcTween.bind(this));

		selection.select('text')
			.style("display", function(d) {
				return radius * d.sunburst.dx * (Math.PI) > 150 * Math.PI ? "block" : "none";
			});
	}
});
