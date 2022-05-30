import "./scss/index.scss"
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Toolbar from "./customize/toolbar"
import Sidebar from "./customize/sidebar"
import {useEffect} from "react"
const Edit = (props) => {
    const blockprops = useBlockProps()
    //attributes
    const optionName = props.attributes.optionName
    const optionImg = props.attributes.optionImg
    const optionBgColor = props.attributes.optionBgColor
    const textColor = props.attributes.textColor
    return (
        <>
            <Sidebar props={props} />
            <Toolbar props={props} />
            <div {...blockprops}>
                <div className="sm-option-block-sm__content" data-option-name="options block lg">
                    <div className="sm-option-block-sm__top">
                        {optionImg &&
                            <img src={optionImg.url} />
                        }
                    </div>
                    <div className="sm-option-block-sm__bottom" style={{backgroundColor:optionBgColor,color:textColor}}>
                        <RichText
                            tagName="h4"
                            placeholder="Option Name"
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

export default Edit