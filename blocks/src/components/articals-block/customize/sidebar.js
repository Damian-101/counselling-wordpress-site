import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, ToggleControl } from '@wordpress/components';
import { useState,useEffect } from "react"
const Sidebar = ({ props }) => {
    const infinitScroll = props.attributes.infinitScroll
    const showExcerpt = props.attributes.showExcerpt

    return (
        <>
            <InspectorControls>
                <PanelBody title="Posts Loading Options">
                    <ToggleControl
                        label="Infinit Scroll"
                        checked={infinitScroll}
                        onChange={() => {
                            props.setAttributes({ infinitScroll: !infinitScroll })
                        }}
                    />
                </PanelBody>
                <PanelBody title="Article Options">
                    <ToggleControl
                        label="Show Excerpt"
                        checked={showExcerpt}
                        onChange={() => {
                            props.setAttributes({ showExcerpt: !showExcerpt })
                        }}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    )
}

export default Sidebar