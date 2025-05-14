export const selectProducts = state => state.products.items;
export const selectIsLoading = state => state.products.isLoading;
export const selectError = state => state.products.error;
export const selectPagination = state => state.products.pagination;
export const selectCurrentPage = state => state.products.pagination.page;
export const selectTotalPages = state => state.products.pagination.totalPages;
export const selectTotalItems = state => state.products.pagination.totalItems;
export const selectNameFilter = state => state.products.filter.name;