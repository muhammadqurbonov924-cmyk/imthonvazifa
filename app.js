let allCountries = [];

const countriesContainer = document.getElementById("countriesContainer");
const searchInput = document.getElementById("searchInput");
const loadingElement = document.getElementById("loading");

async function getCountries() {
  try {
    let response = await fetch(
      "https://countries-api-steel-theta.vercel.app/api/countries",
    );

    if (!response.ok) {
      throw new Error("API bilan bog'lanishda xatolik yuz berdi");
    }

    let result = await response.json();

    allCountries = Array.isArray(result) ? result : result.data || [];

    loadingElement.style.display = "none";
    displayCountries(allCountries);
  } catch (error) {
    loadingElement.textContent =
      "Ma'lumotlarni yuklab bo'lmadi. Konsolni (F12) tekshiring!";
    loadingElement.style.color = "red";
    console.error("Xatolik tafsiloti:", error);
  }
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  if (!countries || countries.length === 0) {
    countriesContainer.innerHTML = `<p class="no-results">Hech qanday davlat topilmadi!</p>`;
    return;
  }

  countries.forEach((country) => {
    const name = country.name?.common || country.name || "Noma'lum";
    const flag =
      country.flags?.png ||
      country.flag ||
      country.flags?.svg ||
      "https://via.placeholder.com/300x180?text=No+Flag";
    const capital = Array.isArray(country.capital)
      ? country.capital[0]
      : country.capital || "Mavjud emas";
    const population = country.population
      ? country.population.toLocaleString()
      : "Noma'lum";
    const region = country.region || "Noma'lum";

    const card = document.createElement("div");
    card.classList.add("country-card");

    card.innerHTML = `
      <img class="flag-img" src="${flag}" alt="${name} bayrog'i" loading="lazy">
      <div class="country-info">
        <h2 class="country-title">${name}</h2>
        <p><span>Poytaxt:</span> ${capital}</p>
        <p><span>Aholi:</span> ${population}</p>
        <p><span>Mintaqa:</span> ${region}</p>
      </div>
    `;

    countriesContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();

  const filteredCountries = allCountries.filter((country) => {
    const countryName = (
      country.name?.common ||
      country.name ||
      ""
    ).toLowerCase();
    return countryName.includes(searchTerm);
  });

  displayCountries(filteredCountries);
});

getCountries();
