export const selectOrders = (state) => state.orders.items;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectError = (state) => state.orders.error;
export const selectCurrentPage = (state) => state.orders.pagination.page;
export const selectTotalPages = (state) => state.orders.pagination.totalPages;
export const selectTotalItems = (state) => state.orders.pagination.totalItems;
export const selectNameFilter = (state) => state.orders.filter.name;

