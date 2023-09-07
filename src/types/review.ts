// ----------------------------------------------------------------------

type IReviewUsers = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type IReviewItemProp = {
  id: string;
  name: string;
  rating: number;
  postedAt: Date | string | number;
  message: string;
  helpful: number;
  avatarUrl: string;
  users: IReviewUsers[];
};

export type IReviewProps = {
  comment: string;
  company: string;
  createdAt: string;
  rating: number;
  updatedAt: string;
  customer: {
    name: string;
    _id: string;
    profile_picture?: string;
  };
  _id: string;
};

export type IReviewsPaginationProps = {
  currentPage: number;
  pages: number;
};
