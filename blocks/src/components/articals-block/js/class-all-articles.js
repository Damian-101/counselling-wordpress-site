class All_Articles {
    constructor(selectorName, config) {
        this.selectorName = selectorName
        this.config = config
        this.primaryFetchPostsCount = 0
        this.pageCount = 1
        this.postUrl = config.postUrl
        this.domainName = window.location.origin
        this.paginationWraperSelector = "cs_pagination"
        this.pageIncrement = 'load_more'
        this.selectorName = selectorName
        this.showExcerpt = true
        this.infinitScroll = false

        // initialize variables
        this.init()
    }


    init = () => {
        if (this.config.pagination.loadOnScroll) {
            this.infinitScroll = this.config.pagination.loadOnScroll
        }
        if (this.config.showPost.excerpt !== undefined) {
            this.showExcerpt = this.config.showPost.excerpt
        }
        if (this.config.pagination.byButton) {
            this.pageIncrement = this.config.pagination.byButton.pageIncrement
        }
        // add new pagination wraper if defined 
        if (this.config.pagination.paginationSelector) {
            this.paginationWraperSelector = this.config.pagination.paginationSelector
        }
    }

    // hide buttons
    loadPostsButtonsConfig = (value) => {
        if (value) {
            this.infinitScroll = value
        }
        const buttonConfig = this.config.pagination.byButton
        const paginationWraper = document.getElementById(this.paginationWraperSelector)
        //////////Render Buttons/////////////
        // render load more button
        if (!this.infinitScroll || this.infinitScroll === false) {
            const button = document.createElement('button')
            if (buttonConfig.pageIncrement) {
                this.pageIncrement = buttonConfig.pageIncrement
            }
            button.id = this.pageIncrement
            button.className = 'btn-content btn--dark btn--load-more btn--border'
            button.innerText = 'Load More'
            paginationWraper.appendChild(button)

            document.getElementById(this.pageIncrement).addEventListener("click", () => {
                this.pageCount = this.pageCount + 1
                // hide button if increment values ends
                if (this.getRenderingPostCount() >= this.config.allPostCount) {
                    document.getElementById(this.pageIncrement).style.display = "none"
                }
                this.load_posts(this.pageCount)

            })
        }
    }

    loadPostsOnScroll = () => {
        if (this.infinitScroll === true) {
            window.addEventListener("scroll", () => {
                if (this.getRenderingPostCount() <= this.config.allPostCount) {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        this.pageCount = this.pageCount + 1
                        this.load_posts(this.pageCount)
                    }
                }
            })
        }
    }


    //render loading skeleton
    loadArticalSkeleton = () => {
        const articals = document.getElementById(this.selectorName)
        let loadingCount = this.config.postCountPerPage
        if (this.config.allPostCount < this.config.postCountPerPage * this.pageCount) {
            loadingCount = this.config.postCountPerPage
        }
        for (let i = 0; i < loadingCount; i++) {
            let postTitle;
            let postThumbnail;
            let postAuthor;
            let postsCreatedDate;
            let postExcerpt;
            let articleBottom;
            // article wrapper
            const wraper = document.createElement('div')
            wraper.className = 'cs_loading'

            // article link wraper 
            let linkWraper = document.createElement('div')
            linkWraper.className = 'cs-all-articals__artical'
            wraper.appendChild(linkWraper)

            //show post thumbnail image
            if (this.config.showPost.imageThumbnail === true) {
                postThumbnail = document.createElement('div')
                postThumbnail.className = 'cs-all-articals__artical-img skeleton'
                linkWraper.appendChild(postThumbnail);
            }

            //article bottom
            if (this.config.showPost.postTitle === true) {
                articleBottom = document.createElement('div')
                articleBottom.className = 'cs-all-articals__artical-bottom'
                linkWraper.appendChild(articleBottom)
            }

            //show post title
            if (this.config.showPost.postTitle === true) {
                postTitle = document.createElement('h4')
                postTitle.className = 'cs-all-articals__artical-bottom__title skeleton skeleton-text'
                const value = document.createTextNode('skeleton')
                postTitle.appendChild(value)
                articleBottom.appendChild(postTitle);
            }
            //show post excerpt
            if (this.showExcerpt === true) {
                for (let i = 0; i < 4; i++) {
                    postExcerpt = document.createElement('div')
                    postExcerpt.className = 'cs-all-articals__artial-bottom__para skeleton skeleton-para'
                    articleBottom.appendChild(postExcerpt);
                }
            }

            //render post to the dom
            articals.appendChild(wraper)
        }
    }

    //hide loding skeletons
    hideLoadingSkeletons = (loadingArticles, index) => {
        loadingArticles[index].style.display = "none"
        const loadingArticlesArr = Array.from(loadingArticles)
        if (this.config.allPostCount < this.config.postCountPerPage * this.pageCount) {
            loadingArticlesArr.forEach((loadingArticle) => {
                loadingArticle.style.display = "none"
            })
        }
    }



    load_posts = async () => {
        //load skeleton before articles rendering
        this.loadArticalSkeleton()
        const data = await this.getAllPosts()
        const allRenderedArticals = document.getElementsByClassName("cs-all-artical")
        const loadingArticles = document.getElementsByClassName("cs_loading")
        let existingArticals = []
        if (allRenderedArticals) {
            const allRenderedArticalsArr = Array.from(allRenderedArticals)
            allRenderedArticalsArr.map(artical => {
                existingArticals.push(artical.dataset.articalName)
            })
        }
        if (data) {
            data.map((artical, index) => {
                const articals = document.getElementById(this.selectorName)
                const imgObj = artical._embedded["wp:featuredmedia"]
                let postTitle;
                let postThumbnail;
                let postAuthor;
                let postsCreatedDate;
                let postExcerpt;
                let articleBottom
                // article wrapper
                const wraper = document.createElement('div')
                wraper.className = 'cs-all-artical'
                wraper.dataset.articalName = artical.title.rendered
                // article link wraper 
                let linkWraper = document.createElement('a')
                linkWraper.href = artical.link
                linkWraper.className = 'cs-all-articals__link'
                wraper.appendChild(linkWraper)
                //show post thumbnail image
                if (this.config.showPost.imageThumbnail === true && imgObj[0].source_url) {
                    postThumbnail = document.createElement('img')
                    postThumbnail.src = imgObj[0].source_url
                    postThumbnail.alt = imgObj[0].alt_text || ""
                    postThumbnail.className = 'cs-all-articals__artical-img'
                    linkWraper.appendChild(postThumbnail);
                }

                //article bottom
                if (this.config.showPost.postTitle === true || this.showExcerpt) {
                    articleBottom = document.createElement('div')
                    articleBottom.className = 'cs-all-articals__artical-bottom'
                    linkWraper.appendChild(articleBottom)
                }

                //show post title
                if (this.config.showPost.postTitle === true && artical.title.rendered) {
                    postTitle = document.createElement('h4')
                    postTitle.className = 'cs-all-articals__artical-bottom__title'
                    const value = document.createTextNode(artical.title.rendered)
                    postTitle.appendChild(value)
                    articleBottom.appendChild(postTitle);
                }
                //show post excerpt
                if (this.showExcerpt === true && artical.excerpt.rendered) {
                    postExcerpt = document.createElement('h6')
                    postExcerpt.className = 'cs-all-articals__artial-bottom__para'
                    postExcerpt.innerHTML = artical.excerpt.rendered
                    articleBottom.append(postExcerpt);
                }
                //render post to the dom
                if (existingArticals[index] !== artical.title.rendered) {
                    articals.append(wraper)
                }
                this.hideLoadingSkeletons(loadingArticles, index)
            })
        }
    }

    //set articles attributes
    setAttributes = () => {
        const articlesWrapper = document.getElementById('cs_all_articals')
        const infinitScroll = Boolean(parseInt(articlesWrapper.dataset['ininitScroll']))
        const showExcerpt = Boolean(parseInt(articlesWrapper.dataset['showExcerpt']))
        this.infinitScroll = infinitScroll
        this.showExcerpt = showExcerpt
    }

    renderPosts = () => {
        window.addEventListener("load", () => {
            this.setAttributes()
            this.load_posts(this.pageCount)
            this.loadPostsButtonsConfig()
            this.loadPostsOnScroll()
        })
    }

    //Fetch Only Sticky Posts
    fetchStickyPosts = async () => {
        const per_page = "&per_page=" + this.getRenderingPostCount()
        const sticky = "&sticky=true"
        const url = this.domainName + this.postUrl + per_page + sticky;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                        this.primaryFetchPostsCount = data.length
                    } else {
                        this.fetchError = true
                        reject(data.code)
                    }
                })
                .catch(err => {
                    this.fetchError = true
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
        if (this.getRenderingPostCount() > this.primaryFetchPostsCount) {
            return this.getRenderingPostCount() - this.primaryFetchPostsCount
        }
    }

    // get rendering post count 
    getRenderingPostCount = () => {
        return (this.config.postCountPerPage * this.pageCount)
    }

    //load post function to guternbreg
    renderBlockContent = () => {
        const articals = document.getElementById(this.selectorName)
        const button = document.getElementById(this.pageIncrement)
        // remove duplicate values
        if (articals) {
            articals.innerHTML = ""
        }
        if (button) {
            button.remove()
        }
        this.load_posts()
        this.loadPostsButtonsConfig()
        this.loadPostsOnScroll()
    }

    // Fetch Non Sticky Posts 
    fetchOtherPosts = async (articlesNeededCount) => {
        if (articlesNeededCount && articlesNeededCount !== 0) {
            const per_page = "&per_page=" + articlesNeededCount
            const sticky = "&sticky=false"
            const url = this.domainName + this.postUrl + per_page + sticky;
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        if (!data.code) {
                            resolve(data)
                        } else {
                            reject(data.code)
                            this.fetchError = true
                        }
                    })
                    .catch(err => {
                        reject(err)
                        this.fetchError = true
                    })
            })
        }
    }

    // get all posts 
    getAllPosts = async () => {
        const stickyPosts = await this.fetchStickyPosts()
        if (stickyPosts) {
            const otherPosts = await this.fetchOtherPosts(this.findSecondaryFetchPerPageCount())
            let data = stickyPosts
            if (otherPosts) {
                data = stickyPosts.concat(otherPosts)
            }
            return data
        }
    }
}