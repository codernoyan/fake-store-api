const loadProducts = async () => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const displayMenu = async () => {
    const products = await loadProducts();

    const productsMenu = document.getElementById('products-menu');
    const uniqueProducts = [];
    products.forEach(product => {
        const { category } = product;

        if (uniqueProducts.includes(category) === false) {
            uniqueProducts.push(category);

            const li = document.createElement('li');
            li.innerHTML = `<a>${category}</a>`;
            productsMenu.appendChild(li);
        }
    });

}
displayMenu();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keyup', async(event) => {
    const targetKey = event.key;
    // search products
    if (targetKey === 'Enter') {
        toggleSpinner(true);
        const products = await loadProducts();
        
        const searchValue = searchField.value;
        const foundProducts = products.filter(product => product.category.includes(searchValue));
        searchField.value = '';

        const productContainer = document.getElementById('products');
        productContainer.innerHTML = ``;
        foundProducts.forEach(product => {
            console.log(product);

            // destructure product object
            const { category, image, price, rating, title } = product;

            const productsDiv = document.createElement('div');
            productsDiv.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src=${image} class="w-full h-56 object-cover" alt="Shoes" /></figure>
                    <div class="card-body">
                    <h2 class="card-title">${category}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(productsDiv);            
        })
        toggleSpinner(false)
    }
})


const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('spinner');
    if (isLoading) {
        loadingSection.classList.remove('hidden');
    } else {
        loadingSection.classList.add('hidden');
    }
}

// loadProducts();