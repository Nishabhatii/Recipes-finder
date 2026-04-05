const recipeList = document.getElementById("recipeList");
const searchBox = document.getElementById("searchBox");

function getRecipes() {
  const query =
    document.getElementById("searchInput").value.trim().toLowerCase() || "chicken";

  recipeList.innerHTML = "Loading...";

  fetch(`https://dummyjson.com/recipes`)
    .then(res => res.json())
    .then(data => {
      const filtered = data.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        recipeList.innerHTML = `<p class="error">No recipes found</p>`;
        return;
      }

      let html = "";

      filtered.slice(0, 5).forEach(recipe => {
        html += `
          <div class="recipe-card">
            <img src="${recipe.image}">
            <div class="content">
              <h4>${recipe.name}</h4>
              <a href="#" onclick='showRecipe(${JSON.stringify(recipe.instructions)})'>
                View Recipe
              </a>
            </div>
          </div>
        `;
      });

      recipeList.innerHTML = html;
    });
}

/* 🔥 Hide search when recipe opens */
function showRecipe(instructions) {
  searchBox.style.display = "none";

  recipeList.innerHTML = `
    <div class="recipe-detail">
      <h3>Recipe Steps</h3>
      <ul>
        ${instructions.map(step => `<li>${step}</li>`).join("")}
      </ul>
      <button class="back-btn" onclick="resetSearch()">⬅ Back</button>
    </div>
  `;
}

/* 🔥 Show search again */
function resetSearch() {
  searchBox.style.display = "flex";
  recipeList.innerHTML = "";
  document.getElementById("searchInput").value = "";
}