Ext.define('iSkin.controller.tablet.Navbar', {
    extend: 'iSkin.controller.Navbar',
	
	config: {
		refs: {
			main: 'main',
			navbar: 'navbar',
			categoriesPanel: {
                selector: 'categoriespanel',
                xtype: 'categoriespanel',
                autoCreate: true
			},
			nestedList: 'nestedlist',
			remote: {
                selector: 'remotepanel',
                xtype: 'remotepanel',
                autoCreate: true
			},
			settings: 'settings',
			settingsPanel: {
                selector: 'settingspanel',
                xtype: 'settingspanel',
                autoCreate: true
			}
		},
		control: {
			nestedlist: {
				indexSelected: 'indexSelected'
			},
			setHomeButton: {
				tap: 'setHome'
			},
			categoriesButton: {
				tap: 'showCategories'
			},
			remoteButton: {
				tap: 'showRemote'
			},
			searchButton: {
				tap: 'showSearch'
			},
			composeButton: {
				tap: 'showCompose'
			},
			settingsButton: {
				tap: 'showSettings'
			}
		}
	},
	
	launch: function(){
		this.getNavbar().add({
			xtype: 'button',
			align: 'right',
			iconMask: true,
			iconCls: 'search',
			action: 'search'
		});
		this.getNavbar().add({
			xtype: 'button',
			align: 'right',
			iconMask: true,
			iconCls: 'bookmarks',
			action: 'categories'
		});
		this.getNavbar().add({
			xtype: 'button',
			align: 'right',
			iconMask: true,
			icon: 'resources/img/remote.png',
			action: 'remote'
		});
		this.getNavbar().add({
			xtype: 'button',
			align: 'right',
			iconMask: true,
			iconCls: 'settings',
			action: 'settings'
		});
	},

	showNavigator: function(){
		this.getCategoriesPanel().hide();
		this.getRemote().hide();
		this.getSettingsPanel().hide();
	},
	
	indexSelected: function( text, videos ){
		var nestedList = this.getNestedList();
		if ( !nestedList.getBackButton().isHidden()) {
			setTimeout( function(){
				nestedList.onBackTap(); 
			}, 200 );
		}
		this.getNavbar().setTitle( text );
		this.showNavigator();
	},
	
	showCategories: function(){
		this.getCategoriesPanel().showBy( this.getCategoriesButton(), 'tr-bc?' );
	},
	
	showRemote: function(){
		this.getRemote().innerItems[0].load();
		this.getRemote().showBy( this.getRemoteButton(), 'tr-bc?' );
	},
	
	showSearch: function(){
		this.getSearchPanel().showBy( this.getSearchButton(), 'tr-bc?' );
		this.getSearchField().focus();
	},
	
	showSettings: function(){
		var settingsPanel = this.getSettingsPanel();
		
		settings = this.getSettings().updateOptions();
		
		settingsPanel.showBy( this.getSettingsButton(), 'tr-bc?' );
	}
});