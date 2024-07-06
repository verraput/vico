"use client";
import { IcourseUpdate } from "@/data/mentorInterface";
import {
  getOneCourseAsync,
  selectCourseDetail,
  updateCourseAsync,
} from "@/lib/features/mentor/mentorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as Yup from "yup";

const courseInit: IcourseUpdate = {
  id: 0,
  title: "",
  description: "",
  price: 0,
  thumbnail: "test_image",
  level: "",
  sections: [],
};

const courseValidation = Yup.object().shape({
  id: Yup.number().typeError("ID must be a number").required("ID is required"),
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
        id: Yup.number().notRequired(),
        course_id: Yup.number().notRequired(),
        title: Yup.string().required("Title is required"),
        desc: Yup.string().required("Description is required"),
        videos: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.number().notRequired(),
              section_id: Yup.number().notRequired(),
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
const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const course = useAppSelector(selectCourseDetail);

  const handleCreateCourse = async (data: IcourseUpdate) => {
    dispatch(updateCourseAsync(data)).then((res: any) => {
      if (res.payload.code === 201) {
        alertService.success(res.payload.message);
      } else {
        alertService.error(res.payload.message);
      }
    });
  };

  return (
    <div>
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
        {() => <>{children}</>}
      </Formik>
    </div>
  );
};

export default Layout;
