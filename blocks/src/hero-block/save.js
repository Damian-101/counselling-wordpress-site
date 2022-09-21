import {useBlockProps,RichText,InnerBlocks } from "@wordpress/block-editor";
const save = (props) => {
    const blockProps = useBlockProps.save();
    const backgroundImage = props.attributes.backgroundImage
    const heroOverlayOpactiy = props.attributes.heroOverlayOpactiy
    const heroHeading  = props.attributes.heroHeading
    const subHeading = props.attributes.subHeading
    const textColor = props.attributes.textColor
    return(
        <div {...blockProps}>
            <section class="cm-hero__content craft-theme" id="cm_hero">
                <div class="container cm-hero__content-wraper" style={{color:textColor}}>
                <RichText.Content tagName="h5" className="cm-sub__heading" value={ subHeading } />
                    <RichText.Content tagName="h1" className="cm-hero__heading" value={ heroHeading } />
                    <InnerBlocks.Content/>
                </div>
                {
                    backgroundImage &&
                    <img src={backgroundImage.url} class="cm-hero_img"/>
                }
                <div class="cm-hero__overlay" style={{opacity:`${heroOverlayOpactiy}%`}}></div>
            </section>
        </div>
    )
}

export default save