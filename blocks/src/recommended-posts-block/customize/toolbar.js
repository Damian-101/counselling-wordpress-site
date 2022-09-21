import { ToolbarGroup, ToolbarButton, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Button, ColorPicker } from '@wordpress/components';
import { selectPostIcon } from '../icons/select-post-icon.svg';
import { useState, useRef, useEffect } from "react"
const Toolbar = ({ props }) => {
    const [isLinkPopUp, setIsLinkPopUp] = useState(false);
    //attributes
    const optionBgColor = props.attributes.optionBgColor
    const opensInNewTab = props.attributes.opensInNewTab
    const url = props.attributes.url
    const title = props.attributes.title 
    const isConfig = props.attributes.isConfig
    // open the popover
    const toggleVisible = () => {
        setIsLinkPopUp((state) => !state);
    };

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
                    <button className="components-button block-editor-block-mover__drag-handle has-icon" onClick={() => {props.setAttributes({isConfig:!isConfig})}}>
                        Select Posts To Show
                    </button>
                </ToolbarGroup>
                <ToolbarGroup>
                    <button className="components-button block-editor-block-mover__drag-handle has-icon" onClick={toggleVisible}>
                        View All Redirect Link
                    </button>
                    {isLinkPopUp &&
                            <Popover onClose={toggleVisible}>
                                <LinkControl
                                    onChange={(value) => {
                                        //set title
                                        props.setAttributes({title:value.url})
                                        // set opensInNewTab 
                                        props.setAttributes({opensInNewTab:value.opensInNewTab})
                                        //set url
                                        props.setAttributes({url:value.url})
                                        //close popover
                                        if(value.url !== url){
                                            toggleVisible()
                                        }
                                    }}
                                    value={{
                                        url:url,
                                        title:title,
                                        opensInNewTab:opensInNewTab
                                    }}
                                    settings={[
                                        {
                                            id: 'opensInNewTab',
                                            title: 'Open in new tab',
                                        },
                                    ]}
                                    suggestionsQuery={{
                                        type: 'post',
                                        subtype: 'page',
                                    }}
                                />
                            </Popover>
                        }
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default Toolbar