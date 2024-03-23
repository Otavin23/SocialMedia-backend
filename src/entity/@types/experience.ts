export interface IExperience {
  companyName: string;
  locality: string;
  jobType: string;

  initialJob: {
    month: string;
    year: string;
  };

  finishJob: {
    month: string;
    year: string;
  };

  description: string;
  image: string;
}
