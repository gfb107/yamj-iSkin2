Ext.define( 'iSkin.store.Categories', {
	extend: 'Ext.data.TreeStore',
	
	config: {
		model: 'iSkin.model.Category',
		defaultRootProperty: 'items'
		/* ,
		proxy: {
			type: 'ajax',
			url : 'Categories.html',
			reader: 'json'
		},
		autoLoad: true
		*/
	}
} );