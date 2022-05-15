import {useBlockProps,RichText,InnerBlocks } from "@wordpress/block-editor";
const save = (props) => {
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    const blockProps = useBlockProps.save();
    return(
        <div {...blockProps}>
                <section className="options-block-lg" style={{backgroundColor:optionBgColor}}>
                    <div className="options-block-lg__left" style={{color:textColor}}>
                    <RichText.Content tagName="h2" value={ optionName } />
                    <InnerBlocks.Content/>
                    </div>
                    <div className="options-block-lg__right">
                        {optionImg &&
                            <img src={optionImg.url} alt={optionImg.alt}/>
                        }
                    </div>
                </section>
        </div>
    )
}
export default save