export const selectCustomers = (state) => state.customers.items;
export const selectIsLoading = (state) => state.customers.isLoading;
export const selectError = (state) => state.customers.error;
export const selectPagination = (state) => state.customers.pagination;
export const selectCurrentPage = (state) => state.customers.pagination.page;
export const selectTotalPages = (state) =>
	state.customers.pagination.totalPages;
export const selectNameFilter = (state) => state.customers.filter.name;
