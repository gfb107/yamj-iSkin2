//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'iSkin': 'app'
});
//</debug>

//We've added a third and final item to our tab panel - scroll down to see it
Ext.application({
    name: 'iSkin',
	profiles: [ 'Phone', 'Tablet' ],
	views: [
		'Navbar','Navigator','Categories','Remote','SearchPanel','Settings',
		'IndexCarousel','IndexWall',
		'DetailCarousel','DetailPanel','HolderPanel'
	],
	stores: ['Categories','Players','Settings'],
	models: ['Category','Player','Settings'],
	controllers: ['Main','Categories','Navigator','Settings','Search'],
	icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
	refs: {
		navbar: 'navbar'
	},
	
	videos: [],
	
	setVideos: function( videos ) {
		this.videos = videos;
	},
	
	getVideo: function( index ) {
		return this.videos [ index ];
	},
	
	urlMap: [],
	
	setUrlMap: function( urlMap ) {
		this.urlMap = urlMap;
	},
	
	certPrefix: '',
	
	setCertPrefix: function( certPrefix ) {
		if ( certPrefix ) {
			this.certPrefix = certPrefix;
		}
	},
	
	getIndexVideos: function(categoryName,indexName){
		var categoryNode = Ext.getStore('Categories').getRoot().findChild('text',categoryName);
		var videos = categoryNode.get('videos');
		if ( indexName ) {
			var indexNode = categoryNode.findChild('text',indexName);
			videos = indexNode.get('videos');
		}
		return videos;
	},
	
	showIndex: function( categoryName,  indexName ){
		var title = categoryName;
		if ( indexName ) {
			indexName = unescape(indexName);
			title = categoryName + ' : ' + indexName;
		}
		var videos = this.getIndexVideos( categoryName, indexName );
		this.getController('Navigator').push( this.createIndexCarousel( title, videos ));
	},

	createIndexCarousel: function( title, videos ){
		var plan = this.computePlan();
		return {
			xtype: 'indexcarousel',
			plan: plan,
			maxItemIndex: Math.ceil( videos.length / plan.count ) - 1,
			videos: videos,
			title: title
		};
	},
	
	getActiveIndex: function() {
		return this.getController('Navigator').getActiveIndex();
	},
	
	computePlan: function() {
		var windowHeight = Ext.Viewport.getWindowHeight();
		var windowWidth = Ext.Viewport.getWindowWidth();
		var baseWidth = Ext.getStore('Settings').getAt(0).get('thumbWidth');
		var aspectRatio = 3 / 2;
		var remainderRatio = 1 / 2;
		var baseHeight = Math.floor( baseWidth * aspectRatio );
		
		var navbarHeight = this.getNavbar().element.getHeight();
		var windowHeight = windowHeight - navbarHeight;
		var cols = Math.floor( windowWidth / baseWidth );
		if ( cols == 0 ){
			cols = 1;
			width = windowWidth;
		}
		var width = Math.floor( windowWidth / cols );
		var height = Math.floor( width * aspectRatio );
		if ( height > windowHeight ) {
			height = windowHeight;
			width = Math.floor( height / aspectRatio );
		}
		var rows = Math.floor( windowHeight / height );
		
		var remainder = windowHeight - ( rows * height );
		var remainderLimit = height * remainderRatio;
		if ( remainder > remainderLimit ) {
			console.log( 'Adding row because ' + remainder + ' > ' + remainderLimit );
			++rows;
			height = Math.floor( windowHeight / rows );
			width = Math.floor( height / aspectRatio );
			cols = Math.floor( window.innerWidth / width );
		}

		return { width: width, height: height, count: cols * rows, cols: cols };
	},
	
	search: function( text ) {
		if ( text ) {
			text = text.toLowerCase();
			var videos = [];
			var allVideos = this.videos;
			var count = allVideos.length;
			for ( var i = 0; i < count; ++i ) {
				var video = allVideos[ i ];
				if ( !video.isSet && video.type != 'extra' && video.title.toLowerCase().indexOf( text ) != -1 ) {
					videos.push( video );
				}
			}
			if ( videos.length == 0 ){
				Ext.Msg.alert( "No matching videos found" );
			} else {
				var title = 'Search : ' + text;
				this.getController('Navigator').push( this.createIndexCarousel( title, videos ));
			}
		}
	},
	
	mapUrl: function( fileUrl ){
		var mappedUrl = fileUrl;
		var urlMap = this.urlMap;
		for ( var key in urlMap ) {
			var value = urlMap[ key ];
			mappedUrl = mappedUrl.replace(key,value);
		}
		return mappedUrl;
	},
	
	watch: function( fileUrl ) {
		var settings = Ext.getStore('Settings').getAt(0);
		var watch = settings.get('watch');
		var panel = { title: 'Watch' };
		if ( watch == 'html5' ) {
			panel.xtype = 'video';
			panel.url = fileUrl;
		} else if ( watch == 'embed' ) {
			panel.xtype = 'panel';
			panel.html = '<embed src="' + fileUrl + '" width="100%" height="100%" />';
		}
		panel.cls = 'player';
		this.getController('Navigator').push(panel);
	
		return false;
	},
	
	showRemote: function() {
		this.getController("Navbar",this.getCurrentProfile().getNamespace()).showRemote();
	},
	
	getRemoteType: function() {
		var settings = Ext.getStore('Settings').getAt(0);
		var playerName = settings.get('player');
		var players = Ext.getStore('Players');
		var player = players.getAt(players.find('name',playerName));
		var type = player.get('series');
		if ( type == "1" || type == "2" || type == "3" || type == "4" ) {
			type = "nmt";
		}
		
		return type;
	}
});
