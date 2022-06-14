class All_Articles{
    constructor(postUrl,defaultPostCount,pageCount,allPostCount,articalsCountInARow,loadMoreButtonId){
        this.postUrl = postUrl
        this.defaultPostCount = defaultPostCount
        this.pageCount = pageCount
        this.allPostCount = allPostCount
        this.domainName = window.location.origin
        this.articalsCountInARow = articalsCountInARow
        this.loadMoreButtonId = loadMoreButtonId
        this.primaryFetchPostsCount = 0
        this.secondayFetchPostsCount = 0
    }

    hideLoadMoreBtn = () => {
        if(this.loadMoreButtonId){
            document.getElementById(this.loadMoreButtonId).style.display = "none"
        }
    }

    //Fetch Only Sticky Posts
    fetchStickyPosts = async (pageCount) => {
        this.pageCount = pageCount
        const per_page = "&per_page=" + this.getRenderingPostCount()
        const sticky = "&sticky=true"
        const url = this.postUrl + per_page + sticky;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if(this.getRenderingPostCount() >= this.allPostCount){
                        this.hideLoadMoreBtn()
                    }
                    return res.json()
                })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                        this.primaryFetchPostsCount = data.length
                    } else {
                        reject(data.code)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
    calculate the required amout of post need in the 
    secondary fetch
    */
    findSecondaryFetchPerPageCount = () => {
        /**
        dont count if renderingPostCount is smaller than the
        primary fetch
        */ 
        if(this.getRenderingPostCount() > this.primaryFetchPostsCount){
            return this.getRenderingPostCount() - this.primaryFetchPostsCount
        }
    }

    // get rendering post count 
    getRenderingPostCount = () => {
        return this.defaultPostCount * this.pageCount
    }

    // Fetch Non Sticky Posts 
    fetchOtherPosts = async (postsPerPageCount) => {
        const postCount = await postsPerPageCount
        if(postCount && postCount !== 0){
            const per_page = "&per_page=" + postCount
            const sticky = "&sticky=false"
            const url = this.postUrl + per_page + sticky;
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(res => {
                        // if (this.getRenderingPostCount() >= parseInt(res.headers.get('X-WP-Total'))) {
                        //     this.hideLoadMoreBtn()
                        // }
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
    }

    // get all posts 
    getAllPosts = async (pageCount) => {
        const stickyPosts = await this.fetchStickyPosts(pageCount)
        if(stickyPosts){
            const otherPosts = await this.fetchOtherPosts(this.findSecondaryFetchPerPageCount())
            let data = stickyPosts
            if(otherPosts){
                data = stickyPosts.concat(otherPosts)
            }
            return data
        }
    }
}