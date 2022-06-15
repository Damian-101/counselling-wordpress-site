//  :::::::::::::::::ToDo::::::::::::::::::
//  add loading screen when a artical is loading
//  refactor the code (loading skeleton)
//  fix the loading skeleton black border issue
//  loading screen color

const postUrl = "/wp-json/wp/v2/posts?_embed"
const defaultPostCount = 6
let pageCount = 1
const allPostCount = parseInt(post_count[0].publish)
const articalsCountInARow = 3
const loadMoreButtonId = "load_posts"
const threeColArticals = new All_Articles(postUrl, defaultPostCount, pageCount, allPostCount, articalsCountInARow, loadMoreButtonId)


//render loading skeleton
const loadArticalSkeleton = (pageCount) => {
    let loadinCount = defaultPostCount
    const articals = document.getElementById("cs_all_articals")
    const str = `<div class="cs_loading">
        <div class="cs-all-articals__artical">
            <div class="cs-all-articals__artical-img skeleton"></div>
            <div class="cs-all-articals__artical-bottom">
                <h4 class="cs-all-articals__artical-bottom__title skeleton skeleton-text">skeleton</h4>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
            </div>
        </div>
</div>`
    if(allPostCount < defaultPostCount * pageCount){
        loadinCount = defaultPostCount
    }
    for (let i = 0; i < loadinCount; i++) {
        articals.innerHTML = articals.innerHTML + str;
    }
}

//hide loding skeletons
const hideLoadingSkeletons = (loadingArticles,index,pageCount) => {
    loadingArticles[index].style.display = "none"
    const loadingArticlesArr = Array.from(loadingArticles)
    if(allPostCount < defaultPostCount * pageCount){
        loadingArticlesArr.forEach((loadingArticle) => {
            loadingArticle.style.display = "none"
        })
    }
}

// get the articals to render
const load_posts = async (pageCount) => {
    //load skeleton before articles rendering
    loadArticalSkeleton(pageCount)
    const data = await threeColArticals.getAllPosts(pageCount)
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
            if(existingArticals[index] !== artical.title.rendered){
                const imgObj = artical._embedded["wp:featuredmedia"]
                const articals = document.getElementById("cs_all_articals")
                const str = 
                `<div class="cs-all-artical" data-artical-name='${artical.title.rendered}'>
                <a href='${artical.link}' class="cs-all-articals__link">
                    <div class="cs-all-articals__artical">
                        <img src='${imgObj[0].source_url}' alt='${imgObj[0].alt_text}' class="cs-all-articals__artical-img" />
                        <div class="cs-all-articals__artical-bottom">
                            <h4 class="cs-all-articals__artical-bottom__title">${artical.title.rendered}</h4>
                            <h6 class="cs-all-articals__artial-bottom__para">${artical.excerpt.rendered}</h6>
                        </div>
                    </div>
                </a>
                </div>`
                //remove loading skeletons
                articals.innerHTML = articals.innerHTML + str;
                hideLoadingSkeletons(loadingArticles,index,pageCount)
            }
        })
    }
}


window.addEventListener("load", () => {
    load_posts(pageCount)
    document.getElementById("load_posts").addEventListener("click", () => {
        pageCount++
        load_posts(pageCount)
    })
})