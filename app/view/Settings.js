Ext.define("iSkin.view.Settings", {
    extend: 'Ext.Panel',
	xtype: 'settings',
	requires: ['Ext.field.Select','Ext.field.Spinner'],
	
    config: {
		items: [{
			xtype: 'selectfield',
			store: 'Players',
			valueField: 'name',
			displayField: 'name',
			label: 'Player',
			name: 'player',
			defaultTabletPickerConfig: {
				minHeight: '10em',
				height: '10em',
				minWidth: '10em',
				width: '10em'
			}
		},{
			xtype: 'selectfield',
			label: 'Home',
			name: 'home',
			defaultTabletPickerConfig: {
				minHeight: '6em',
				height: '6em',
				minWidth: '15em',
				width: '15em'
			}
		},{
			xtype: 'selectfield',
			label: 'Watch',
			name: 'watch',
			options: [ 
				{ text: 'Disabled', value: 'disabled' },
				{ text: 'HTML5 Video', value: 'html5' },
				{ text: 'Embed', value: 'embed' },
				{ text: 'Direct URL', value: 'direct' }
			],
			defaultTabletPickerConfig: {
				minHeight: '12em',
				height: '12em',
				minWidth: '15em',
				width: '15em'
			}
		},{
				xtype: 'spinnerfield',
				label: 'Thumb width',
				name: 'thumbWidth',
				minValue: 100,
				maxValue: 200,
				stepValue: 1
		}]
	},
	
	updateOptions: function(){
		var settings = Ext.getStore('Settings').getAt(0);

		var player = settings.get('player');
		var watch = settings.get('watch');
		var home = settings.get('home');
		var thumbWidth = settings.get('thumbWidth');
				
		this.query( 'selectfield[name=player]' )[0].setValue(player);
		
		this.query( 'selectfield[name=watch]' )[0].setValue(watch);
		
		var activeIndex = iSkin.app.getActiveIndex();
		
		var homeSelect = this.query( 'selectfield[name=home]' )[0];
		
		var options = [{ text: home, value: home }];
		
		if ( activeIndex != home ) {
			options.push({ text: activeIndex, value: activeIndex });
		}
		homeSelect.setOptions( options );

		homeSelect.setValue( home );
		
		var found = this.query('spinnerfield[name=thumbWidth]' );
		var spinner = found[0]
		spinner.setValue(thumbWidth);
	}
});
