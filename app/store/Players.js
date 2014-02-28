Ext.define( 'iSkin.store.Players', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'iSkin.model.Player'
		/*,
		proxy: {
			type: 'ajax',
			url : 'Players.html',
			reader: {
				type: 'json',
				rootProperty: 'players'
			}
		},
		autoLoad: true
		*/
	}
} );