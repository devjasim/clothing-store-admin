import {
  Lucide,
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "@/base-components";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Main() {
  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      age: yup
        .number()
        .required()
        .test(
          "len",
          "age must be less than or equal to 3",
          (val) => val.toString().length <= 3
        ),
      url: yup.string().url(),
      comment: yup.string().required().min(10),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
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

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Form Validation</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            {({ toggle }) => (
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Implementation
                  </h2>
                  <div className="w-full mt-3 form-check form-switch sm:w-auto sm:ml-auto sm:mt-0">
                    <label
                      className="ml-0 form-check-label"
                      htmlFor="show-example-1"
                    >
                      Show example code
                    </label>
                    <input
                      onClick={toggle}
                      className="ml-3 mr-0 form-check-input"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                      <div className="input-form">
                        <label
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </label>
                        <input
                          {...register("name")}
                          id="validation-form-1"
                          type="text"
                          name="name"
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.name,
                          })}
                          placeholder="John Legend"
                        />
                        {errors.name && (
                          <div className="mt-2 text-danger">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <label
                          htmlFor="validation-form-2"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Email
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, email address format
                          </span>
                        </label>
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
                      <div className="mt-3 input-form">
                        <label
                          htmlFor="validation-form-3"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Password
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 6 characters
                          </span>
                        </label>
                        <input
                          {...register("password")}
                          id="validation-form-3"
                          type="password"
                          name="password"
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.password,
                          })}
                          placeholder="secret"
                        />
                        {errors.password && (
                          <div className="mt-2 text-danger">
                            {errors.password.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <label
                          htmlFor="validation-form-4"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Age
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, integer only & maximum 3 characters
                          </span>
                        </label>
                        <input
                          {...register("age")}
                          id="validation-form-4"
                          type="number"
                          name="age"
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.age,
                          })}
                          placeholder="21"
                        />
                        {errors.age && (
                          <div className="mt-2 text-danger">
                            {errors.age.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <label
                          htmlFor="validation-form-5"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Profile URL
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Optional, URL format
                          </span>
                        </label>
                        <input
                          {...register("url")}
                          id="validation-form-5"
                          type="text"
                          name="url"
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.url,
                          })}
                          placeholder="https://google.com"
                        />
                        {errors.url && (
                          <div className="mt-2 text-danger">
                            {errors.url.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <label
                          htmlFor="validation-form-6"
                          className="flex flex-col w-full form-label sm:flex-row"
                        >
                          Comment
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 10 characters
                          </span>
                        </label>
                        <textarea
                          {...register("comment")}
                          id="validation-form-6"
                          name="comment"
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.comment,
                          })}
                          placeholder="Type your comments"
                        ></textarea>
                        {errors.comment && (
                          <div className="mt-2 text-danger">
                            {errors.comment.message}
                          </div>
                        )}
                      </div>
                      <button type="submit" className="mt-5 btn btn-primary">
                        Register
                      </button>
                    </form>
                    {/* END: Validation Form */}
                  </Preview>
                  <Source>
                    <Highlight type="javascript">
                      {`
                      const schema = yup
                      .object({
                        name: yup.string().required().min(2),
                        email: yup.string().required().email(),
                        password: yup.string().required().min(6),
                        age: yup
                          .number()
                          .required()
                          .test(
                            "len",
                            "age must be less than or equal to 3",
                            (val) => val.toString().length <= 3
                          ),
                        url: yup.string().url(),
                        comment: yup.string().required().min(10),
                      })
                      .required();
                  
                    const {
                      register,
                      trigger,
                      formState: { errors },
                    } = useForm({
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
                      `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: Form Validation */}
          {/* BEGIN: Success Notification Content */}
          <div
            id="success-notification-content"
            className="flex hidden toastify-content"
          >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Registration success!</div>
              <div className="mt-1 text-slate-500">
                Please check your e-mail for further info!
              </div>
            </div>
          </div>
          {/* END: Success Notification Content */}
          {/* BEGIN: Failed Notification Content */}
          <div
            id="failed-notification-content"
            className="flex hidden toastify-content"
          >
            <Lucide icon="XCircle" className="text-danger" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Registration failed!</div>
              <div className="mt-1 text-slate-500">
                Please check the fileld form.
              </div>
            </div>
          </div>
          {/* END: Failed Notification Content */}
        </div>
      </div>
    </>
  );
}

export default Main;
