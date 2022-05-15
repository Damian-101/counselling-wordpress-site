import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = () => {
    const blockProps = useBlockProps.save()
    return(
        <div { ...blockProps }>
            <div className='container'>
                <div className='customer-options-block-wraper'>
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    )
}

export default Save