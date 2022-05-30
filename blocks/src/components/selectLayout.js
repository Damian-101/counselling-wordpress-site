import "./scss/index.scss"
import "./scss/select-layout.scss"

const SelectLayout = ({props,layoutConfig}) => {
    //render layouts
    const renderLayouts = () => {
        return layoutConfig[0].map(layout => {
            return (
                <div className="cs-select-layout__layout-1 layout" onClick={layoutConfig[1]} >
                    <img src={layout.img} alt={layout.name} data-layout={layout.name}/>
                    <h6 className="cs-select-layout__layout-name">{layout.name}</h6>
                </div>
            )
        })
    }
    return(
        <>
        <div className="cs-msg-ui cs-select-layout">
            {/* Heading  */}
            <h5 className="cs-select-layout__heading">Full Width Option Block</h5>
            <h6 className="cs-select-layout__sub-heading">Select A Layout</h6>
            {/* Select Options  */}
            {/* layout 1 */}
            <div class="cs-select-layout__select">
                {renderLayouts()}
            </div>  
            {/* Help Link  */}
            <h6 className="cs-select-layout__help-link"><a href="#">Don’t Know What Layout To Use?</a></h6>
        </div>
        </>
    )
}

export default SelectLayout