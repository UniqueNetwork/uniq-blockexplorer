export type BlockComponentProps = {
  searchModeOn: boolean;
  searchString?: string;
  pageSize?: number;
  setResultExist?: (val: boolean) => void;
};

export type LastTransfersComponentProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
};
