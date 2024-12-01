const checkTokenExpiry= () => {
    const expiryTime = localStorage.getItem('tokenExpiry');
    const token = localStorage.getItem('token');
    const cid = localStorage.getItem('cid');
    const firstname = localStorage.getItem('firstname');

    const currentTime = new Date().getTime();

    if (currentTime > expiryTime && (token || cid || firstname)) {
        console.log("Session expired, please log in again");
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('cid');
        localStorage.removeItem('firstname');
    }
}

export default checkTokenExpiry;