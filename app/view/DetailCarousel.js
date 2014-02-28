Ext.define('iSkin.view.DetailCarousel', {
    extend: 'Ext.carousel.Infinite',
    xtype: 'detailcarousel',
    requires: ['iSkin.view.HolderPanel'],

    config: {
        direction: 'horizontal',

        videos: [],
		
		plan: {},
		
        listeners: {
			activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }, 
		
		title: 'Details'
    },
	
	onActiveItemChange: function( me, item ) {
		this.fireEvent( 'titleSet', this, item.getTitle());
	},
	
    onItemIndexChange: function(me, item, index) {
        item.setVideo(this.getVideos()[index]);
    },
	
	getInnerItemConfig: function(){
		return {
			xtype: 'holderpanel',
			plan: this.getPlan(),
			video: null
		};
	}
});
