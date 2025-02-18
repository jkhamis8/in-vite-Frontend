const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const getEvent = async (eventId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/event/getEvent/${eventId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
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

const createEvent = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/event/createEvent`, {
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

const getManagerEvents = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/event/getAllEvents/${userId}`)
    const json = await res.json()

    if (json.err) {
      throw new Error(json.err)
    }
    return json.eventObj
  } catch (err) {
    console.log(err)
    throw err
  }
}

const editEvent = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/event/editEvent`, {
      method: 'PUT',
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

export { getEvent, createEvent, getManagerEvents, editEvent }
