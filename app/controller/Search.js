Ext.define('iSkin.controller.Search', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
			searchPanel: 'searchpanel',
			searchField: 'searchfield'
        }, 
		control: {
			searchField: {
				action: 'searchSubmitted'
			}
		}
    },
	
	searchSubmitted: function( field ){
		this.getSearchPanel().hide();
		field.blur();
		var text = field.getValue();
		field.setValue('');
		iSkin.app.search( text );
	}
});