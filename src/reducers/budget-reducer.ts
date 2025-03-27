import { DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense['id'] } }
  | { type: "get-expense-by-id"; payload: { id: Expense['id'] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  edtingId: Expense['id']
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  edtingId: ''
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "hide-modal") {
    return {
      ...state,
      modal: false,
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    };
  }

  return state;
};
