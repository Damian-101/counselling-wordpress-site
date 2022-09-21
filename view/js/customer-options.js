//show popup 
const showPopup = () => {
    document.getElementById("iframe").classList.toggle("dis-none")
    document.getElementById("overlay").classList.toggle("dis-none")
}

//close popup 
const closePopUp = () => {
    //remove overlay
    console.log("click")
    document.getElementById("overlay").classList.add("dis-none")
    //remove iframe
    document.getElementById("iframe").classList.add("dis-none")
}

//insert popup
const insertPopup = () => {
    //get iframe insert location
    const iframeInsertLocation = document.getElementById("wpbody")
    //get overlay insert location
    const overlayInsertLocation = document.getElementById("wpwrap")
    const prevImg = document.getElementById("prevImg")
    if(prevImg && iframeInsertLocation){
        iframeInsertLocation.innerHTML = '<div class="iframe-wraper dis-none" id="iframe"><iframe src="media-upload.php?type=image&amp;TB_iframe=true" class="popup-media-iframe"></iframe></div>' + iframeInsertLocation.innerHTML
    }
    if(prevImg && overlayInsertLocation){
        overlayInsertLocation.innerHTML = '<div class="overlay dis-none" id="overlay"></div>' + overlayInsertLocation.innerHTML
    }
}

//get image url
jQuery(document).ready(function($) {
    window.send_to_editor = function(html) {
        imgurl = jQuery(html).attr('src')
            insertImage(imgurl)
        closePopUp()
    }
})

// alert("j")
const insertImage = (imgurl) => {
    console.log(imgurl)
    if(imgurl){
        // image placeholder
        document.getElementById("prevImg").style.backgroundImage = `url(${imgurl})`
        // hidden input
        document.getElementById("imgUrl").value = imgurl
    }
}

// alert('hello')

//add open add media popup
const onAddMediaClick = (e) => {
    e.preventDefault()
    console.log("click")
    showPopup()
}

//on overlay click 
const onOverlayClick = (e) => {
    e.preventDefault()
    closePopUp()
}

//run when dom content loaded
window.addEventListener("DOMContentLoaded",() => {
    insertPopup()
    const overlay = document.getElementById("overlay")
    if(overlay){
        overlay.addEventListener("click",onOverlayClick)
    }
    const addImgBtn = document.getElementById("addImg")
    if(addImgBtn){
        addImgBtn.addEventListener("click",onAddMediaClick)
    }
})
