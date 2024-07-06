export interface IgetAllCourse {
  status: Boolean;
  code: number;
  message: string;
  data: { course: Array<IcourseHome>; learner_progress: Array<IcourseLearner> };
}

export interface IcourseHome {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  user: { name: string };
  user_courses: Array<{ id: number }>;
}

export interface IgetCourseDetail {
  status: Boolean;
  code: number;
  message: string;
  data: IcourseDetail;
}

export interface IcourseDetail {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  user: { name: string };
  user_courses: Array<{ id: number }>;
  sections: Array<IcourseDetailSection>;
}

export interface IcourseDetailSection {
  title: string;
  desc: string;
  videos: Array<IcourseDetailVideo>;
}

export interface IcourseDetailVideo {
  title: string;
  duration: number;
}

export interface IgetDiskusi {
  status: Boolean;
  code: number;
  message: string;
  data: Array<Idiskusi>;
}

export interface Idiskusi {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  course_id: number;
  user_id: string;
  user: {
    name: string;
    profile_picture: string;
    uuid: string;
  };
}

export interface IpostDiskusi {
  status: Boolean;
  code: number;
  message: string;
}

export interface IdeleteDiskusi {
  status: Boolean;
  code: number;
  message: string;
}

export interface IgetCart {
  status: Boolean;
  code: number;
  message: string;
  data: Array<Icart>;
}

export interface Icart {
  id: number;
  createdAt: string;
  updatedAt: string;
  course_id: number;
  user_id: string;
  course: {
    title: string;
    price: number;
    thumbnail: string;
    level: string;
    user: {
      name: string;
    };
    sections: Array<IsectionCart>;
  };
}

interface IsectionCart {
  createdAt: string;
  videos: Array<IvideoDuration>;
}

interface IvideoDuration {
  duration: number;
}

export interface IaddToCart {
  status: Boolean;
  code: number;
  message: string;
}

export interface IremoveFromCart {
  status: Boolean;
  code: number;
  message: string;
}

export interface IgetAllCourseLearner {
  status: Boolean;
  code: number;
  message: string;
  data: Array<IcourseLearner>;
}

export interface IcourseLearner {
  id: number;
  createdAt: string;
  updatedAt: string;
  course_id: number;
  user_id: string;
  course: {
    title: string;
    thumbnail: string;
    user: {
      name: string;
    };
  };
}

export interface IgetDetailCourseLearner {
  status: Boolean;
  code: number;
  message: string;
  data: IdetailCourseLearner;
}

export interface IdetailCourseLearner {
  id: number;
  course: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    level: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    user: {
      name: string;
    };
    sections: Array<IsectionDetailCourseLearner>;
  };
}

export interface IsectionDetailCourseLearner {
  id: number;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  course_id: number;
  videos: Array<IvideoDetailCourseLearner>;
}

export interface IvideoDetailCourseLearner {
  id: number;
  url: string;
  title: string;
  desc: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  section_id: number;
}
