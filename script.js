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
        { threshold: 0.2 }
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


//project search and filter functionality
// document.addEventListener("DOMContentLoaded", () => {
//     const toggleFilter = document.getElementById("toggleFilter");
//     const filterButtons = document.getElementById("filterButtons");
//     const searchInput = document.getElementById("searchInput");
//     const projectItems = document.querySelectorAll(".project-item");
//     const filterBtns = document.querySelectorAll(".filter-btn");

//     // Toggle filter buttons visibility
//     toggleFilter.addEventListener("click", () => {
//         filterButtons.classList.toggle("hidden");
//     });

//     // Filtering functionality
//     filterBtns.forEach(button => {
//         button.addEventListener("click", () => {
//             filterBtns.forEach(btn => btn.classList.remove("active"));
//             button.classList.add("active");

//             const filterCategory = button.dataset.filter;
//             projectItems.forEach(project => {
//                 if (filterCategory === "all" || project.dataset.category === filterCategory) {
//                     project.classList.remove("hide");
//                 } else {
//                     project.classList.add("hide");
//                 }
//             });
//         });
//     });

//     // Search functionality
//     searchInput.addEventListener("input", (e) => {
//         const searchText = e.target.value.toLowerCase();

//         projectItems.forEach(project => {
//             const projectName = project.dataset.name.toLowerCase();
//             const projectCategory = project.dataset.category.toLowerCase();

//             if (projectName.includes(searchText) || projectCategory.includes(searchText)) {
//                 project.classList.remove("hide");
//             } else {
//                 project.classList.add("hide");
//             }
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const toggleFilter = document.getElementById("toggleFilter");
    const filterButtons = document.getElementById("filterButtons");
    const searchInput = document.getElementById("searchInput");
    const projectItems = document.querySelectorAll(".project-item");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    let isExpanded = false;
    const initialVisibleCount = 3;

    // Debugging: Check if viewMoreBtn exists
    // if (!viewMoreBtn) {
    //     console.error("View More button not found in the DOM!");
    //     return;
    // }

    // Initialize all projects as visible by default
    projectItems.forEach(project => project.classList.add("visible"));

    // Function to update project visibility
    const updateProjectVisibility = () => {
        let visibleCount = 0;
        const totalVisibleProjects = Array.from(projectItems).filter(project => project.classList.contains("visible")).length;

        // Debugging: Log current state
        // console.log(`Total visible projects: ${totalVisibleProjects}, Expanded: ${isExpanded}`);

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

        // Debugging: Log visible count and button state
        // console.log(`Visible count: ${visibleCount}, Button display: ${viewMoreBtn.style.display}`);
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