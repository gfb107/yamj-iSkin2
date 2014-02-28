Ext.define('iSkin.view.tablet.SettingsPanel', {
	extend: 'Ext.Panel',
	xtype: 'settingspanel',
	
	config: {
		modal: true,
		hideOnMaskTap: true,
		width: 400,
		// height: 196,
		layout: 'fit',
		items: [{
			xtype: 'titlebar',
			title: 'Settings',
			docked: 'top'
		}, {
			xtype: 'settings'
		}, { xtype: 'spacer' }]
	}
});