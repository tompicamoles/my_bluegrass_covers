const clientId = "3fb5b859d02b426fb35f71322b36d576";
const clientSecret = "b189b3868bba4c2cabe8cbee48b4e8a4";
const url = "https://accounts.spotify.com/api/token";
const redirectUri = "http://localhost:3000/callback";

const generateToken = async () => {
  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  };

  const spotifyToken = await fetch(url, authOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((body) => {
      if (body.access_token) {
        const token = body.access_token;
        return token;
      } else {
        throw new Error("Access token not found in the response.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return spotifyToken;
};





const generateAccessToken = () => {
  const currentUrl = window.location.href;

  // Create a URLSearchParams object from the current URL
  const urlParams = new URLSearchParams(new URL(currentUrl).search);

  // Retrieve the value of the 'code' parameter
  const code = urlParams.get("code");

  if (!code) {
    console.log("pas de code")
    return null;

  } else {
    

    const headers = {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const requestBody = new URLSearchParams({
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const requestOptions = {
      method: "POST", // Change the method as needed (GET, POST, etc.)
      headers: headers,
      body: requestBody.toString(),
    };

    const accessToken = fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data);
        let token = data.access_token
        console.log("we retrieved" , token)
        return token 
        // Additional processing with the received data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    return accessToken;
  }
};

const authentificate = () => {
  const scope = "user-read-private user-read-email"; // Add the required scopes
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

  // Redirect the user to the authorization URL
  window.location.href = authUrl;
};


const fetchTracks = async (query) => {
  const apiUrl = 'https://api.spotify.com/v1/search?'

  const token = await generateToken()

  const header = {
    Authorization: `Bearer ${token}`
  }
  const requestBody = new URLSearchParams({
    q: query,
    type: ["track"],
    limit:30
  });

  const urlWithParameters = apiUrl + requestBody.toString()
  console.log(urlWithParameters)

  const requestOptions = {
    headers: header,
  };
  console.log(requestOptions)

  const tracks = await fetch(urlWithParameters, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data from API:", data);
    
    // Additional processing with the received data
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
    
  
}

fetchTracks("techno")
//export { generateAccessToken, authentificate };
