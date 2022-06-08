window.addEventListener("load",() => {
    if (window.innerWidth < 790) {
        const swiper = new Swiper('.cs-counsellors', {
          slidesPerView: "auto",
          spaceBetween: 20,
        });
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth < 790) {
          const swiper = new Swiper('.cs-counsellors', {
            slidesPerView: "auto",
            spaceBetween: 20,
          });
        }
      })
})