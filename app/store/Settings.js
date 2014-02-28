Ext.define( 'iSkin.store.Settings', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'iSkin.model.Settings',
		autoLoad: true,
		autoSync: true
	}
});