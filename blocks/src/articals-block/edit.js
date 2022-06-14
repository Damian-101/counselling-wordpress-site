//  :::::::::::::::::ToDo::::::::::::::::::
//  make sure error messeges works
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from "react"
import FullWidthErrorMsg from '../components/full-width-error-msg';
import RenderLoadingScreen from "../components/loadingScreen"
import Sidebar from './customize/sidebar';
import 'react-loading-skeleton/dist/skeleton.css'
import "./scss/index.scss"
import "./js/class-all-articles"
const Edit = (props) => {
    const [isArticlesAdded, setIsArticalsAdded] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchError, setIsFetchError] = useState(false)
    const [fetchErrorMsg, setSetErrorMsg] = useState()
    const [pageCount,setPageCount] = useState(1)
    const postsPerLoadCount = 6
    const blockProps = useBlockProps()

    const postUrl = "/wp-json/wp/v2/posts?_embed"
    const defaultPostCount = 6
    const allPostCount = parseInt(post_count[0].publish)
    const articalsCountInARow = 3
    const loadMoreButtonId = "load_posts"
    const threeColArticals = new All_Articles(postUrl,defaultPostCount,pageCount,allPostCount,articalsCountInARow,loadMoreButtonId)
    // // refetch the api if try again btn clicked 
    // useEffect(() => {
    //     fetchData().then((values) => {
    //         setIsArticalsAdded(true)
    //         setData(values)
    //     }, (reason) => {
    //         setIsFetchError(true)
    //         setSetErrorMsg(reason)
    //         setIsLoading(false)
    //     })
    // }, [refresh])

    const fetchData = async () => {
        const values = await threeColArticals.getAllPosts(pageCount)
        if(values){
            setData(values)
            setIsArticalsAdded(true)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    },[data])

    // const onTryAgain = () => {
    //     setRefresh(!refresh)
    //     setIsLoading(true)
    // }

    const onLoadMoreClick = () => {
        setPageCount(pageCount + 1)
        fetchData()
    }

    //dont show the btn if all post are added

    const renderArticalsUi = () => {
        let articalUi
        if (data) {
            articalUi = data.map((artical,index) => {
                console.log(index,threeColArticals.getRenderingPostCount())
                if (artical &&
                    index <= threeColArticals.getRenderingPostCount() - 1
                    ) 
                {
                    const imgObj = artical._embedded["wp:featuredmedia"]
                    return (
                        <>
                            <div className="cs-all-artical">
                                <a href={artical.link} className="cs-all-articals__link">
                                    <div className="cs-all-articals__artical">
                                        <img src={imgObj[0].source_url} alt={imgObj[0].alt_text} className="cs-all-articals__artical-img" />
                                        <div className="cs-all-articals__artical-bottom">
                                            <h4 className="cs-all-articals__artical-bottom__title">{artical.title.rendered}</h4>
                                            <h6 className="cs-all-articals__artial-bottom__para" dangerouslySetInnerHTML={{__html:artical.excerpt.rendered}}></h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </>
                    )
                }
            })
        }
        return (
            <div className="cs-all-articals-block container">
                <div className="cs-all-articals">
                    {articalUi}
                </div>
                <button class="btn-content btn--dark btn--load-more btn--border" id="load_posts" onClick={onLoadMoreClick}>Load More</button>
            </div>
        )
    }

    //render ui
    const renderUi = () => {
        // display add Artical data
        if (isFetchError === false && isArticlesAdded === false) {
            return (
                <FullWidthErrorMsg
                    errorHeading="articals Not Added"
                    errorMsg={`Before Using This Component You
                                     Need To Add <a href=${customerOptionsPageUrl}>Posts</a>
                                      In the Admin Panel`}
                    errorBtn={['Try Again', onTryAgain]}
                />
            )
        }
        // display fetch error if there a fetch error 
        if (isFetchError === true) {
            return (
                <FullWidthErrorMsg
                    errorHeading="Error When Fetching Data"
                    errorMsg={`We Are Sorry To Here That There's A Error In The Theme.Contact Us With This Error Message So We Can Find
                    What Went Wrong`}
                />
            )
        }
        //display articals
        if (isFetchError === false && isArticlesAdded === true) {
            return (
                <>
                    {renderArticalsUi()}
                </>
            )
        }
    }
    return (
        <>
            <Sidebar props={props} />
            <div {...blockProps}>
                {isLoading ?
                    <RenderLoadingScreen isLoading={isLoading} /> : renderUi()
                }
            </div>
        </>
    )
}

export default Edit
