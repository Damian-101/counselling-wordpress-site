import CircleLoader from "react-spinners/ClipLoader";
import "./scss/loading-screen.scss";
const RenderLoadingScreen = ({ props, isLoading }) => {
    return (
        <div className="container">
            <div className="cs-block loading-screen container">
                <CircleLoader loading={isLoading} size={40} />
            </div>
        </div>
    )
}

export default RenderLoadingScreen