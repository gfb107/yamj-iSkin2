Ext.define( 'iSkin.profile.Tablet', {
	extend: 'Ext.app.Profile',
	
	config: {
		name: 'Tablet',
		views: ['Main','CategoriesPanel','RemotePanel','SettingsPanel'],
		controllers: ['Navbar']
	},
	
	isActive: function() {
		return Math.min( window.innerHeight, window.innerWidth ) >= 500;
	},
	
	launch: function() {
		console.log('iSkin.profile.Tablet.launch');
		Ext.create( 'iSkin.view.tablet.Main' );
	}
});