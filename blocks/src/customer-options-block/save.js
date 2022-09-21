import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
    const blockProps = useBlockProps.save()
    const oldSavedOptionsCount = props.attributes.oldSavedOptionsCount
    return(
        <div { ...blockProps }>
                <div>{oldSavedOptionsCount}</div>
                <div className='customer-options-block-wraper craft-theme'>
                    <InnerBlocks.Content />
                </div>
        </div>
    )
}

export default Save