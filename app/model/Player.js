Ext.define( 'iSkin.model.Player', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [{
			name: 'name',
			type: 'string'
		},{
			name: 'address',
			type: 'string'
		},{
			name: 'series',
			type: 'string'
		}]
	}
} );