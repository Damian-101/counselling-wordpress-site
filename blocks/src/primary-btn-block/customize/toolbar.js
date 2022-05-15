import { Toolbar, ToolbarButton, ToolbarGroup, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { formatBold, formatItalic, link } from '@wordpress/icons';
import { useState,useRef,useEffect } from "react"
const BtnToolbar = ({ props }) => {
    const [isLinkPopUp, setIsLinkPopUp] = useState(false);
    //attributes
    const opensInNewTab = props.attributes.opensInNewTab
    const url = props.attributes.url
    const title = props.attributes.title

    // open the popover
    const toggleVisible = () => {
        setIsLinkPopUp((state) => !state);
    };

    //close the popover if it isn't selected
    useEffect(() => {
        if(props.isSelected === false){
            setIsLinkPopUp(false)
        }
    },[props.isSelected])

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <ToolbarButton icon={link} label="Link" onClick={toggleVisible}/>
                        {isLinkPopUp &&
                            <Popover onClose={toggleVisible}>
                                <LinkControl
                                    onChange={(value) => {
                                        //set title
                                        props.setAttributes({title:value.url})
                                        console.log(value.title,title)
                                        // set opensInNewTab 
                                        props.setAttributes({opensInNewTab:value.opensInNewTab})
                                        //set url
                                        props.setAttributes({url:value.url})

                                        console.log(value)
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
                    </MediaUploadCheck>
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default BtnToolbar