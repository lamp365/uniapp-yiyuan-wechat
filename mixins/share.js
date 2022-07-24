export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '大庆妇科医院',
                path: '/pages/index/index',
                imageUrl: 'https://wx.lxfk120.com/uploads/202207/6ebdf32a01cfc95a088eae3c4b48a463.jpg',
                content: '发现一款对男女士身心很有健康帮助的小程序平台，分享给你来看看吧！',
                desc: '发现一款对男女士身心很有健康帮助的小程序平台，分享给你来看看吧！',
				query:'a=1&b=2'
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            content: this.shareData.content,
            desc: this.shareData.desc,
            success: res => {
                console.info(res)
            }
        }
    },
	onShareTimeline() {
		return {
			title: this.shareData.title,
			query: this.shareData.query, 
			desc: this.shareData.desc,
			imageUrl: this.shareData.imageUrl,
		}
	},
    //#endif

    onLoad(option) {
		var sysData = uni.getStorageSync('sysInfo');
		this.shareData.title = sysData.shop_name;
		this.shareData.imageUrl = sysData.share_img;
    }
}