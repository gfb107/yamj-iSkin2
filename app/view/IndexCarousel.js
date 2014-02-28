Ext.define('iSkin.view.IndexCarousel', {
    extend: 'Ext.carousel.Infinite',
    xtype: 'indexcarousel',
    requires: ['iSkin.view.IndexWall','Ext.MessageBox'],

    config: {
        direction: 'vertical',

		page: 0,

        videos: [],
		
		plan: {},
		
        listeners: {
            itemindexchange: 'onItemIndexChange'
        }, 
		title: ''
    },

    initialize: function() {
        this.on('resize', this.sizeChanged, this);
    },

    sizeChanged: function(vewport, orientation) {
		var plan = iSkin.app.computePlan();
		this.setMaxItemIndex( Math.ceil( this.getVideos().length / plan.count ) - 1 );
		this.setPlan(plan);
    },

    onItemIndexChange: function(me, wall, page) {
        wall.setPage(page);
    },
	
	getInnerItemConfig: function(){
		return {
			xtype: 'indexwall',
			plan: this.getPlan(),
			videos: this.getVideos(),
			title: this.getTitle()
		};
	}
});
