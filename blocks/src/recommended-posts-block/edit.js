import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from "react"
import FullWidthErrorMsg from '../components/full-width-error-msg';
import RenderLoadingScreen from "../components/loadingScreen"
import Sidebar from './customize/sidebar';
import 'swiper/css';
import "./scss/index.scss"
import SelectItem from '../components/SelectItem';
import Toolbar from './customize/toolbar';
import "./js/add-posts"
const Edit = (props) => {
    const [isArticalsAdded, setIsArticalsAdded] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchError, setIsFetchError] = useState(false)
    const [fetchErrorMsg, setSetErrorMsg] = useState()
    const [postCount,setPostCount] = useState(0)
    //attributes 
    const selectedPosts = props.attributes.selectedPosts
    const selectedItemsCount = props.attributes.selectedItemsCount
    const isArticalsSelected = props.attributes.isArticalsSelected
    const opensInNewTab = props.attributes.opensInNewTab
    const url = props.attributes.url
    console.log(opensInNewTab)
    const blockProps = useBlockProps()
    const customerOptionsPageUrl = "#"
    const domainName = window.location.origin
    const minPostCount = 4
    const TEMPLATE = [
        ["core/heading", { textAlign: "center" }]
    ]

    //fetch customer Articals data
    const fetchData = async () => {
        const url = domainName + "/wp-json/wp/v2/posts?_embed";
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => { return res.json() })
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
        if(selectedItemsCount){
            setPostCount(postCount + selectedItemsCount)
        }
    },[])

    useEffect(() => {
        if(isArticalsSelected && isArticalsSelected === true){
            console.log(postCount)
            setPostCount(selectedItemsCount)
        }
    },[isArticalsSelected])

    useEffect(() => {
        articalsCarousel()
    })

    // save data to the attributes when the data saved 
    useEffect(() => {
        props.setAttributes({ data: data })
    }, [data])

    // set info after fetch 
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
        fetchData().then(values => {
        })
    }, [refresh])


    /////////////////////Event Listners//////////////////////
    // when add posts clicked 
    const onSubmitSelectedItems = () => {
        const selectedItems = document.querySelectorAll('[data-item-selected=true]')
        const selectedItemsArr = Array.from(selectedItems)

        const selectedItemsNames = selectedItemsArr.map(selectedItem => {
            return selectedItem.dataset.selectedItemName
        })
        if (postCount && postCount >= minPostCount) {
            props.setAttributes({ selectedPosts: selectedItemsNames })
            props.setAttributes({ isArticalsSelected: true })
            props.setAttributes({selectedItemsCount:postCount})
        }
    }

    // when click try again
    const onTryAgain = () => {
        setRefresh(!refresh)
        setIsLoading(true)
    }



    ////////////////////////////////////////////////////////
    /////////////////////Artical Ui/////////////////////////
    ////////////////////////////////////////////////////////
    const renderArticalsUi = () => {
        let articalUi
        if (data) {
            articalUi = data.map(artical => {
                const imgObj = artical._embedded["wp:featuredmedia"]
                return selectedPosts.map(selectedPost => {
                    if (selectedPost === artical.title.rendered) {
                        return (
                            <div className="swiper-slide">
                                <a href={artical.link} className="cs-articals__link">
                                    <div className="cs-articals__artical">
                                        <img src={imgObj[0].source_url} alt={imgObj[0].alt_text} className="cs-articals__artical-img" />
                                        <h5 className="cs-articals__artical-artical-title">{artical.title.rendered}</h5>
                                    </div>
                                </a>
                            </div>
                        )
                    }
                })
            })
        }
        return (
            <div className="cs-articals-block container">
                {/* heading  */}
                    <div className="cs-articals-block__top">
                        <InnerBlocks template={TEMPLATE} className="cs-articals cs-heading" templateLock="all" />
                        <div className="cs-articals-block__top-view-all">
                            <a href={url && url} className="cs-articals-block__top-view-all__wraper" target={opensInNewTab && opensInNewTab ? "_blank":"_self"}>
                                <h6 className="cs-articals-block__top-view-all__name">VIEW ALL</h6>
                                <svg className="cs-articals-block__top-view-all__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z"/></svg>
                            </a>
                        </div>
                    </div>
                <div className="cs-articals swiper">
                    <div className="swiper-wrapper">
                        {articalUi}
                    </div>
                </div>
            </div>
        )
    }



    ////////////////////////////////////////////////////////
    ///////////////////select posts ui//////////////////////
    ////////////////////////////////////////////////////////
    const selectPostUi = () => {
        // let articalUi
        let selectedValues = []
        let notSelectedValues = []
        let defaultValues = []

        // filter items by selected or not and push the values to an array
        if (data) {
            data.map((artical) => {
                const imgObj = artical._embedded["wp:featuredmedia"]
                if (selectedPosts && selectedPosts[0]) {
                    selectedPosts.map(postName => {
                        if (postName.toLowerCase() === artical.title.rendered.toLowerCase()) {
                            selectedValues.push(<SelectItem props={props} selectItemProps={{ img: [imgObj[0].source_url, imgObj[0].alt_text, true], name: artical.title.rendered }} setPostCount={setPostCount} postCount={postCount}/>)
                        }
                        notSelectedValues.push(<SelectItem props={props} selectItemProps={{ img: [imgObj[0].source_url, imgObj[0].alt_text, false], name: artical.title.rendered}} setPostCount={setPostCount} postCount={postCount}/>)
                    })
                } else {
                    defaultValues.push(<SelectItem props={props} selectItemProps={{ img: [imgObj[0].source_url, imgObj[0].alt_text, false], name: artical.title.rendered }} setPostCount={setPostCount} postCount={postCount}/>)
                }
            })
        }
        //remove duplicates
        const filteredNotSelectedValues = notSelectedValues.filter((v, i, a) => a.findIndex(v2 => (v2.props.selectItemProps.name === v.props.selectItemProps.name)) === i)
        filteredNotSelectedValues.map((articalHtml, index) => {
            return selectedValues.map((selectedArticalHtml) => {
                if (selectedArticalHtml.props.selectItemProps.name === articalHtml.props.selectItemProps.name) {
                    filteredNotSelectedValues[index] = selectedArticalHtml
                }
            })
        })

        // render selectedPosts by checking if selectedPosts defined or not 
        let selectUi
        if (selectedPosts && selectedPosts[0]) {
            selectUi = filteredNotSelectedValues
        } else {
            selectUi = defaultValues
        }
        return (
            <>
                <div className="select-posts">
                    <h4 className="error-heading">Select Posts To Display</h4>
                    <div className="select-posts__posts">
                        {selectUi}
                    </div>
                    <div className="select-posts__bottom">
                        <h6 className="select-posts__bottom-artical-count">Add {postCount} Articals</h6>
                        <button onClick={onSubmitSelectedItems} className="btn-content btn--dark secondary--btn select-posts__bottom-add-posts">Add Posts</button>
                        {selectedPosts && selectedPosts[0] &&
                            <button onClick={() => {props.setAttributes({isArticalsSelected:true})}} className="btn-content btn--dark secondary--btn select-posts__bottom-cancel">Cancel</button>
                        }
                    </div>
                    {
                        postCount && postCount >= minPostCount ?
                            "" : <h6 className='err'>You Must Select Minimum {minPostCount} Posts</h6>
                    }
                </div>
            </>
        )
    }



    /////////////////////////////////////////////////////
    ///////////////////render ui////////////////////////
    ///////////////////////////////////////////////////
    const renderUi = () => {
        // display add Articals data
        if (isFetchError === false && isArticalsAdded === false) {
            return (
                <FullWidthErrorMsg
                    errorHeading="Articals Not Added"
                    errorMsg={`Before Using This Component You
                                      Need To Add <a href=${customerOptionsPageUrl}>Articals Infomation</a>
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
                    errorMsg={`We Are Sorry To Here That There's A Error In The Theme.Contact Us With This Error Message, So We Can Find
                    What Went Wrong`}
                />
            )
        }

        //display select posts
        if (!selectedPosts && isFetchError === false) {
            return (
                selectPostUi()
            )
        } else if (selectedPosts && !selectedPosts[0] || isArticalsSelected === false && isFetchError === false) {
            return (
                selectPostUi()
            )
        }

        if (isFetchError === true) {
            return (
                <FullWidthErrorMsg
                    errorHeading="Error When Fetching Data"
                    errorMsg={`We Are Sorry To Here That There's A Error In The Theme.Contact Us With This Error Message So We Can Find
                            What Went Wrong`}
                />
            )
        }

        //display Articals
        if (selectedPosts && selectedPosts[0] && isFetchError === false && isArticalsAdded === true && isArticalsSelected === true) {
            return (
                renderArticalsUi()
            )
        }
    }

    return (
        <>
            <Toolbar props={props} />
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