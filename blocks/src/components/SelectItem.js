import { useState,useEffect } from "react"
import "../components/scss/select-item.scss"
const SelectItem = ({ props,selectItemProps,setPostCount,postCount }) => {
    const [isSelected, setIsSelected] = useState(false)
    //attributes 
    const selectedPosts = props.attributes.selectedPosts
    const selectedItemsCount = props.attributes.selectedItemsCount

    useEffect(() => {
        setIsSelected(selectItemProps.img[2])
    },[])
    const onToggleSelectClick = () => {
        setIsSelected(!isSelected)
        if(isSelected === false){
            setPostCount(postCount + 1)
        }else if(postCount >= 1){
            setPostCount(postCount - 1)
        }
    }


    return (
        <div className="select-item" onClick={onToggleSelectClick}>
            <img className="select-item__img" src={selectItemProps.img[0]} alt={selectItemProps.img[1]}/>
            <div className="select-item__name">{selectItemProps.name}</div>
            <div className={`select-item__icon`} style={{opacity:isSelected === true ? 100:0}} data-item-selected={isSelected} data-selected-item-name={selectItemProps.name}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" className="select-item__icon-bg"/>
                    <path d="M8 12.2222L10.8571 15L16 10" stroke="white" />
                </svg>
            </div>
        </div>
    )
}

export default SelectItem