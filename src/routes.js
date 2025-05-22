import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

//import components

//spot
const SpotPairs = React.lazy(() => import("./views/spot/list"));
const addPair = React.lazy(() => import("./views/spot/addPair"));
const SpotOrders = React.lazy(() => import("./views/spot/orderHisrory"));
const SpotTrades = React.lazy(() => import("./views/spot/tradeHistory"));
//Futures
const FuturesPairs = React.lazy(() => import("./views/futures/list"));
const FuturesaddPair = React.lazy(() => import("./views/futures/addPair"));
const FuturesOrderHist = React.lazy(() => import("./views/futures/closedpnl"));
const FuturesTradeHist = React.lazy(() =>
  import("./views/futures/tradeHistory")
);
const FundingRateHistory = React.lazy(() =>
  import("./views/futures/fundingrateHistory")
);
const FuturesTrades = React.lazy(() => import("./views/futures/tradeHistory"));

//Inverse
const InversePairs = React.lazy(() => import("./views/inverse/list"));
const InverseaddPair = React.lazy(() => import("./views/inverse/addPair"));
const InverseOrderHist = React.lazy(() => import("./views/inverse/closedpnl"));
const InverseTradeHist = React.lazy(() =>
  import("./views/inverse/tradeHistory")
);
const InverseFRH = React.lazy(() =>
  import("./views/inverse/fundingrateHistory")
);
const InverseTrades = React.lazy(() => import("./views/inverse/tradeHistory"));
//Admin And User
const UserList = React.lazy(() => import("./views/user/list"));
const UserKycList = React.lazy(() => import("./views/userKyc/userKycList"));
const UserKycRegList = React.lazy(() => import("./views/userKyc/kycHistory"));
const UserAsset = React.lazy(() => import("./views/user/userAssetList"));
const MMAdd = React.lazy(() => import("./views/user/FeeManagement"));
const KycDetails = React.lazy(() => import("./views/userKyc/kycDetails"));
const LoginHistory = React.lazy(() => import("./views/Login/loginHistory"));
const SubAdminloginHistory = React.lazy(() =>
  import("./views/Login/SubAdminloginHistory")
);
const ProfileDetails = React.lazy(() => import("./views/profile/profile"));
const ChangePassword = React.lazy(() =>
  import("./views/changePassword/changePassword")
);
const IpManagement = React.lazy(() =>
  import("./views/ipManagement/ipManagementList")
);
const AddIpAddress = React.lazy(() =>
  import("./views/ipManagement/addIpAddress")
);
//Announcement
const Announcement = React.lazy(() => import("./views/user/Announcement"));
//newsLetter
const NewsLetter = React.lazy(() => import("./views/newsLetter/newsLetter"));

//2FA
const Google2FA = React.lazy(() =>
  import("./views/2FA-settings/Two-Factor-Auth")
);

//perpetual
const PerpetualPairs = React.lazy(() => import("./views/Perpetual/list"));
const PerpetualAddPairs = React.lazy(() => import("./views/Perpetual/addPair"));
const PerpetualOrderHist = React.lazy(() =>
  import("./views/Perpetual/orderHistory")
);
const PerpetualTradeHist = React.lazy(() =>
  import("./views/Perpetual/tradeHistory")
);

//staking
const StakeList = React.lazy(() => import("./views/Staking/list"));
const AddStaking = React.lazy(() => import("./views/Staking/addPair"));
const StakeOrder = React.lazy(() => import("./views/Staking/stakeOrder"));
const StakeSettle = React.lazy(() => import("./views/Staking/stakeSettle"));

//price convertion
const PriceCnv = React.lazy(() => import("./views/priceCNV/list"));
const EditCnv = React.lazy(() => import("./views/priceCNV/edit"));
//smslog
const Smslog = React.lazy(() => import("./views/smslog/list"));
//contactus
const ContactUs = React.lazy(() => import("./views/contactUs/list"));
const ReplayUser = React.lazy(() => import("./views/contactUs/chat"));

