window.onload = function() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.expiration > Date.now()) {
        document.getElementById('user-name').textContent = userInfo.name;
        document.getElementById('user-email').textContent = userInfo.email;
        document.getElementById('user-photo').src = userInfo.picture;
    } else {
        localStorage.removeItem('userInfo');
        window.location.href = 'login.html';
    }
};
