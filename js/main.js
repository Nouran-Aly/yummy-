// rows
const myRow = document.querySelector("#myRow")
const detailsRow = document.querySelector("#detailsRow")
const searchRow = document.querySelector("#searchRow")
const categoriesRow = document.querySelector("#categoriesRow")
const areasRow = document.querySelector("#areasRow")
const ingredientsRow = document.querySelector("#ingredientsRow")

// sections
const mainMealsSection = document.querySelector("#mainMeals")
const detailsSection = document.querySelector("#detailsSection")
const searchSection = document.querySelector("#searchSection")
const categoriesSection = document.querySelector("#categoriesSection")
const areasSection = document.querySelector("#areasSection")
const ingredientSection = document.querySelector("#ingredientSection")
const formSection = document.querySelector("#formSection")


// search
let nameInput = document.querySelector("#nameSearch")
let letterInput = document.querySelector("#letterSearch")


// loading screen
$(window).on('load', function () {
    $('#loading-screen').fadeOut('slow', function () {
        $('#main-content').fadeIn('slow');
    });
});

// sidebar
$(document).ready(function () {
    $('#toggle-sidebar').click(function () {
        if ($('#sidebar').css('left') === '-280px') {
            $('#sidebar').css('left', '0');
            $('#main-content').css('margin-left', '280px');
            $('#container').css('margin-left', '160px');
            $('#bar').toggleClass("d-none")
            $('#close').toggleClass("d-none", "d-flex")

        } else {
            $('#sidebar').css('left', '-280px');
            $('#main-content').css('margin-left', '0');
            $('#close').toggleClass("d-none")
            $('#bar').toggleClass("d-none", "d-flex")
        }
    });
});

// HOME SECTION API
async function getData() {
    const api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    const response = await api.json()
    mealsContainer = response.meals
    displayMainMeal(mealsContainer)
    console.log(mealsContainer);

    searchSection.classList.add("d-none")
    formSection.classList.add("d-none")
}
getData()


// DISPLAY HOME SECTION API DATA
function displayMainMeal(mealsContainer) {
    let cartoona = "";
    for (let i = 0; i < mealsContainer.length; i++) {
        cartoona += `
                    <div class="col-md-3 col-lg-offset-2">
                        <div class="card position-relative" onclick=detailsApi("${mealsContainer[i].idMeal}") data-index=${mealsContainer[i].idMeal}>
                            <img src="${mealsContainer[i].strMealThumb}" class="w-100" alt="">
                            <div class="layer">
                                <p class="text-dark fw-bold d-flex align-items-center p-2 fs-3 h-100">
                                    ${mealsContainer[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
        `
    }
    myRow.innerHTML = cartoona;

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener('click', function (e) {
            myRow.classList.add("d-none")
            detailsRow.classList.remove("d-none")
        })
    })
}

// MEAL DETAILS API
async function detailsApi(mealId) {
    const detailedApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const detailsResponse = await detailedApi.json();
    let details = detailsResponse.meals
    displayMealInDetails(details)
}

function displayMealInDetails(mealsContainer) {

    let detailsContainer = "";
    for (let i = 0; i < mealsContainer.length; i++) {

        // ingredient list
        let ingredientsList = "";
        for (let j = 1; j <= 20; j++) {
            let ingredient = mealsContainer[i][`strIngredient${j}`];
            if (ingredient) {
                ingredientsList += `<li>${ingredient}</li> `;
            }
        }

        // display list
        detailsContainer += `
                        <div class="col-md-4 text-white">
                            <div class="cards" >
                                <img src="${mealsContainer[i].strMealThumb}" class="w-100" alt="">
                            </div>
                            <h3>${mealsContainer[i].strMeal}</h3>
                        </div>
                        <div class="col-md-8 text-white">
                            <h3>Instructions</h3>
                            <p>${mealsContainer[i].strInstructions}</p>
                            <h3>Area: <span>${mealsContainer[i].strArea}</span></h3>
                            <h3>Category: <span>${mealsContainer[i].strCategory}</span></h3>
                            <div class="recipes">
                                <h3>Recipes:</h3>
                                <ul class="d-flex flex-wrap gap-3 py-4">
                                   ${ingredientsList}
                                </ul>
                            </div>
                            <div class="tags">
                                <h3>tags</h3>
                                <ul class="d-flex flex-wrap gap-3 py-4">
                                 <li>   ${mealsContainer[i].strTags} </li>
                                </ul>
                            </div>
                            <a href="${mealsContainer[i].strSource}" class="btn btn-success">Source</a>
                            <a href="${mealsContainer[i].strYoutube}" class="btn btn-danger">Youtube</a>
                        </div>
                    `
        detailsRow.innerHTML = detailsContainer;
    }
}

