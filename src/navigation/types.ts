import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  SuperAdminTabs: NavigatorScreenParams<SuperAdminTabParamList>;
  SupervisorTabs: NavigatorScreenParams<SupervisorTabParamList>;
  ProcurementTabs: NavigatorScreenParams<ProcurementTabParamList>;
  AccountantTabs: NavigatorScreenParams<AccountantTabParamList>;
  BillDetails: { billId: string };
  RequestDetails: { requestId: string };
  SiteDetails: { siteId: string };
  TaskDetails: { taskId: string };
};

export type SuperAdminTabParamList = {
  Dashboard: undefined;
  Sites: undefined;
  Supervisors: undefined;
  Vendors: undefined;
  Billing: undefined;
  Analytics: undefined;
  Profile: undefined;
};

export type SupervisorTabParamList = {
  Tasks: undefined;
  RequestMaterial: undefined;
  Services: undefined;
  Budget: undefined;
  Profile: undefined;
};

export type ProcurementTabParamList = {
  ApprovedRequests: undefined;
  SubmitPurchase: undefined;
  History: undefined;
  Profile: undefined;
};

export type AccountantTabParamList = {
  Pending: undefined;
  Approved: undefined;
  Rejected: undefined;
  Profile: undefined;
};

// Common screen params
export type CommonScreenParamList = {
  BillDetails: { billId: string };
  RequestDetails: { requestId: string };
  SiteDetails: { siteId: string };
  TaskDetails: { taskId: string };
}; 