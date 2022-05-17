import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import {useEffect} from "react"
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

    const attributes = {optionName:optionName,optionImg:optionImg,optionBgColor:optionBgColor,textColor:textColor}

    // set attributes to localStorage 
    useEffect(() => {
        let customerOptions = JSON.parse(localStorage.getItem('customerOptions'))
        if(customerOptions){
            customerOptions = [...customerOptions,attributes]
        }else{
            customerOptions = [attributes]
        }
        localStorage.setItem('customerOptions',JSON.stringify(customerOptions))
    },[optionName,optionImg,optionBgColor,textColor])

    const TEMPLATE = [
        ['cs/primary-button-block', { buttonName: "Book A Session" }]
    ]
    return (
        <>
        <Toolbar props={props}/>
        <Sidebar props={props}/>
        <div {...blockprops}>
            <div className='container'>
                <div className="options-block-lg" style={{backgroundColor:optionBgColor}} data-option-name="options block lg">
                    <div className="options-block-lg__left" style={{color:textColor}}>
                        <RichText
                            tagName="h2"
                            placeholder="Option Name"
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
                </div>
            </div>
        </div>
        </>
    )
}

export default edit