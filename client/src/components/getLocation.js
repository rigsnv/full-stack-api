async function getLocation() {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const json = JSON.stringify(coordinates);
          resolve(json);
        },
        (error) => {
          reject(error);
        }
      );
    });
  } else {
    throw new Error("Geolocation is not supported by this browser.");
  }
}

export default getLocation;