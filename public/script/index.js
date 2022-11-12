let logindetails = {};
let registerDetails = {};
let dashboardData = {};
let updateData = {};
document
  ?.querySelector("#login-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log(e.target);
    console.log(logindetails);

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

    const { message, code } = await response.json();
    if (code == 200) {
      alert(message);
      window.location.replace("/user/dashboard"); //pushState("/auth/register");
    } else {
      alert("sorry either email or password is incorect ");
    }
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

    const { code, message } = await response.json();
    if (code == 201) {
      alert(message);
      return window.location.replace("/auth/login");
    } else {
      alert("error occured ");
      return null;
    }
  });

document
  ?.querySelector("#dashboard-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(dashboardData);

    //let path = window.location.pathname;

    let response = await fetch("/movie/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dashboardData),
    });

    let data = await response.json();
    console.log(data);
    const { code, message } = data;
    if (code == 201) {
      alert(message);
      return window.location.reload();
    } else {
      alert(" could not create ");
      return null;
    }
  });

async function saveData(e) {
  dashboardData[`${e.name}`] = e.value;
  console.log(dashboardData);
}

async function handleDelete(id) {
  let response = await fetch(`/user/movie/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const { code, message } = await response.json();
  if (code == 200) {
    alert(message);
    window.location.reload();
  } else {
    alert("error occured");
  }
}

document
  ?.querySelector("#update-table")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(updateData);

    //let path = window.location.pathname;

    let response = await fetch("/movie/update/:id", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
  });

async function updateInput(e) {
  updateData[`${e.name}`] = e.value;
  // console.log(updateData);
}

async function handleUpdate(id) {
  let response = await fetch(`/user/movie/update/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  console.log(response);
  console.log(updateData);
}
