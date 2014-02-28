Ext.define('iSkin.view.tablet.CategoriesPanel', {
	extend: 'Ext.Panel',
	xtype: 'categoriespanel',
	
	config: {
		floating: true,
		// centered: true,
		modal: true,
		hideOnMaskTap: true,
		width: 400,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'categories'
		}]
	}
});