import {useBlockProps,InnerBlocks } from "@wordpress/block-editor";
const Save = () => {
    const blockprops = useBlockProps.save()
    return(
        <div {...blockprops}>
            <div className="container">
                <div className="cs-three-column-options-block__wraper">
                    <InnerBlocks.Content/>
                </div>
            </div>
        </div>
    )
}

export default Save