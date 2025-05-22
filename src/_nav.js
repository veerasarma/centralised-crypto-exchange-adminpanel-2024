import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilMoney,
  cilList,
  cilSpeech,
  cilSettings,
  cilEnvelopeClosed,
  cilStar,
  cilUserFemale,
  cilTransfer,
  cilDataTransferDown,
  cilDataTransferUp,
  cilChartLine,
  cilLoopCircular,
  cilWallet,
  cilGraph,
  cilVerticalAlignCenter,
  cibServerFault,
  cilUserPlus,
  cilBook,
  cilPlus,
  cilShare,
  cilReportSlash,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: "User's Manage",
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Users",
        to: "/userList",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Users KYC List",
        to: "/userKycList",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "KYC Rejections",
        to: "/userKycRejectionList",
        icon: <CIcon icon={cilReportSlash} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Announcement',
      //   to: '/announcement',
      //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Ip Management',
  //   icon: <CIcon icon={cibServerFault} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Ip List',
  //       to: '/ipList',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: "Spot Trade",
    // to: '/Spot',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Spot Pairs",
        to: "/spot-pair",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Order History",
        to: "/spot-orders",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Trade History",
        to: "/spot-trades",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Future Trade",
    // to: '/Spot',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Pairs",
        to: "/Future-pair",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Order History',
      //   to: '/futures-orders',
      //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: "Future Trade History",
        to: "/Future-trades",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Closed PNL",
        to: "/Future-closed-pnl",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Funding Rate History",
        to: "/Future-funding-rate",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: "Inverse Trade",
  //   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Pairs",
  //       to: "/inverse-pair",
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Trade History",
  //       to: "/inverse-trades",
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Closed PNL",
  //       to: "/inverse-closed-pnl",
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Funding Rate History",
  //       to: "/inverse-funding-rate",
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'P2p Trade',
  //   // to: '/Spot',
  //   icon: <CIcon icon={cilVerticalAlignCenter} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'P2p Pairs',
  //       to: '/p2p-pair',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'P2p Trade History',
  //       to: '/p2p-Trade',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'P2p DisputeTrade',
  //       to: '/p2p-DisputeTrade',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Reports',
  //       to: '/p2p-reports',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Bot',
  //   // to: '/Spot',
  //   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Trade Bot',
  //       to: '/trade-bot',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Volume Bot',
  //       to: '/volume-bot',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Perpetual',
  //   // to: '/Spot',
  //   icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Perpetual Pairs',
  //       to: '/perpetual-pair',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Perpetual OrderHistory',
  //       to: '/perpetual-orders',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Perpetual TradeHistory',
  //       to: '/perpetual-trades',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Staking',
  //   // to: '/Spot',
  //   icon: <CIcon icon={cilLoopCircular} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Stake List',
  //       to: '/stake-list',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Stake Order',
  //   to: '/stakeorder',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Stake Settle',
  //   to: '/stakesettle',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: "Price CNV",
    // to: '/Spot',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Conversions",
        to: "/cnv-list",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'New Listing',
  //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'List',
  //       to: '/new-list',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: "Coin Details",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "CoinList",
        to: "/coin-list",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Transaction History",
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Deposit",
        to: "/deposit-list",
        icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Invalid Deposit',
      //   to: '/invalid-deposit-list',
      //   icon: <CIcon icon={cilDataTransferDown} customClassName="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: "Withdraw",
        to: "/withdraw-list",
        icon: <CIcon icon={cilDataTransferUp} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Template & CMS",
    // to: '/templateList',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Email Templates",
        to: "/templateList",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "CMS Pages",
        to: "/cmsList",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Slider Manage',
      //   to: '/slidermanage',
      //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      // },
    ],
  },
  {
    component: CNavGroup,
    name: "News Letter",
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "News Letter",
        to: "/newsLetter",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Admin Commission',
  //   icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Commission List',
  //       to: '/commission-list',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: "FAQ & Support",
    // to: '/faq-category',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "FAQ Category",
        to: "/faq-category",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "FAQ",
        to: "/faqlist",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Support Category",
        to: "/support-category",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Support",
        to: "/support",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavItem,
    name: "Contact Us",
    to: "/contact-us",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Pass Book',
  //   icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Pass Book List',
  //       to: '/passbook-list',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Referral',
  //   icon: <CIcon icon={cilShare} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Referral Settings',
  //       to: '/referral-setting',
  //       icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Referral List',
  //       to: '/referral-list',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Admin Profit',
  //   icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Admin Profit',
  //       to: '/admin-profit',
  //       icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: "Site Setting",
    to: "/site-setting",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: "Admin controller",
    to: "/sub-admin",
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Sub Admin",
        to: "/sub-admin",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Modules",
        to: "/modules",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Sub Modules",
        to: "/sub-modules",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Role Management',
      //   to: '/role-management',
      //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      // },
    ],
  },
];

export default _nav;
