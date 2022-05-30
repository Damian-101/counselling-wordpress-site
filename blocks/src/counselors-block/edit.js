import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from "react"
import FullWidthErrorMsg from '../components/full-width-error-msg';
import RenderLoadingScreen from "../components/loadingScreen"
import Sidebar from './customize/sidebar';
import "./scss/index.scss"
const Edit = (props) => {
    const [isCounselorAdded, setIsCounselorsAdded] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isFetchError, setIsFetchError] = useState(false)
    const [fetchErrorMsg, setSetErrorMsg] = useState()
    //attributes
    const showCounselorInfo = props.attributes.showCounselorInfo
    const hideCounselorInfo = props.attributes.hideCounselorInfo

    const blockProps = useBlockProps()
    const customerOptionsPageUrl = "#"
    const domainName = window.location.origin
    const TEMPLATE = [
        ["core/heading", { textAlign: "center" }]
    ]

    //fetch customer counselors data
    const fetchData = async () => {
        const url = domainName + "/wp-json/cs/v2/counsellor";
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => { return res.json() })
                .then(data => {
                    if (!data.code) {
                        resolve(data)
                        setIsLoading(false)
                    } else {
                        reject(data.code)
                    }
                })
                .catch(err => {
                    reject(err)
                    setIsLoading(false)
                })
        })
    }


    useEffect(() => {
        props.setAttributes({data:data})
    },[data])

    useEffect(() => {
        fetchData().then((values) => {
            setIsCounselorsAdded(true)
            setData(values)
        }, (reason) => {
            setIsFetchError(true)
            setSetErrorMsg(reason)
            setIsLoading(false)
        })
    }, [])

    // refetch the api if try again btn clicked 
    useEffect(() => {
        fetchData().then(values => {
        })
    }, [refresh])

    const onTryAgain = () => {
        setRefresh(!refresh)
        setIsLoading(true)
    }


    const renderCounsellorsUi = () => {
        let counsellorUi
        if (data) {
            counsellorUi = data.map(counsellor => {
                return (
                    <div className='cs-counsellors__counsellor'>
                        <img src={counsellor.ImgUrl} className="cs-counsellors__counsellor-img" />
                        {showCounselorInfo ?
                            <h5 className="cs-counsellors__counsellor-name">{counsellor.CounselorName}</h5>:<></>
                        }
                        {showCounselorInfo === true && hideCounselorInfo === false ?
                            <h6 className="cs-counsellors__counsellor-qualification">{counsellor.Qualification}</h6>:<></>
                        }
                    </div>
                )
            })
        }
        return (
            <div className="cs-counsellors-block container">
                {/* heading  */}
                <InnerBlocks template={TEMPLATE} className="cs-counsellors cs-heading" />
                <div className="cs-counsellors">
                    {counsellorUi}
                </div>
            </div>
        )
    }

    //render ui
    const renderUi = () => {
        // display add counselor data
        if (isFetchError === false && isCounselorAdded === false) {
            return (
                <FullWidthErrorMsg
                    errorHeading="Counsellors Not Added"
                    errorMsg={`Before Using This Component You
                                     Need To Add <a href=${customerOptionsPageUrl}>Counsellors Infomation</a>
                                      In the Admin Panel`}
                    errorBtn={['Try Again', onTryAgain]}
                />
            )
        }
        // display fetch error if there a fetch error 
        if (isFetchError === true) {
            return (
                <FullWidthErrorMsg
                    errorHeading="Error When Fetching Data"
                    errorMsg={`We Are Sorry To Here That There's A Error In The Theme.Contact Us With This Error Message So We Can Find
                    What Went Wrong`}
                />
            )
        }
        //display counsellors
        if (isFetchError === false && isCounselorAdded === true) {
            return (
                renderCounsellorsUi()
            )
        }
    }
    return (
        <>
            <Sidebar props={props}/>
            <div {...blockProps}>
                {isLoading ?
                    <RenderLoadingScreen isLoading={isLoading} /> : renderUi()
                }
            </div>
        </>
    )
}

export default Edit