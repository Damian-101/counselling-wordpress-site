import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from "react"
import FullWidthErrorMsg from '../components/full-width-error-msg';
import RenderLoadingScreen from "../components/loadingScreen"
import Sidebar from './customize/sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./scss/index.scss"
const Edit = (props) => {
    const [isArticlesAdded, setIsArticalsAdded] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchError, setIsFetchError] = useState(false)
    const [fetchErrorMsg, setSetErrorMsg] = useState()
    const [showPostCount,setShowPostCount] = useState(6)
    const [totalPostCount,setTotalPostCount] = useState(0)
    const [allPostsVisible,setAllPostsVisible] = useState(false)
    const postsPerLoadCount = 6
    const blockProps = useBlockProps()
    const customerOptionsPageUrl = "/wp-admin/edit.php"
    const domainName = window.location.origin
    //fetch customer Articals data
    const fetchData = async () => {
        const per_page = "&per_page=" + showPostCount
        const url = domainName + "/wp-json/wp/v2/posts?_embed" + per_page;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => { 
                    setTotalPostCount(res.headers.get('X-WP-Total'))
                    return res.json() 
                })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                        setIsLoading(false)
                    } else {
                        reject(data.code)
                    }
                })
                .catch(err => {
                    reject(err)
                    setIsLoading(false)
                })
        })
    }

    useEffect(() => {
        if(showPostCount >= totalPostCount - 1){
            setAllPostsVisible(true)
        }
    },[totalPostCount])

    useEffect(() => {
        props.setAttributes({ data: data })
    }, [data])

    useEffect(() => {
        fetchData().then((values) => {
            setIsArticalsAdded(true)
            setData(values)
        }, (reason) => {
            setIsFetchError(true)
            setSetErrorMsg(reason)
            setIsLoading(false)
        })
        console.log(showPostCount , totalPostCount)
    }, [showPostCount])

    useEffect(() => {
        fetchData().then((values) => {
            setIsArticalsAdded(true)
            setData(values)
        }, (reason) => {
            setIsFetchError(true)
            setSetErrorMsg(reason)
            setIsLoading(false)
        })
    }, [])

    // refetch the api if try again btn clicked 
    useEffect(() => {
        fetchData().then((values) => {
            setIsArticalsAdded(true)
            setData(values)
        }, (reason) => {
            setIsFetchError(true)
            setSetErrorMsg(reason)
            setIsLoading(false)
        })
    }, [refresh])

    const onTryAgain = () => {
        setRefresh(!refresh)
        setIsLoading(true)
    }
    const onLoadMoreClick = () => {
        if(showPostCount < totalPostCount - 1){
            setShowPostCount(showPostCount + postsPerLoadCount)
        }else if(showPostCount === totalPostCount - 1){
            setShowPostCount(showPostCount + postsPerLoadCount)
            setAllPostsVisible(true)
        }else{
            setAllPostsVisible(true)
        }
    }
    console.log(showPostCount)

    //dont show the btn if all post are added

    const renderArticalsUi = () => {
        let articalUi
        if (data) {
            articalUi = data.map(artical => {
                const imgObj = artical._embedded["wp:featuredmedia"]
                return (
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
                )
            })
        }
        return (
            <div className="cs-all-articals-block container">
                <div className="cs-all-articals">
                    {articalUi}
                </div>
                {allPostsVisible ?
                    "":<button className="btn btn--dark" onClick={onLoadMoreClick}>Load More</button>
                }
                
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