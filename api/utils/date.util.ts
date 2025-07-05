export function dateFilterOptions(query: any) {
  const { start, end } = query;

  if (!!start && !end) {
    return {
      createdAt: {
        $gte: new Date(parseInt(start)).toISOString(),
      },
    };
  } else if (!start && !!end) {
    return {
      createdAt: {
        $lte: new Date(parseInt(end)).toISOString(),
      },
    };
  } else if (!!start && !!end) {
    return {
      createdAt: {
        $gte: new Date(parseInt(start)).toISOString(),
        $lte: new Date(parseInt(end)).toISOString(),
      },
    };
  } else {
    return {};
  }
}
