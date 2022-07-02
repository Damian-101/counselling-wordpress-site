import { ToolbarGroup, ToolbarButton, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Button,ColorPicker  } from '@wordpress/components';
import { color } from '@wordpress/icons';
import { useState, useRef, useEffect } from "react"
const Toolbar = ({ props,resetAllArticleImage }) => {
    const thumbnailImg = props.attributes.thumbnailImg
    const img = props.attributes.img
    const onReplaceImage = () => {
        resetAllArticleImage()
    }
    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <Button onClick={onReplaceImage}>Replace Image</Button>
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default Toolbar