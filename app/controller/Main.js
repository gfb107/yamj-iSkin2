Ext.define('iSkin.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        }, 
		control: {
		}
    },
	
	findVideo: function( videos, title ){
		for ( var v = 0; v < videos.length; ++v ){
			var video = videos[ v ];
			if ( videos[ v ].title == title ) {
				videos.splice( v, 1 );
				return video;
			}
		}
	},
	
	launch: function(){
	console.log( "controller.main.launch");
		var me = this;
		Ext.Ajax.request( {
			url: 'Categories.html',
			success: function( response, opts ) {
				console.log('Processing Categories.html');
				var raw = Ext.decode( response.responseText );
				
				nmt.setDoneURL( raw.doneUrl );

				var settingsStore = Ext.getStore('Settings');
				var settings = null;
				if ( settingsStore.getCount() == 0 ){
					settingsStore.add({
						player: raw.players[0].name,
						watch: 'disabled',
						home: 'Other : All',
						thumbWidth: 148
					});
					settingsStore.sync();
					settings = settingsStore.getAt(0);
				} else {
					settings = settingsStore.getAt(0);
					if ( !settings.get('player')){
						settings.set('player',raw.players[0].name);
					}
					if ( !settings.get('home')){
						settings.set('home','Other : All');
					}
					if ( !settings.get('watch' )){
						settings.set('watch','disabled');
					}
					if ( !settings.get('thumbWidth')){
						settings.set('thumbWidth', 148);
					}
					if ( !settings.get('bannerWidth')){
						settings.set('bannerWidth', 266);
					}
					settingsStore.sync();
				}

				var proxy = raw.proxy;
				if ( proxy ) {
					for ( var p = 0; p < raw.players.length; p++ ) {
						var player = raw.players[p];
						player.address = proxy + '/' + player.address;
					}
				}
				
				var playerStore = Ext.getStore('Players');
				playerStore.setData(raw.players);

				var rawVideos = raw.videos;
				iSkin.app.setVideos( raw.videos );
				
				iSkin.app.setUrlMap( raw.urlMap );
				
				iSkin.app.setCertPrefix( raw.certPrefix );
				
				var sets = [];
				for ( var v = 0; v < rawVideos.length; v++ ){
					var video = rawVideos[ v ];
					if ( video.isSet ){
						sets.push( video );
					}
				}
				
				var categories = raw.categories.items;
				for ( var c = 0; c < categories.length; c++ ){
					var category = categories[c];
					var indexes = category.items;
					for ( var i = 0; i < indexes.length; i++ ){
						var index = indexes[i]
						var videos = index.videos;
						for ( var v = 0; v < videos.length; v++ ){
							var video = rawVideos[videos[ v ]];
							videos[ v ] = video;
						}
					}
				}
				
				var categoryStore = Ext.getStore('Categories');
				categoryStore.setData(categories);
				
				var setNode = categoryStore.getRoot().findChild('text','Set');
				if ( setNode ){
					setNode.set('leaf',true);
					
					var indexes = setNode.childNodes;
					var videos = [];
					for ( var i = 0; i < indexes.length; ++i ) {
						videos.push( me.findVideo( sets, indexes[ i ].get('text')));
					}
					setNode.set( 'videos', videos );
				}
				
				var playerName = settings.get('player');
				var player = playerStore.findRecord('name',playerName);
				if ( !player ){
					player = playerStore.getAt(0);
				}
				nmt.setDevice(player.raw);
				
				var home = settings.get('home');
				var parts = home.split(':');
				var catName = parts[ 0 ].trim();
				var indexName = '';
				if ( parts.length > 1 ){
					indexName = parts[1].trim();
				}
				iSkin.app.showIndex( catName, escape(indexName));
			}
		});
	}
});