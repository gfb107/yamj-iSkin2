Ext.define('iSkin.view.phone.Main', {
    extend: 'iSkin.view.Main',

    config: {
		layout: {
			type: 'card',
			animation: 'flip'
		},
        items: [{
			xtype: 'panel',
			layout: 'fit',
			items: [{
				xtype: 'navbar'
			},{
				xtype: 'navigator'
			}]
		}, {
			xtype: 'categories'
        }, {
			xtype: 'panel',
			name: 'remote',
			scrollable: 'vertical',
			items: [{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Remote', 
				items: [{
					text: 'Done',
					ui: 'done',
					action: 'done',
					align: 'right'
				}]
			},{
				xtype: 'remote'
			}]
        }, {
			xtype: 'panel',
			name: 'settings',
			items: [{
				xtype: 'titlebar',
				title: 'Settings', 
				items: [{
					text: 'Done',
					ui: 'action',
					action: 'done',
					align: 'right'
				}]
			},{
				xtype: 'settings'
			}]
		}]
    },
	
	showNavigator: function(){
		this.setActiveItem(0);
	},
	
	showCategories: function(){
		this.setActiveItem(1);
	},
	
	showRemote: function(){
		console.log( 'iSkin.view.Phone.showRemote: this' );
		console.dir( this );
		var remoteHolder = this.innerItems[2];
		var remotePanel = remoteHolder.innerItems[0];
		console.log('remotePanel');
		console.dir(remotePanel);
		remotePanel.load();
		this.setActiveItem(2);
	},
	
	showSettings: function(){
		this.setActiveItem(3);
	}
});