Ext.define('iSkin.view.DetailPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.detailpanel',

    config: {
		cls: 'detailPanel',
		scrollable: 'vertical',
		styleHtmlContent : true,
        video: null,
		title: '',
		html: '<h3>Detail Panel</h3><p>Default Text</p>'
    },
	
	initialize: function(){
		var me = this;
		me.callParent(arguments);
		
		me.element.on( 'doubletap', function(event,node) { 
			if (( node.tagName == 'IMG' && 
				 ( node.className == 'poster' || node.className == 'fanart' )) ||
				( node.tagName == 'DIV' && node.className == 'watched' )) {
				me.fireEvent('doubletap', me );
			}
		});
	},
	
	updateVideo: function( video ){
		if ( video == null ){
			return;
		}
		var me = this;
		var details = video.details;
		if ( !details ) {
			Ext.Ajax.request( {
				url: video.file,
				success: function( response, opts ) {
					var details = Ext.decode( response.responseText );
					video.details = details;
					me.showDetails(details);
				}
			} );
		} else {
			me.showDetails( details );
		}
	},
	
	showDetails: function ( details ){
		var html = [ '<div class="details">' ];
		html.push( '<div class="artwork">' );
		html.push( '<img class="poster" src="' + details.poster + '" draggable="false" />' );
		if ( details.id ) {
			if ( details.id.thetvdb ) {
				html.push( '<a target="imdb" href="http://thetvdb.com/?tab=series&id=' );
				html.push( details.id.thetvdb );
				html.push( '" ><img class="thetvdb" /></a>' );
			} else if ( details.id.themoviedb ) {
				html.push( '<a target="imdb" href="http://www.themoviedb.org/movie/' );
				html.push( details.id.themoviedb );
				html.push( '" ><img class="themoviedb" /></a>' );
			} else if ( details.id.imdb ) {
				html.push( '<a target="imdb" href="http://www.imdb.com/title/' );
				html.push( details.id.imdb );
				html.push( '/" ><img class="imdb" /></a>' );
			} 
		}
		if ( details.watched ) {
			html.push( '<div class="watched"></div>' );
		}
		if ( details.fanart && details.fanart != 'UNKNOWN' ){
			html.push( '<img class="fanart" src="' + details.fanart + '" draggable="false" />' );
		}
		html.push( '</div>' );
		html.push( '<div class="info">' );
		var rating = details.rating;
		if ( rating && rating != 'UNKNOWN' && rating != -1 )
		{
			rating = rating / 10 + '&nbsp;/&nbsp;10';
		}
		this.pushTextInfo( html, 'rating', rating );
		this.pushInfo( html, 'cert', details.cert );
		this.pushTextInfo( html, 'runtime', this.fixRuntime(details.runtime ));
		this.pushTextInfo( html, 'year', details.year );
		
		if ( details.container || details.videoCodec || details.audioCodec || details.resolution )
		{
			// this.pushInfo( html, 'container', details.container );
			this.pushInfo( html, 'videoCodec', details.videoCodec );
			this.pushInfo( html, 'resolution', this.cleanResolution( details.resolution ));
			this.pushInfo( html, 'audioCodec', details.audioCodec );
			this.pushInfo( html, 'audioChannels', details.audioChannels );
		}
		html.push( '</div>' ); // info
		
		html.push( '<div class="main" />' );
		if ( details.files.length > 1 ) {
			this.pushFiles( html, this.getVideo().type, details.files );
		}	

		html.push( '<div class="plot">' );
		if ( details.files.length == 1 ){
			this.pushFile( html, details.files[ 0 ] );
		}
		if ( details.plot ){
			html.push( this.fixPlot( details.plot ));
		}
		html.push( '</div>' ); // plot

		this.pushExtras( html, details.extras );
		this.pushGroup( html, details.genres, 'Genres', 'Genres' );
		this.pushGroup( html, details.sets, 'Sets', 'Set' );
		this.pushGroup( html, details.cast, 'Cast', 'Cast' );
		this.pushGroup( html, details.directors, 'Director', 'Director' );
		
		if ( details.library ) {
			var temp = [{ name: details.library }];
			this.pushGroup( html, temp, 'Library', 'Library' );
		}
		
		html.push( '</div>' ); // main
		
		if ( !this.innerElement ){
			this.config.html = html.join('');
		} else {
			this.setHtml(html.join(''));
		}
	},
	
	fixRuntime: function( runtime ) {
		if ( runtime && runtime != 'UNKNOWN' ) {
			var hours = 0;
			var minutes = 0;
			var pos = runtime.indexOf(" min");
			if ( pos != -1 ) {
				minutes = parseInt( runtime.substring( 0, pos ));
				hours = Math.floor( minutes / 60 );
				minutes = minutes % 60;
			} else {
				pos = runtime.indexOf('h');
				if ( pos != -1 ) {
					hours = parseInt( runtime.substring( 0, pos ));
					runtime = runtime.substring( pos + 2 );
					pos = runtime.indexOf( 'm' );
					if ( pos != -1 ) {
						minutes = parseInt( runtime.substring( 0, pos ));
					}
				} else {
					minutes = parseInt( runtime );
					hours = Math.floor( minutes / 60 );
					minutes = minutes % 60;
				}
			}
			if ( hours != 0 || minutes != 0 ) {
				return '' + hours + ':' + (( minutes < 10 ) ? ( '0' + minutes ) : minutes );
			} else {
				return runtime;
			}
		}
		return runtime;
	},
	
	cleanMediaInfo: function( info ) {
		if ( info && info != 'UNKNOWN' ) {
			info = '' + info;
			var plus = info.indexOf('+');
			if ( plus != -1 ) {
				info = info.substring(0,plus) + 'plus' + info.substring(plus+1);
			}
			return info.trim();
		}
		return info;
	},
	
	cleanResolution: function( resolution ) {
		if ( resolution && resolution != 'UNKNOWN' ) {
			var parts = resolution.split( 'x' );
			var resx = parseInt( parts[ 0 ]);
			var resy = parseInt( parts[ 1 ]);
			if( resx > 2559 ) { // SBS
				resx = resx / 2;
			} else if (( resx > 1919 && resy > 1080 ) || ( resx > 1279 && resy > 1080 )) { // TB
				resy = resy / 2;
			}

			if( resx > 1919 ) {
				resolution = "1080";
			} else if ( resx > 1279 ) {
				resolution = "720";
			} else if ( resy > 720 ) {
				resolution = "1080";
			} else if ( resy > 576 ) {
				resolution = "720";
			} else if ( resy > 540 ) {
				resolution = "576";
			} else if ( resy > 480 ) {
				resolution = "540";
			} else if ( resy > 360 ) {
				resolution = "480";
			} else if( resy > 240 ) {
				resolution = "360";
			} else {
				resolution = "240";
			}
		}
		return resolution;
	},
	
	pushTextInfo: function( html, clazz, info ) {
		info = this.cleanMediaInfo(info);
		if ( info && info != 'UNKNOWN' && info != -1 ){
			html.push( '<div class="' + clazz + '">' );
			html.push( info );
			html.push( '</div>' );
		} else {
			html.push( '<div class="' );
			html.push( clazz );
			html.push( '">&nbsp;</div>' );
		}
	},
	pushInfo: function( html, clazz, info ) {
		info = this.cleanMediaInfo(info);
		if ( info && info != 'UNKNOWN' && info != -1 ){
			html.push( '<div class="' + clazz + '-' + iSkin.app.certPrefix + info + '">' );
			html.push( info );
			html.push( '</div>' );
		} else {
			html.push( '<div class="' );
			html.push( clazz );
			html.push( '">&nbsp;</div>' );
		}
	},
	
	fixPlot: function( plot ) {
		while( plot.indexOf( '&lt;' ) != -1 ) {
			plot = plot.replace('&lt;','<').replace('&gt;','>');
		}
		return plot;
	},
	
	pushWatch: function( html, url, watch ) {
		url = iSkin.app.mapUrl(url);
		if ( watch && watch != 'disabled' && url.substring(0,7) == 'http://') {
			html.push( '<a class="watch" href="' );
			html.push( url );
			html.push( '"' );
			if ( watch != 'direct' ) {
				html.push( ' onclick="return iSkin.app.watch(this.href);"' );
			}
			html.push( '></a>' );
		}
	},
	
	pushExtras: function( html, extras ){
		if ( !extras || extras.length == 0 ) {
			return;
		}

		var settings = Ext.getStore('Settings').getAt(0);
		var watch = settings.get('watch');
		html.push( '<h3>Extras</h3><table>' );
		for ( var x = 0; x < extras.length; ++x ) {
			html.push('<tr><td class="parts">');
			html.push(x+1);
			html.push('</td><td class="title">');
			var extra = extras[ x ];
			var title = extra.title;
			var dash = title.indexOf('-');
			if ( dash > 0 ){
				title = title.substring(dash+1).trim();
			}
			html.push( '<div class="play"><a class="play" href="' );
			html.push( extra.url );
			html.push( '" onclick="return nmt.play(this.href);">' );
			html.push( title );
			html.push( '</a>' );
			this.pushWatch( html, extra.url, watch );
			html.push( '</div></td></tr>' );
		}
		html.push('</table>');
	},
	
	pushFile: function( html, file ) {
		var settings = Ext.getStore('Settings').getAt(0);
		var watch = settings.get('watch');
		var url = file.url;
		html.push( '<a class="play" href="' );
		html.push( url );
		html.push( '" onclick="return nmt.play(this.href);"></a>' );
		if ( watch ) {
			this.pushWatch( html, url, watch );
		}
	},

	pushFiles: function( html, type, files ) {
		var settings = Ext.getStore('Settings').getAt(0);
		var watch = settings.get('watch');
		if ( files.length == 1 ) {
			var url = files[ 0 ].url;
			html.push( '<div class="play"><a class="play" href="' );
			html.push( url );
			html.push( '" onclick="return nmt.play(this.href);">Play</a>' );
			this.pushWatch( html, url, watch );
			html.push("</div>");
		} else {
			html.push( '<h3>' );
			if ( type == 'tv' ) {
				html.push( 'Episodes' );
			} else {
				html.push( 'Parts' );
			}
			html.push( '</h3><table>' );
			for ( var i = 0; i < files.length; ++i ) {
				var file = files[ i ];
				var hasPlot = file.plot && file.plot.length > 0 && file.plot != 'UNKNOWN';
				html.push( '<tr>' );
				var parts = file.parts.split( '-' );
				if ( parts[ 0 ] == parts[ parts.length - 1 ] ) {
					parts = parts[ 0 ];
				} else {
					parts = file.parts;
				}
				html.push( '<td class="parts"' );
				if ( hasPlot ) {
					html.push( ' rowspan="' );
					html.push( file.plot.length + 1 );
					html.push( '"' );
				}
				html.push( '>' );
				html.push( parts );
				html.push( '</td>' );
				var title = file.title;
				html.push( '<td class="title"><div class="play' );
				if ( file.watched ) {
					html.push( ' partWatched' );
				}
				html.push( '"><a class="play" href="' );
				html.push( file.url );
				html.push( '" onclick="return nmt.play(this.href);">' );
				if ( title != 'UNKNOWN' ) {
					html.push( title );
				} else {
					if ( type == 'tv' ) {
						html.push( 'Episode ' );
					} else {
						html.push( 'Part ' );
					}
					html.push( parts );
				}
				html.push( '</a>' );
				this.pushWatch( html, file.url, watch );
				html.push( '</div></td></tr>' );
				if ( hasPlot ) {
					for ( var p = 0; p < file.plot.length; ++p ) {
						html.push( '<tr><td class="plot">' );
						html.push( this.fixPlot( file.plot[ p ] ));
						html.push( '</td></tr>' );
					}
				}
			}
			html.push( '</table>' );
		}
	},

	pushGroup: function( html, group, name, category ) {
		if ( group ) {
			html.push( '<h3>' );
			html.push( name );
			html.push( '</h3><div class="list">' );
			var members = {};
			var first = true;
			for ( var i = 0; i < group.length; ++i ) {
				var member = group[ i ];
				var memberName = member.name;
				var url = null;
				if ( member.url ) {
					if ( category == 'Genres' ) {
						var parts = member.url.split('_');
						memberName = unescape(parts[1]);
						if ( members[ memberName ]) {
							memberName = null;
						} else {
							members[memberName]=true;
						}
					}
					if ( memberName ) { 
						url = '<a href="#" onclick="return iSkin.app.showIndex( \'' +
						category + '\', \'' +
						escape(memberName) + '\')">';
					}
				}
				
				if ( memberName ) {
					if ( first ) {
						first = false;
					} else {
						html.push( ', ' );
					}
					if ( url ) {
						html.push( url );
					}
					html.push( memberName );
					if ( url ) {
						html.push( '</a>' );
					}
				}
			}
			html.push( '</div>' );
		}
	}
});