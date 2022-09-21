import {useBlockProps,RichText,InnerBlocks } from "@wordpress/block-editor";
const Save = (props) => {
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    const blockprops = useBlockProps.save();
    return (
        <>
            <div {...blockprops}>
                <div className="sm-option-block-sm__content craft-theme">
                    {!optionImg &&
                        <div className="sm-option-block-sm__top"></div>
                    }
                    {optionImg &&
                            <img src={optionImg.url} className="sm-option-block-sm__top"/>
                    }
                    <div className="sm-option-block-sm__bottom" style={{backgroundColor:optionBgColor,color:textColor}}>
                        <RichText.Content
                            tagName="h4"
                            value={optionName}
                            onChange={
                                value => props.setAttributes({ optionName: value })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Save