export interface Account {
    accountId:               string;
    balance:                 number;
    accountType:             null;
    currentPage:             number;
    totalPages:              number;
    pageSize:                number;
    accountOperationDtoList: AccountOperation[];
}

export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    description:   string;
    operationType: string;
}