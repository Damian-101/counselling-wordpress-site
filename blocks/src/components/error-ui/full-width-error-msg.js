import DOMPurify from 'dompurify'
import "./scss/full-width-error-msg.scss"
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
                    <button className="btn-content" onClick={props.errorBtn[1]}>{props.errorBtn[0]}</button>
                    {
                        props.errorBtn2 &&
                        <button className="btn-content btn--dark secondary--btn" onClick={props.errorBtn2[1]}>{props.errorBtn2[0]}</button>
                    }
                </div>
            </div>
        )
}

export default FullWidthErrorMsg