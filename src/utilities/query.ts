import { sort } from 'fast-sort'
import { isOneYearOldPlus } from './compare'
import { IWeightedRepo, IRepo, ISummaryAggregateItem } from './types'

export function filterActiveRepos(dataset: IRepo[]): IRepo[] {
    const tempDataSet = JSON.parse(JSON.stringify(dataset))
    const filteredData = tempDataSet.filter((repo: IRepo) => {
        return repo.is.isArchived === false
    })
    return filteredData
}

export function mostPopularRepo(dataset: IRepo[]): IWeightedRepo[] {
    // watchers + stars + forks
    const newDataSet = dataset.map((repo: any) => {
        return {
            name: repo?.repositoryName,
            weight: repo?.watchers + repo?.stars + repo?.forks
        }
    })
    const sorted = sort(newDataSet).by([{ desc: (u: any) => u.weight }])
    return sorted.slice(0, 20) as IWeightedRepo[]
}
export function mostProblematicRepo(dataset: IRepo[]): IWeightedRepo[] {
    // issues + prs
    const newDataSet = dataset.map((repo: IRepo) => {
        const issuesNumeric = repo?.issues || 0
        const prsNumeric = repo?.pr || 0

        return {
            name: repo?.repositoryName,
            weight: issuesNumeric + prsNumeric
        }
    })
    const sorted = sort(newDataSet).by([{ desc: (u: any) => u.weight }])
    return sorted.slice(0, 20) as IWeightedRepo[]
}
export function shouldBeArchived(dataset: any) {
    // not pushed in last year
    return dataset.filter(
        (repo: any) =>
            repo?.date?.pushedAt && isOneYearOldPlus(repo?.date?.pushedAt)
    )
}
export function shouldAddLicense(dataset: any) {
    // license is missing
    return dataset.filter((repo: any) => !repo?.legal?.license)
}

export function intersectionOfGoodAndBadRepos(
    a: IWeightedRepo[],
    b: IWeightedRepo[]
): string[] {
    let arr1 = a
        .filter((e) => {
            return b.some((item) => item.name === e.name)
        })
        .map((item) => item.name)
        .sort()

    return arr1
}

export function countOfActive(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isArchived === false).length
}
export function countOfArchived(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isArchived === true).length
}
export function countOfDisabled(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isDisabled === true).length
}
export function countOfEmpty(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isEmpty === true).length
}
export function countOfPrivate(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isPrivate === true).length
}
export function countOfTemplate(dataset: IRepo[]): number {
    return dataset.filter((item) => item?.is?.isTemplate === true).length
}
export function countOfMissingLicense(dataset: IRepo[]): number {
    return dataset.filter((item) => !item?.legal?.license).length
}
export function aggregateSummaryDate(repos: IRepo[]): ISummaryAggregateItem[] {
    if (!repos || repos.length === 0) return []

    const aggData: ISummaryAggregateItem[] = []

    aggData.push({ name: 'Missing legal', count: countOfMissingLicense(repos) })
    aggData.push({ name: 'Active repos', count: countOfActive(repos) })
    aggData.push({ name: 'Archived repos', count: countOfArchived(repos) })
    aggData.push({ name: 'Template repos', count: countOfTemplate(repos) })

    // Doesn't repo from external account
    //aggData.push({ name: "Disabled repos", count: countOfDisabled(repos) });
    //aggData.push({ name: "Empty repos", count: countOfEmpty(repos) });
    //aggData.push({ name: "Private repos", count: countOfPrivate(repos) });

    return aggData
}
