document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");
    let currentPageIndex = 0;

    function navigateToPage(index) {
        if (index < 0 || index >= pages.length) return;

        const direction = index > currentPageIndex ? 'left' : 'right';
        pages[currentPageIndex].classList.remove('active');
        pages[currentPageIndex].classList.add(direction);

        pages[index].classList.remove(direction);
        pages[index].classList.add('active');
        currentPageIndex = index;
    }

    navLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            navigateToPage(index);
        });
    });

    navigateToPage(0); // Set initial page
});
