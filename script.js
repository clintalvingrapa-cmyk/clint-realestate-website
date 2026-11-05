
// =================================
// CLINT ALVIN GRAPA ESTATES
// PROPERTY DATABASE
// =================================

const properties = [

    {
        name: "The Modern Residence",
        location: "Cebu City, Philippines",
        type: "sale",
        price: 12500000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
        description: "A beautiful contemporary family home."
    },

    {
        name: "The Garden Villa",
        location: "Dumaguete City, Philippines",
        type: "sale",
        price: 9800000,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
        description: "A peaceful villa with elegant interiors."
    },

    {
        name: "The Luxury Apartment",
        location: "Makati City, Philippines",
        type: "rent",
        price: 45000,
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
        description: "A sophisticated apartment in the city."
    },

    {
        name: "The Contemporary House",
        location: "Manila, Philippines",
        type: "sale",
        price: 8500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 160,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
        description: "A stylish home with modern architecture."
    },

    {
        name: "The Elegant Penthouse",
        location: "Cebu City, Philippines",
        type: "rent",
        price: 65000,
        bedrooms: 3,
        bathrooms: 2,
        area: 145,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
        description: "An elegant city residence with spacious interiors."
    },

    {
        name: "The Heritage Estate",
        location: "Bohol, Philippines",
        type: "sale",
        price: 18500000,
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
        description: "A spacious property for exceptional living."
    }

];


// =================================
// DISPLAY PROPERTY LISTINGS
// =================================

const propertyGrid = document.getElementById("propertyGrid");

function displayProperties(list) {

    propertyGrid.innerHTML = "";

    list.forEach(property => {

        const card = document.createElement("article");

        card.className = "property-card";

        const price = new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            maximumFractionDigits: 0
        }).format(property.price);

        const propertyType =
            property.type === "sale" ? "For Sale" : "For Rent";

        card.innerHTML = `

            <div class="property-image">

                <img src="${property.image}"
                     alt="${property.name}"
                     loading="lazy">

                <span class="property-tag">
                    ${propertyType}
                </span>

            </div>

            <div class="property-info">

                <p class="property-location">
                    ${property.location}
                </p>

                <h3>${property.name}</h3>

                <p class="property-description">
                    ${property.description}
                </p>

                <div class="property-price">
                    ${price}
                    ${property.type === "rent" ? "/ month" : ""}
                </div>

                <div class="property-details">

                    <span>🛏 ${property.bedrooms} Beds</span>

                    <span>♧ ${property.bathrooms} Baths</span>

                    <span>▢ ${property.area} m²</span>

                </div>

                <button class="inquire-button">
                    Inquire About Property →
                </button>

            </div>

        `;

        // =================================
        // GMAIL PROPERTY INQUIRY
        // =================================

        card.querySelector(".inquire-button")
            .addEventListener("click", () => {

                const email = "clintalvingrapa@gmail.com";

                const subject =
                    `Property Inquiry - ${property.name}`;

                const message = `Hello Clint Alvin Grapa Estates,

I am interested in this property:

Property: ${property.name}
Location: ${property.location}
Price: ₱${property.price.toLocaleString()}

I would like to know more details about this property.

Thank you!`;

                const gmailLink =
                    `https://mail.google.com/mail/?view=cm&fs=1` +
                    `&to=${encodeURIComponent(email)}` +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(message)}`;

                window.open(gmailLink, "_blank");

            });

        propertyGrid.appendChild(card);

    });

    document.getElementById("noResults").hidden =
        list.length !== 0;

}


// =================================
// SEARCH FUNCTION
// =================================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", filterProperties);


// =================================
// PROPERTY CATEGORY FILTER
// =================================

const typeFilter = document.getElementById("typeFilter");

typeFilter.addEventListener("change", filterProperties);


// =================================
// PRICE SORTING
// =================================

const sortFilter = document.getElementById("sortFilter");

sortFilter.addEventListener("change", filterProperties);


function filterProperties() {

    const searchTerm = searchInput.value.toLowerCase();

    const selectedType = typeFilter.value;

    const selectedSort = sortFilter.value;

    let filtered = properties.filter(property => {

        const matchesSearch =
            property.name.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm);

        const matchesType =
            selectedType === "all" ||
            property.type === selectedType;

        return matchesSearch && matchesType;

    });


    if (selectedSort === "low") {

        filtered.sort((a, b) => a.price - b.price);

    }

    if (selectedSort === "high") {

        filtered.sort((a, b) => b.price - a.price);

    }

    displayProperties(filtered);

}


// =================================
// MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =================================
// AUTOMATIC COPYRIGHT YEAR
// =================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =================================
// INITIALIZE WEBSITE
// =================================

displayProperties(properties);
