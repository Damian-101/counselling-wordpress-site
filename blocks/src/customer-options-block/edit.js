import { useState, useEffect } from "react"
import {useBlockProps,RichText,InnerBlocks } from "@wordpress/block-editor";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/ClipLoader";
import FullWidthErrorMsg from "../components/error-ui/full-width-error-msg"
import "./scss/index.scss"
const Edit = (props) => {
    const [haveOptions, setHaveOptions] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [data, setData] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const [isCustomerOptionsChanged,setIsCustomerOptionsChanged] = useState(false)
    const [optionsCount, setOptionsCount] = useState(undefined)
    const [oldOptionsCount,setOldOptionsCount] = useState(undefined)
    const blockprops = useBlockProps()
    const domainName = window.location.origin
    const customerOptionsPageUrl = domainName + "/wp-admin/edit.php?post_type=customer_option"
    // localStorage.clear()
    console.log(JSON.parse(localStorage.getItem("customerOptions")))
    //attributes
    const oldSavedOptionsCount = props.attributes.oldSavedOptionsCount
    console.log(oldSavedOptionsCount)
    //fetch customer options data
    const fetchData = async () => {
        const url = domainName + "/wp-json/cs/v2/customer_options";
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => { return res.json() })
                .then(data => {
                    resolve(data)
                    setIsLoading(false)
                })
                .catch(err => console.error(err))
        })
    }

    
    useEffect(() => {
        fetchData().then(values => {
            setOptionsInfo(values)
        })
    }, [])

    useEffect(() => {
        fetchData().then(values => {
            setOptionsInfo(values)
        })
    }, [refresh])

    // get existing option count 
    const getOldOptionCount = () => {
        return document.querySelectorAll('[data-option-name]').length
    }

    //check if the options are added in the customer options menu
    const setOptionsInfo = (values) => {
        if (values[0]) {
            setHaveOptions(true)
            setData(values)
            setOptionsCount(values.length)
        } else {
            setHaveOptions(false)
            setData(null)
        }
        // check if the options changed 
        if(oldSavedOptionsCount === 0 && getOldOptionCount() !== values.length){
            if(getOldOptionCount() !== 0){
                setOldOptionsCount(values.length)
            }
            setIsCustomerOptionsChanged(true)
        }
        // if we have old customerOptionsValue saved before
        console.log(oldSavedOptionsCount,values.length)
        if(oldSavedOptionsCount !== 0 && oldSavedOptionsCount !== values.length && getOldOptionCount() !== values.length){
            if(getOldOptionCount() !== 0){
                setOldOptionsCount(values.length)
            }
            setIsCustomerOptionsChanged(true)
        }
    }


    //if optionsCount < 3
    //render data with lg option blocks
    const renderOptionsLayout1 = () => {
        let optionBlockType;
        let template = []
            data.map((option,index) => {
                optionBlockType = "cs/option-block-lg"
                template = [...template,[optionBlockType,{optionName:option.OptionName,optionImg:option.OptionImageUrl}]]
            })
        return template
    }
    //if optionsCount >= 3
    //render sm option blocks + lg options blocks
    const renderOptionsLayout2 = () => {
        let optionBlockType;
        let template = []
            data.map((option,index) => {
                if(index <= 2){
                    optionBlockType = "cs/option-block-sm"
                }else{
                    optionBlockType = "cs/option-block-lg"
                }
                template = [...template,[optionBlockType,{optionName:option.OptionName,optionImg:option.OptionImageUrl}]]
            })
        return template
    }

    //on try again button click
    const onTryAgain = () => {
        setRefresh(!refresh)
        setIsLoading(true)
    }

    // render loading screen 
    const renderLoadingScreen = () => {
        return(
            <div className="container">
                <div className="customer-options-block-content container">
                    <CircleLoader loading={isLoading} size={40} />
                </div>
            </div>
        )
    }
    
    //render error msg if the options changed
    const renderOptionsChangedErrorMsg = () => {
        const onIgnore = () => {
            setIsCustomerOptionsChanged(false)
            setRefresh(!refresh)
            props.setAttributes({oldSavedOptionsCount:oldOptionsCount})
        }
        const onRearrange = () => {
            
        }
        return <FullWidthErrorMsg 
                    errorHeading = "Customer Options Changed" 
                    errorMsg = {`Hey,We found that you changed the customer 
                                options.So if you want to use the changed values hit Rearrange`}
                    errorBtn={['Ignore',onIgnore]}
                    errorBtn2={['Rearrange',onRearrange]}
        />
    }
    // render add customer options error msg if the there isn't any customer options added 
    const renderOptionsLayout = () => {
        if(optionsCount <= 2){
            return renderOptionsLayout1()
        }
        if(optionsCount >= 2){
            return renderOptionsLayout2()
        }
    }

    const renderUi = () => {
        if(optionsCount && data && isCustomerOptionsChanged === true){
            return renderOptionsChangedErrorMsg()
        }
        if(optionsCount && data && isCustomerOptionsChanged === false){
            return(
                <div className="customer-options-block container">
                    <InnerBlocks template={renderOptionsLayout()}/>
                </div>
            )
        }else{
            return <FullWidthErrorMsg 
                        errorHeading = "Customer Options Not Added" 
                        errorMsg = {`Before Using This Component You
                                     Need To Add <a href=${customerOptionsPageUrl}>Customer Options</a>
                                      In the Admin Panel`}
                        errorBtn={['Try Again',onTryAgain]}
                    />
        }
    }
    return (
        <div {...blockprops}>
            {isLoading ?
            renderLoadingScreen():renderUi()
            }
        </div>
    )
}

export default Edit