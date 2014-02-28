Ext.define('iSkin.controller.phone.Navbar', {
    extend: 'iSkin.controller.Navbar',
	
	config: {
		refs: {
			actions: {
                selector: 'actions',
                xtype: 'actions',
                autoCreate: true
			},
			backButton: 'button[ui=back]',
			categories: 'categories',
			actionsButton: 'button[action=actions]',
			doneButton: 'button[action=done]',
			main: 'main',
			navbar: 'navbar',
			settings: 'settings'
		},
		control: {
			actionsButton: {
				tap: 'showActions'
			},
			doneButton: {
				tap: 'showNavigator'
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
			settingsButton: {
				tap: 'showSettings'
			},
			categories: {
				indexSelected: 'indexSelected'
			}
		}
	},
	
	launch: function(){
		this.getNavbar().add({
			xtype: 'button',
			align: 'right',
			ui: 'action',
			iconMask: true,
			iconCls: 'more',
			action: 'actions'
		});
		this.getCategories().getToolbar().add({ 
			xtype: 'button',
			align: 'right',
			ui: 'action',
			text: 'Done',
			action: 'done'
		});
		this.showNavigator();
	},
	
	showActions: function(){
		this.getActions().showBy(this.getActionsButton(),"cr-bl");
	},
	
	showNavigator: function(){
		if ( this.getApplication().getController('Navigator').getStack().length > 0 ){
			this.getBackButton().show();
		}
		this.getMain().showNavigator();
	},

	showCategories: function(){
		this.getActions().hide();
		this.getBackButton().hide();
		this.getMain().showCategories();
	},
	
	showRemote: function(){
		this.getActions().hide();
		this.getBackButton().hide();
		this.getMain().showRemote();
	},
	
	showSearch: function(){
		this.getActions().hide();
		this.getSearchPanel().showBy( this.getActionsButton());
		this.getSearchField().focus();
	},
	
	showSettings: function(){
		this.getSettings().updateOptions();
		this.getActions().hide();
		this.getBackButton().hide();
		this.getMain().showSettings();
	},
	
	indexSelected: function( title, videos ){
		var categories = this.getCategories();
		if ( !categories.getBackButton().isHidden()) {
			categories.onBackTap();
		}
		this.showNavigator();
	}
});