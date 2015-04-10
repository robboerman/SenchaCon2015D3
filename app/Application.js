/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('d3m0.Application', {
    extend: 'Ext.app.Application',

    name: 'd3m0',

    requires: [
		'Gearbox.util.Debug'
	],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
    	Gearbox.util.Debug.enableContextMenu();
        // TODO - Launch the application
    }
});
