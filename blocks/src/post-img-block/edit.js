import "./scss/index.scss"
import { select, subscribe } from '@wordpress/data';
import {useBlockProps} from '@wordpress/block-editor';
import { useState,useEffect } from 'react';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import Toolbar from "./customize/toolbar";
const edit = (props) => {
    const [thumbnailImgError,setThumbnailImageError] = useState()
    const [thumbnailImageUrl,setThumbnailImageUrl] = useState()
    const [isImageDefined,setIsImageDefined] = useState()
    const blockProps = useBlockProps()
    const thumbnailImg = props.attributes.thumbnailImg
    const img = props.attributes.img
    const ALLOWED_MEDIA_TYPES = ['image'];

    // reset all image attributes 
    const resetAllArticleImage = () => {
        props.setAttributes({thumbnailImg:false})
        props.setAttributes({img:undefined})
    }

    subscribe( () => {
        // get post thumbnail 
        const getEditedPostAttribute = select('core/editor').getEditedPostAttribute( 'featured_media' );
        const media = getEditedPostAttribute 
                    ? wp.data.select('core').getMedia( getEditedPostAttribute ) : null;
        if(media && media !== null){
            setThumbnailImageUrl(media)
            setIsImageDefined(true)
        }
        if(media === null){
            setIsImageDefined(false)
        }
      });
 
      useEffect(() => {
        if(isImageDefined === false){
            props.setAttributes({thumbnailImg:false})
        }
      },[isImageDefined])

    // on add thumbnail image click 
    const onAddThumbnailImg = () => {
        if(thumbnailImageUrl !== undefined){
            props.setAttributes({thumbnailImg:true})
        }else{
            setThumbnailImageError('Thumbnail Image Not Added')
        }
    }

    // On image selected set attributes and disable thumbnail image
    const onImageSelect = (value) => {
        props.setAttributes({ img: value })
        //remove thumbnail image
        props.setAttributes({thumbnailImg:false})
    }

    const selectImgUi = () => {
        return(
            <div className='cs-msg-ui'>
                <h4>Article Image</h4>
                <p className="cs-msg-ui__description">Choose A Image From Custom Or Featured Image</p>
                <div className="cs-msg-ui__button-wraper">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onImageSelect}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            render={({ open }) => (
                                <button className="cs-msg-ui__primary-btn" onClick={open}>Add Image</button>
                            )}
                        />
                    </MediaUploadCheck>
                    <button className="cs-msg-ui__secondary-btn" onClick={onAddThumbnailImg}>Add Thumbnail Image</button>
                </div>
                {thumbnailImgError &&
                    <h6 className="err">{thumbnailImgError}</h6>
                }
            </div>
        )
    }

    // add image to the ui 
    const articleImageUi = () => {
        // if Thumbnail Image Url still loading add skeleton 
        if(!thumbnailImageUrl){
            return <div className="cs-article-img skeleton"></div>
        }
        if(thumbnailImg === true && thumbnailImageUrl && thumbnailImageUrl !== null){
            return <img src={thumbnailImageUrl.source_url} alt={thumbnailImageUrl.alt_text} className="cs-article-img skeleton"/>
        }else if (img && thumbnailImg === false){
            return <img src={img.url} alt={img.alt} className="cs-article-img"/>
        }
    }
 
    const renderUi = () => {
        //if no thumbnail image or image added show add image ui
        if(thumbnailImg === false && img === undefined){
            return selectImgUi()
        }else{
            return articleImageUi()
        }
    }
    

    //add thumbnail image
    //add image
    return(
        <div {...blockProps}>
            <Toolbar props={props} resetAllArticleImage={resetAllArticleImage}/>
            {renderUi()}
        </div>
    )
}

export default edit