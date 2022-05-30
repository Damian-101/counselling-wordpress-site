import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, ToggleControl } from '@wordpress/components';
import { useState,useEffect } from "react"
const Sidebar = ({ props }) => {
    const textColor = props.attributes.textColor
    const showCounselorInfo = props.attributes.showCounselorInfo
    const hideCounselorInfo = props.attributes.hideCounselorInfo

    useEffect(() => {
        if(showCounselorInfo === false){
            props.setAttributes({ hideCounselorInfo: false })
        }
    },[showCounselorInfo])
    return (
        <>
            <InspectorControls>
                <PanelBody title="Features">
                    <ToggleControl
                        label="Show Counselor Info"
                        checked={showCounselorInfo}
                        onChange={() => {
                            props.setAttributes({ showCounselorInfo: !showCounselorInfo })
                        }}
                    />
                    <ToggleControl
                        label="Hide Only Counselor Qualification"
                        checked={hideCounselorInfo}
                        onChange={() => {
                            props.setAttributes({ hideCounselorInfo: !hideCounselorInfo })
                        }}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    )
}

export default Sidebar