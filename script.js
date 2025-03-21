
// const navbar = document.getElementById("navbar");
// let inactivityTimeout;
// let lastScrollPosition = 0;
// let isScrolling = false;
// // Function to hide the navbar
// const hideNavbar = () => {
//     // Only hide the navbar if it is not in its original position
//     if (!isInOriginalPosition()) {
//         navbar.classList.add("hidden");
//     }
// };
// // Function to show the navbar
// const showNavbar = () => {
//     navbar.classList.remove("hidden");
// };
// // Check if the navbar is in its original position
// const isInOriginalPosition = () => {
//     return window.scrollY === 0;
// };
// // Event listener for scroll events
// window.addEventListener("scroll", () => {
//     // Show the navbar on scroll
//     showNavbar();
//     // Detect if scrolling is happening
//     if (!isScrolling) {
//         isScrolling = true;
//     }
//     // Clear the inactivity timeout
//     clearTimeout(inactivityTimeout);
//     // Set a new timeout to hide the navbar after 2 seconds of inactivity
//     inactivityTimeout = setTimeout(() => {
//         if (!isScrolling) {
//             hideNavbar();
//         }
//     }, 700);
//     // Update scroll position to determine scroll direction
//     lastScrollPosition = window.scrollY;
//     // Reset scrolling state after a delay
//     setTimeout(() => {
//         isScrolling = false;
//     }, 100);
// });
// // Event listener for mouse movement or key presses
// document.addEventListener("mousemove", () => {
//     showNavbar();
//     clearTimeout(inactivityTimeout);
//     inactivityTimeout = setTimeout(hideNavbar, 2000);
// });
// document.addEventListener("keydown", () => {
//     showNavbar();
//     clearTimeout(inactivityTimeout);
//     inactivityTimeout = setTimeout(hideNavbar, 2000);
// });
// // Initial inactivity timeout
// inactivityTimeout = setTimeout(hideNavbar, 2000);




document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    let inactivityTimeout;
    let lastScrollPosition = 0;
    let isScrolling = false;

    // Function to hide the navbar
    const hideNavbar = () => {
        if (!isInOriginalPosition()) {
            navbar.classList.add("hidden");
        }
    };

    // Function to show the navbar
    const showNavbar = () => {
        navbar.classList.remove("hidden");
    };

    // Check if the navbar is in its original position
    const isInOriginalPosition = () => {
        return window.scrollY === 0;
    };

    // Update navbar transparency based on scroll position
    const updateNavbarTransparency = () => {
        if (isInOriginalPosition()) {
            navbar.classList.remove("scrolled"); // Solid color at top
        } else {
            navbar.classList.add("scrolled"); // Semi-transparent when scrolled
        }
    };

    // Event listener for scroll events
    window.addEventListener("scroll", () => {
        showNavbar();
        updateNavbarTransparency(); // Update transparency on scroll

        if (!isScrolling) {
            isScrolling = true;
        }

        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            if (!isScrolling) {
                hideNavbar();
            }
        }, 700);

        lastScrollPosition = window.scrollY;

        setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Event listener for mouse movement or key presses
    document.addEventListener("mousemove", () => {
        showNavbar();
        updateNavbarTransparency(); // Ensure transparency updates
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(hideNavbar, 2000);
    });

    document.addEventListener("keydown", () => {
        showNavbar();
        updateNavbarTransparency(); // Ensure transparency updates
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(hideNavbar, 2000);
    });

    // Initial setup
    updateNavbarTransparency();
    inactivityTimeout = setTimeout(hideNavbar, 2000);
});


// Dark mode toggle functionality
const toggleDark = document.getElementById('toggleDark');
// Toggle dark mode and update UI/localStorage
function updateDarkMode(isDark) {
    document.body.classList.toggle('dark', isDark);
    toggleDark.innerHTML = isDark
        ? '<i class="fa-solid fa-lightbulb"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
}
// Check saved preference or fallback to system preference
const savedMode = localStorage.getItem('darkMode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateDarkMode(savedMode === 'true' || (savedMode === null && prefersDark));
// Toggle on click
toggleDark.addEventListener('click', () => updateDarkMode(!document.body.classList.contains('dark')));



//about section slide in
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                aboutSection.classList.toggle("visible", entry.isIntersecting);
            });
        },
        { threshold: 0.1 }
    );
    observer.observe(aboutSection);
});



