import { useBlockProps, InspectorControls,LinkControl } from '@wordpress/block-editor';
import { PanelBody, RadioControl, TextControl } from '@wordpress/components';



const Sidebar = ({ props, buttonOptions }) => {
    const buttonType = props.attributes.buttonType
    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <RadioControl
                        label="Select Button Type"
                        options={buttonOptions()}
                        onChange={(value) => props.setAttributes({ buttonType: value })}
                        selected={buttonType}
                    />
                </PanelBody>
                <PanelBody>
                {/* <LinkControl
			    /> */}
                </PanelBody>
            </InspectorControls>
        </>
    )
}

export default Sidebar