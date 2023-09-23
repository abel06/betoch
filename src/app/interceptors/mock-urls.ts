export interface EndPoint {
    url: string,
    filePath: string,
    uniqueField: string,
}
export const endpoints: EndPoint[] = [
    // {
    //     url: "/credit/customers",
    //     filePath: "customers.json",
    //     uniqueField: "uuid"
    // },
  //   {
  //     url: "/credit/users",
  //     filePath: "credit-users.json",
  //     uniqueField: "clientCode"
  // },
//   {
//     url: "/credit/invoice/payments-no-invoice",
//     filePath: "credit-invoice.json",
//     uniqueField: "clientCode"
// },
  //   {
  //     url: "credit/account-balance",
  //     filePath: "account-balance.json",
  //     uniqueField: "installmentCode"
  // }

/*   {
    url: "/credit/stations",
    filePath: "stations.json",
    uniqueField: "station"
} */
/*{
    url: "translation-code-api-get-rest/translations",
    filePath: "stream-codes.json",
    uniqueField: "uuid"
},
{
  url: "/credit/installment/deliberation",
  filePath: "deliberations.json",
  uniqueField: "amount"
}*/
// {
//   url: "/credit/customer/supply",
//   filePath: "customer-supply.json",
//   uniqueField: "pod"
// },
// {
//   url: "/credit/customer/supply",
//   filePath: "customer-supply.json",
//   uniqueField: "pod"
// },
//  {
//     url: "/suspension-dashboard/client",
//     filePath: "suspensionDashboardClientList.json",
//     uniqueField: "clientCode"
// }
//  /* {
//     url: "/credit-cashin-api-get/credit/plan/history",
//     filePath: "pdrHistory.json",
//     uniqueField: "id"
// }  */
//  {
//     url: "/credit/credit-workflow-api-get-rest/credit/customer/invoice",
//     filePath: "customer-invoice.json",
//     uniqueField: "code"
// }/operations
// {
//       url: "/credit/credit-workflow-api-get-rest/operations",
//       filePath: "report.json",
//       uniqueField: "typeId"
//   }
{
      url: "/houses",
      filePath: "house.json",
      uniqueField: "id"
  }

]
