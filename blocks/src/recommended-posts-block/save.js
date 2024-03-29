import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
const Save = (props) => {
    //attributes 
    const selectedArticals = props.attributes.selectedArticals
    const opensInNewTab = props.attributes.opensInNewTab
    const selectedPosts = props.attributes.selectedPosts
    const selectedItemsCount = props.attributes.selectedItemsCount
    const url = props.attributes.url
    const blockProps = useBlockProps.save();
    console.log(typeof (opensInNewTab))
    ////////////////////////////////////////////////////////
    /////////////////////Artical Ui/////////////////////////
    ////////////////////////////////////////////////////////
    const renderArticalsUi = () => {
        if (selectedArticals) {
            return (
                <div className="cs-articals-block craft-theme" id="cs-articals-block">
                        {/* heading  */}
                        <div className="cs-articals-block__top">
                            <InnerBlocks.Content />
                            <div className="cs-articals-block__top-view-all">
                                <a href={url && url} className="cs-articals-block__top-view-all__wraper" target={opensInNewTab ? "_blank" : "_self"} rel={opensInNewTab ? "noopener" : ''}>
                                    <h6 className="cs-articals-block__top-view-all__name">VIEW ALL</h6>
                                    <svg className="cs-articals-block__top-view-all__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z" /></svg>
                                </a>
                            </div>
                        </div>
                        <div className="cs-articals swiper">
                            <div className="swiper-wrapper">
                                {selectedArticals}
                            </div>
                        </div>
                </div>
            )
        }
    }
    return (
        <div {...blockProps}>
        </div>
    )
}
export default Save