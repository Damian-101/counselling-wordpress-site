const articalsCarousel = () => {
    const articalsSwiper = new Swiper('.cs-articals', {
        slidesPerView: "auto",
        spaceBetween: 20,
    });
    window.addEventListener("resize", () => {
      const articalsSwiper = new Swiper('.cs-articals', {
        slidesPerView: "auto",
        spaceBetween: 20,
    });
    })
  }
  
  
  window.addEventListener("load", () => {
    const frontEndBlockId = document.getElementById("cs-articals-block")
    if(frontEndBlockId){
      articalsCarousel()
    }
  })