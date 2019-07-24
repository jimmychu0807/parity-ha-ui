const ACCT_ID = "ACCT_ID";

export function setAcctId(acctId) {
  return localStorage.setItem(ACCT_ID, acctId);
}

export function getAcctId() {
  return localStorage.getItem(ACCT_ID);
}

export function removeAcctId() {
  return localStorage.removeItem(ACCT_ID);

}