const P2pPairs = React.lazy(() => import("./views/p2p/Pair"));
const addP2pPair = React.lazy(() => import("./views/p2p/addPair"));
const p2pTrade = React.lazy(() => import("./views/p2p/p2pTrade"));
const p2pReports = React.lazy(() => import("./views/p2p/reports"));
const p2pReportAction = React.lazy(() => import("./views/p2p/reportDetail"));
const p2pTradeview = React.lazy(() => import("./views/p2p/p2pTradeview"));
const P2pDisputeTrade = React.lazy(() =>
  import("./views/p2p/p2p-DisputeTrade")
);

// coin list
const CoinList = React.lazy(() => import("./views/Coin/coinList"));
const CoinAdd = React.lazy(() => import("./views/Coin/coinAdd"));
const CoinUpdate = React.lazy(() => import("./views/Coin/coinUpdate"));

const NewListing = React.lazy(() => import("./views/newListing/List"));
const AddList = React.lazy(() => import("./views/newListing/Add"));
const UpdateList = React.lazy(() => import("./views/newListing/Update"));
// commission list
const ReportList = React.lazy(() => import("./views/Commission/list"));

const Deposit = React.lazy(() => import("./views/Transfer/Deposit"));
const InvalidDeposit = React.lazy(() =>
  import("./views/Transfer/InvalidDeposit")
);
const Withdraw = React.lazy(() => import("./views/Transfer/Withdraw"));

//Template
const EmailtemplateList = React.lazy(() =>
  import("./views/Emailtemplates/TemplateList")
);
const UpdateTemplate = React.lazy(() =>
  import("./views/Emailtemplates/Update")
);

//CMS
const CmsList = React.lazy(() => import("./views/Cms/CmsList"));
const UpdateCms = React.lazy(() => import("./views/Cms/Update"));

//FaqCategory
const FaqcategoryList = React.lazy(() =>
  import("./views/FaqCategory/CategoryList")
);
const AddFaqCategory = React.lazy(() => import("./views/FaqCategory/Add"));
const UpdateFaqCategory = React.lazy(() =>
  import("./views/FaqCategory/Update")
);

//Faq
const FaqList = React.lazy(() => import("./views/Faq/FaqList"));
const AddFaq = React.lazy(() => import("./views/Faq/Add"));
const UpdateFaq = React.lazy(() => import("./views/Faq/Update"));

//passbook
const PassBookList = React.lazy(() => import("./views/PassBook/List"));
const UsrLoginHist = React.lazy(() => import("./views/user/LoginHistory"));

//supportcategory
const SupportCategorylist = React.lazy(() =>
  import("./views/SupportCategory/List")
);
const AddSupportCategory = React.lazy(() =>
  import("./views/SupportCategory/Add")
);
const UpdateSupportCategory = React.lazy(() =>
  import("./views/SupportCategory/Update")
);
const Support = React.lazy(() => import("./views/Support/TicketList"));

//support
const TicketReply = React.lazy(() => import("./views/Support/TicketReply"));
//sitesetting
const SiteSetting = React.lazy(() => import("./views/SiteSetting/Sitesetting"));

const PruchaseTokenHistory = React.lazy(() =>
  import("./views/Launchpad/purchaseHistory")
);
const Launchpad = React.lazy(() =>
  import("./views/Launchpad/launchpad-Management")
);
const AddLaunchpad = React.lazy(() => import("./views/Launchpad/addLaunchpad"));
//Admincontroller
const SubAdmin = React.lazy(() => import("./views/SubAdmin/List"));
const AddAdmin = React.lazy(() => import("./views/SubAdmin/Add"));
const UpdateAdmin = React.lazy(() => import("./views/SubAdmin/Update"));
const AdminProfit = React.lazy(() => import("./views/AdminProfit/List"));
//modules
const ModulesList = React.lazy(() => import("./views/Modules/List"));
const AddModule = React.lazy(() => import("./views/Modules/Add"));
const UpdateModule = React.lazy(() => import("./views/Modules/Update"));

