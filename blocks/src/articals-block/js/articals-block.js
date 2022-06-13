//  :::::::::::::::::ToDo::::::::::::::::::
//  fetch posts ::::DONE
//  group sticky posts and other posts separately :::DONE
//  render sticky posts at the top ::::DONE
//  add load more functionaly ::::DONE
//  make existing post count before load more dynamic ::::DONE
//  add loading screen when a artical is loading
//  refactor the code
// postUrl,defaultPostCount,pageCount,allPostCount

const postUrl = "/wp-json/wp/v2/posts?_embed"
const defaultPostCount = 6
const pageCount = 1
const allPostCount = parseInt(post_count[0].publish)
const articalsCountInARow = 3
const threeColArticals = new All_Articles(postUrl,defaultPostCount,pageCount,allPostCount,articalsCountInARow)

const hideLoadMoreBtn = () => {
    document.getElementById("load_posts").style.display = "none"
}

// remove old hidden articals if exists
const oldArticalsCleanup = () => {
    const hiddenArticals = document.getElementsByClassName("hide-artical")
    const hiddenArticalsArr = Array.from(hiddenArticals)
    if(hiddenArticalsArr[0]){
        hiddenArticalsArr.map(hiddenArtical => {
            hiddenArtical.style.display = "block"
        })
    }
}


//render loading skeleton
const loadArticalSkeleton = () => {
    const articals = document.getElementById("cs_all_articals")
    const str = `<div class="cs-all-artical">
        <div class="cs-all-articals__artical">
            <img class="cs-all-articals__artical-img skeleton" />
            <div class="cs-all-articals__artical-bottom">
                <h4 class="cs-all-articals__artical-bottom__title skeleton skeleton-text">skeleton</h4>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
                <div class="cs-all-articals__artial-bottom__para skeleton skeleton-para"></div>
            </div>
        </div>
</div>`
    articals.innerHTML = articals.innerHTML + str;
}


const load_posts = async (pageCount) => {
    const data = await threeColArticals.getAllPosts(pageCount)
    const allRenderedArticals = document.getElementsByClassName("cs-all-artical")
    const firstLoadedArticalsHtml = document.getElementsByClassName("added_first")
    let existingArticals = []
    if (allRenderedArticals) {
        const allRenderedArticalsArr = Array.from(allRenderedArticals)
        allRenderedArticalsArr.map(artical => {
            existingArticals.push(artical.dataset.articalName)
        })
    }

    if (data) {
        data.map((artical, index) => {
            if (artical &&
                index > firstLoadedArticalsHtml.length - 1 &&
                existingArticals[index] !== artical.title.rendered && 
                index <= threeColArticals.getRenderingPostCount() - 1
                ) 
            {
                const imgObj = artical._embedded["wp:featuredmedia"]
                const articals = document.getElementById("cs_all_articals")
                const str = `<div class="cs-all-artical" data-artical-name='${artical.title.rendered}'>
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
                articals.innerHTML = articals.innerHTML + str;
            }
        })
    }
}


window.addEventListener("load", () => {
    let pageCount = 0
    if(threeColArticals.getRenderingPostCount() === threeColArticals.defaultPostCount){
        pageCount = 1
    }
    document.getElementById("load_posts").addEventListener("click", () => {
        pageCount++
        load_posts(pageCount)
    })
})