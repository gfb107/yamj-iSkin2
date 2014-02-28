Ext.define('iSkin.view.tablet.Main', {
    extend: 'iSkin.view.Main',

    config: {
		layout: 'fit',
		items: [{
			xtype: 'navbar'
		},{ 
			xtype: 'navigator'
		}]
    }
});