//submodules
const SubModulesList = React.lazy(() => import("./views/SubModules/List"));
const AddSubModule = React.lazy(() => import("./views/SubModules/Add"));
const UpdateSubModule = React.lazy(() => import("./views/SubModules/Update"));
//rolemangement
const Role = React.lazy(() => import("./views/RoleManagement/List"));
const RoleAdd = React.lazy(() => import("./views/RoleManagement/Add"));
const RoleUpdate = React.lazy(() => import("./views/RoleManagement/Update"));
const CoinWithdraw = React.lazy(() => import("./views/Transfer/CoinWithdraw"));
const FiatWithdraw = React.lazy(() => import("./views/Transfer/FiatWithdraw"));
const FiatDeposit = React.lazy(() => import("./views/Transfer/FiatDeposit"));
const UserHistory = React.lazy(() => import("./views/userHistory/historical"));
const AddReferralSetting = React.lazy(() => import("./views/Referral/add"));
const ReferralList = React.lazy(() => import("./views/Referral/list"));
const referralBonus = React.lazy(() =>
  import("./views/Referral/referralBonusList")
);

//Slider Management
const SliderManage = React.lazy(() => import("./views/SliderManage/Manage"));
//trade bot
const BotList = React.lazy(() => import("./views/TradeBot/list"));
const AddBot = React.lazy(() => import("./views/TradeBot/addBot"));
const BotUser = React.lazy(() => import("./views/TradeBot/addbotUser"));
//volume bot
const VolBotList = React.lazy(() => import("./views/VolumeBot/list"));
const VolAddBot = React.lazy(() => import("./views/VolumeBot/addBot"));
const VolBotUser = React.lazy(() => import("./views/VolumeBot/addbotUser"));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/userList", name: "User List", element: UserList, type: "private" },
  {
    path: "/fee-management/:id",
    name: "User List",
    element: MMAdd,
    type: "private",
  },
  {
    path: "/userhistory/:userid",
    name: "User History",
    element: UserHistory,
    type: "private",
  },
  {
    path: "/loginHistory",
    name: "Login History",
    element: LoginHistory,
    type: "private",
  },
  {
    path: "/subAdmin-loginHistory",
    name: "Login History",
    element: SubAdminloginHistory,
    type: "private",
  },
  {
    path: "/userAsset/:id",
    name: "User Asset",
    element: UserAsset,
    type: "private",
  },
  {
    path: "/userKycList",
    name: "User KYC ",
    element: UserKycList,
    type: "private",
  },
  {
    path: "/login-history/:id",
    name: "Login History",
    element: UsrLoginHist,
    type: "private",
  },

  {
    path: "//userKycRejectionList",
    name: "User Kyc Rejections",
    element: UserKycRegList,
    type: "private",
  },
  {
    path: "/kycDetails/:id",
    name: "User KYC Details ",
    element: KycDetails,
    type: "private",
  },
  {
    path: "/profile",
    name: "Profile Details",
    element: ProfileDetails,
    type: "private",
  },
  {
    path: "/changePassword",
    name: "Change Password",
    element: ChangePassword,
    type: "private",
  },
  { path: "/ipList", name: "Ip List", element: IpManagement, type: "private" },
  {
    path: "/addIpAddress",
    name: "Add IpAddress",
    element: AddIpAddress,
    type: "private",
  },
  {
    path: "/spot-pair",
    name: "Spot Pairs",
    element: SpotPairs,
    type: "private",
  },
  { path: "/add-pair", name: "Add Pair", element: addPair, type: "private" },
  {
    path: "/spot-orders",
    name: "Spot Order",
    element: SpotOrders,
    type: "private",
  },
  {
    path: "/spot-trades",
    name: "Spot Trade",
    element: SpotTrades,
    type: "private",
  },

  {
    path: "/Future-pair",
    name: "Future Pairs",
    element: FuturesPairs,
    type: "private",
  },
  {
    path: "/Future-add-pair",
    name: "Add Pair",
    element: FuturesaddPair,
    type: "private",
  },
  {
    path: "/Future-edit-pair/:id",
    name: "Add Pair",
    element: FuturesaddPair,
    type: "private",
  },
  {
    path: "/Future-trades",
    name: "Future Trade",
    element: FuturesTrades,
    type: "private",
  },
  {
    path: "/Future-closed-pnl",
    name: "Closed PNL",
    element: FuturesOrderHist,
  },
  {
    path: "/Future-trades",
    name: "Trade History",
    element: FuturesTradeHist,
  },
  {
    path: "/Future-funding-rate",
    name: "Funding Rate History",
    element: FundingRateHistory,
  },

  // {
  //   path: "/inverse-pair",
  //   name: "Inverse Pairs",
  //   element: InversePairs,
  //   type: "private",
  // },
  // {
  //   path: "/inverse-add-pair",
  //   name: "Add Pair",
  //   element: InverseaddPair,
  //   type: "private",
  // },
  // {
  //   path: "/inverse-edit-pair/:id",
  //   name: "Add Pair",
  //   element: InverseaddPair,
  //   type: "private",
  // },
  // {
  //   path: "/inverse-trades",
  //   name: "Inverse Trade",
  //   element: InverseTrades,
  //   type: "private",
  // },
  // {
  //   path: "/inverse-closed-pnl",
  //   name: "Closed PNL",
  //   element: InverseOrderHist,
  // },
  // {
  //   path: "/inverse-trades",
  //   name: "Trade History",
  //   element: InverseTradeHist,
  // },
  // {
  //   path: "/inverse-funding-rate",
  //   name: "Funding Rate History",
  //   element: InverseFRH,
  // },

  {
    path: "/edit-pair/:id",
    name: "Edit Pair",
    element: addPair,
    type: "private",
  },
  { path: "/p2p-pair", name: "P2p Pairs", element: P2pPairs, type: "private" },
  {
    path: "/add-p2p-pair",
    name: "Add Pair",
    element: addP2pPair,
    type: "private",
  },
  {
    path: "/edit-p2p-pair/:id",
    name: "Edit Pair",
    element: addP2pPair,
    type: "private",
  },
  { path: "/p2p-Trade", name: "p2p Trade", element: p2pTrade, type: "private" },
  {
    path: "/p2p-reports",
    name: "Reports",
    element: p2pReports,
    type: "private",
  },
  {
    path: "/report/:reportId",
    name: "Report Detail",
    element: p2pReportAction,
    type: "private",
  },
  {
    path: "/p2p-orderView/:id",
    name: "p2p Trade view",
    element: p2pTradeview,
    type: "private",
  },
  {
    path: "/newsLetter",
    name: "News Letter",
    element: NewsLetter,
    type: "private",
  },
  {
    path: "/2fa-settings",
    name: "2FA Settings",
    element: Google2FA,
    type: "private",
  },
  {
    path: "/referral-setting",
    name: "Referral Setting",
    element: AddReferralSetting,
    type: "private",
  },
  {
    path: "/referral-list",
    name: "Referral History",
    element: ReferralList,
    type: "private",
  },
  {
    path: "/referral-bonus/:parentCode/:child_Code",
    name: "Referral Bonus",
    element: referralBonus,
    type: "private",
  },
  {
    path: "/p2p-DisputeTrade",
    name: "p2p-DisputeTrade",
    element: P2pDisputeTrade,
    type: "private",
  },
  { path: "/new-list", name: "New List", element: NewListing, type: "private" },
  { path: "/add-list", name: "Add List", element: AddList, type: "private" },
  {
    path: "/edit-list/:id",
    name: "Edit List",
    element: UpdateList,
    type: "private",
  },

  { path: "/coin-list", name: "Coin List", element: CoinList, type: "private" },
  { path: "/coin-add", name: "Coin Add", element: CoinAdd, type: "private" },
  {
    path: "/coin-update/:id",
    name: "Coin Update",
    element: CoinUpdate,
    type: "private",
  },
  {
    path: "/deposit-list",
    name: "Deposit Details",
    element: Deposit,
    type: "private",
  },
  {
    path: "/invalid-deposit-list",
    name: "Invalid Deposit Details",
    element: InvalidDeposit,
    type: "private",
  },

  {
    path: "/withdraw-list",
    name: "Withdraw Details",
    element: Withdraw,
    type: "private",
  },
  {
    path: "/templateList",
    name: "Email Template List",
    element: EmailtemplateList,
    type: "private",
  },
  {
    path: "/updatetemplate/:id",
    name: "Update Emailtemplate",
    element: UpdateTemplate,
    type: "private",
  },
  {
    path: "/cmsList",
    name: "CMS List",
    element: CmsList,
    type: "private",
  },
  {
    path: "/updatecms/:id",
    name: "Update CMS",
    element: UpdateCms,
    type: "private",
  },
  {
    path: "/faq-category",
    name: "FAQ Category List",
    element: FaqcategoryList,
    type: "private",
  },
  {
    path: "/addcategory",
    name: "Add Category",
    element: AddFaqCategory,
    type: "private",
  },
  {
    path: "/updatecategory/:id",
    name: "Update Category",
    element: UpdateFaqCategory,
    type: "private",
  },
  {
    path: "/faqlist",
    name: "FAQ List",
    element: FaqList,
    type: "private",
  },
  {
    path: "/addfaq",
    name: "Add FAQ",
    element: AddFaq,
    type: "private",
  },
  {
    path: "/updatefaq/:id",
    name: "Update FAQ",
    element: UpdateFaq,
    type: "private",
  },
  {
    path: "/support-category",
    name: "Support Category list",
    element: SupportCategorylist,
    type: "private",
  },
  {
    path: "/addsupport-category",
    name: "Add Support Category",
    element: AddSupportCategory,
    type: "private",
  },
  {
    path: "/updatesupport-category/:id",
    name: "Update Support Category",
    element: UpdateSupportCategory,
    type: "private",
  },
  {
    path: "/support",
    name: "Support Ticket List",
    element: Support,
    type: "private",
  },
  {
    path: "/support-reply/:id",
    name: "Support Ticket",
    element: TicketReply,
    type: "private",
  },
  {
    path: "/site-setting",
    name: "Site Setting",
    element: SiteSetting,
    type: "private",
  },
  {
    path: "/sub-admin",
    name: "Sub Admin",
    element: SubAdmin,
    type: "private",
  },
  {
    path: "/add-admin",
    name: "Add Admin",
    element: AddAdmin,
    type: "private",
  },
  {
    path: "/update-admin/:id",
    name: "Update Admin",
    element: UpdateAdmin,
    type: "private",
  },
  {
    path: "/modules",
    name: "Modules List",
    element: ModulesList,
    type: "private",
  },
  {
    path: "/add-modules",
    name: "Add Modules",
    element: AddModule,
    type: "private",
  },
  {
    path: "/update-modules/:id",
    name: "Update Modules",
    element: UpdateModule,
    type: "private",
  },
  {
    path: "/sub-modules",
    name: "SubModules List",
    element: SubModulesList,
    type: "private",
  },
  {
    path: "/add-submodules",
    name: "Add SubModules",
    element: AddSubModule,
    type: "private",
  },
  {
    path: "/update-submodules/:id",
    name: "Update SubModules",
    element: UpdateSubModule,
    type: "private",
  },
  {
    path: "/role-management",
    name: "Role Management",
    element: Role,
    type: "private",
  },
  {
    path: "/role-add",
    name: "Role Management",
    element: RoleAdd,
    type: "private",
  },
  {
    path: "/restriction/:id",
    name: "SubAdmin Restriction",
    element: RoleUpdate,
    type: "private",
  },
  {
    path: "/commission-list",
    name: "Commission List",
    element: ReportList,
    type: "private",
  },
  {
    path: "/passbook-list/:id",
    name: "PassBook List",
    element: PassBookList,
    type: "private",
  },
  {
    path: "/admin-profit",
    name: "Admin Profit",
    element: AdminProfit,
    type: "private",
  },
  {
    path: "/stakeorder",
    name: "Stake Order",
    element: StakeOrder,
    type: "private",
  },
  {
    path: "/stakesettle",
    name: "Stake Settle",
    element: StakeSettle,
    type: "private",
  },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: "/stake-list", name: "Staking List", element: StakeList },
  { path: "/add-staking", name: "Add Staking", element: AddStaking },
  { path: "/edit-staking/:id", name: "Edit Staking", element: AddStaking },
  { path: "/contact-us", name: "Contact US", element: ContactUs },
  { path: "/reply-user/:id", name: "Contact US", element: ReplayUser },
  { path: "/perpetual-pair", name: "Perpetual Pair", element: PerpetualPairs },
  {
    path: "/perpetual-add-pair",
    name: "Perpetual Add Pair",
    element: PerpetualAddPairs,
  },
  {
    path: "/perpetual-edit-pair/:id",
    name: "Perpetual Edit Pair",
    element: PerpetualAddPairs,
  },
  {
    path: "/perpetual-orders",
    name: "Order History",
    element: PerpetualOrderHist,
  },
  {
    path: "/perpetual-trades",
    name: "Trade History",
    element: PerpetualTradeHist,
  },
  { path: "/cnv-list", name: "Price Conversion", element: PriceCnv },
  { path: "/sms-log", name: "sms log", element: Smslog },
  { path: "/edit-cnv/:id", name: "Manage Conversion", element: EditCnv },
  {
    path: "/purchaseTokenhistory",
    name: " Purchase Tokenhistory",
    element: PruchaseTokenHistory,
  },
  {
    path: "/launchpad-Management",
    name: "Launchpad Management",
    element: Launchpad,
    type: "private",
  },
  {
    path: "/add-launchpad",
    name: "Add Launchpad",
    element: AddLaunchpad,
    type: "private",
  },
  {
    path: "/edit-launchpad/:id",
    name: "Edit Pair",
    element: AddLaunchpad,
    type: "private",
  },
  {
    path: "/coin-withdraw/:id",
    name: "Coin Withdraw",
    element: CoinWithdraw,
    type: "private",
  },
  {
    path: "/fiat-withdraw/:id",
    name: "Coin_Withdraw",
    element: FiatWithdraw,
    type: "private",
  },
  {
    path: "/deposit/:id",
    name: "Deposit",
    element: FiatDeposit,
    type: "private",
  },
  {
    path: "/sliderManage",
    name: "SliderManage",
    element: SliderManage,
    type: "private",
  },
  {
    path: "/announcement",
    name: "User Announcement",
    element: Announcement,
    type: "private",
  },
  {
    path: "/trade-bot",
    name: "Trade Bot",
    element: BotList,
    type: "private",
  },
  {
    path: "/add-bot",
    name: "Add Bot",
    element: AddBot,
    type: "private",
  },
  {
    path: "/bot-user",
    name: "Add Bot",
    element: BotUser,
    type: "private",
  },
  {
    path: "/edit-bot/:id",
    name: "Edit Bot",
    element: AddBot,
    type: "private",
  },
  {
    path: "/volume-bot",
    name: "Volume Bot",
    element: VolBotList,
    type: "private",
  },
  {
    path: "/add-vol-bot",
    name: "Volume Bot",
    element: VolAddBot,
    type: "private",
  },
  {
    path: "/edit-vol-bot/:id",
    name: "Edit Bot",
    element: VolAddBot,
    type: "private",
  },
  {
    path: "/vol-user",
    name: "Add Bot",
    element: VolBotUser,
    type: "private",
  },
];

export default routes;
