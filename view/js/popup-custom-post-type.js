const fetchPosts = (popUpLinkType) => {
    const domainName = window.location.origin
    const per_page = "&per_page=" + post_count[0].publish
    let url = domainName + '/wp-json/wp/v2/pages'
    if(popUpLinkType === 'post'){
        url = domainName + '/wp-json/wp/v2/posts?_embed' + per_page
    }
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
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * Render Input type accourdingly
 */

const addValue = async (popUpLinkType) => {
    const redirectButton = document.getElementById('cs_redirect_button_link')
    const posts = await fetchPosts(popUpLinkType)
    if(redirectButton){
        const selectTag = document.createElement("option");
        selectTag.innerText = 'Select A Option'
        redirectButton.appendChild(selectTag)
        if(posts){
            posts.map(post => {
                const selectTag = document.createElement("option");
                selectTag.innerText = post.title.rendered
                selectTag.value = post.link
                redirectButton.appendChild(selectTag)
            })
        }
    }
}


const inputType = (popUpLinkType) => {
    /**
     * Add The Placeholder html
     */
    const redirectButtonWraper = document.getElementById('cs_redirect_button_link_wraper')
    const redirectButton = document.getElementById('cs_redirect_button_link')
    if(redirectButtonWraper){
        if (popUpLinkType === 'link') {
            const selectTag = document.createElement("input");
            selectTag.id = 'cs_redirect_button_link'
            selectTag.type = 'text'
            selectTag.className="regular-text"
            redirectButtonWraper.replaceChild(selectTag, redirectButton)
        }
        if (popUpLinkType === 'page') {
            const selectTag = document.createElement("select");
            selectTag.id = 'cs_redirect_button_link'
            selectTag.className="regular-text"
            redirectButtonWraper.replaceChild(selectTag, redirectButton)
            addValue(popUpLinkType)
        }
        if (popUpLinkType === 'post') {
            const selectTag = document.createElement("select");
            selectTag.id = 'cs_redirect_button_link'
            selectTag.className="regular-text"
            redirectButtonWraper.replaceChild(selectTag, redirectButton)
            addValue(popUpLinkType)
        }
    }


    // const posts = await fetchPosts()
    /**
     * Add Values
     */

}

window.addEventListener('load', () => {
    const popUpLinkType = document.getElementById('popup_redirect_url_type_select')
    if (popUpLinkType) {
        inputType(popUpLinkType.value)
        popUpLinkType.addEventListener('change', (e) => {
            console.log(e.target.value)
            inputType(e.target.value)
        })
    }
})
//feach posts
//show posts
// if()