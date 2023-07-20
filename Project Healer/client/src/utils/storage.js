// used for retrieving and setting data in web and framework through a consistent api surface
export const getItem = (key, self) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setItem = (key, value) => {
  // set it on storage
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = key => {
  // remove it from storage
  localStorage.removeItem(key);
};

// used for retrieving and setting a cookie in web and framework through a consistent api surface
export const getCookie = cname => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
};

export const setCookie = (cname, cvalue, exdays = 365) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
};
