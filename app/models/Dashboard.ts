export interface CategoryDashboard {
  category: string;
  total: string;
}

export interface AccountDashboard {
  account: string;
  total: string;
}

export interface Dashboard {
  balance: {
    income: string;
    expense: string;
    total: string;
  };
  categories: CategoryDashboard[];
  accounts: AccountDashboard[];
}
