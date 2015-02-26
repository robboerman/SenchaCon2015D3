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
			sunx: a.partx0 || 0,
			sundx: a.partdx0 || 0,
			suny: a.party0 || 0,
			sundy: a.partdy0 || 0
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
				if (!d.parent) {
					this.draw(d);
				} else {
					if(d.parent) {
						this.draw(d);
					}
				}
			}.bind(this))
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
