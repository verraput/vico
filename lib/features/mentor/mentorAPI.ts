import {
  IaddUserToCourse,
  IbodyCreateCourse,
  Icourse,
  IcourseUpdate,
  IcreateCourse,
  IdeleteCourse,
  IdeleteLearnerinCourse,
  IgetAllCourseMentor,
  IgetAllLearnerinCourse,
  IgetOneCourseMentor,
  IsearchLearner,
} from "@/data/mentorInterface";

export const createCourse = async (course: FormData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/course`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: course,
  });
  const result: IcreateCourse = await response.json();

  return result;
};

export const updateCourse = async (course: IcourseUpdate) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/course`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...course }),
  });
  const result: IcreateCourse = await response.json();

  return result;
};

export const deleteCourse = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/course/${idCourse}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result: IdeleteCourse = await response.json();

  return result;
};

export const addUserToCourse = async (idCourse: number, idUser: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay/add-learner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ course_id: idCourse, user_id: idUser }),
  });
  const result: IaddUserToCourse = await response.json();

  return result;
};

export const getMentorCourses = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/course/mentor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result: IgetAllCourseMentor = await response.json();

  return result;
};

export const getMentorCourseDetail = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/mentor/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetOneCourseMentor = await response.json();

  return result;
};

export const getAllLearnerinCourse = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay/all-learner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ course_id: idCourse }),
  });
  const result: IgetAllLearnerinCourse = await response.json();

  return result;
};

export const searchLearner = async (search: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/pay/search-learner?q=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result: IsearchLearner = await response.json();

  return result;
};

export const deleteLearnerInCourse = async (
  idCourse: number,
  idUser: string
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay/delete-learner`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ course_id: idCourse, user_id: idUser }),
  });

  const result: IdeleteLearnerinCourse = await response.json();

  return result;
};
