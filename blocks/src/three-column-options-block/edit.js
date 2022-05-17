import {useBlockProps,InnerBlocks } from "@wordpress/block-editor";
import "./scss/index.scss"
const Edit = () => {
    const blockprops = useBlockProps()
    const TEMPLATE = [
        ["cs/option-block-sm"],
        ["cs/option-block-sm"],
        ["cs/option-block-sm"]
    ]
    return(
        <div {...blockprops}>
            <div className="container">
                <div className="cs-three-column-options-block__content">
                    <InnerBlocks template={TEMPLATE}/>
                </div>
            </div>
        </div>
    )
}

export default Edit