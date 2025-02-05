var users = {
    "gugan":{"password":"12345"},
    "gokul":{"password":"20112004"},
    "sidhaarthane":{"password":"151808"},
    "praveen":{"password":"cyberfox"},
    "kishore":{"password":"kishore2005"},

}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (`${username}` in users && password === users[`${username}`].password) {
        alert('Login successful! Redirecting to next layer security page...');
        window.location.href = 'grid.html';  
    } else {
        alert('Incorrect username or password. Please try again.');
    }
});