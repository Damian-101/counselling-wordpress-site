import { InnerBlocks, useBlockProps, RichText, useState } from '@wordpress/block-editor';
const Save = (props) => {
    const data = props.attributes.data
    //attributes
    const showCounselorInfo = props.attributes.showCounselorInfo
    const hideCounselorInfo = props.attributes.hideCounselorInfo
    const renderCounsellorsUi = () => {
        let counsellorUi
        if (data) {
            counsellorUi = data.map(counsellor => {
                return (
                    <div className="swiper-slide">
                        <div className='cs-counsellors__counsellor'>
                            <img src={counsellor.ImgUrl} className="cs-counsellors__counsellor-img" />
                            {showCounselorInfo ?
                                <h5 className="cs-counsellors__counsellor-name">{counsellor.CounselorName}</h5> : <></>
                            }
                            {showCounselorInfo === true && hideCounselorInfo === false ?
                                <h6 className="cs-counsellors__counsellor-qualification">{counsellor.Qualification}</h6> : <></>
                            }
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className="cs-counsellors-block container" id="cs-counsellors-block">
                {/* heading  */}
                <InnerBlocks.Content />
                <div className="cs-counsellors">
                    <div className="swiper-wrapper">
                        {counsellorUi}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {data &&
                renderCounsellorsUi()
            }
        </>
    )
}

export default Save