const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

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

export { createRepresentative }
