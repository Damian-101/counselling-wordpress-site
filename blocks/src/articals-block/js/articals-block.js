const articalesConfig = new All_Articles('cs_all_articals',{
    postUrl:"/wp-json/wp/v2/posts?_embed",
    postCountPerPage: 6,
    articalsCountInARow:3,
    allPostCount:parseInt(post_count[0].publish),
    showPost:{
        postTitle:true,
        imageThumbnail:true,
        excerpt:true,
    },
    pagination:{
        byButton:{
            pageIncrement:"load_posts",
        },
    }
})


//load posts
articalesConfig.renderPosts()