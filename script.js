/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

        });


        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       WORK FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.dataset.filter;


            /* Remove active state */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Add active state */

            button.classList.add("active");


            /* Filter projects */

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       YOUTUBE THUMBNAIL AUTO LOAD
    ===================================================== */

    const youtubeLinks =
        document.querySelectorAll(
            ".project-card a.project-link"
        );


    youtubeLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        /* Ignore empty links */

        if (!href) {
            return;
        }


        /* Ignore placeholder links */

        if (
            href.includes("PASTE_") ||
            href === "#"
        ) {
            return;
        }


        let videoId = null;


        /* =================================================
           EXTRACT YOUTUBE VIDEO ID
        ================================================= */

        try {

            const url = new URL(href);

            const hostname =
                url.hostname
                    .replace(/^www\./, "")
                    .toLowerCase();


            /* ---------------------------------------------
               youtu.be/VIDEO_ID
            --------------------------------------------- */

            if (hostname === "youtu.be") {

                videoId =
                    url.pathname
                        .split("/")
                        .filter(Boolean)[0] || null;

            }


            /* ---------------------------------------------
               youtube.com
            --------------------------------------------- */

            else if (
                hostname === "youtube.com" ||
                hostname === "m.youtube.com"
            ) {


                /* YouTube Shorts */

                if (
                    url.pathname.startsWith("/shorts/")
                ) {

                    videoId =
                        url.pathname
                            .split("/shorts/")[1]
                            .split("/")[0];

                }


                /* Normal YouTube video */

                else {

                    videoId =
                        url.searchParams.get("v");

                }

            }


        } catch (error) {

            console.error(
                "Could not read YouTube link:",
                href,
                error
            );

        }


        /* =================================================
           CLEAN VIDEO ID
        ================================================= */

        if (videoId) {

            videoId =
                videoId
                    .split("?")[0]
                    .split("&")[0]
                    .trim();

        }


        /* =================================================
           CREATE THUMBNAIL
        ================================================= */

        if (videoId) {

            const imageContainer =
                link.querySelector(".project-image");


            if (!imageContainer) {
                return;
            }


            /* Prevent duplicate thumbnails */

            if (
                imageContainer.querySelector(
                    ".youtube-thumbnail"
                )
            ) {
                return;
            }


            /* Create image */

            const thumbnail =
                document.createElement("img");


            thumbnail.className =
                "youtube-thumbnail";


            thumbnail.alt =
                "YouTube Video Thumbnail";


            thumbnail.loading =
                "lazy";


            thumbnail.decoding =
                "async";


            /* ---------------------------------------------
               FIRST THUMBNAIL
            --------------------------------------------- */

            thumbnail.src =
                `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;


            /* ---------------------------------------------
               FALLBACK
            --------------------------------------------- */

            thumbnail.onerror = function () {

                /*
                    maxresdefault is not available
                    so use hqdefault.
                */

                if (
                    !this.dataset.fallback
                ) {

                    this.dataset.fallback = "true";

                    this.src =
                        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                }

            };


            /* Add thumbnail FIRST */

            imageContainer.prepend(
                thumbnail
            );

        }

    });


    /* =====================================================
       PLACEHOLDER LINK PROTECTION
    ===================================================== */

    const links =
        document.querySelectorAll("a");


    links.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        if (
            href.includes("PASTE_") ||
            href === "#"
        ) {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    alert(
                        "Add your YouTube or website link here in index.html."
                    );

                }
            );

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".project-card, " +
            ".about-content, " +
            ".about-image, " +
            ".experience-item, " +
            ".skill-card, " +
            ".tool-group, " +
            ".ai-card, " +
            ".design-item, " +
            ".contact-wrapper"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#" ||
                        !document.querySelector(
                            targetID
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();


                    const target =
                        document.querySelector(
                            targetID
                        );


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});