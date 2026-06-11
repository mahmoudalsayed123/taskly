export async function pagination(page: string | undefined) {
  const currentPage = Number(page) || 1;

  const limit = 1;

  const skip = (currentPage - 1) * limit;

  return {
    currentPage,
    limit,
    skip,
  };
}
