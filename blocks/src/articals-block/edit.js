//  :::::::::::::::::ToDo::::::::::::::::::
//  pass attribute values to the front end and render them
import {useBlockProps} from '@wordpress/block-editor';
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
    const blockProps = useBlockProps()
    const domainName = window.location.origin
    const postPageUrl = domainName + '/wp-admin/edit.php'
    //attributes
    const infinitScroll = props.attributes.infinitScroll
    const showExcerpt = props.attributes.showExcerpt
    let articalesConfig = new All_Articles('cs_all_articals',{
        postUrl:"/wp-json/wp/v2/posts?_embed",
        postCountPerPage: 6,
        articalsCountInARow:3,
        allPostCount:parseInt(post_count[0].publish),
        showPost:{
            postTitle:true,
            author:false,
            imageThumbnail:true,
            excerpt:showExcerpt,
            postCreatedDate:true
        },
        pagination:{
            loadOnScroll:infinitScroll,
            byButton:{
                pageIncrement:"next_posts",
            },
        }
    })
    

    useEffect(() => {
        fetchData().then((values) => {
            if(values[0]){
                setData(values)
                setIsArticalsAdded(true)
                setIsLoading(false)
                articalesConfig.renderBlockContent()
            }
            setIsLoading(false)
        }, (reason) => {
            setIsFetchError(true)
            setIsLoading(false)
        })
    },[infinitScroll,showExcerpt,refresh])


    const onTryAgain = () => {
        setRefresh(!refresh)
        setIsLoading(true)
    }


    const fetchData = async () => {
        const values = await articalesConfig.getAllPosts()
        return values
    }


    //dont show the btn if all post are added
    const renderArticalsUi = () => {
        return(
            <>           
            <div class='cs-all-articals-block craft-theme'>
                <div className=''>
                    <div class='cs-all-articals' id="cs_all_articals">
                    </div>
                    <div id="cs_pagination"></div>
                </div>
                {/* <button class="btn-content btn--dark btn--load-more btn--border" id="load_posts">Load More</button> */}
            </div>
            </>
        )
    }

    //render ui
    const renderUi = () => {
        //display add Artical data
        if (isFetchError === false && isArticlesAdded === false) {
            return (
                <FullWidthErrorMsg
                    errorHeading="articals Not Added"
                    errorMsg={`Before Using This Component You
                                     Need To Add <a href=${postPageUrl}>Posts</a>
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
