//  :::::::::::::::::ToDo::::::::::::::::::
//  Refactor code if needed
const articalesConfig = new All_Articles('cs_all_articals',{
    postUrl:"/wp-json/wp/v2/posts?_embed",
    postCountPerPage: 6,
    articalsCountInARow:3,
    allPostCount:parseInt(post_count[0].publish),
    showPost:{
        postTitle:true,
        // author:false,
        imageThumbnail:true,
        excerpt:true,
        // postCreatedDate:true
    },
    pagination:{
        // loadOnScroll:true,
        byButton:{
            pageIncrement:"load_posts",
        },
    }
})


//load posts
articalesConfig.renderPosts()