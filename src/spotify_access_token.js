const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri =process.env.REACT_APP_REDIRECT_URI ;
const url = "https://accounts.spotify.com/api/token";


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
      console.error("Error", error);
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
    console.log("pas de code");
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
        let token = data.access_token;
        console.log("we retrieved", token);
        return token;
        // Additional processing with the received data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    return accessToken;
  }
};

const authentificate = () => {
  const scope =
    "user-read-private user-read-email playlist-modify-private user-follow-modify "; // Add the required scopes
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

  // Redirect the user to the authorization URL
  window.location.href = authUrl;
};

const fetchTracks = async (query) => {
  const apiUrl = "https://api.spotify.com/v1/search?";

  const token = await generateToken();

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const requestBodyPickinOn = new URLSearchParams({
    q: `${query} Pickin' On Series `,
    type: ["track"],
    limit: 5,
  });

  // const requestBody = new URLSearchParams({
  //   q: `${query} genre : Bluegrass, genre : country `,
  //   type: ["track"],
  //   limit: 15,
  // });

  //const urlWithParameters = apiUrl + requestBody.toString();
  const urlWithParametersPickinOn = apiUrl + requestBodyPickinOn.toString()
  //console.log(urlWithParameters)

  const requestOptions = {
    headers: header,
  };
  //console.log(requestOptions)

  let tracks = [];

  const createTrack = (item) => {
    let track = {
      Song: item.name,
      Artist: item.artists[0].name,
      Album: item.album.name,
      Added: false,
      Preview: item.preview_url,
      uri: item.uri,
      isPlaying: false,
    };
    
    if (!tracks.some(existingTrack => existingTrack.uri === track.uri)){tracks.push(track)};
  }

  const trackListPickinOn = await fetch(urlWithParametersPickinOn, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //console.log(response)
    return response.json();
  })
  .then((data) => {
    
    data.tracks.items.map((item) => {
      if (item.preview_url) {
        createTrack(item)
        console.log(`tracks Pickin'on :`, tracks)
      }
      return tracks
    });
    //console.log("Data from API:", data);

    console.log("tracks in BFF", tracks);

    // Additional processing with the received data
    return tracks
  })
  .catch((error) => {
    console.error("Fetch error:", error);

  
  });



  // const trackList = await fetch(urlWithParameters, requestOptions)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     //console.log(response)
  //     return response.json();
  //   })
  //   .then((data) => {
      
  //     data.tracks.items.map((item) => {
  //       if (item.preview_url) {
  //         createTrack(item)
  //       }
  //     });
  //     //console.log("Data from API:", data);

  //     console.log("tracks in BFF", tracks);

  //     // Additional processing with the received data
  //   })
  //   .catch((error) => {
  //     console.error("Fetch error:", error);
  //   });

    

    return trackListPickinOn

};

const createPlaylist = async (accessToken, name, items) => {
  const AccesToken = accessToken;
  const playlistName = name;
  console.log(AccesToken);

  const getUserId = async () => {
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccesToken}`,
    };

    const id = fetch("https://api.spotify.com/v1/me", {
      // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: requestHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        // Handle the successful response data
        console.log("Response:", data);
        const id = data.id;
        return id;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    return id;
  };

  const createNewPlaylist = async (name) => {
    const userId = await getUserId();

    // Define the data (if needed)
    const requestData = {
      name: playlistName,
      description: "Awesome playlist created with Tom App",
      public: false,
    };

    // Define the headers (if needed)
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccesToken}`,
    };

    // Create the Fetch API request
    const playListId = fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        // Handle the successful response data
        console.log("Response:", data);
        return data.id;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
    return playListId;
  };

  const addPlaylistItems = async (items) => {
    const playlistId = await createNewPlaylist();
    console.log(playlistId);

    const addItems = (items) => {
      const requestData = {
        uris: items,
        position: 0,
      };

      // Define the headers (if needed)
      const requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccesToken}`,
      };

      // Create the Fetch API request
      fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks
      `,
        {
          method: "POST", // Specify the HTTP method (GET, POST, PUT, DELETE, etc.)
          headers: requestHeaders,
          body: JSON.stringify(requestData), // Convert data to JSON format if needed
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          // Handle the successful response data
          console.log("Response:", data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    };
    addItems(items);
  };

  addPlaylistItems(items);
};

//fetchTracks("bluegrass")
// createPlaylist()
export { generateAccessToken, authentificate, fetchTracks, createPlaylist };
