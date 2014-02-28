Ext.define( 'iSkin.model.Category', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [{
			name: 'text',
			type: 'string'
		},{
			name: 'videos',
			type: 'array'
		}]
		/*,
	
		hasMany: [{
			name: 'videos',
			model: 'int'
		}] */
	}
} );