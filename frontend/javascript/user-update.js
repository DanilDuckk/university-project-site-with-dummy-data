function changeLogOut(){
    const logout = document.getElementById('logout');
    const userId = localStorage.getItem('userId');
    logout.textContent = 'User: '+userId;
}

changeLogOut()