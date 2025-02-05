
const gridContainer = document.querySelector('.grid');
const verifyButton = document.getElementById('verifyBtn');
const changePasskeyButton = document.getElementById('changePasskeyBtn');
//motham 15 images irukum
const imageUrls = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
    'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg',
    'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg'
];
//passkey set panrathuku
let passKey = [];
//passkeys ah store panrathuku
let selectedImages = [];
//user passkey ya change panrathuku
let isChangingPasskey = false;
let isOldPasskeyVerified = false;
//images ah shuffle panrathuku
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
//track image index
function renderGrid(images) {
    gridContainer.innerHTML = ''; 
    images.forEach((imgSrc, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.dataset.index = index; 
        imgElement.addEventListener('click', selectImage); 
        gridContainer.appendChild(imgElement);
    });
}
//selection handle
function selectImage(event) {
    const imgElement = event.target;
    const imgSrc = imgElement.src;

    if (selectedImages.includes(imgSrc)) {
        selectedImages = selectedImages.filter(src => src !== imgSrc);
        imgElement.style.border = 'none';
    } else if (selectedImages.length < 6) {
        selectedImages.push(imgSrc);
        imgElement.style.border = '2px solid green'; 
    }
}
//passkey verify pana
function verifyPasskey() {
    const selectedImagesSet = new Set(selectedImages);
    const passKeySet = new Set(passKey);

    if (selectedImagesSet.size === passKeySet.size && [...selectedImagesSet].every(img => passKeySet.has(img))) {
        return true;
    } else {
        alert('Passkey verification failed. Try again.');
        selectedImages = []; 
        renderGrid(shuffle([...imageUrls])); 
        return false;
    }
}
//marubadiyum shuffle
verifyButton.addEventListener('click', () => {
    if (selectedImages.length === 6) {
        if (!localStorage.getItem('passKey')) {
            localStorage.setItem('passKey', JSON.stringify(selectedImages));
            alert('Passkey set! This will be used for future logins.');
            window.location.href = 'users.html';  
        } else if (isChangingPasskey && !isOldPasskeyVerified) {
            passKey = JSON.parse(localStorage.getItem('passKey'));
            if (verifyPasskey()) {
                alert("Old passkey verified! Now select a new passkey.");
                isOldPasskeyVerified = true;  
                selectedImages = []; 
                renderGrid(shuffle([...imageUrls])); 
            }
        } else if (isOldPasskeyVerified) {
            localStorage.setItem('passKey', JSON.stringify(selectedImages));
            alert('New passkey set successfully!');
            isChangingPasskey = false;
            isOldPasskeyVerified = false;  
            window.location.href = 'users.html';  
        } else {
            passKey = JSON.parse(localStorage.getItem('passKey'));
            if (verifyPasskey()) {
                alert('Passkey Verified! Redirecting to user information page...');
                window.location.href = 'users.html';  
            }
        }
    } else {
        alert('Please select exactly 6 images as your passkey.');
    }
});

changePasskeyButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to change your passkey? Please verify your current passkey.")) {
        selectedImages = []; 
        isChangingPasskey = true; 
        alert("Please select your current passkey images.");
        renderGrid(shuffle([...imageUrls])); 
    }
});
renderGrid(shuffle([...imageUrls]));
