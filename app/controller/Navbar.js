Ext.define('iSkin.controller.Navbar', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
			navbar: 'navbar',
            navigator: 'navigator',
			backButton: 'button[ui=back]',
			setHomeButton: 'button[action=setHome]',
			categoriesButton: 'button[action=categories]',
			remoteButton: 'button[action=remote]',
			searchButton: 'button[action=search]',
			searchField: 'searchfield',
			searchPanel: {
                selector: 'searchpanel',
                xtype: 'searchpanel',
                autoCreate: true
			},
			settingsButton: 'button[action=settings]'
        }
    }
});