import {useBlockProps, RichText } from '@wordpress/block-editor';
import "./scss/index.scss"
import Sidebar from './customize/sidebar';
import {useEffect,useState} from "react"
import themeButtons from "../../classes/themeButtons"
import BtnToolbar from './customize/toolbar';
const Edit = (props) => {
    //buttons
    const buttonLight = new themeButtons("btn--light", "Button Light")
    const buttonDark = new themeButtons("btn--dark", "Button Dark")
    const buttons = [buttonLight, buttonDark]
    // props 
    const blockprops = useBlockProps()
    const buttonName = props.attributes.buttonName
    const buttonType = props.attributes.buttonType

    const onButtonNameChange = (value) => {
        props.setAttributes({ buttonName: value })
    }

    const AddButtonOptions = () => {
        let buttonOptions = []
        buttons.map(button => {
            buttonOptions.push({label:button.getButtonName(),value:button.getClassName()})
        })
        return buttonOptions
    }

    //close the popover

    return (
        <div {...blockprops}>
        <BtnToolbar props = {props}/>
        <Sidebar props = {props} buttonOptions = {AddButtonOptions}/>
            <button className={`btn-content btn-editor ${buttonType && buttonType} craft-theme`}>
                <RichText
                    value={buttonName}
                    placeholder="Button Name"
                    onChange={onButtonNameChange}
                    allowedFormats={[]}
                />
            </button>
        </div>
    )
}

export default Edit