Ext.define('iSkin.view.IndexWall', {
    extend: 'Ext.Panel',
	requires: ['Ext.Img','Ext.MessageBox'],
    xtype: 'indexwall',

    config: {
		layout: {
			type: 'hbox',
			align: 'start',
			pack: 'center'
		},
		cls: 'wall',
        videos: null,
		plan: null,
		page: -1,
		title: ''
    },
	
    initialize: function() {
		this.callParent( arguments );
        this.on('resize', 'sizeChanged', this);
    },

    sizeChanged: function() {
		this.setPlan( iSkin.app.computePlan());
		this.updatePage( this.getPage());
    },

	
	updatePage: function( page ){
		if ( page < 0 ){
			return;
		}
		var plan = this.getPlan();
		
		var videos = this.getVideos();

		var startIndex = Math.min( page * plan.count, videos.length );
		var endIndex = Math.min( startIndex + plan.count, videos.length );
		
		var items = [];
		var col = 0;
		var row = 0;
		var item;
		var innerItem;
		var innerItems;
		for ( var i = startIndex; i < endIndex; ++i, ++col ) {
			if ( col == plan.cols ) {
				col = 0; 
				++row;
			}
			if ( row == 0 ) {
				innerItems = [];
				item = {
					xtype: 'panel',
					layout: 'vbox',
					items: innerItems
				}
				items.push( item );
			} else {
				item = items[ col ];
				innerItems = item.items;
			}
			
			innerItem = {
				xtype: 'img',
				cls: 'thumb',
				title: videos[ i ].title,
				src: videos[ i ].thumb,
				videos: videos,
				videoIndex: i,
				width: plan.width,
				height: plan.height,
				plan: plan
			};
			if ( videos[i].watched ) {
				innerItem.html = '<div class="watched"></div>';
			}
			innerItems.push( innerItem );
		}
		
		this.setItems( items );
	}});
