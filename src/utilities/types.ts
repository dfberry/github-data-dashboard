export type IRepoRaw = {
    org: IRepo[];
    date: string;
}

export type IWeightedRepo = {
  name: string;
  weight: number;
};

export type IRepo = {
  _id: string;
  diskUsage: number;
  repositoryName: string;
  languages: string[];
  legal: {
    license: string;
  };
  is: {
    isArchived: boolean;
    isEmpty: boolean;
    isPrivate: boolean;
    isTemplate: boolean;
    isSecurityPolicyEnabled: boolean;
    isDisabled: boolean;
  };
  has: {
    hasWikiEnabled: boolean;
  };
  date: {
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
  };
  watchers: number;
  forks: number;
  issues: number;
  lastPushToDefaultBranch: {
    name: string;
    message: string;
    pushedDate: string;
    committedDate: string;
  };
  customDateUploaded: string;
  stars: number;
  pr: number;
};
