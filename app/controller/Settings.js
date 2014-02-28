Ext.define('iSkin.controller.Settings', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
			playerSelect: 'selectfield[name=player]',
			watchSelect: 'selectfield[name=watch]',
			homeSelect: 'selectfield[name=home]',
			thumbWidthSpinner: 'spinnerfield[name=thumbWidth]'
        }, 
		control: {
			playerSelect: {
				change: 'playerSelected'
			},
			watchSelect: {
				change: 'watchSelected'
			},
			homeSelect: {
				change: 'homeSelected'
			},
			thumbWidthSpinner: {
				spin: 'thumbWidthChanged'
			}
		}
    },
	
	playerSelected: function( select, playerName ){
		this.saveSetting('player', playerName);
		
		var playerStore = Ext.getStore('Players');
		var player = playerStore.findRecord( 'name', playerName );
		nmt.setDevice( player.raw );
	},
	
	watchSelected: function( select, watchValue ){
		this.saveSetting('watch',watchValue);
	},
	
	homeSelected: function( select, homeValue ){
		this.saveSetting('home',homeValue);
	},
	
	thumbWidthChanged: function( spinner, value ){
		this.saveSetting('thumbWidth',value);
	},
	
	saveSetting: function( name, value ){
		var store = Ext.getStore('Settings');
		var settings = store.getAt(0);
		settings.set(name,value);
		store.sync();
	}
});