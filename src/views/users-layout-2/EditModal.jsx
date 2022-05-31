import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, Lucide, Notification } from "@/base-components";
import { getUserById } from '../../../redux/api';
import { updateUser } from '../../../redux/actions/users';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase from 'react-file-base64'
import './styles.css';
import Profile from '../../assets/images/profile.png';

const EditModal = (props) => {
  const dispatch = useDispatch();

  const { buttonModalPreview, setButtonModalPreview, id } = props;
  const [ avatar, setAvatar ] = useState("");

  const schema = yup
    .object({
      userName: yup.string().required("User name is requried").min(2),
      email: yup.string().required("This field is required").email("Email musb be valid"),
      roles: yup.string().required("This field is required"),
    })
    .required();

  const {
    register,
    trigger,
    reset,
    getValues,
    setValue,
    handleSubmit,
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

  const [updateMessage, setUpdateMessage] = useState("User updated successfylly");
  const updateNotification = useRef();

  const onSubmit = async (data) => {
    const results = await trigger();
    if (results) {
      const formData = {
        userName: data.userName,
        roles: data.roles,
        avatar: avatar || "",
      }

      dispatch(updateUser(id, formData, updateNotification, setUpdateMessage, setButtonModalPreview))
    }
  };

  const getUser = async(_id) => {
    const { data: {result} } = await getUserById(_id);
    
    if(result) {
      setAvatar(result.avatar)
      reset({
        userName: result?.userName,
        email: result?.email,
        roles: result?.roles
      })
    }
  }

  useEffect(() => {
    getUser(id);
  }, []);

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
            updateNotification.current = el;
          }}
            options={{ duration: 3000 }}
            className="flex flex-col sm:flex-row"
          >
          <div className="font-medium">
              {updateMessage}
          </div>
        </Notification>
        <form className="validate-form" onSubmit={handleSubmit(onSubmit)} >
          <div className="mx-auto mb-10 w-fit">
            <div className="flex items-center justify-between p-4 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400">
              <div className="relative mx-auto cursor-pointer zoom-in">
                <img
                  className="w-16 h-16 mx-auto rounded-md"
                  alt="Midone Tailwind HTML Admin Template"
                  src={avatar || Profile}
                />
              </div>
              <div className="relative mx-auto ml-4 cursor-pointer custom__upload">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setAvatar(base64)
                  }
                />
                <button type="button" className="w-full btn btn-primary">
                  Change Photo
                </button>
              </div>
            </div>
          </div>
          <div className="input-form">
              <label htmlFor="validation-form-1" className="form-label">Full Name*</label>
              <input
                {...register("userName")}
                id="validation-form-1"
                type="text"
                name="userName"
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.userName,
                })}
                placeholder="Full Name"
              />
              {errors.userName && (
                <div className="mt-2 text-danger">
                  {errors.userName.message}
                </div>
              )}
          </div>
          <div className="mt-4 input-form">
              <label htmlFor="validation-form-2" className="form-label">Email*</label>
              <input
                {...register("email")}
                disabled
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
          <div className="mt-4 input-form">
              <label htmlFor="validation-form-6" className="form-label">User Role*</label>
              <select
                id="validation-form-6"
                {...register("roles")}
                type="text"
                name="roles"
                className={classnames({
                  "form-select": true,
                  "form-control": true,
                  "border-danger": errors.roles,
                })}
                placeholder="Full Name"
                defaultValue={getValues('roles')}
                onChange={(e) => setValue("roles", e.target.value, {shouldValidate: true})}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.roles && (
                <div className="mt-2 text-danger">
                  {errors.roles.message}
                </div>
              )}
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