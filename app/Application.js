/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('d3m0.Application', {
    extend: 'Ext.app.Application',

    name: 'd3m0',

    requires: [
        /* Remove the gearbox dependancy
		'Gearbox.util.Debug'
        */
	],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
    	/* Remove the gearbox dependancy
        Gearbox.util.Debug.enableContextMenu();
        */
        // TODO - Launch the application
    }
});
