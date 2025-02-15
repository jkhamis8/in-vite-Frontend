import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import CheckboxFour from '../components/Checkboxes/CheckboxFour'
import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne'

const NewEvent = ({ user, venues }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.confirmPassword != formData.password) {
      setMessage('Password confirm is different')
      return 0
    }
    try {
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

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
                  id="txtArea"
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Event Time (hh:mm)
              </label>
              <input
                type="time"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <CheckboxFour text="Select Venue" />
              <CheckboxFour text="Enter Other Address Line" />
              <label className="mb-2.5 block text-black dark:text-white">
                Select Venue
              </label>
            </div>
            <SelectGroupOne list={venues} />

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewEvent
