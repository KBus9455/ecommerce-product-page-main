// Show and hide menu 

const menuButton = document.querySelector('div.menu');
const menuClose = document.querySelector('li.close');
const menuMobile = document.querySelector('.menu-mobile');

menuButton.addEventListener('click', function () {
    menuMobile.classList.toggle('active');
    console.log('dziala')
});

menuClose.addEventListener('click', function () {
    menuMobile.classList.toggle('active');
    console.log('dziala')
});

// Display cart 

const cartMobile = document.querySelector('div.cart img');
const cartDesktop = document.querySelector('li.cartTopPanel img');
const cartContent = document.querySelector('div.displayCart');

const displayCart = function () {
    cartContent.classList.toggle('active');
}
cartMobile.addEventListener('click', displayCart);
cartDesktop.addEventListener('click', displayCart);

// show/hide big foto 

const cross = document.querySelector('div.cross svg');
const bigPhoto = document.querySelector('.productShow');
const productPhoto = document.querySelector('img.photoBox');


cross.addEventListener('click', function () {
    bigPhoto.classList.remove('active');
});

productPhoto.addEventListener('click', function () {
    getIndex();
    productShownPhoto.src = photoSources[currentIndex];
    productShowGallery.forEach(function (item) {
        item.classList.remove('active')
    });
    productShowGallery[currentIndex].classList.add('active');

    bigPhoto.classList.add('active');
    cartContent.classList.remove('active');
});

//change photo in description 

const photoContainter = document.querySelector('.photoBox');
const desktopGallery = [...document.querySelectorAll('.desktop-gallery img')];

const photoSources = ['images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg'];

let currentSource = 'images/image-product-1.jpg';

const changeDescriptionPhoto = function (src) {
    photoContainter.src = src;
    productShownPhoto.src = src;
    productShowGallery.forEach(function (item) {
        item.classList.remove('active')
    });

    productShowGallery.forEach(function (item) {
        if (item.src === src) {
            item.classList.add('active');
        }
    });

}

const getSource = function (e) {
    currentSource = this.src;
    desktopGallery.forEach(function (item) {
        item.classList.remove('active')
    });
    this.classList.add('active');
    changeDescriptionPhoto(currentSource);
}

desktopGallery.forEach(function (photo) {
    photo.addEventListener('click', getSource);
})

//change photo in product show
const productShownPhoto = document.querySelector('.productShow-bigPhoto img');
const productShowGallery = [...document.querySelectorAll('.productShow-gallery img')];


const changeShownPhoto = function (src) {
    productShownPhoto.src = src;
}

const getSourceShownPhoto = function (e) {
    currentSource = this.src;
    productShowGallery.forEach(function (item) {
        item.classList.remove('active')
    });
    this.classList.add('active');
    changeShownPhoto(currentSource);
}

productShowGallery.forEach(function (photo) {
    photo.addEventListener('click', getSourceShownPhoto);
})

// changing photos by arrows

const arrows = [...document.querySelectorAll('.productShow-bigPhoto div')];

let currentIndex = 0;
const getIndex = function () {
    for (let i = 0; i < photoSources.length; i++) {
        if (currentSource.includes(photoSources[i])) {
            currentIndex = i;
            console.log(currentIndex);
        }
    }
}


const changePhotoArrowDesktop = function () {
    getIndex();
    if (this.className == 'right') {
        currentIndex >= 3 ? currentIndex = 0 : currentIndex++;
    } else {
        currentIndex <= 0 ? currentIndex = 3 : currentIndex--;
    }
    productShownPhoto.src = photoSources[currentIndex];
    currentSource = photoSources[currentIndex];

    productShowGallery.forEach(function (item) {
        item.classList.remove('active')
    });
    productShowGallery[currentIndex].classList.add('active');

};

arrows.forEach(function (arrow) {
    arrow.addEventListener('click', changePhotoArrowDesktop);
});


// change photo by arrow on mobile

const changePhotoArrowMobile = function () {
    getIndex();
    console.log(this);
    console.log(this.className);
    if (this.className.includes('right')) {
        currentIndex >= 3 ? currentIndex = 0 : currentIndex++;
    } else {
        currentIndex <= 0 ? currentIndex = 3 : currentIndex--;
    }
    productPhoto.src = photoSources[currentIndex];
    currentSource = photoSources[currentIndex];
    desktopGallery.forEach(function (item) {
        item.classList.remove('active')
    });
    desktopGallery[currentIndex].classList.add('active');
}


const arrowsMobile = document.querySelectorAll('.productPhoto .arrow');
arrowsMobile.forEach(function (arrow) {
    arrow.addEventListener('click', changePhotoArrowMobile);
});

// adding to cart

const carts = [...document.querySelectorAll("[id=carts]")];
const cartsNumbers = [...document.querySelectorAll("[id=cartNumber]")];


const counter = document.querySelector('.counterNumber');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
let quantityToAdd = 0;
if (quantityToAdd) {
    quantityToAdd = parseInt(counter.textContent);
};


minus.addEventListener('click', function () {
    if (quantityToAdd) {
        --quantityToAdd;
        counter.textContent = quantityToAdd;
    }
});

plus.addEventListener('click', function () {
    quantityToAdd++;
    counter.textContent = quantityToAdd;
});



// display elements in cart 

const cartTableContent = document.querySelector('.cartTableContent');
const emptyCart = document.querySelector('.emptyCart');


const fillInContentTable = function (number) {
    if (carts[0].className.includes('active')) {
        emptyCart.style.display = 'none';
        cartTableContent.innerHTML = `<table><tr><th>Item</th><th>Price</th></tr><tr><td>Fall Limited Edition Sneakers</td><td>${number*125} $</td><tr><th>Sum</th><th>${number*125} $</th></tr>`;
    }
}


// increase quantity in cart 

const clearCounter = function () {
    quantityToAdd = 0;
    counter.textContent = quantityToAdd;
}



function cartNumbers() {
    if (quantityToAdd) {
        productNumbers = Number(localStorage.getItem('cartNumbers'));
        carts.forEach(function (cart) {
            cart.classList.add('active');
        })
        let newNumber = productNumbers + quantityToAdd;
        if (productNumbers) {
            localStorage.setItem('cartNumbers', newNumber);
        } else {
            localStorage.setItem('cartNumbers', quantityToAdd);
        }
        cartsNumbers.forEach(function (cartNumber) {
            cartNumber.textContent = newNumber;      
             fillInContentTable(newNumber);
        });

        clearCounter();
 
    }
};
const addToCartBtn = document.querySelector('.addToCart');
addToCartBtn.addEventListener('click', cartNumbers)


//loading cart number 
let productNumbers;
const onLoadCartNumbers = function () {
    productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        console.log(productNumbers);
        carts.forEach(function (cart) {
            cart.classList.add('active');
        });
    }
    cartsNumbers.forEach(function (cartNumber) {
        cartNumber.textContent = productNumbers;
    });

fillInContentTable(productNumbers);
};
onLoadCartNumbers();

