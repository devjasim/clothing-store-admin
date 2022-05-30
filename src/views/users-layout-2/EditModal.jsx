import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, Lucide, Notification } from "@/base-components";
import { getUserById } from '../../../redux/api';
import { updateUser } from '../../../redux/actions/users';
import { useDispatch } from 'react-redux';

const EditModal = (props) => {
  const dispatch = useDispatch();

  const schema = yup
    .object({
      userName: yup.string().required().min(2),
      email: yup.string().required().email(),
      role: yup.string().required().min(6),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      roles: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await trigger();
    if (!result) {
      Toastify({
        node: dom("#failed-notification-content")
          .clone()
          .removeClass("hidden")[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      Toastify({
        node: dom("#success-notification-content")
          .clone()
          .removeClass("hidden")[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const { buttonModalPreview, setButtonModalPreview, id } = props;

  const [nameError, setNameError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [oldError, setOldError] = useState(false)
  const [cpassError, setCpassError] = useState(false)

  const getUser = async(_id) => {
    console.log("ID", _id)
    const { data: {result} } = await getUserById(_id);
    
    if(result) {
      setProfileData(state => ({
        ...state,
        userName: result?.userName,
        email: result?.email,
        roles: result?.roles
      }))
    }
  }

  useEffect(() => {
    getUser(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "userName" && value.length === 0) {
      setNameError(true)
    } else {
      setNameError(false)
    }

    if(profileData.oldPassword.length > 0 && profileData.newPassword.length === 0) {
      setPassError(true)
    } else {
      setPassError(false)
    }

    if(name === "newPassword" && value.length > 0 && profileData.oldPassword.length === 0) {
      setOldError(true)
    } else {
      setOldError(false)
    }

    if(name === "confirmPassword" && value !== profileData.newPassword) {
      setCpassError(true);
    } else {
      setCpassError(false);
    }

    setProfileData(state => ({
      ...state,
      [name]: value
    }))
    
  }

  const basicNonStickyNotification = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!nameError && !passError && !oldError && !cpassError) {
      const formData = {
        userName: profileData.userName,
        roles: profileData.roles,
        password: profileData.oldPassword,
        newPassword: profileData.newPassword,
        confirmPassword: profileData.confirmPassword
      }
     dispatch(updateUser(id, formData, basicNonStickyNotification))
     setButtonModalPreview(false);
    }
  }

  return (
    <Modal
      size="modal-lg"
      backdrop="1"
      transparency
      show={buttonModalPreview}
      onHidden={() => {
        setButtonModalPreview(false);
      }}
    >
      <a
        onClick={() => {
          setButtonModalPreview(false);
        }}
        className="absolute top-0 right-0 mt-3 mr-3"
        href="#"
      >
        <Lucide icon="X" className="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody className="p-10 mt-4">
        <div className="mb-5 text-center">
          <h2 className='text-3xl'>Update Profile</h2>
        </div>
        <Notification getRef={(el)=> {
            basicNonStickyNotification.current = el;
          }}
            options={{ duration: 3000 }}
            className="flex flex-col sm:flex-row"
          >
          <div className="font-medium">
              User deleted successfully!
          </div>
        </Notification>
        <form className="validate-form" onSubmit={onSubmit} >
          <div className="input-form">
              <label htmlFor="regular-form-1" className="form-label">Full Name*</label>
              <input id="regular-form-1" name="userName" value={profileData.userName} onChange={handleChange} type="text" className="form-control" placeholder="Input text" />
              {nameError && <div className="mt-2 text-danger">This field is required</div>}
          </div>
          <div className="mt-3 input-form">
              <label htmlFor="validation-form-2" className="form-label">Email*</label>
              <input
                {...register("email")}
                id="validation-form-1"
                type="email"
                name="email"
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.email,
                })}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <div className="mt-2 text-danger">
                  {errors.email.message}
                </div>
              )}
          </div>
          <div className="mt-3">
              <label htmlFor="regular-form-6" className="form-label">User Role*</label>
              <input id="regular-form-6" name="roles" value={profileData.roles} onChange={handleChange} type="text" className="form-control" placeholder="Role" />
          </div>
          <div className="mt-3">
              <label htmlFor="regular-form-3" className="form-label">Old Password</label>
              <input id="regular-form-3" name="oldPassword" value={profileData.oldPassword} onChange={handleChange} type="password" className="form-control" placeholder="Old Password" />
              {oldError && <div className="mt-2 text-danger">This field is required</div>}
          </div>
          <div className="mt-3">
              <label htmlFor="regular-form-4" className="form-label">New Password</label>
              <input id="regular-form-4" name="newPassword" value={profileData.password} onChange={handleChange} type="password" className="form-control" placeholder="New Password" />
              {passError && <div className="mt-2 text-danger">This field is required</div>}
          </div>
          <div className="mt-3">
              <label htmlFor="regular-form-5" className="form-label">Confirm New Password</label>
              <input id="regular-form-5" name="confirmPassword" value={profileData.confirmPassword} onChange={handleChange} type="password" className="form-control" placeholder="Confirm Password" />
              {passError && <div className="mt-2 text-danger">This field is required</div>}
              {cpassError && <div className="mt-2 text-danger">Password didn't match!</div>}
          </div>
          <div className="flex justify-between px-5 pb-8 mt-10">
            <button
              type="button"
              onClick={() => {
                setButtonModalPreview(false);
              }}
              className="w-24 btn btn-warning"
            >
              Close
            </button>
            <button
              type="submit"
              className="w-24 btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default EditModal