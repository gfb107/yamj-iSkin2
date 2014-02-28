Ext.define( 'iSkin.model.Settings', {
	extend: 'Ext.data.Model',	
	requires: ['Ext.data.identifier.Sequential'],
	config: {
		identifier: 'sequential',
		fields: [
			{ name: 'player', type: 'string' },
			{ name: 'watch', type: 'string' },
			{ name: 'home', type: 'string' },
			{ name: 'thumbWidth', type: 'int' }
		],
		proxy: {
			type: 'localstorage',
			id  : 'iSkin-Settings'
		}
	}
})