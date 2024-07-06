"use client";
import {
  registerLearnerAsync,
  registerMentorAsync,
  selectRegister,
} from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

const learnerValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  password: Yup.string()
    .nonNullable()
    .required("Password harus diisi!")
    .min(6, "Minimal 6 karakter!"),
  name: Yup.string()
    .required("Nama harus diisi !")
    .max(100, "Maksimal 100 karakter"),
});

const mentorValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  password: Yup.string()
    .nonNullable()
    .required("Password harus diisi!")
    .min(6, "Minimal 6 karakter!"),
  name: Yup.string()
    .required("Nama harus diisi !")
    .max(100, "Maksimal 100 karakter"),
  phone_number: Yup.string()
    .required("Nomor Whatsapp harus diisi !")
    .test(
      "length",
      "Maksimal 18 karakter!",
      (val) => val.toString().length < 18
    )
    .matches(/^62\d+$/, "Nomor Whatsapp harus diawali dengan 62"),
});

const Page = () => {
  const dispatch = useAppDispatch();
  const registerData = useAppSelector(selectRegister);
  const router = useRouter();

  const learnerInit = {
    name: "",
    email: "",
    password: "",
  };

  const mentorInit = {
    email: "",
    password: "",
    name: "",
    phone_number: "",
  };

  const handleLearnerRegister = async (data: typeof learnerInit) => {
    dispatch(
      registerLearnerAsync({
        email: data.email,
        name: data.name,
        password: data.password,
        confirm_password: data.password,
      })
    ).then((res: any) => {
      if (res.payload.code !== 201) {
        alertService.error(res.payload.message);
      } else {
        alertService.info(res.payload.message);
        router.push("/login");
      }
    });
  };

  const handleMentorRegister = async (data: typeof mentorInit) => {
    dispatch(
      registerMentorAsync({
        email: data.email,
        name: data.name,
        password: data.password,
        confirm_password: data.password,
        phone_number: data.phone_number,
      })
    ).then((res: any) => {
      if (res.payload.code !== 201) {
        alertService.error(res.payload.message);
      } else {
        alertService.info(res.payload.message);
        router.push("/login");
      }
    });
  };

  return (
    <main className="mx-auto text-center h-screen flex items-center">
      <div className="overflow-hidden h-screen max-md:hidden grow">
        <img
          alt="Orang belajar di kasur"
          width={1000}
          height={1000}
          src="/rich-tervet.jpg"
          className="h-full object-cover w-full"
        />
      </div>
      <div className="flex flex-col gap-10 mx-20 max-md:mx-auto">
        <img />
        <div>
          <h1 className="text-3xl font-semibold">Daftar</h1>
          <h4 className="">Mulai petualangan belajar anda sekarang</h4>
        </div>

        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="register_tabs"
            role="tab"
            className="tab"
            aria-label="Learner"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
            <Formik
              initialValues={learnerInit}
              validationSchema={learnerValidation}
              validateOnChange
              validateOnMount
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const data = { ...values };
                await handleLearnerRegister(data);
                return false;
              }}
            >
              {({ isSubmitting, setFieldValue, touched, errors }) => (
                <Form className="space-y-2">
                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.email && touched.email ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        type="text"
                        className="grow"
                        placeholder="Email"
                      />
                    </div>

                    {errors.email && touched.email ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.email}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.password && touched.password ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                        type="password"
                        className="grow"
                        placeholder="Password"
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.password}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.name && touched.name ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
                        />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                        type="text"
                        className="grow"
                        placeholder="Nama"
                      />
                    </div>
                    {errors.name && touched.name ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.name}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <button
                    disabled={isSubmitting || registerData.status === "loading"}
                    type="submit"
                    className="btn btn-default w-full mt-10"
                  >
                    <span
                      className={`${
                        registerData.status === "loading" ? "loading" : ""
                      } loading-spinner`}
                    />
                    Daftar
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <input
            type="radio"
            name="register_tabs"
            role="tab"
            className="tab"
            aria-label="Mentor"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
            <Formik
              initialValues={mentorInit}
              validationSchema={mentorValidation}
              validateOnChange
              validateOnMount
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const data = { ...values };
                await handleMentorRegister(data);
                return false;
              }}
            >
              {({ isSubmitting, setFieldValue, touched, errors }) => (
                <Form className="space-y-2">
                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.email && touched.email ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        type="text"
                        className="grow"
                        placeholder="Email"
                      />
                    </div>

                    {errors.email && touched.email ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.email}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.password && touched.password ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                        type="password"
                        className="grow"
                        placeholder="Password"
                      />
                    </div>
                    {errors.password && touched.password ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.password}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.name && touched.name ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
                        />
                      </svg>
                      <input
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                        type="text"
                        className="grow"
                        placeholder="Nama"
                      />
                    </div>
                    {errors.name && touched.name ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.name}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <label className="form-control">
                    <div
                      className={`input input-bordered ${
                        errors.phone_number && touched.phone_number
                          ? "input-error"
                          : ""
                      } flex items-center gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <input
                        type="text"
                        className="grow"
                        onChange={(e) => {
                          setFieldValue("phone_number", e.target.value);
                        }}
                        placeholder="Nomor Whatsapp"
                      />
                    </div>

                    {errors.phone_number && touched.phone_number ? (
                      <div className="label">
                        <span className="label-text-alt text-error">
                          {errors.phone_number}
                        </span>
                      </div>
                    ) : null}
                  </label>

                  <button
                    disabled={isSubmitting || registerData.status === "loading"}
                    type="submit"
                    className="btn btn-default w-full mt-10"
                  >
                    {/* TODO: Add loading class when fetching a login api */}
                    <span
                      className={`${
                        registerData.status === "loading" ? "loading" : ""
                      } loading-spinner`}
                    />
                    Daftar
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <Link href={"/login"} className="text-sm pt-1 flex justify-center">
          <p>Sudah memiliki akun?,</p>
          <p className="underline">login sekarang.</p>
        </Link>
      </div>
    </main>
  );
};

export default Page;
