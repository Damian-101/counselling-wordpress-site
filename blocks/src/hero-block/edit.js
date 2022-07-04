import "./css/index.scss"
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import Sidebar from "./customize/sidebar";
import Toolbar from "./customize/toolbar";
import "../index.scss"
const edit = (props) => {
    const blockprops = useBlockProps()
    const backgroundImage = props.attributes.backgroundImage
    const heroOverlayOpactiy = props.attributes.heroOverlayOpactiy
    const heroHeading = props.attributes.heroHeading
    const subHeading = props.attributes.subHeading
    const textColor = props.attributes.textColor
    const onHeroHeadingChange = (value) => {
        props.setAttributes({ heroHeading: value })
    }
    const onSubHeadingChange = (value) => {
        props.setAttributes({ subHeading: value })
    }
    const TEMPLATE = [
        ["cs/primary-button-block"]
    ]
    return (
        <>
            <Sidebar props={props} />
            <Toolbar props={props} />
            <div {...blockprops}>
                <section class="cm-hero__content" id="cm_hero">
                    <div class="container cm-hero__content-wraper" style={{color:textColor}}>
                        <RichText
                            tagName="h5"
                            value={subHeading}
                            className="cm-sub__heading"
                            onChange={onSubHeadingChange}
                            placeholder="Add Sub Heading"
                        />
                        <RichText
                            tagName="h1"
                            value={heroHeading}
                            className="cm-hero__heading"
                            onChange={onHeroHeadingChange}
                            placeholder="Add Hero Heading"
                        />
                        <InnerBlocks
                            template={TEMPLATE}
                            templateLock="all"
                        />
                    </div>
                    {
                        backgroundImage &&
                        <img src={backgroundImage.url} class="cm-hero_img" />
                    }
                    {/* <img src="http://localhost:7000/wp-content/uploads/2022/04/Mask-3group-min-e1649876622757.png" class="hero__img" /> */}
                    <div class="cm-hero__overlay" style={{ opacity: `${heroOverlayOpactiy}%` }}></div>
                </section>
            </div>
        </>
    )
}

export default edit