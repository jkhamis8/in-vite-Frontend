import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import CheckboxFour from '../components/Checkboxes/CheckboxFour'
import MultiSelect from '../components/Forms/MultiSelect'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'
import { createVenue,editVenue,getVenue } from '../services/venueService'
import { useNavigate,useParams } from 'react-router-dom'

const VenueForm = ({ user}) => {
  const {venueId} = useParams();

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    venueName: '',
    addressLine: '',
    locationURL: '',
    capacity: '',
    contactInfo: ''
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
    if(venueId){
      try {
        await editVenue(formData)
        navigate('/')
      } catch (error) {
        console.log(`couldn't edit Venue, error in submit: ${error}`);
      }
      }else{
      try {      
        await createVenue([formData,user._id])
        navigate('/')
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    const getVenueData = async() =>{
      if(venueId){
        try {
        const response=await getVenue(venueId)
        setFormData(response.venueObj)
        } catch (error) {
        console.log(`error in useEffect: ${error}`)
        }
      }
    }
    getVenueData()
  }, [])
  return (
    <>
      <Breadcrumb pageName="Venue" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">New Venue</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Venue Name
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="Enter your Venue name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                Address Line
                </label>
                <textarea
                  rows={3}
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="Enter Address Line here"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
            
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  location URL
                </label>
                <input
                  type="text"
                  name="locationURL"
                  value={formData.locationURL}
                  onChange={handleChange}
                  placeholder="Enter location URL"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Venue Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Enter capacity"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Contact Info
                </label>
                <input
                  type="number"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="Enter contactInfo"
                  className="w-full mb-2.5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Submit Venue
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default VenueForm
