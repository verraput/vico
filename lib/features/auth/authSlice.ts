import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProfile, login, registerLearner, registerMentor } from "./authAPI";

export interface AuthSliceState {
  loginData: {
    name: string;
    email: string;
    user_type: string;
    uuid: string;
    username: string;
    profile_picture: string;
    phone_number: string;
    email_verified: Boolean;
    status: "idle" | "loading" | "failed";
  };
  registerData: {
    status: "idle" | "loading" | "failed";
  };
}

const initialState: AuthSliceState = {
  loginData: {
    name: "",
    email: "",
    user_type: "",
    uuid: "",
    email_verified: false,
    status: "idle",
    profile_picture: "",
    username: "",
    phone_number: "",
  },
  registerData: {
    status: "idle",
  },
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   }
    // ),

    clearLogin: create.reducer((state) => {
      state.loginData = {
        name: "",
        email: "",
        user_type: "",
        uuid: "",
        email_verified: false,
        status: "idle",
        profile_picture: "",
        username: "",
        phone_number: "",
      };
    }),

    getProfileAsync: create.asyncThunk(
      async () => {
        const token = localStorage.getItem("token");
        const response = await getProfile(token ?? "");
        return response;
      },
      {
        pending: (state) => {
          state.loginData.status = "loading";
        },
        fulfilled: (state, action) => {
          if (action.payload.code === 200) {
            state.loginData = {
              name: action.payload.data.name,
              email: action.payload.data.email,
              user_type: action.payload.data.user_type,
              uuid: action.payload.data.uuid,
              email_verified: action.payload.data.email_verified,
              profile_picture: action.payload.data.profile_picture,
              username: action.payload.data.username,
              phone_number: action.payload.data.phone_number,
              status: "idle",
            };
          }
        },
        rejected: (state) => {
          state.loginData.status = "failed";
        },
      }
    ),

    loginAsync: create.asyncThunk(
      async ({ email, pass }: { email: string; pass: string }) => {
        const response = await login(email, pass);
        return response;
      },
      {
        pending: (state) => {
          state.loginData.status = "loading";
        },
        fulfilled: (state, action) => {
          state.loginData.status = "idle";
          if (action.payload.code === 200) {
            state.loginData = {
              name: action.payload.data.name,
              email: action.payload.data.email,
              user_type: action.payload.data.user_type,
              uuid: action.payload.data.uuid,
              email_verified: action.payload.data.email_verified,
              profile_picture: action.payload.data.profile_picture,
              username: action.payload.data.username,
              phone_number: action.payload.data.phone_number,
              status: "idle",
            };
            localStorage.setItem("token", action.payload.tokens.access.token);
            localStorage.setItem(
              "refreshToken",
              action.payload.tokens.refresh.token
            );
          }
        },
        rejected: (state) => {
          state.loginData.status = "failed";
        },
      }
    ),

    registerLearnerAsync: create.asyncThunk(
      async ({
        name,
        email,
        password,
        confirm_password,
      }: {
        name: string;
        email: string;
        password: string;
        confirm_password: string;
      }) => {
        const response = await registerLearner(
          name,
          email,
          password,
          confirm_password
        );
        return response;
      },
      {
        pending: (state) => {
          state.registerData.status = "loading";
        },
        fulfilled: (state, action) => {
          state.registerData.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.registerData.status = "failed";
        },
      }
    ),

    registerMentorAsync: create.asyncThunk(
      async ({
        name,
        email,
        password,
        confirm_password,
        phone_number,
      }: {
        name: string;
        email: string;
        password: string;
        confirm_password: string;
        phone_number: string;
      }) => {
        const response = await registerMentor(
          name,
          email,
          password,
          confirm_password
        );
        return response;
      },
      {
        pending: (state) => {
          state.registerData.status = "loading";
        },
        fulfilled: (state, action) => {
          state.registerData.status = "idle";
          console.log(action.payload);
        },
        rejected: (state) => {
          state.registerData.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectLogin: (counter) => counter.loginData,
    selectRegister: (counter) => counter.registerData,
  },
});

export const {
  loginAsync,
  registerLearnerAsync,
  registerMentorAsync,
  getProfileAsync,
  clearLogin,
} = authSlice.actions;

export const { selectLogin, selectRegister } = authSlice.selectors;
