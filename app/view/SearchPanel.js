Ext.define('iSkin.view.SearchPanel', {
	extend: 'Ext.Panel',
	requires: ['Ext.field.Search'],
	xtype: 'searchpanel',
	
	config: {
		modal: true,
		hideOnMaskTap: true,
		width: 312,
		// height: 105,
		layout: 'fit',
		items: [{
			xtype: 'titlebar',
			title: 'Search',
			docked: 'top'
		}, {
			xtype: 'searchfield',
            name: 'title'
		}]
	}
});