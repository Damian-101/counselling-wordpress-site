import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';
const Sidebar = ({ props }) => {
    const textColor = props.attributes.textColor
    const onTextColorChange = (value) => {
        props.setAttributes({ textColor: value })
    }
    return (
        <>
            <InspectorControls>
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