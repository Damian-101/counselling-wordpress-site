import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect } from "react"
import "./scss/index.scss"
import Toolbar from "./customize/toolbar"
import Sidebar from './customize/sidebar';
import SelectLayout from '../components/selectLayout';
import layout1 from "./images/leftTextLayout.png"
import layout2 from "./images/rightTextLayout.png"
const edit = (props) => {
    const blockprops = useBlockProps()
    //attributes
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    const layoutName = props.attributes.layoutName
    const TEMPLATE = [
        ['core/paragraph',{placeholder:"Generated Lorem Ipsumpulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in",className:"hello"}],
        ['cs/primary-button-block', { buttonName: "Book A Session",buttonType:"btn--dark" }]
    ]
    //layout config
    const layoutConfig = [
        {name:"layout 1", img:layout1},
        {name:"layout 2", img:layout2}
    ]

    const onLayoutClick = (e) => {
        props.setAttributes({layoutName:e.target.dataset.layout})
    }

    //right text layout UI
    const leftTextLayout = () => {
        return (
            <div className='container'>
                <div className="options-block-lg left-text" style={{ backgroundColor: optionBgColor }} data-option-name="options block lg">
                    <div className="options-block-lg__left" style={{ color: textColor }}>
                        <RichText
                            tagName="h2"
                            placeholder="Option Name"
                            value={optionName}
                            onChange={
                                value => props.setAttributes({ optionName: value })
                            }
                        />
                        <InnerBlocks template={TEMPLATE} templateLock="all" />
                    </div>
                    <div className="options-block-lg__right">
                        {optionImg &&
                            <img src={optionImg.url} alt={optionImg.alt} />
                        }
                    </div>
                </div>
            </div>
        )
    }
    //left text layout UI
    const rightTextLayout = () => {
        return (
            <div className='container'>
                <div className="options-block-lg right-text" style={{ backgroundColor: optionBgColor }} data-option-name="options block lg">
                    <div className="options-block-lg__right">
                        {optionImg &&
                            <img src={optionImg.url} alt={optionImg.alt} />
                        }
                    </div>
                    <div className="options-block-lg__left" style={{ color: textColor }}>
                        <RichText
                            tagName="h2"
                            placeholder="Option Name"
                            value={optionName}
                            onChange={
                                value => props.setAttributes({ optionName: value })
                            }
                        />
                        <InnerBlocks template={TEMPLATE} templateLock="all" />
                    </div>
                </div>
            </div>
        )
    }
    
    const renderUi = () => {
        if(layoutName === undefined){
            return <SelectLayout props={props} layoutConfig={[layoutConfig,onLayoutClick]}/>
        }else if(layoutName && layoutName === "layout 1"){
            return leftTextLayout()
        }else{
            return rightTextLayout()
        }
    }
    return (
        <>
            <Toolbar props={props} layoutConfig={[layoutConfig,onLayoutClick]}/>
            <Sidebar props={props} />
            <div {...blockprops}>
                {renderUi()}
            </div>
        </>
    )
}

export default edit