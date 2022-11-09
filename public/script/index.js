let logindetails = {};
let registerDetails = {};
document
  ?.querySelector("#login-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log(e.target);
    // console.log(logindetails);

    //send data to database
    let path = window.location.pathname;
    // console.log(window.location.pathname);
    let response = await fetch(path, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindetails),
    });

    console.log(await response.text());
  });

async function saveInput(e) {
  logindetails[`${e.name}`] = e.value;

  // console.log(logindetails);
  // console.log(e.name);
}
async function saveDetails(e) {
  registerDetails[`${e.name}`] = e.value;
  // console.log(registerDetails);
}

document
  ?.querySelector("#register-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(registerDetails);

    let path = window.location.pathname;

    let response = await fetch(path, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerDetails),
    });

    console.log(registerDetails, await response.text());
  });
