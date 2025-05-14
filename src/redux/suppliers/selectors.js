export const selectSuppliers = state => state.suppliers.items;
export const selectIsLoading = state => state.suppliers.isLoading;
export const selectError = state => state.suppliers.error;
export const selectPagination = state => state.suppliers.pagination;
export const selectCurrentPage = state => state.suppliers.pagination.page;
export const selectTotalPages = state => state.suppliers.pagination.totalPages;
export const selectTotalItems = state => state.suppliers.pagination.totalItems;
export const selectNameFilter = state => state.suppliers.filter.name;
