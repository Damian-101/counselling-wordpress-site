import { ToolbarGroup, ToolbarButton, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Button,ColorPicker  } from '@wordpress/components';
import { color } from '@wordpress/icons';
import { useState, useRef, useEffect } from "react"
const Toolbar = ({ props }) => {
    const [isLinkPopUp, setIsLinkPopUp] = useState(false);
    //attributes
    const optionBgColor = props.attributes.optionBgColor
    const ALLOWED_MEDIA_TYPES = ['image'];
    // get image data 
    const getBackgroundImage = (value) => {
        props.setAttributes({ optionImg: value })
    }

    // open the popover
    const toggleVisible = () => {
        setIsLinkPopUp((state) => !state);
    };

    // on Color Change
    const onColorChange = (value) => {
        props.setAttributes({ optionBgColor: value })
    }

    //close the popover if it isn't selected
    useEffect(() => {
        if (props.isSelected === false) {
            setIsLinkPopUp(false)
        }
    }, [props.isSelected])

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={getBackgroundImage}
                            allowedTypes={ALLOWED_MEDIA_TYPES}
                            render={({ open }) => (
                                <Button onClick={open}>Add Option Image</Button>
                            )}
                        />
                    </MediaUploadCheck>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={color}
                        label="Add Background Color"
                        onClick={toggleVisible}
                    />
                    {isLinkPopUp &&
                        <Popover onClose={toggleVisible}>
                            <ColorPicker
                                color = {optionBgColor}
                                enableAlpha
                                defaultValue="#000"
                                onChange={onColorChange}
                            />
                        </Popover>
                    }
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default Toolbar