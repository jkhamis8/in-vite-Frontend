const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const createInvite = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/invitation/createInvite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    if (json.err) {
      throw new Error(json.err)
    }
    console.log('invitation event', json.eventObj)

    return json.eventObj
  } catch (err) {
    console.log(err)
    throw err
  }
}

const getEventInvites = async (eventID) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/invitation/getAllInvites/${eventID}`
    )
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

const rsvpResponse = async (inviteId,action) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/invitation/rsvpResponse/${inviteId}/${action}`
    )
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

export { createInvite, getEventInvites,rsvpResponse }
