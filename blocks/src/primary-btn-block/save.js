import {useBlockProps, RichText } from '@wordpress/block-editor';
const Save = (props) => {
    const blockProps = useBlockProps.save();
    const buttonName = props.attributes.buttonName
    const buttonType = props.attributes.buttonType
    // redirect settings 
    const opensInNewTab = props.attributes.opensInNewTab
    const url = props.attributes.url
    return(
        <div {...blockProps}>
            <form action={url && url} target = {opensInNewTab ? "__blank" : null}>
                <button className={`btn-content ${buttonType && buttonType}`}>
                    <RichText.Content value={ buttonName } />
                </button>
            </form>
        </div>
    )
}

export default Save