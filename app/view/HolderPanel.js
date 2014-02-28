Ext.define('iSkin.view.HolderPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.holderpanel',

    config: {
        video: null,
		plan: {},
		title: '',
		layout: 'fit',
		items: []
    },
	
	updateVideo: function( video ){
		if ( video == null ){
			return;
		}
		var child = null;
		var title = video.title;
		
		if ( video.isSet) {
			var videos = iSkin.app.getIndexVideos( 'Set', title );
			title = 'Set : ' + title;
			child = iSkin.app.createIndexCarousel( title, videos );
		} else {
			child = {
				xtype: 'detailpanel',
				plan: this.getPlan(),
				video: video,
				title: title
			};
		}

		this.setItems([ child ]);
		this.setTitle( title );
	}
});