import { sort } from "fast-sort";
import { isOneYearOldPlus } from "./compare";
import { IWeightedRepo, IRepo } from "./types";

export function filterActiveRepos(dataset: IRepo[]):IRepo[]{

  const tempDataSet = JSON.parse(JSON.stringify(dataset))
  const filteredData = tempDataSet.filter((repo:IRepo)=>{
    return repo.is.isArchived===false
  })
  return filteredData;
}

export function mostPopularRepo(dataset: IRepo[]): IWeightedRepo[] {

  // watchers + stars + forks
  const newDataSet = dataset.map((repo: any) => {
    return {
      name: repo?.repositoryName,
      weight: repo?.watchers + repo?.stars + repo?.forks,
    };
  });
  const sorted = sort(newDataSet).by([{ desc: (u: any) => u.weight }]);
  return sorted.slice(0, 20) as IWeightedRepo[];
}
export function mostProblematicRepo(dataset: IRepo[]): IWeightedRepo[] {
  // issues + prs
  const newDataSet = dataset.map((repo: IRepo) => {
    const issuesNumeric = repo?.issues || 0;
    const prsNumeric = repo?.pr || 0;

    return {
      name: repo?.repositoryName,
      weight: issuesNumeric + prsNumeric,
    };
  });
  const sorted = sort(newDataSet).by([{ desc: (u: any) => u.weight }]);
  return sorted.slice(0, 20) as IWeightedRepo[];
}
export function shouldBeArchived(dataset: any) {
  // not pushed in last year
  return dataset.filter(
    (repo: any) =>
      repo?.date?.pushedAt && isOneYearOldPlus(repo?.date?.pushedAt)
  );
}
export function shouldAddLicense(dataset: any) {
  // license is missing
  return dataset.filter((repo: any) => !repo?.legal?.license);
}

// const operation = (
//   list1: IWeightedRepo[],
//   list2: IWeightedRepo[],
//   isUnion = false
// ) =>
//   list1.filter(
//     (
//       (set) => (a) =>
//         isUnion === set.has(a.repositoryName)
//     )(new Set(list2.map((b) => b.repositoryName)))
//   );
// Following functions are to be used:
// const inBoth = (list1: IWeightedRepo[], list2: IWeightedRepo[]) =>
//   operation(list1, list2, true);
//inFirstOnly = operation,
//inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);

export function intersectionOfGoodAndBadRepos(
  a: IWeightedRepo[],
  b: IWeightedRepo[]
): string[] {

  let arr1 = a
    .filter((e) => {
      return b.some((item) => item.name === e.name);
    })
    .map((item) => item.name)
    .sort();

  return arr1;
}
