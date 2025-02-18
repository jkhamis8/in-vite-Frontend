import { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import CheckboxFour from '../components/Checkboxes/CheckboxFour'
import MultiSelect from '../components/Forms/MultiSelect'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'
import { getRepresentative, createRepresentative, editRepresentative  } from '../services/representativeService'
import { useNavigate,useParams } from 'react-router-dom'

const RepresentativeForm = ({ user}) => {
  const {representativeId} = useParams();  
  const navigate = useNavigate()
  const roles=[{'id':'Representative','value':'Representative'},{'id':'AttendanceScanner','value':'AttendanceScanner'}]
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    role: 'Representative',
    eventManager:user._id
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
    if(representativeId){
      try {
        await editRepresentative(formData)
        navigate('/')
      } catch (error) {
        console.log(`couldn't edit error in submit: ${error}`);
      }
      }else{
        try {      
          await createRepresentative(formData)
          navigate('/')
        } catch (error) {
          console.log(error.message)
        }
      }
  }

  useEffect(() => {
    const getUserData = async() =>{
      if(representativeId){
        try {
        const response=await getRepresentative(representativeId)
        response.userObj.password=''
        setFormData(response.userObj)
        } catch (error) {
        console.log(`error in useEffect: ${error}`)
        }
      }
    }
    getUserData()
  }, [])

  return (
    <>
      <Breadcrumb pageName="Representative" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Representative</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  FullName
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter location URL"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <div className="w-full xl:w-1/2 mb-2.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Role
                </label>
                <select name='role'
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                {roles?.map((item) => (
                  <option
                    key={item.id}
                    value={item.value}
                    className="text-body dark:text-bodydark"
                  >
                    {item.value}
                  </option>
                ))}
                </select>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              submit Representative
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RepresentativeForm
