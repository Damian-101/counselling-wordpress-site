import { Toolbar, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
const HeroSectionToolbar = ({props}) => {
    const ALLOWED_MEDIA_TYPES = ['image'];

    // get image data 
    const getBackgroundImage = (value) => {
        props.setAttributes({backgroundImage:value})
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
                                <Button onClick={open}>Add Hero Image</Button>
                            )}
                        />
                    </MediaUploadCheck>
                </ToolbarGroup>
            </BlockControls>
        </>
    )
}

export default HeroSectionToolbar