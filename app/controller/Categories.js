Ext.define('iSkin.controller.Categories', {
    extend: 'Ext.app.Controller',

    config: {
		refs: {
			categories: 'categories'
		},
		control: {
			categories: {
				leafitemtap: 'indexSelected'
			}
		}
    },
	
	indexSelected: function( nestedList, list, index, target, record ) {
		var parentTitle = record.parentNode.get( 'text' );
		var indexTitle = record.get( 'text' );
		var title;
		if ( parentTitle == 'Root' && indexTitle == 'Set' ){
			title = 'Set';
		} else {
			title = parentTitle + ' : ' + indexTitle;
		}
		this.getCategories().fireEvent('indexSelected', title, record.get( 'videos' ));
	}
});
