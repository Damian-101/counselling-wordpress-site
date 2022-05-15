import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import "./scss/index.scss"
import Toolbar from "./customize/toolbar"
import Sidebar from './customize/sidebar';
const edit = (props) => {
    const blockprops = useBlockProps()
    //attributes
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    const TEMPLATE = [
        ['cs/primary-button-block', { buttonName: "Book A Session" }]
    ]
    return (
        <>
        <Toolbar props={props}/>
        <Sidebar props={props}/>
        <div {...blockprops}>
                <section className="options-block-lg" style={{backgroundColor:optionBgColor}}>
                    <div className="options-block-lg__left" style={{color:textColor}}>
                        <RichText
                            tagName="h2"
                            placeholder="Rich Text"
                            value={optionName}
                            onChange={
                                value => props.setAttributes({ optionName: value })
                            }
                        />
                        <InnerBlocks template={TEMPLATE} templateLock="all"/>
                    </div>
                    <div className="options-block-lg__right">
                        {optionImg &&
                            <img src={optionImg.url} alt={optionImg.alt}/>
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default edit