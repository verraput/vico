"use client";
import React, { useEffect } from "react";
import CreateCourseVideo from "./CreateCourseVideo";
import { Icourse, Isection, Ivideo } from "@/data/mentorInterface";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";

const CreateCourseSection = ({
  section,
  i,
  deleteCallback,
}: {
  section: Isection;
  i: number;
  deleteCallback: () => void;
}) => {
  const { isSubmitting, setFieldValue, values } =
    useFormikContext<Icourse>();

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-medium">Section {i + 1}</h3>
        <div
          className="tooltip tooltip-error tooltip-left"
          data-tip={`Hapus Section ${i + 1}`}
        >
          <button
            disabled={isSubmitting}
            type="button"
            onClick={() => deleteCallback()}
            className="btn btn-circle btn-outline btn-error"
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
      </div>
      <input
        type="text"
        value={section.title}
        onChange={(e) => setFieldValue(`sections[${i}].title`, e.target.value)}
        placeholder="Judul Section"
        className="input input-bordered w-full"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${i}.title`} />
      </div>
      <textarea
        className="textarea textarea-bordered w-full"
        value={section.desc}
        onChange={(e) => setFieldValue(`sections[${i}].desc`, e.target.value)}
        placeholder="Deskripsi Section"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${i}.desc`} />
      </div>
      <div className="text-xs mx-3 my-2">
        <p>
          Copy dan paste url youtube, lalu ambil hanya ID videonya saja, contoh:
        </p>
        <p className="mt-1">https://www.youtube.com/watch?v=xeQVvnVr1BM</p>
        <p>ID Video: xeQVvnVr1BM</p>
      </div>
      <div className="pt-6 grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <FieldArray
          name={`sections[${i}].videos`}
          render={(arrayHelpers) => (
            <>
              {values.sections[i].videos.map((video, index) => (
                <CreateCourseVideo
                  deleteCallback={() => arrayHelpers.remove(index)}
                  i={index}
                  iCourse={i}
                  video={video}
                  key={`video-${index}`}
                />
              ))}

              <button
                disabled={isSubmitting}
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    title: "",
                    url: "",
                    duration: 0,
                    desc: "",
                  })
                }
                className="border rounded-md border-dashed hover:bg-secondary active:scale-95 hover:text-white transition-all border-secondary text-secondary flex justify-center items-center py-16 gap-3"
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

                <h3 className="text-lg">Tambah Video</h3>
              </button>
            </>
          )}
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default CreateCourseSection;
