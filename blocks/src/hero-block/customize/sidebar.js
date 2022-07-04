import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody,RangeControl,ColorPicker } from '@wordpress/components';
const Sidebar = ({props}) => {
    const heroOverlayOpactiy = props.attributes.heroOverlayOpactiy
    const textColor = props.attributes.textColor
    const setOverlayOpacity = (value) => {
        props.setAttributes({heroOverlayOpactiy:value})
    }
    const onTextColorChange = (value) => {
        props.setAttributes({ textColor: value })
    }
    return(
        <>
            <InspectorControls>
                <PanelBody title="Background">
                    <RangeControl
                        label="Overlay Opacity"
                        value={heroOverlayOpactiy}
                        onChange={setOverlayOpacity}
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
                <PanelBody title="Typography">
                    <label className="sidebar-label">Change Text Color</label>
                    <ColorPicker
                        color={textColor}
                        defaultValue="#000"
                        onChange = {onTextColorChange}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    )
}

export default Sidebar