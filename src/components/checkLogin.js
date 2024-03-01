

// Function to check if the user is logged in
const isLoggedIn = (url) => {
    // Retrieve user data from local storage
    const userLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  
    // Check if userData exists and if loggedIn is true
    if (userLoggedIn && url==="private") {
      return true; // User is logged in
    }
    else if(userLoggedIn && url ==="public"){
        return window.location.href="http://localhost:3000/home";
    }
    else if (!userLoggedIn && url==="public") {
      return true; // User is not logged in
    }

    else if(!userLoggedIn && url ==="private"){
        return window.location.href="http://localhost:3000";
    }
  };

export default isLoggedIn
  