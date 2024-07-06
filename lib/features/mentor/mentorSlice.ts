import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addUserToCourse,
  createCourse,
  deleteCourse,
  deleteLearnerInCourse,
  getAllLearnerinCourse,
  getMentorCourseDetail,
  getMentorCourses,
  searchLearner,
  updateCourse,
} from "./mentorAPI";
import {
  IbodyCreateCourse,
  IcourseDatainLearner,
  IcourseDetailMentor,
  IcourseMentor,
  IcourseUpdate,
  IlearnerinCourse,
} from "@/data/mentorInterface";

export interface mentorSliceState {
  postCourse: {
    status: "idle" | "loading" | "failed";
  };

  updateCourse: {
    status: "idle" | "loading" | "failed";
  };

  deleteCourse: {
    status: "idle" | "loading" | "failed";
  };

  addUserToCourse: {
    status: "idle" | "loading" | "failed";
  };

  courses: {
    data: Array<IcourseMentor>;
    status: "idle" | "loading" | "failed";
  };

  courseDetail: {
    data: IcourseDetailMentor;
    status: "idle" | "loading" | "failed";
  };

  learnerInCourse: {
    data: {
      course: IcourseDatainLearner;
      learner: Array<IlearnerinCourse>;
    };
    status: "idle" | "loading" | "failed";
  };

  searchLearner: {
    data: Array<IlearnerinCourse>;
    status: "idle" | "loading" | "failed";
  };

  deleteLearnertoCourse: {
    status: "idle" | "loading" | "failed";
  };
}

const initialState: mentorSliceState = {
  postCourse: {
    status: "idle",
  },
  deleteCourse: {
    status: "idle",
  },
  addUserToCourse: {
    status: "idle",
  },

  courses: {
    data: [],
    status: "idle",
  },

  courseDetail: {
    data: {
      id: 0,
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
      level: "",
      createdAt: "",
      updatedAt: "",
      author: "",
      sections: [],
      user: {
        name: "",
      },
    },
    status: "idle",
  },
  learnerInCourse: {
    data: {
      course: {
        id: 0,
        title: "",
        description: "",
        price: 0,
        thumbnail: "",
        level: "",
        createdAt: "",
        updatedAt: "",
        author: "",
      },
      learner: [],
    },
    status: "idle",
  },
  searchLearner: {
    data: [],
    status: "idle",
  },
  deleteLearnertoCourse: {
    status: "idle",
  },
  updateCourse: {
    status: "idle",
  },
};

export const mentorSlice = createAppSlice({
  name: "mentor",
  initialState,
  reducers: (create) => ({
    setSearchLearner: create.reducer(
      (state, action: PayloadAction<Array<IlearnerinCourse>>) => {
        state.searchLearner.data = action.payload;
      }
    ),
    createCourseAsync: create.asyncThunk(
      async (course: FormData) => {
        const response = await createCourse(course);
        return response;
      },
      {
        pending: (state) => {
          state.postCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.postCourse.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.postCourse.status = "failed";
        },
      }
    ),

    updateCourseAsync: create.asyncThunk(
      async (course: IcourseUpdate) => {
        const response = await updateCourse(course);
        return response;
      },
      {
        pending: (state) => {
          state.updateCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.updateCourse.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.updateCourse.status = "failed";
        },
      }
    ),

    deleteCourseAsync: create.asyncThunk(
      async (idCourse: number) => {
        const response = await deleteCourse(idCourse);
        return response;
      },
      {
        pending: (state) => {
          state.deleteCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.deleteCourse.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.deleteCourse.status = "failed";
        },
      }
    ),

    addUserToCourseAsync: create.asyncThunk(
      async ({ idCourse, idUser }: { idCourse: number; idUser: string }) => {
        const response = await addUserToCourse(idCourse, idUser);
        return response;
      },
      {
        pending: (state) => {
          state.addUserToCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.addUserToCourse.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.addUserToCourse.status = "failed";
        },
      }
    ),

    getAllCourseAsync: create.asyncThunk(
      async () => {
        const response = await getMentorCourses();
        return response;
      },
      {
        pending: (state) => {
          state.courses.status = "loading";
        },
        fulfilled: (state, action) => {
          state.courses.status = "idle";
          state.courses.data = action.payload.data;
        },
        rejected: (state) => {
          state.courses.status = "failed";
        },
      }
    ),

    getOneCourseAsync: create.asyncThunk(
      async (idCourse: number) => {
        const response = await getMentorCourseDetail(idCourse);
        return response;
      },
      {
        pending: (state) => {
          state.courseDetail.status = "loading";
        },
        fulfilled: (state, action) => {
          state.courseDetail.status = "idle";
          state.courseDetail.data = action.payload.data;
        },
        rejected: (state) => {
          state.courseDetail.status = "failed";
        },
      }
    ),

    getAllLearnerInCourseAsync: create.asyncThunk(
      async (idCourse: number) => {
        const response = await getAllLearnerinCourse(idCourse);
        return response;
      },
      {
        pending: (state) => {
          state.learnerInCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.learnerInCourse.status = "idle";
          console.log(action.payload);
          state.learnerInCourse.data = action.payload.data;
        },
        rejected: (state) => {
          state.learnerInCourse.status = "failed";
        },
      }
    ),

    searchLearnerAsync: create.asyncThunk(
      async (search: string) => {
        const response = await searchLearner(search);
        return response;
      },
      {
        pending: (state) => {
          state.searchLearner.status = "loading";
        },
        fulfilled: (state, action) => {
          state.searchLearner.status = "idle";
          state.searchLearner.data = action.payload.data;
        },
        rejected: (state) => {
          state.searchLearner.status = "failed";
        },
      }
    ),

    deleteLearnertoCourseAsync: create.asyncThunk(
      async ({ idCourse, idUser }: { idCourse: number; idUser: string }) => {
        const response = await deleteLearnerInCourse(idCourse, idUser);
        return response;
      },
      {
        pending: (state) => {
          state.deleteLearnertoCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.deleteLearnertoCourse.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.deleteLearnertoCourse.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectPostCourseStatus: (state) => state.postCourse.status,
    selectDeleteCourseStatus: (state) => state.deleteCourse.status,
    selectAddUserToCourseStatus: (state) => state.addUserToCourse.status,
    selectCourses: (state) => state.courses,
    selectCourseDetail: (state) => state.courseDetail,
    selectLearnerInCourse: (state) => state.learnerInCourse,
    selectSearchLearner: (state) => state.searchLearner,
    selectDeleteLearnertoCourseStatus: (state) =>
      state.deleteLearnertoCourse.status,
    selectUpdateCourseStatus: (state) => state.updateCourse.status,
  },
});

export const {
  createCourseAsync,
  deleteCourseAsync,
  addUserToCourseAsync,
  getAllCourseAsync,
  getOneCourseAsync,
  getAllLearnerInCourseAsync,
  searchLearnerAsync,
  setSearchLearner,
  deleteLearnertoCourseAsync,
  updateCourseAsync,
} = mentorSlice.actions;

export const {
  selectPostCourseStatus,
  selectDeleteCourseStatus,
  selectAddUserToCourseStatus,
  selectCourses,
  selectCourseDetail,
  selectLearnerInCourse,
  selectSearchLearner,
  selectDeleteLearnertoCourseStatus,
  selectUpdateCourseStatus,
} = mentorSlice.selectors;
