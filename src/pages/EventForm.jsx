import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import CheckboxFour from '../components/Checkboxes/CheckboxFour'
import MultiSelect from '../components/Forms/MultiSelect'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'
import { getRepresentatives } from '../services/authService'
import { getAllVenues } from '../services/venueService'
import { createEvent,editEvent,getEvent } from '../services/eventService'
import { useNavigate, useParams } from "react-router-dom"

const EventForm = ({ user }) => {
  const navigate = useNavigate()
  const {eventId} = useParams();
  const [representatives, setRepresentatives] = useState([])
  const [venues, setVenues] = useState([])
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    locationType: 'venue',
    venue: '',
    addressLine: '',
    locationURL: '',
    representatives: []
  })
  const hideSelect = formData.locationType !== 'venue'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(eventId){
      try {
        await editEvent(formData)
        navigate('/')
      } catch (error) {
        console.log(`couldn't edit Event, error in submit: ${error}`);
      }
    }else{
      try {
        await createEvent([formData,user._id])
        navigate('/')
      } catch (error) {
        console.log(`couldn't add a new Event, error in submit: ${error}`);
      }
    }
  }

  useEffect(() => {
    const getVenues = async () => {
      const response = await getAllVenues()
      setVenues(response.venueObj)
    }
    getVenues()

    const getRepresentativesOptions = async () => {
      const response = await getRepresentatives(user._id)
      setRepresentatives(response.representatives)
    }
    getRepresentativesOptions()

    const getEvents = async() =>{
      if(eventId){
        try {
        const response=await getEvent(eventId)
        const now = new Date(response.eventObj.date);
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        response.eventObj.date = now.toISOString().slice(0,16);
        setFormData(response.eventObj)
        } catch (error) {
        console.log(`error in useEffect: ${error}`)
        }
      }
    }
    getEvents()

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
                Event Date/Time (mm/dd/yyyy)
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
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
              <select name='venue'onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                <option key={''} value={''} className="text-body dark:text-bodydark">{''}</option>
                {venues?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    className="text-body dark:text-bodydark"
                  >
                    {item.venueName}
                  </option>
                ))}
                </select>
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
              <select name='representatives'onChange={handleChange} multiple
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                <option key={''} value={''} className="text-body dark:text-bodydark">{''}</option>
                {representatives?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    className="text-body dark:text-bodydark"
                  >
                    {item.fullName}
                  </option>
                ))}
                </select>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EventForm