// search
document.querySelector("#search").addEventListener("click", function () {
    myRow.classList.add("d-none")
    searchSection.classList.replace("d-none", "d-block")
})

nameInput.addEventListener("input", function (e) {
    let searchInput = nameInput.value
    console.log(searchInput);
    nameSearchApi(searchInput)
})

// search by name
async function nameSearchApi(searchInput) {
    let searchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    let searchResponse = await searchApi.json()
    let nameApi = searchResponse.meals
    console.log(nameApi);
    displayNameSearch(nameApi)
}

letterInput.addEventListener("input", function () {
    let letter = letterInput.value
    letterSearchApi(letter)
})

// search by letter
async function letterSearchApi(letter) {
    let letterSearchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let lettersSearchResponse = await letterSearchApi.json()
    let letterApi = lettersSearchResponse.meals
    console.log(letterApi);
    displayNameSearch(letterApi)
}

function displayNameSearch(nameApi) {
    let cartoona = "";
    for (let i = 0; i < nameApi.length; i++) {
        cartoona += `
                    <div class="col-md-3 col-lg-offset-2">
                        <div class="card position-relative searchCard" onclick=detailsApi("${nameApi[i].idMeal}")>
                            <img src="${nameApi[i].strMealThumb}" class="w-100" alt="">
                            <div class="layer">
                                <p class="text-dark fw-bold d-flex align-items-center p-2 fs-3 h-100">
                                    ${nameApi[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
        `
    }
    searchRow.innerHTML = cartoona;

    document.querySelectorAll(".searchCard").forEach(card => {
        card.addEventListener("click", function () {
            categoriesSection.classList.add("d-none")
            myRow.classList.remove("d-none")
            detailsRow.classList.add("d-none")
        })
    })
}

// categories
let categories = document.querySelector("#categories")
categories.addEventListener("click", function () {
    myRow.classList.add("d-none")
    searchSection.classList.add("d-none")
    detailsRow.classList.add("d-none")
    // $('#categoriesSection').removeClass("d-none").addClass("d-block")
    // mainMealsSection.addClass("d-none")
    // detailsSection.addClass("d-none")
    // searchSection.addClass("d-none")
    // areasSection.addClass("d-none")
    // ingredientSection.addClass("d-none")
    // formSection.addClass("d-none")

    $('#searchSection').addClass("d-none")


    catApi()
})

async function catApi() {
    let cat = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let catResponse = await cat.json()
    let finalCat = catResponse.categories
    CategoryDisplay(finalCat)
    console.log(finalCat);
}

function CategoryDisplay(finalCat) {
    let catCartoona = ""
    for (let i = 0; i < finalCat.length; i++) {
        catCartoona += `
                    <div class="col-md-3 col-lg-offset-2">
                        <div class="card position-relative catCard"  onclick=categoriesListApi("${finalCat[i].strCategory}") data-index=${finalCat[i].idMeal} >
                            <img src="${finalCat[i].strCategoryThumb}" class="w-100" alt="">
                            <div class="layer d-flex flex-column text-center">
                                <h3 class="text-dark p-3 " id="stringCat">
                                    ${finalCat[i].strCategory}</h3>
                                 <p class="text-dark p-3">
                                    ${finalCat[i].strCategoryDescription}</p>
                            </div>                                                  
                        </div>
                    </div>
        `
    }
    categoriesRow.innerHTML = catCartoona;
    document.querySelectorAll(".catCard").forEach(card => {
        card.addEventListener("click", function (e) {
            // let targetElement = e.currentTarget;
            // let targetIndex = targetElement.getAttribute("data-index");

            categoriesSection.classList.add("d-none")
            myRow.classList.remove("d-none")

            // detailsApi(targetIndex)
        })
    })
}

// Detailed category Api
async function categoriesListApi(targetCat) {
    let catReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${targetCat}`)
    let catRes = await catReq.json()
    let catMeals = catRes.meals
    console.log(catMeals);
    displayMainMeal(catMeals)
}

// Area section
let areas = document.querySelector("#areas")
areas.addEventListener("click", function () {
    categoriesSection.classList.add("d-none")
    detailsRow.classList.add("d-none")
    myRow.classList.add("d-none")
    searchSection.classList.add("d-none")

    areasSection.classList.remove("d-none");
    areasRow.classList.remove("d-none");
    // $('#areasSection').removeClass("d-none").addClass("d-block")
    // mainMealsSection.addClass("d-none")
    // detailsSection.addClass("d-none")
    // searchSection.addClass("d-none")
    // categoriesSection.addClass("d-none")
    // ingredientSection.addClass("d-none")
    // formSection.addClass("d-none")
    areasApi()
})

async function areasApi() {
    let areaReq = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let areaRes = await areaReq.json()
    let areaMeals = areaRes.meals
    displayArea(areaMeals)
    console.log(areaMeals);
}

function displayArea(areaMeals) {
    let areaCartoona = ""
    for (let i = 0; i < areaMeals.length; i++) {
        areaCartoona += `
                    <div class="col-md-3">
                            <div class="card area-content bg-transparent border-0 d-flex flex-column justify-content-center align-items-center text-white areaCard"  onclick=displayAreaDetailsApi("${areaMeals[i].strArea}") data-index=${areaMeals[i].strArea}>
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h2>${areaMeals[i].strArea}</h2>
                            </div>
                     </div>
        `
    }
    areasRow.innerHTML = areaCartoona;

    document.querySelectorAll(".areaCard").forEach(card => {
        card.addEventListener("click", function (e) {
            categoriesSection.classList.add("d-none")
            myRow.classList.remove("d-none")
            areasRow.classList.add("d-none")
        })
    })
}

async function displayAreaDetailsApi(country) {
    let areaDetailsReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let areaDetailsRes = await areaDetailsReq.json();
    let areaDetailsMeals = areaDetailsRes.meals;
    console.log(areaDetailsMeals);
    console.log(country);
    displayMainMeal(areaDetailsMeals);
}

// ingredients
let ingredients = document.querySelector("#ingredients")
ingredients.addEventListener("click", function () {
    categoriesSection.classList.add("d-none")
    detailsRow.classList.add("d-none")
    myRow.classList.add("d-none")
    searchSection.classList.add("d-none")
    areasSection.classList.add("d-none")

    // $('#ingredientSection').removeClass("d-none").addClass("d-block")
    // mainMealsSection.addClass("d-none")
    // detailsSection.addClass("d-none")
    // searchSection.addClass("d-none")
    // categoriesSection.addClass("d-none")
    // areasSection.addClass("d-none")
    // formSection.addClass("d-none")
    ingredientApi()
})

async function ingredientApi() {
    let ingReq = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let ingRes = await ingReq.json()
    let ingMeals = ingRes.meals
    console.log(ingMeals);
    displayIngredients(ingMeals)
}

function displayIngredients(ingMeals) {
    let ingCartoona = ""
    for (let i = 0; i < ingMeals.length; i++) {

        if (ingMeals[i].strDescription) {
            ingCartoona += `
            <div class="col-md-3">
                <div class="ingredients-content d-flex flex-column justify-content-center align-items-center g-3 text-center text-white ingCard" onclick=ingListApi("${ingMeals[i].strIngredient}") data-index=${i}>
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingMeals[i].strIngredient}</h3>
                        <p> ${ingMeals[i].strDescription.split(".").slice(0, 1).join(" ") + " ..."}</p>
                  </div>
            </div>
        `
        }
        else {
            break;
        }
    }
    ingredientsRow.innerHTML = ingCartoona;

    document.querySelectorAll(".ingCard").forEach(card => {
        card.addEventListener("click", function (e) {
            ingredientSection.classList.add("d-none")
            myRow.classList.remove("d-none")
        })
    })
}

async function ingListApi(ingredient) {
    let ingListReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let ingListRes = await ingListReq.json()
    let ingDetailsMeals = ingListRes.meals
    displayMainMeal(ingDetailsMeals)
}

let contact = document.querySelector("#contact")
contact.addEventListener("click", function () {
    formSection.classList.replace("d-none", "d-flex")
    categoriesSection.classList.add("d-none")
    detailsRow.classList.add("d-none")
    myRow.classList.add("d-none")
    ingredientsRow.classList.add("d-none")
    searchSection.classList.add("d-none")

    // $('#formSection').removeClass("d-none").addClass("d-block")
    // mainMealsSection.addClass("d-none")
    // detailsSection.addClass("d-none")
    // searchSection.addClass("d-none")
    // categoriesSection.addClass("d-none")
    // areasSection.addClass("d-none")
    // ingredientSection.addClass("d-none")
})

submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    if (validateForm()) {
        submitBtn.classList.remove('disabled');
    } else {
        submitBtn.classList.add('disabled');
    }
});

// Validate form on keyup
document.getElementById('userName').addEventListener('keyup', validateUserName);
document.getElementById('email').addEventListener('keyup', validateEmail);
document.getElementById('phone').addEventListener('keyup', validatePhone);
document.getElementById('age').addEventListener('keyup', validateAge);
document.getElementById('password').addEventListener('keyup', validatePassword);
document.getElementById('repassword').addEventListener('keyup', validateRepassword);

function validateForm() {
    let valid = true;
    if (!validateUserName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateAge()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateRepassword()) valid = false;
    return valid;
}

function validateUserName() {
    const userName = document.getElementById('userName').value;
    const nameError = document.getElementById('nameError');
    const namePattern = /^[a-zA-Z\s]+$/;

    if (!namePattern.test(userName)) {
        nameError.classList.remove('d-none');
        return false;
    } else {
        nameError.classList.add('d-none');
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.classList.remove('d-none');
        return false;
    } else {
        emailError.classList.add('d-none');
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('phone').value;
    const telError = document.getElementById('telError');
    const phonePattern = /^[0-9]{11}$/;

    if (!phonePattern.test(phone)) {
        telError.classList.remove('d-none');
        return false;
    } else {
        telError.classList.add('d-none');
        return true;
    }
}

function validateAge() {
    const age = document.getElementById('age').value;
    const ageError = document.getElementById('ageError');

    if (age < 1 || age > 120) {
        ageError.classList.remove('d-none');
        return false;
    } else {
        ageError.classList.add('d-none');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passError = document.getElementById('passError');
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordPattern.test(password)) {
        passError.classList.remove('d-none');
        return false;
    } else {
        passError.classList.add('d-none');
        return true;
    }
}

function validateRepassword() {
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const repassError = document.getElementById('repassError');

    if (password !== repassword) {
        repassError.classList.remove('d-none');
        return false;
    } else {
        repassError.classList.add('d-none');
        return true;
    }
}
