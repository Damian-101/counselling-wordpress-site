import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
const save = (props) => {
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    const layoutName = props.attributes.layoutName
    const blockProps = useBlockProps.save();

    //left text layout
    const leftTextLayout = () => {
        return (
            <section className="options-block-lg left-text craft-theme" style={{ backgroundColor: optionBgColor }}>
                <div className="options-block-lg__left" style={{ color: textColor }}>
                    <RichText.Content tagName="h2" value={optionName} />
                    <InnerBlocks.Content />
                </div>
                {!optionImg &&
                    <div className="options-block-lg__right"></div>
                }
                {optionImg &&
                    <img src={optionImg.url} alt={optionImg.alt} className="options-block-lg__right"/>
                }
            </section>
        )
    }

    //right text layout
    const rightTextLayout = () => {
        return (
            <section className="options-block-lg right-text craft-theme" style={{ backgroundColor: optionBgColor }}>
                    {!optionImg &&
                        <div className="options-block-lg__right"></div>
                    }
                    {optionImg &&
                        <img src={optionImg.url} alt={optionImg.alt} className="options-block-lg__right"/>
                    }
                <div className="options-block-lg__left" style={{ color: textColor }}>
                    <RichText.Content tagName="h2" value={optionName} />
                    <InnerBlocks.Content />
                </div>
            </section>
        )
    }
    
    const renderUi = () => {
        if(layoutName && layoutName === "layout 1"){
            return leftTextLayout()
        }else{
            return rightTextLayout()
        }
    }
    return (
        <div {...blockProps}>
            {renderUi()}
        </div>
    )
}
export default save