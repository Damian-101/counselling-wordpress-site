import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
    const blockProps = useBlockProps.save()
    const oldSavedOptionsCount = props.attributes.oldSavedOptionsCount
    console.log(oldSavedOptionsCount)
    return(
        <div { ...blockProps }>
            <div className='container'>
                <div>{oldSavedOptionsCount}</div>
                <div className='customer-options-block-wraper'>
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    )
}

export default Save