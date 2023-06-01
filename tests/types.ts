export type GetUserResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
    {
      id: number;
      email: '';
      first_name: '';
      last_name: '';
      avatar: '';
    },
  ];
  support: {
    url: '';
    text: '';
  };
};

export type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

export type UpdateUserResponse = {
  name: string;
  job: string;
  updatedAt: string;
};
