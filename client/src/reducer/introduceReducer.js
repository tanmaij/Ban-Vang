const introduceReducer = (state, action) => {
  switch (action) {
    case "next1":
      return {
        item1: "introduceItem1 introduceItem show",
        item2: "introduceItem2 introduceItem hide",
        item3: "introduceItem introduceItem3 hide",
      };
    case "next2":
      return {
        item1: "introduceItem1 introduceItem hide",
        item2: "introduceItem2 introduceItem show",
        item3: "introduceItem introduceItem3 hide",
      };
    case "next3":
      return {
        item1: "introduceItem1 introduceItem hide",
        item2: "introduceItem2 introduceItem hide",
        item3: "introduceItem introduceItem3 show",
      };
  }
};
export default introduceReducer;
