Ext.define('iSkin.view.tablet.RemotePanel', {
	extend: 'Ext.Panel',
	xtype: 'remotepanel',
	
	config: {
		// floating: true,
		// centered: true,
		modal: true,
		hideOnMaskTap: true,
		width: 480,
		height: 312,
		items: [{
			xtype: 'remote'
		}]
	}
});