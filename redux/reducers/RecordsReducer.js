const initialState = {
  allArray: [],
  activeArray: [],
  historyArray: [],
  books: [],
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_BOOKS_FROM_SERVER":
      return {
        ...state,
        allArray: action.payload,
        activeArray: action.payload.filter((book) => !book.read),
        historyArray: action.payload.filter((book) => book.read),
      };
    case "ADD_RECORD":
      return {
        ...state,
        allArray: [action.payload, ...state.allArray],
        activeArray: [action.payload, ...state.activeArray],
      };
    case "MARK_AS_READ":
      return {
        ...state,
        historyArray: [action.payload, ...state.historyArray],
        activeArray: state.activeArray.filter(
          (p) => p.issue !== action.payload.issue
        ),
        allArray: state.allArray.map((book) => {
          if (book.issue == action.payload.issue) {
            return { ...book, read: true };
          }
          return book;
        }),
      };
    default:
      return state;
  }
};

export default books;
