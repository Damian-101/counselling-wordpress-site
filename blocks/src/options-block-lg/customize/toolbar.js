import { ToolbarGroup, ToolbarButton, Popover } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Button, ColorPicker } from '@wordpress/components';
import { color, layout } from '@wordpress/icons';
import { useState, useEffect } from "react"
const Toolbar = ({ props, layoutConfig }) => {
    const [isLinkPopUp, setIsLinkPopUp] = useState(false);
    const [isLayoutPopUp, setIsLayoutPopUp] = useState(false);
    //attributes
    const optionBgColor = props.attributes.optionBgColor
    const layoutName = props.attributes.layoutName
    const ALLOWED_MEDIA_TYPES = ['image'];
    // get image data 
    const getBackgroundImage = (value) => {
        props.setAttributes({ optionImg: value })
    }

    // open the popover
    const toggleVisibleLinkPopup = () => {
        setIsLinkPopUp((state) => !state);
    };

    // open the popover
    const toggleVisibleLayoutPopup = () => {
        setIsLayoutPopUp((state) => !state);
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

    //render layouts
    const renderLayouts = () => {
        return layoutConfig[0].map(layout => {
            if(layoutName && layoutName !== layout.name){
                console.log(layoutName , layout.name)
                return (
                    <div className="cs-select-layout__layout-1 layout">
                        <img src={layout.img} alt={layout.name} data-layout={layout.name} onClick={layoutConfig[1]}/>
                        <h2 className="cs-select-layout__layout-name">{layout.name}</h2>
                    </div>
                )   
            }else{
                return (
                    <div className="cs-select-layout__layout-1 layout">
                        <img src={layout.img} alt={layout.name} data-layout={layout.name} className='layout--selected'/>
                        <h2 className="cs-select-layout__layout-name">{layout.name + " :"}<span className="cs-select-layout__layout-name__selected"> Selected</span></h2>
                    </div>
                ) 
            }
        })
    }
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
                        onClick={toggleVisibleLinkPopup}
                    />
                    {isLinkPopUp &&
                        <Popover onClose={toggleVisibleLinkPopup}>
                            <ColorPicker
                                color={optionBgColor}
                                enableAlpha
                                defaultValue="#000"
                                onChange={onColorChange}
                            />
                        </Popover>
                    }
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={layout}
                        label="Add Background Color"
                        onClick={toggleVisibleLayoutPopup}
                    />
                    {isLayoutPopUp &&
                        <Popover onClose={toggleVisibleLayoutPopup}>
                            <div className="cs-select-layout__layouts__popup">
                                {renderLayouts()}
                            </div>
                        </Popover>
                    }
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default Toolbar