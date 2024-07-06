import {
  IaddToCart,
  IdeleteDiskusi,
  IgetAllCourse,
  IgetAllCourseLearner,
  IgetCart,
  IgetCourseDetail,
  IgetDetailCourseLearner,
  IgetDiskusi,
  IpostDiskusi,
  IremoveFromCart,
} from "@/data/learnerInterface";

export const getAllCourse = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetAllCourse = await response.json();

  return result;
};

export const getCourseDetail = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/one/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetCourseDetail = await response.json();

  return result;
};

export const getDiskusi = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/${idCourse}/diskusi`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetDiskusi = await response.json();

  return result;
};

export const postDiskusi = async (idCourse: number, message: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/${idCourse}/diskusi`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    }
  );
  const result: IpostDiskusi = await response.json();

  return result;
};

export const deleteDiskusi = async (idDiskusi: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/diskusi/${idDiskusi}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IdeleteDiskusi = await response.json();

  return result;
};

export const getCart = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result: IgetCart = await response.json();

  return result;
};

export const addToCart = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ course_id: idCourse }),
  });
  const result: IaddToCart = await response.json();

  return result;
};

export const removeFromCart = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/pay`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ course_id: idCourse }),
  });
  const result: IremoveFromCart = await response.json();

  return result;
};

export const getAllCourseLearner = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/learner`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetAllCourseLearner = await response.json();

  return result;
};

export const getDetailCourselearner = async (idCourse: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/course/learner/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result: IgetDetailCourseLearner = await response.json();

  return result;
};
