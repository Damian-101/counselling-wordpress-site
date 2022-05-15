import DOMPurify from 'dompurify'
const FullWidthErrorMsg = (props) => {
        const sanitizedErrorMsg = () => ({
            __html:DOMPurify.sanitize(props.errorMsg)
        })
        return(
            <div className="container">
                <div className="full-width-error-msg">
                    <h3 className="error">Error !</h3>
                    <h4 className="error-heading">
                        {props.errorHeading}
                        {/* Customer Options Not Added */}
                    </h4>
                    <h6 className="error-msg" dangerouslySetInnerHTML={sanitizedErrorMsg()}/>
                    <button className="btn-content" onClick={props.errorBtnClick}>Try Again</button>
                </div>
            </div>
        )
}

export default FullWidthErrorMsg