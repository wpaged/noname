let auth0Client = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
  };

async function main () {
    await configureClient();
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        // show the gated content
        window.logininfo = await auth0Client.getUser()
        return;
      }

      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
    
        // Process the login state
        await auth0Client.handleRedirectCallback();
            
        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
        let logininfo = await auth0Client.getUser()
        localStorage.setItem('login_name',logininfo.name.split(',')[1]);

      }else{
        forceLogin();
      }
    
  }

// ..

const forceLogin = async () => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  };

  
  main ()