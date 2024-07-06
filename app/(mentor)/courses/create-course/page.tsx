"use client";
import CreateCourseSection from "@/components/CreateCourseSection";
import { Icourse } from "@/data/mentorInterface";
import {
  createCourseAsync,
  selectPostCourseStatus,
} from "@/lib/features/mentor/mentorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const courseInit: Icourse = {
  title: "",
  description: "",
  price: 0,
  thumbnail: "test_image",
  level: "",
  sections: [],
};

const courseValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Harga must be a number")
    .required("Harga is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
  level: Yup.string().required("Level is required"),
  sections: Yup.array()
    .min(1, "Minimal ada 1 Section !")
    .of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        desc: Yup.string().required("Description is required"),
        videos: Yup.array()
          .of(
            Yup.object().shape({
              url: Yup.string().required("URL is required"),
              title: Yup.string().required("Title is required"),
              desc: Yup.string().required("Description is required"),
              duration: Yup.number()
                .typeError("Duration must be a number")
                .positive("Min duration is 0")
                .required("Duration is required"),
            })
          )
          .required("Video is required"),
      })
    )
    .required("Section is required"),
});

const page = () => {
  const dispatch = useAppDispatch();
  const postCourseStatus = useAppSelector(selectPostCourseStatus);
  const inputThumbnailRef = React.useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState<string>("");

  const handleCreateCourse = async (data: Icourse) => {
    const formCourse = new FormData();
    formCourse.append("title", data.title);
    formCourse.append("description", data.description);
    formCourse.append("price", data.price.toString());
    formCourse.append("thumbnail", inputThumbnailRef.current!.files![0]);
    formCourse.append("level", data.level);
    formCourse.append("sections", JSON.stringify(data.sections));

    dispatch(createCourseAsync(formCourse)).then((res: any) => {
      if (res.payload.code === 201) {
        alertService.success(res.payload.message);
      } else {
        alertService.error(res.payload.message);
      }
    });
  };

  return (
    <div className="mx-auto container">
      <Formik
        initialValues={courseInit}
        validationSchema={courseValidation}
        validateOnChange
        validateOnMount
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const data = { ...values };
          await handleCreateCourse(data);
          setSubmitting(false);
          return false;
        }}
      >
        {({ isSubmitting, setFieldValue, touched, errors, values }) => (
          <Form className="flex">
            <div className="max-w-96 max-h-[90vh] overflow-y-auto sticky top-[4.2rem] pe-3">
              <h2 className="text-3xl font-medium pb-4 mt-5">Buat Course</h2>
              <div className="flex gap-3 flex-col">
                <label className="form-control">
                  <input
                    type="text"
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    placeholder="Nama Course"
                    className="input input-bordered w-full"
                  />
                  {errors.title && touched.title ? (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.title}
                      </span>
                    </div>
                  ) : null}
                </label>

                <label className="form-control">
                  <textarea
                    className="textarea textarea-bordered"
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    placeholder="Deskripsi"
                  />
                  {errors.description && touched.description ? (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.description}
                      </span>
                    </div>
                  ) : null}
                </label>

                <label className="form-control">
                  <input
                    placeholder="Harga Course"
                    className="input input-bordered w-full"
                    onChange={(e) => setFieldValue("price", e.target.value)}
                  />
                  {errors.price && touched.price ? (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.price}
                      </span>
                    </div>
                  ) : null}
                </label>

                <img className="w-full border-none" src={thumbnail} />
                <div className="flex flex-nowrap">
                  <input
                    ref={inputThumbnailRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setThumbnail(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    disabled={isSubmitting}
                    type="file"
                    className="file-input file-input-bordered border-e-0 file-input-secondary w-full"
                  />
                  <button
                    disabled={
                      isSubmitting ||
                      thumbnail === "" ||
                      inputThumbnailRef === null
                    }
                    type="button"
                    onClick={() => {
                      setThumbnail("");
                      inputThumbnailRef!.current!.value = "";
                    }}
                    className="btn btn-square btn-outline btn-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <h4>Level</h4>
                <div className="flex flex-col form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      onChange={() => setFieldValue("level", "begineer")}
                      type="radio"
                      name="level"
                      className="radio radio-primary"
                    />
                    <span className="label-text text-start w-full">
                      Begineer
                    </span>
                  </label>

                  <label className="label cursor-pointer gap-2">
                    <input
                      onChange={() => setFieldValue("level", "novice")}
                      type="radio"
                      name="level"
                      className="radio radio-primary"
                    />
                    <span className="label-text text-start w-full h-full">
                      Novice
                    </span>
                  </label>

                  <label className="label cursor-pointer gap-2">
                    <input
                      onChange={() => setFieldValue("level", "intermediatte")}
                      type="radio"
                      name="level"
                      className="radio radio-primary"
                    />
                    <span className="label-text text-start w-full">
                      Intermediatte
                    </span>
                  </label>

                  <label className="label cursor-pointer gap-2">
                    <input
                      onChange={() => setFieldValue("level", "expert")}
                      type="radio"
                      name="level"
                      className="radio radio-primary"
                    />
                    <span className="label-text text-start w-full">Expert</span>
                  </label>
                </div>
                {errors.level && touched.level ? (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.level}
                    </span>
                  </div>
                ) : null}
                <button
                  disabled={isSubmitting}
                  onClick={() => {
                    console.log(errors);
                  }}
                  type="submit"
                  className="btn btn-primary mb-5"
                >
                  {postCourseStatus === "loading" ? (
                    <span className="loading loading-spinner" />
                  ) : null}
                  Selesaikan Pembuatan
                </button>
              </div>
            </div>
            <div className="divider divider-horizontal p-0 m-0 me-2" />
            <div className="grow my-5 space-y-10">
              <FieldArray
                name="sections"
                render={(arrayHelpers) => (
                  <>
                    {values.sections.map((section, index) => (
                      <CreateCourseSection
                        section={section}
                        i={index}
                        deleteCallback={() => arrayHelpers.remove(index)}
                        key={`section-${index}`}
                      />
                    ))}
                    <button
                      disabled={isSubmitting}
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          title: "",
                          desc: "",
                          videos: [],
                        })
                      }
                      className="border rounded-md border-dashed hover:bg-secondary active:scale-95 hover:text-white transition-all border-secondary text-secondary flex justify-center items-center py-2 w-full gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-11"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h3 className="text-lg">Tambah Section</h3>
                    </button>
                  </>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
