Ext.define('iSkin.view.Categories', {
    extend: 'Ext.dataview.NestedList',
	xtype: 'categories',
	
    config: {
		store: 'Categories',
		title: 'Categories'
	}
});