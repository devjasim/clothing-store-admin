import React, { useRef, useState } from 'react'
import { Modal, ModalBody, Lucide, Notification } from "@/base-components";
import { updateUser } from '../../../redux/actions/users';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EditPassword = (props) => {
  const dispatch = useDispatch();

  const { showPassModal, setShowPassModal, id } = props;

  const schema = yup
    .object({
      newPassword: yup.string().required("This field is required"),
      confirmPassword: yup.string().required("This field is required")
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    })
    .required();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await trigger();
    if (result) {
      const formData = {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }
      dispatch(updateUser(id, formData , basicNonStickyNotification))
      setShowPassModal(false);
    }
  };

  const basicNonStickyNotification = useRef();

  return (
    <Modal
      size="modal-lg"
      backdrop="1"
      transparency
      show={showPassModal}
      onHidden={() => {
        setShowPassModal(false);
      }}
    >
      <a
        onClick={() => {
          setShowPassModal(false);
        }}
        className="absolute top-0 right-0 mt-3 mr-3"
        href="#"
      >
        <Lucide icon="X" className="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody className="p-10 mt-4">
        <div className="mb-5 text-center">
          <h2 className='text-3xl'>Update Password</h2>
        </div>
        <Notification getRef={(el)=> {
            basicNonStickyNotification.current = el;
          }}
            options={{ duration: 3000 }}
            className="flex flex-col sm:flex-row"
          >
          <div className="font-medium">
              Password updated
          </div>
        </Notification>
        <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-form">
              <label htmlFor="validation-form-1" className="form-label">New Password*</label>
              <input
                {...register("newPassword")}
                id="validation-form-1"
                type="password"
                name="newPassword"
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.newPassword,
                })}
                placeholder="New Password"
              />
              {errors.newPassword && (
                <div className="mt-2 text-danger">
                  {errors.newPassword.message}
                </div>
              )}
          </div>
          <div className="mt-5 input-form">
              <label htmlFor="validation-form-2" className="form-label">Confirm Password*</label>
              <input
                {...register("confirmPassword")}
                id="validation-form-2"
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
                setShowPassModal(false);
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

export default EditPassword