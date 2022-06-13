class All_Articles{
    constructor(postUrl,defaultPostCount,pageCount,allPostCount,articalsCountInARow){
        this.postUrl = postUrl
        this.defaultPostCount = defaultPostCount
        this.pageCount = pageCount
        this.allPostCount = allPostCount
        this.domainName = window.location.origin
        this.articalsCountInARow = articalsCountInARow
    }
    //Fetch Only Sticky Posts
    fetchStickyPosts = async (pageCount) => {
        this.pageCount = pageCount
        const sticky = "&sticky=true"
        const url = this.domainName + "/wp-json/wp/v2/posts?_embed" + sticky;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if(this.getRenderingPostCount() >= this.allPostCount){
                        hideLoadMoreBtn()
                    }
                    return res.json()
                })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                    } else {
                        reject(data.code)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    // get rendering post count 
    getRenderingPostCount = () => {
        return this.defaultPostCount * this.pageCount
    }

    // Fetch Non Sticky Posts 
    fetchOtherPosts = async (pageCount) => {
        this.pageCount = pageCount
        const per_page = "&per_page=" + this.getRenderingPostCount()
        const sticky = "&sticky=false"
        const url = this.domainName + "/wp-json/wp/v2/posts?_embed" + per_page + sticky;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if (this.getRenderingPostCount() >= parseInt(res.headers.get('X-WP-Total'))) {
                        hideLoadMoreBtn()
                    }
                    return res.json()
                })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                    } else {
                        reject(data.code)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    // get all posts 
    getAllPosts = async (pageCount) => {
        const stickyPosts = await this.fetchStickyPosts(pageCount)
        const otherPosts = await this.fetchOtherPosts(pageCount)
        const data = stickyPosts.concat(otherPosts)
        return data
    }
}