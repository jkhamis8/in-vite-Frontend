const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const getVenue = async (venueId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/venue/getVenue/${venueId}`, {
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

const createVenue = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/venue/createVenue`, {
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

const editVenue = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/venue/editVenue`, {
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

export { getVenue, createVenue, editVenue }
