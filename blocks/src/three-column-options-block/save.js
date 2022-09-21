import {useBlockProps,InnerBlocks } from "@wordpress/block-editor";
const Save = () => {
    const blockprops = useBlockProps.save()
    return(
        <div {...blockprops}>
            <div className="cs-three-column-options-block__wraper craft-theme">
                <InnerBlocks.Content/>
            </div>
        </div>
    )
}

export default Save