Ext.define('iSkin.view.Navbar', {
	extend: 'Ext.TitleBar',
	xtype: 'navbar',
	
    config: {
		docked: 'top',
		title: 'iSkin2',
		items: [{
			ui: 'back',
			text: '',
			hidden: true
		}, {
			xtype: 'spacer'
		}]
    }
})
