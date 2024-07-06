export interface IbodyCreateCourse {
  author: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  sections: Array<IsectionCreateCourse>;
}

interface IsectionCreateCourse {
  title: string;
  desc: string;
  videos: Array<IvideoCreateCourse>;
}

interface IvideoCreateCourse {
  url: string;
  title: string;
  desc: string;
  duration: number;
}

export interface IdeleteCourse {
  status: Boolean;
  code: number;
  message: string;
}

export interface IcreateCourse {
  status: Boolean;
  code: number;
  message: string;
}

export interface IaddUserToCourse {
  status: Boolean;
  code: number;
  message: string;
}

export interface IgetAllCourseMentor {
  status: Boolean;
  code: number;
  message: string;
  data: Array<IcourseMentor>;
}

export interface IcourseMentor {
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
  sections: Array<{
    id: number;
    videos: Array<{
      duration: number;
    }>;
  }>;
}

export interface IgetOneCourseMentor {
  status: Boolean;
  code: number;
  message: string;
  data: IcourseDetailMentor;
}

export interface IcourseDetailMentor {
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

  sections: Array<IsectionDetailMentor>;
}

interface IsectionDetailMentor {
  id: number;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  course_id: number;
  videos: Array<IvideoDetailMentor>;
}

interface IvideoDetailMentor {
  id: number;
  url: string;
  title: string;
  desc: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  section_id: number;
}

export interface IgetAllLearnerinCourse {
  status: Boolean;
  code: number;
  message: string;
  data: {
    course: IcourseDatainLearner;
    learner: Array<IlearnerinCourse>;
  };
}

export interface IcourseDatainLearner {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface IlearnerinCourse {
  name: string;
  username: null;
  profile_picture: null;
  uuid: string;
}

export interface IsearchLearner {
  status: Boolean;
  code: number;
  message: string;
  data: Array<IlearnerinCourse>;
}

export interface IdeleteLearnerinCourse {
  status: Boolean;
  code: number;
  message: string;
}

export interface Icourse {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  sections: Array<Isection>;
}

export interface Isection {
  title: string;
  desc: string;
  videos: Array<Ivideo>;
}

export interface Ivideo {
  url: string;
  title: string;
  desc: string;
  duration: number;
}

export interface IcourseUpdate {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  level: string;
  sections: Array<IsectionUpdate>;
}

export interface IsectionUpdate {
  id: number;
  course_id: number;
  title: string;
  desc: string;
  videos: Array<IvideoUpdate>;
}

export interface IvideoUpdate {
  id: number;
  section_id: number;
  url: string;
  title: string;
  desc: string;
  duration: number;
}
