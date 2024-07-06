"use client";
import SiswaCard from "@/components/SiswaCard";
import { IlearnerinCourse } from "@/data/mentorInterface";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  addUserToCourseAsync,
  deleteLearnertoCourseAsync,
  getAllLearnerInCourseAsync,
  searchLearnerAsync,
  selectLearnerInCourse,
  selectSearchLearner,
  setSearchLearner,
} from "@/lib/features/mentor/mentorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [learner, setLearner] = React.useState<IlearnerinCourse>();
  const profile = useAppSelector(selectLogin);
  const learners = useAppSelector(selectLearnerInCourse);
  const learnerSearch = useAppSelector(selectSearchLearner);
  const inputSearchRef = React.useRef<HTMLInputElement>(null);
  const modalDeleteSiswaRef = React.useRef<HTMLDialogElement>(null);
  const modalAddSiswaRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        if (profile.user_type === null || profile.user_type === "") {
          dispatch(getProfileAsync());
        }
      } else {
        router.replace("/login");
      }
    }
    dispatch(getAllLearnerInCourseAsync(parseInt(params.id)));
  }, []);

  const handleSearch = () => {
    if (inputSearchRef.current?.value || inputSearchRef.current?.value !== "") {
      dispatch(searchLearnerAsync(inputSearchRef.current!.value)).then(
        (res: any) => {
          if (res.payload.code !== 200) {
            alertService.error(res.payload.message);
          }
        }
      );
    }
  };

  const handleClearSearch = () => {
    if (learnerSearch.status !== "loading") {
      dispatch(setSearchLearner([]));
    }
  };

  const handleSiswaModal = (type: string, learner: IlearnerinCourse) => {
    setLearner(learner);
    if (type === "delete") modalDeleteSiswaRef.current?.showModal();
    else if (type === "add") modalAddSiswaRef.current?.showModal();
  };

  const handleDeleteSiswa = () => {
    setLoading(true);
    dispatch(
      deleteLearnertoCourseAsync({
        idCourse: parseInt(params.id),
        idUser: learner!.uuid,
      })
    ).then((res: any) => {
      if (res.payload.code !== 200) {
        alertService.error(res.payload.message);
      } else {
        dispatch(getAllLearnerInCourseAsync(parseInt(params.id)));
        alertService.success(res.payload.message);
      }
      modalDeleteSiswaRef.current?.close();
      setLoading(false);
    });
  };

  const handleAddSiswa = () => {
    setLoading(true);
    dispatch(
      addUserToCourseAsync({
        idCourse: parseInt(params.id),
        idUser: learner!.uuid,
      })
    ).then((res: any) => {
      if (res.payload.code !== 201) {
        alertService.error(res.payload.message);
      } else {
        dispatch(getAllLearnerInCourseAsync(parseInt(params.id)));
        alertService.success(res.payload.message);
      }
      modalAddSiswaRef.current?.close();
      setLoading(false);
    });
  };

  return (
    <div className="mx-auto container">
      <h2 className="text-3xl font-medium pb-4 mt-5">Tambah Siswa</h2>

      <h4 className="text-2xl font-medium">{learners.data.course.title}</h4>
      <p>{learners.data.course.description}</p>
      <p className="mt-5">
        {new Intl.NumberFormat("id-ID").format(learners.data.learner.length)}{" "}
        Student
      </p>
      <h4 className="text-2xl font-medium mt-10">Cari Siswa</h4>
      <p className="mb-3">
        Cari siswa berdasarkan nama, email, username, atau copy paste ID mereka
      </p>
      <div className="flex gap-4">
        <label className="input input-bordered flex items-center pe-0 gap-2 max-w-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            ref={inputSearchRef}
            type="text"
            className="grow"
            placeholder="Cari siswa"
          />
          <button onClick={() => handleSearch()} className="btn btn-primary">
            {learnerSearch.status === "loading" ? (
              <span className="loading loading-spinner" />
            ) : (
              "Cari"
            )}
          </button>
        </label>

        <div className="tooltip tooltip-accent" data-tip="Bersihkan pencarian">
          <button
            onClick={() => handleClearSearch()}
            className="btn btn-accent"
          >
            {learnerSearch.status === "loading" ? (
              <span className="loading loading-spinner" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-10 mt-3">
        {learnerSearch.data.map((learner, i) => (
          <SiswaCard
            action={() => {
              handleSiswaModal("add", learner);
            }}
            learner={learner}
            key={`${learner.uuid}-${i}`}
          />
        ))}
      </div>

      <h4 className="text-2xl font-medium mt-10 mb-3">Siswa Terdaftar</h4>
      <div className="grid grid-cols-2 gap-5 mb-10">
        {learners.data.learner.map((learner, i) => (
          <SiswaCard
            action={() => {
              handleSiswaModal("delete", learner);
            }}
            learner={learner}
            key={`${learner.uuid}-${i}`}
          />
        ))}
      </div>

      <dialog
        ref={modalAddSiswaRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambahkan Siswa ke kelas</h3>
          <p className="py-4">
            Apakah anda yakin ingin menambahkan siswa ini ke kelas?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Tutup</button>
            </form>
            <button
              onClick={() => handleAddSiswa()}
              className="btn btn-primary"
            >
              {loading && <span className="loading loading-spinner" />}
              Tambahkan
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        ref={modalDeleteSiswaRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus Siswa dari kelas</h3>
          <p className="py-4">
            Apakah anda yakin ingin menghapus siswa ini dari kelas?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Tutup</button>
            </form>
            <button
              onClick={() => handleDeleteSiswa()}
              className="btn btn-error"
            >
              {loading && <span className="loading loading-spinner" />}
              Hapus siswa
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;
