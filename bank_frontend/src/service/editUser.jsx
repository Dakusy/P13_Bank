const editUser = async (firstName, lastName, token) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};

export default editUser;