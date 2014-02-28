Ext.define('iSkin.view.Remote', {
    extend: 'Ext.Panel',
	requires: 'Ext.Ajax',
	xtype: 'remote',
	
    config: {
		html: null,
		listeners: {
			show: 'onShow'
		}
    },

	load: function() {
		console.log('iSkin.view.Remote.load');
		if ( this.getHtml() == null ) {
			var remotePanel = this;
			Ext.Ajax.request( {
				url: 'resources/' + iSkin.app.getRemoteType() + '/remote.html',
				success: function( response, opts ) {
					remotePanel.setHtml( response.responseText );
				}
			} );
		}
	}
});