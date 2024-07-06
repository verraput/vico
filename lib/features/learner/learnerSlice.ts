import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteDiskusi,
  getAllCourse,
  getAllCourseLearner,
  getCart,
  getCourseDetail,
  getDetailCourselearner,
  getDiskusi,
  postDiskusi,
  removeFromCart,
} from "./learnerAPI";
import {
  Icart,
  IcourseDetail,
  IcourseHome,
  IcourseLearner,
  IdetailCourseLearner,
  Idiskusi,
  IgetAllCourseLearner,
  IvideoDetailCourseLearner,
} from "@/data/learnerInterface";

export interface learnerSliceState {
  homeCourse: {
    status: "idle" | "loading" | "failed";
    data: {
      course: Array<IcourseHome>;
      learner_progress: Array<IcourseLearner>;
    };
  };
  courseDetail: {
    status: "idle" | "loading" | "failed";
    data: IcourseDetail;
  };

  courseDiskusi: {
    status: "idle" | "loading" | "failed";
    data: Array<Idiskusi>;
  };

  postDiskusi: {
    status: "idle" | "loading" | "failed";
  };

  deleteDiskusi: {
    status: "idle" | "loading" | "failed";
  };

  cart: {
    status: "idle" | "loading" | "failed";
    data: Array<Icart>;
  };

  addToCart: {
    status: "idle" | "loading" | "failed";
  };

  removeFromCart: {
    status: "idle" | "loading" | "failed";
  };

  allCourseLearner: {
    status: "idle" | "loading" | "failed";
    data: Array<IcourseLearner>;
  };

  courseDetailLearner: {
    status: "idle" | "loading" | "failed";
    data: IdetailCourseLearner;
  };

  selectedVideoDetail: IvideoDetailCourseLearner;
}

const initialState: learnerSliceState = {
  homeCourse: {
    status: "idle",
    data: { course: [], learner_progress: [] },
  },

  courseDetail: {
    status: "idle",
    data: {
      id: 0,
      title: "",
      description: "",
      level: "",
      price: "",
      thumbnail: "",
      author: "",
      createdAt: "",
      updatedAt: "",
      user: {
        name: "",
      },
      user_courses: [],
      sections: [],
    },
  },

  courseDiskusi: {
    status: "idle",
    data: [],
  },

  postDiskusi: {
    status: "idle",
  },

  deleteDiskusi: {
    status: "idle",
  },
  cart: {
    status: "idle",
    data: [],
  },
  addToCart: {
    status: "idle",
  },
  removeFromCart: {
    status: "idle",
  },
  allCourseLearner: {
    status: "idle",
    data: [],
  },
  courseDetailLearner: {
    status: "idle",
    data: {
      id: 0,
      course: {
        id: 0,
        title: "",
        description: "",
        price: 0,
        thumbnail: "",
        level: "",
        createdAt: "",
        author: "",
        sections: [],
        user: {
          name: "",
        },
        updatedAt: "",
      },
    },
  },
  selectedVideoDetail: {
    id: 0,
    title: "",
    duration: 0,
    desc: "",
    url: "",
    section_id: 0,
    createdAt: "",
    updatedAt: "",
  },
};

export const learnerSlice = createAppSlice({
  name: "learner",
  initialState,
  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   }
    // ),

    setVideoDetail: create.reducer(
      (state, action: PayloadAction<IvideoDetailCourseLearner>) => {
        state.selectedVideoDetail = action.payload;
      }
    ),

    getAllCourseAsync: create.asyncThunk(
      async () => {
        const response = await getAllCourse();
        return response;
      },
      {
        pending: (state) => {
          state.homeCourse.status = "loading";
        },
        fulfilled: (state, action) => {
          state.homeCourse.status = "idle";
          state.homeCourse.data = action.payload.data;
        },
        rejected: (state) => {
          state.homeCourse.status = "failed";
        },
      }
    ),

    getCourseDetailAsync: create.asyncThunk(
      async (id: number) => {
        const response = await getCourseDetail(id);
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
    getDiskusiAsync: create.asyncThunk(
      async (id: number) => {
        const response = await getDiskusi(id);
        return response;
      },
      {
        pending: (state) => {
          state.courseDiskusi.status = "loading";
        },
        fulfilled: (state, action) => {
          state.courseDiskusi.status = "idle";
          state.courseDiskusi.data = action.payload.data;
        },
        rejected: (state) => {
          state.courseDiskusi.status = "failed";
        },
      }
    ),

    postDiskusiAsync: create.asyncThunk(
      async ({ idCourse, message }: { idCourse: number; message: string }) => {
        const response = await postDiskusi(idCourse, message);
        return response;
      },
      {
        pending: (state) => {
          state.postDiskusi.status = "loading";
        },
        fulfilled: (state, action) => {
          state.postDiskusi.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.postDiskusi.status = "failed";
        },
      }
    ),

    deleteDiskusiAsync: create.asyncThunk(
      async (idDiskusi: number) => {
        const response = await deleteDiskusi(idDiskusi);
        return response;
      },
      {
        pending: (state) => {
          state.deleteDiskusi.status = "loading";
        },
        fulfilled: (state, action) => {
          state.deleteDiskusi.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.deleteDiskusi.status = "failed";
        },
      }
    ),

    getCartAsync: create.asyncThunk(
      async () => {
        const response = await getCart();
        return response.data;
      },
      {
        pending: (state) => {
          state.cart.status = "loading";
        },
        fulfilled: (state, action) => {
          state.cart.status = "idle";
          state.cart.data = action.payload;
        },
        rejected: (state) => {
          state.cart.status = "failed";
        },
      }
    ),

    addToCartAsync: create.asyncThunk(
      async (idCourse: number) => {
        const response = await addToCart(idCourse);
        return response;
      },
      {
        pending: (state) => {
          state.addToCart.status = "loading";
        },
        fulfilled: (state, action) => {
          state.addToCart.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.addToCart.status = "failed";
        },
      }
    ),

    removeFromCartAsync: create.asyncThunk(
      async (idCourse: number) => {
        const response = await removeFromCart(idCourse);
        return response;
      },
      {
        pending: (state) => {
          state.removeFromCart.status = "loading";
        },
        fulfilled: (state, action) => {
          state.removeFromCart.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.removeFromCart.status = "failed";
        },
      }
    ),

    getAllCourseLearnerAsync: create.asyncThunk(
      async () => {
        const response = await getAllCourseLearner();
        return response;
      },
      {
        pending: (state) => {
          state.allCourseLearner.status = "loading";
        },
        fulfilled: (state, action) => {
          state.allCourseLearner.status = "idle";
          state.allCourseLearner.data = action.payload.data;
        },
        rejected: (state) => {
          state.allCourseLearner.status = "failed";
        },
      }
    ),

    getOneCourseLearnerAsync: create.asyncThunk(
      async (id: number) => {
        const response = await getDetailCourselearner(id);
        return response;
      },
      {
        pending: (state) => {
          state.courseDetailLearner.status = "loading";
        },
        fulfilled: (state, action) => {
          state.courseDetailLearner.status = "idle";
          state.courseDetailLearner.data = action.payload.data;
          state.selectedVideoDetail =
            action.payload.data.course.sections[0].videos[0];
        },
        rejected: (state) => {
          state.courseDetailLearner.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectHomeCourse: (state) => state.homeCourse,
    selectCourseDetail: (state) => state.courseDetail,
    selectDiskusi: (state) => state.courseDiskusi,
    selectPostDiskusi: (state) => state.postDiskusi,
    selectDeleteDiskusi: (state) => state.deleteDiskusi,
    selectCart: (state) => state.cart,
    selectAddToCart: (state) => state.addToCart,
    selectRemoveFromCart: (state) => state.removeFromCart,
    selectAllCourseLearner: (state) => state.allCourseLearner,
    selectDetailCourseLearner: (state) => state.courseDetailLearner,
    selectSelectedVideoDetail: (state) => state.selectedVideoDetail,
  },
});

export const {
  getAllCourseAsync,
  getCourseDetailAsync,
  getDiskusiAsync,
  postDiskusiAsync,
  deleteDiskusiAsync,
  getCartAsync,
  addToCartAsync,
  removeFromCartAsync,
  getAllCourseLearnerAsync,
  getOneCourseLearnerAsync,
  setVideoDetail,
} = learnerSlice.actions;

export const {
  selectCourseDetail,
  selectDiskusi,
  selectHomeCourse,
  selectDeleteDiskusi,
  selectPostDiskusi,
  selectCart,
  selectAddToCart,
  selectRemoveFromCart,
  selectAllCourseLearner,
  selectDetailCourseLearner,
  selectSelectedVideoDetail,
} = learnerSlice.selectors;
