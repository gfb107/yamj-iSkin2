Ext.define( 'iSkin.view.phone.Actions',{
	extend: 'Ext.Panel',
	xtype: 'actions',
	requires: ['Ext.Button'],
	
	config:{
		floating: true,
		modal: true,
		hideOnMaskTap: true,
		padding: 0,
		// layout: 'hbox',
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			defaults: {
				xtype: 'button',
				iconMask: true
			},
			items: [{
				iconCls: 'search',
				action: 'search'
			},{
				iconCls: 'bookmarks',
				action: 'categories'
			},{
				icon: 'resources/img/remote.png',
				action: 'remote',
				height: '1.5em'
			},{
				iconCls: 'settings',
				action: 'settings'
			}]
		}]
	}
});