// certificate modal
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".c-item img");
    const modal = document.getElementById("imageModal");
    const enlargedImg = document.getElementById("enlargedImg");
    // Open modal on image click
    images.forEach(img => {
        img.addEventListener("click", function () {
            enlargedImg.src = this.getAttribute("data-large"); // Use data-large for source
            modal.style.display = "flex"; // Show modal
        });
    });
    // Close modal on click anywhere
    modal.addEventListener("click", function () {
        modal.style.display = "none"; // Hide modal
    });
});



//filter and search functionality
document.addEventListener("DOMContentLoaded", () => {
    const toggleFilter = document.getElementById("toggleFilter");
    const filterButtons = document.getElementById("filterButtons");
    const searchInput = document.getElementById("searchInput");
    const projectItems = document.querySelectorAll(".project-item");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    let isExpanded = false;
    const initialVisibleCount = 3;    
    // Initialize all projects as visible by default
    projectItems.forEach(project => project.classList.add("visible"));
    // Function to update project visibility
    const updateProjectVisibility = () => {
        let visibleCount = 0;
        const totalVisibleProjects = Array.from(projectItems).filter(project => project.classList.contains("visible")).length;
        projectItems.forEach(project => {
            const isVisible = project.classList.contains("visible");
            const withinLimit = isExpanded || visibleCount < initialVisibleCount;

            if (isVisible && withinLimit) {
                project.classList.remove("hidden");
                visibleCount++;
            } else {
                project.classList.add("hidden");
            }
        });
        // Update button text and visibility
        viewMoreBtn.textContent = isExpanded ? "View Less" : "View More";
        viewMoreBtn.style.display = totalVisibleProjects > initialVisibleCount ? "inline-block" : "none";
    };
    // Initially hide projects beyond the first 3
    projectItems.forEach((project, index) => {
        if (index >= initialVisibleCount) {
            project.classList.add("hidden");
        }
    });
    // Toggle View More/View Less
    viewMoreBtn.addEventListener("click", () => {
        console.log("View More button clicked!");
        isExpanded = !isExpanded;
        updateProjectVisibility();
    });
    // Toggle filter buttons visibility
    toggleFilter.addEventListener("click", () => {
        filterButtons.classList.toggle("hidden");
    });
    // Filtering functionality
    filterBtns.forEach(button => {
        button.addEventListener("click", () => {
            filterBtns.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterCategory = button.dataset.filter;
            projectItems.forEach(project => {
                const matchesFilter = filterCategory === "all" || project.dataset.category === filterCategory;
                project.classList.toggle("visible", matchesFilter);
                // Don't toggle hidden here, let updateProjectVisibility handle it
            });
            updateProjectVisibility();
        });
    });
    // Search functionality
    searchInput.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        projectItems.forEach(project => {
            const projectName = project.dataset.name.toLowerCase();
            const projectCategory = project.dataset.category.toLowerCase();
            const matchesSearch = projectName.includes(searchText) || projectCategory.includes(searchText);
            project.classList.toggle("visible", matchesSearch);
            // Don't toggle hidden here, let updateProjectVisibility handle it
        });
        updateProjectVisibility();
    });
    // Initial visibility update
    updateProjectVisibility();
});



document.addEventListener("DOMContentLoaded", () => {
    const videoLink = document.querySelector(".video-link");
    const modal = document.getElementById("videoModal");
    const video = modal.querySelector("video source");
    const downloadLink = modal.querySelector(".video-download");

    videoLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        const videoPath = videoLink.getAttribute("data-video");
        video.setAttribute("src", videoPath);
        downloadLink.setAttribute("href", videoPath);
        downloadLink.setAttribute("download", "My_Video.mp4"); // Optional custom filename
        modal.style.display = "flex";
        modal.querySelector("video").load(); // Reload video with new source
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});