import React, { useRef, useState } from 'react'
import { Modal, ModalBody, Lucide, Notification } from "@/base-components";
import { createUser } from '../../../redux/actions/users';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase from 'react-file-base64'
import './styles.css';
import Profile from '../../assets/images/profile.png';

const CreateUser = (props) => {
  const dispatch = useDispatch();

  const { createUserModal, setCreateUserModal } = props;
  const [notification, setNotification] = useState("User created successfylly");
  const [ avatar, setAvatar ] = useState("");

  const schema = yup
    .object({
      userName: yup.string().required("User name is requried").min(2),
      email: yup.string().required("This field is required").email("Email musb be valid"),
      password: yup.string().required("This field is required"),
      confirmPassword: yup.string().required("This field is required")
      .oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    .required();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const createNotification = useRef();

  const onSubmit = async (data) => {
    const results = await trigger();
    if (results) {
      const formData = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        avatar: avatar || ""
      }

      dispatch(createUser(formData , createNotification, setNotification, setCreateUserModal))
    }
  };

  return (
    <Modal
      size="modal-lg"
      backdrop="1"
      transparency
      show={createUserModal}
      onHidden={() => {
        setCreateUserModal(false);
      }}
    >
      <a
        onClick={() => {
          setCreateUserModal(false);
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
            createNotification.current = el;
          }}
            options={{ duration: 3000 }}
            className="flex flex-col sm:flex-row"
          >
          <div className="font-medium">
              {notification}
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
                id="validation-form-2"
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
              <label htmlFor="validation-form-3" className="form-label">Password*</label>
              <input
                {...register("password")}
                id="validation-form-3"
                type="password"
                name="password"
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.password,
                })}
                placeholder="Password"
              />
              {errors.password && (
                <div className="mt-2 text-danger">
                  {errors.password.message}
                </div>
              )}
          </div>
          <div className="mt-4 input-form">
              <label htmlFor="validation-form-4" className="form-label">Confirm Password*</label>
              <input
                {...register("confirmPassword")}
                id="validation-form-4"
                type="password"
                name="confirmPassword"
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.confirmPassword,
                })}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <div className="mt-2 text-danger">
                  {errors.confirmPassword.message}
                </div>
              )}
          </div>
          <div className="flex justify-between px-5 pb-8 mt-10">
            <button
              type="button"
              onClick={() => {
                setCreateUserModal(false);
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

export default CreateUser