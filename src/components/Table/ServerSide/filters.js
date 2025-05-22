import React from "react";
import PropTypes from "prop-types";
import { CFormInput, CFormSelect } from "@coreui/react";

// Define a default UI for filtering
export function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormInput
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search`}
    />
  );
}

export function StatusColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"new"}>New</option>
      <option value={"pending"}>Pending</option>
      <option value={"completed"}>Completed</option>
      <option value={"processing"}>Processing</option>
      <option value={"rejected"}>Rejected</option>
    </CFormSelect>
  );
}

export function PassbookTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"coin_deposit"}>Coin Deposit</option>
      <option value={"coin_withdraw"}>Coin Withdraw</option>
      {/* <option value={'fiat_deposit'}>Fiat Deposit</option>
      <option value={'fiat_withdraw'}>Fiat Withdraw</option> */}
      <option value={"admin_deposit"}>Admin Deposit</option>
      <option value={"admin_withdraw"}>Admin Withdraw</option>
      <option value={"spot_limit_match"}>Spot Limit Match</option>
      <option value={"spot_limit_orderPlace"}>Spot OrderPlace</option>
      <option value={"spot_limit_bal_retrieve"}>
        Spot Limit Balance Retrieve
      </option>
      <option value={"spot_market_bal_retrieve_buy"}>
        Spot Limit Balance Retrieve Buy
      </option>
      <option value={"spot_market_bal_retrieve_sell"}>
        Spot Limit Balance Retrieve Sell
      </option>
      <option value={"orderCancel"}>OrderCancel</option>
      <option value={"spot_market_orderPlace"}>Spot Market Match</option>
      {/* <option value={'p2p_order_place'}>P2P Order Place</option>
      <option value={'dispute_resolved_retrieve_balance'}>Dispute Resolve Retrive Balance</option>
      <option value={'p2p_cancel'}>P2P Cancel Order</option>
      <option value={'p2p_release_asset'}>P2P Release Asset</option>
      <option value={'p2p_post_close'}>P2P Post Close</option>
      <option value={'dispute_resolved'}>Dispute Resolve</option>
      <option value={'p2p_cancel_post'}>P2P Cancel Post</option>
      <option value={'p2p_post_order'}>P2P Post Order</option> */}
      <option value={"future_fund_out"}>Future Funding payout</option>
      <option value={"future_fund_in"}>Future Funding Receive</option>
      <option value={"future_release_tpsl"}>Future TPSL Locked Release</option>
      <option value={"future_loss_tpsl"}>Future TPSL Close</option>
      <option value={"future_profit_tpsl"}>Future TPSL Close</option>
      <option value={"future_limit_order"}>Future Limit Order</option>
      <option value={"future_market_order"}>Future Market Order</option>
      <option value={"future_cancel_order"}>Future Cancel Order</option>
      <option value={"future_release"}>Future Locked Release</option>
      <option value={"future_loss"}>Future Position Close Loss</option>
      <option value={"future_profit"}>Future Position Close profit</option>

      {/* <option value={'spot_MarketOrder_Binance_exec'}>Spot MarketOrder Executed in Binance</option>
      <option value={'spot_OrderMatch_Binance_Cancel'}>Spot MarketOrder cancel in Binance</option>
      <option value={'spot_OrderMatch_Wazarix_exec'}>Spot MarketOrder Executed in Wazirx</option>
      <option value={'spot_OrderMatch_Wazarix_Cancel'}>Spot MarketOrder cancel in Wazirx</option>
      <option value={'spot_OrderMatch_Wazarix_Balalnce_return'}>
        Spot Ordermatch Balance return in Wazirx
      </option>
        <option value={'stake_flexible_orderplace'}>Stake Flexible OrderPlace</option>
        <option value={'stake_cancel_interest'}>Stake Cancel Interest</option>
        <option value={'stake_flexible_settle'}>Stake Flexible Settle</option>
        <option value={'stake_redem_settle'}>Stake Redeem Settle</option>
        <option value={'stake_locked_orderplace'}>Stake Locked OrderPlace</option>
        <option value={'stake_locked_settle'}>Stake Locked Settle</option>
        <option value={'launchpad_trade'}>Launchpad Trade</option> */}
    </CFormSelect>
  );
}
export function DepositStatusFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"new"}>New</option>
      <option value={"completed"}>Completed</option>
      <option value={"pending"}>Pending</option>
      <option value={"rejected"}>Rejected</option>
    </CFormSelect>
  );
}
export function RewardStatus({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"active"}>Active</option>
      <option value={"inactive"}>In-active</option>
    </CFormSelect>
  );
}
export function RewardedStatus({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"true"}>Rewarded</option>
      <option value={"false"}>Not Rewarded</option>
    </CFormSelect>
  );
}

export function DepositPaymentType({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"coin_deposit"}>Coin Deposit</option>
      {/* <option value={'fiat_deposit'}>Fiat Deposit</option> */}
      <option value={"admin_deposit"}>Admin Deposit</option>
    </CFormSelect>
  );
}

export function BuyOrSell({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={"buy"}>Buy</option>
      <option value={"sell"}>Sell</option>
    </CFormSelect>
  );
}
export function WithdrawPaymentType({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"coin_withdraw"}>Coin Withdraw</option>
      {/* <option value={'fiat_withdraw'}>Fiat Withdraw</option> */}
      <option value={"admin_withdraw"}>Admin Withdraw</option>
    </CFormSelect>
  );
}

export function SideFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={"buy"}>Long</option>
      <option value={"sell"}>Short</option>
    </CFormSelect>
  );
}
export function stakeOrderTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"flexible"}>Flexible</option>

      <option value={"fixed"}>Fixed</option>
    </CFormSelect>
  );
}
export function stakesettleTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={(e) => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"redemption"}>Redemption</option>
      <option value={"interest"}>Interest</option>
    </CFormSelect>
  );
}
DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
RewardStatus.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
RewardedStatus.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

StatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

PassbookTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

stakeOrderTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
stakesettleTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
DepositStatusFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

DepositPaymentType.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

WithdrawPaymentType.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

SideFilter.PropTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};


BuyOrSell.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
