const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const getRepresentative = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/getRepresentative/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createRepresentative = async (formData) => {
  try {
    console.log(formData);

    const res = await fetch(`${BACKEND_URL}/user/createRepresentative`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    if (json.err) {
      throw new Error(json.err)
    }
    return json
  } catch (err) {
    console.log(err)
    throw err
  }
}

const editRepresentative = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/editUserProfile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export { getRepresentative, createRepresentative, editRepresentative }
