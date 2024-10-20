export const sortedBy = [
    {
        value: "starsCount",
        searchParam: "stars",
        label: "Stars",
    },
    {
        value: "forksCount",
        searchParam: "forks",
        label: "Forks",
    },
    {
        value: "watchersCount",
        searchParam: "watchers",
        label: "Watchers",
    },
]

export const sortMap = sortedBy.reduce((acc: Record<string, string>, item) => {
    const key = item.searchParam; // convert the label to lowercase
    acc[key] = item.value;
    return acc;
  }, {});