Ext.define('iSkin.controller.Navigator', {
    extend: 'Ext.app.Controller',
	
	config: {
		stack: [],
		refs: {
			navbar: 'navbar',
			navigator: 'navigator',
			backButton: 'navbar button[ui=back]',
			homeButton: 'button[action=home]',
			navbar: 'navbar'
		},
		control: {
			'categories': {
				indexSelected: 'indexSelected'
			},
			backButton: {
				tap: 'pop'
			},
			'img': {
				tap: 'thumbTapped'
			},
			'detailcarousel': {
				titleSet: 'titleChanged'
			},
			'detailpanel': {
				doubletap: 'pop'
			}
		}
	},
	
	getTitle: function( item ){
		return ( item.getTitle ) ? item.getTitle() : item.config ? item.config.title : item.title;
	},
	
	titleChanged: function( carousel, title ){
		if ( this.getNavigator().getActiveItem() == carousel ) {
			this.getNavbar().setTitle( title );
		}
	},
	
	setBackButtonText: function( text ) {
		var isTablet = this.getApplication().getCurrentProfile().getName() == 'Tablet';
		var backButton = this.getBackButton();
		if ( isTablet ) {
			backButton.setText( text );
		}
		if ( text ) {
			backButton.show();
		}
	},
	
	push: function( item ){
		var navigator = this.getNavigator();
		var navbar = this.getNavbar();
		var currItem = navigator.getActiveItem();
		var newItem = navigator.add( item );
		var title = this.getTitle( newItem );

		if ( currItem ){
			var currTitle = navbar.getTitle();
			this.setBackButtonText( currTitle );
			this.getStack().push( { item: currItem, title: currTitle } );
		}
		navigator.setActiveItem( newItem );
		navbar.setTitle( title );
	},
	
	pop: function(){
		var navigator = this.getNavigator();
		var stack = this.getStack();
		var poppedItem = stack.pop();
		var navbar = this.getNavbar();
		
		if ( stack.length == 0 ) {
			this.getBackButton().hide();
		} else {
			this.setBackButtonText( stack[ stack.length - 1 ].title );
		}
		var currItem = navigator.getActiveItem();
		navigator.setActiveItem( poppedItem.item );
		navbar.setTitle( poppedItem.title );
		navigator.remove( currItem );
	},
		
	indexSelected: function( title, videos ){
		this.push( iSkin.app.createIndexCarousel( title, videos ));
	},
	
	thumbTapped: function( thumb ){
		var config = thumb.config;
		var video = config.videos[ config.videoIndex ];
		var isSet = video.isSet;
		var title = video.title;
		if ( isSet ) {
			title = 'Set : ' + title;
		}
		this.push({
			xtype: 'detailcarousel',
			videos: config.videos,
			activeItem: config.videoIndex,
			maxItemIndex: config.videos.length - 1,
			plan: config.plan,
			title: title
		});
	},
	
	getActiveIndex: function(){
		var navigator = this.getNavigator();
		var item = navigator.getActiveItem();
		var xtypes = item.getXTypes();
		if ( xtypes.indexOf( 'indexcarousel' ) != -1 ){
			return item.get( 'title' );
		}
		
		var video = item.getActiveItem().get('video');
		if ( video.isSet ){
			return 'Set : ' + video.title;
		}
		
		var stack = this.getStack();
		var stackItem = stack[ stack.length - 1 ];
		return stackItem.title;
	}
});