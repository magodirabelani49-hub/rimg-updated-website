/* =========================================================
   RIMG TRADING REWARDS
   Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const mobileNav =
    document.getElementById("mobileNav");

  if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener("click", function () {

      const isOpen =
        mobileNav.classList.toggle("active");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      mobileMenuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    /* Close mobile menu after clicking a link */

    const mobileLinks =
      mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        mobileNav.classList.remove("active");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileMenuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });

  }


  /* =======================================================
     RIMG REWARD CALCULATOR
     ======================================================= */

  const categoryButtons =
    document.querySelectorAll(".category-button");

  const lotSizeInput =
    document.getElementById("lotSize");

  const calculateButton =
    document.getElementById("calculateButton");

  const cashbackAmount =
    document.getElementById("cashbackAmount");

  const cashbackDescription =
    document.getElementById("cashbackDescription");


  /*
   * RIMG cashback rates
   *
   * Forex Pair = $7 per lot
   * Indices    = $70 per lot
   * Gold       = $7 per lot
   */

  const rates = {
    forex: {
      name: "Forex Pair",
      rate: 7
    },

    indices: {
      name: "Indices",
      rate: 70
    },

    gold: {
      name: "Gold",
      rate: 7
    }
  };


  let selectedCategory = "forex";


  /* =======================================================
     FORMAT MONEY
     ======================================================= */

  function formatMoney(amount) {

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

  }


  /* =======================================================
     CALCULATE REWARD
     ======================================================= */

  function calculateReward() {

    if (!lotSizeInput) {
      return;
    }

    let lotSize =
      parseFloat(lotSizeInput.value);


    /*
     * Prevent invalid values
     */

    if (
      isNaN(lotSize) ||
      lotSize < 0.01
    ) {

      lotSize = 0.01;

      lotSizeInput.value =
        "0.01";
    }


    /*
     * Round to two decimal places.
     * This keeps values such as 0.019
     * from producing unexpected results.
     */

    lotSize =
      Math.round(lotSize * 100) / 100;


    const category =
      rates[selectedCategory];


    const cashback =
      lotSize * category.rate;


    if (cashbackAmount) {

      cashbackAmount.textContent =
        formatMoney(cashback);

    }


    if (cashbackDescription) {

      cashbackDescription.textContent =
        `${category.name} at ${formatMoney(category.rate)} per lot`;

    }

  }


  /* =======================================================
     CATEGORY BUTTONS
     ======================================================= */

  categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      /*
       * Remove active state
       * from every category.
       */

      categoryButtons.forEach(function (item) {

        item.classList.remove("active");

      });


      /*
       * Activate selected category.
       */

      button.classList.add("active");


      /*
       * Store selected category.
       */

      selectedCategory =
        button.dataset.category;


      /*
       * Recalculate immediately.
       */

      calculateReward();

    });

  });


  /* =======================================================
     LIVE CALCULATION
     ======================================================= */

  if (lotSizeInput) {

    lotSizeInput.addEventListener(
      "input",
      calculateReward
    );

    lotSizeInput.addEventListener(
      "change",
      calculateReward
    );

  }


  /* =======================================================
     CALCULATE BUTTON
     ======================================================= */

  if (calculateButton) {

    calculateButton.addEventListener(
      "click",
      calculateReward
    );

  }


  /* =======================================================
     INITIAL CALCULATION
     ======================================================= */

  calculateReward();

});
