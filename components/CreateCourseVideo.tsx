"use client";
import { Icourse, Ivideo } from "@/data/mentorInterface";
import { ErrorMessage, useFormikContext } from "formik";
import React from "react";

const CreateCourseVideo = ({
  video,
  i,
  iCourse,
  deleteCallback,
}: {
  video: Ivideo;
  i: number;
  iCourse: number;
  deleteCallback: () => void;
}) => {
  const { isSubmitting, setFieldValue } = useFormikContext<Icourse>();
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mx-2">
        <h3 className="font-medium text-xl">Video {i + 1}</h3>
        <div
          className="tooltip tooltip-error tooltip-left"
          data-tip={`Hapus Video ${i + 1}`}
        >
          <button
            disabled={isSubmitting}
            onClick={() => deleteCallback()}
            type="button"
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
        value={video.title}
        onChange={(e) =>
          setFieldValue(
            `sections[${iCourse}].videos[${i}].title`,
            e.target.value
          )
        }
        placeholder="Title video"
        className="input input-bordered w-full"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${iCourse}.videos.${i}.title`} />
      </div>
      <input
        type="text"
        value={video.url}
        onChange={(e) =>
          setFieldValue(`sections[${iCourse}].videos[${i}].url`, e.target.value)
        }
        placeholder="Url Video Youtube"
        className="input input-bordered w-full"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${iCourse}.videos.${i}.url`} />
      </div>
      <input
        type="text"
        value={video.duration}
        onChange={(e) =>
          setFieldValue(
            `sections[${iCourse}].videos[${i}].duration`,
            e.target.value
          )
        }
        placeholder="Durasi Video"
        className="input input-bordered w-full"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${iCourse}.videos.${i}.duration`} />
      </div>
      <textarea
        className="textarea textarea-bordered w-full"
        value={video.desc}
        onChange={(e) =>
          setFieldValue(
            `sections[${iCourse}].videos[${i}].desc`,
            e.target.value
          )
        }
        placeholder="Deskripsi Video"
      />
      <div className="text-xs text-error pb-2 ps-1">
        <ErrorMessage name={`sections.${iCourse}.videos.${i}.desc`} />
      </div>
    </div>
  );
};

export default CreateCourseVideo;
