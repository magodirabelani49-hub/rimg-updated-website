console.log("RIMG website loaded successfully.");document.addEventListener("DOMContentLoaded", () => {

    console.log("RIMG website loaded successfully.");

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach((faq) => {
                faq.classList.remove("active");
            });

            // Open selected item
            if (!isActive) {
                item.classList.add("active");
            }

        });

    });

});