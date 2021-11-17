export const AccountReducer = (state, action) => {
  switch (action) {
    case "getData":
      return {
        onLoading: true,
        data: { ...state.data },
      };
    default:
      return { ...state };
  }
};
