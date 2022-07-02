import {useBlockProps,RichText,InnerBlocks } from "@wordpress/block-editor";
const Save = () => {
    const blockProps = useBlockProps.save();
    return(
        <div {...blockProps}>
            <InnerBlocks.Content/>
        </div>
    )
}

export default Save