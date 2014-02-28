Ext.define( 'iSkin.profile.Phone', {
	extend: 'Ext.app.Profile',
	
	config: {
		name: 'Phone',
		views: ['Main','Actions'],
		controllers: ['Navbar']
	},
	
	isActive: function() {
		return Math.min( window.innerHeight, window.innerWidth ) < 500;
	},

    launch: function() {
		console.log('iSkin.profile.Phone.launch');
        var main = Ext.create('iSkin.view.phone.Main');
		// main.showNavigator();
    }
});