import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import CheckboxFour from '../components/Checkboxes/CheckboxFour'
import MultiSelect from '../components/Forms/MultiSelect'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'
import { getRepresentatives } from '../services/authService'
import { createEvent } from '../services/eventService'
import { useNavigate } from 'react-router-dom'

const NewEvent = ({ user, venues }) => {
  const getRep = async () => {
    return await getRepresentatives(user._id)
  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    time: '',
    locationType: 'venue',
    venue: '',
    addressLine: '',
    locationURL: '',
    representatives: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const newEvent = await createEvent(formData)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  const hideSelect = formData.locationType !== 'venue'

  const [representatives, setRepresentatives] = useState([])

  useEffect(() => {
    const getRepresentatives = async () => {
      const response = await getRep()
      setRepresentatives(response.representatives)
    }
    getRepresentatives()
  }, [])

  return (
    <>
      <Breadcrumb pageName="Event" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Event</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Enter your event name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Event Description
                </label>
                <textarea
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description here"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Event Date (mm/dd/yyyy)
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Event Time (hh:mm)
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <fieldset>
              <div>
                <input
                  type="radio"
                  id="venue"
                  name="locationType"
                  value="venue"
                  checked={formData.locationType === 'venue'}
                  onChange={handleChange}
                />
                <label htmlFor="venue"> Select Venue</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="other"
                  name="locationType"
                  value="other"
                  checked={formData.locationType === 'other'}
                  onChange={handleChange}
                />
                <label htmlFor="other"> Enter Other Address Line</label>
              </div>
            </fieldset>
            {!hideSelect && (
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Venue
                </label>
                <SelectGroupOne
                  list={venues}
                  onChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      venue: value
                    }))
                  }
                />
              </div>
            )}

            {hideSelect && (
              <div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location Address Line
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    placeholder="Enter Location Address Line"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location URL
                  </label>
                  <input
                    type="text"
                    name="locationURL"
                    value={formData.locationURL}
                    onChange={handleChange}
                    placeholder="Enter Location URL"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            )}

            <div className="w-full xl:w-1/2">
              <MultiSelect
                id="multiSelect"
                list={representatives}
                listLabel="Add Representatives"
                onChange={(selectedOptions) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    representatives: selectedOptions
                  }))
                }
              />
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewEvent
