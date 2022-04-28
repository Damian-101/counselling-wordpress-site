import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody,RangeControl } from '@wordpress/components';
const HeroSidebar = ({props}) => {
    const heroOverlayOpactiy = props.attributes.heroOverlayOpactiy
    const setOverlayOpacity = (value) => {
        props.setAttributes({heroOverlayOpactiy:value})
    }
    return(
        <>
            <InspectorControls>
                <PanelBody>
                    <RangeControl
                        label="Overlay Opacity"
                        value={heroOverlayOpactiy}
                        onChange={setOverlayOpacity}
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
            </InspectorControls>
        </>
    )
}

export default HeroSidebar