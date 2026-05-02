// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CoopLedger is AccessControl {
    bytes32 public constant TREASURER_ROLE = keccak256("TREASURER_ROLE");
    bytes32 public constant PRESIDENT_ROLE = keccak256("PRESIDENT_ROLE");

    struct Transaction {
        address author;
        string description;
        uint256 amount;
        uint256 date;
        string category;
        bool confirmed;
    }

    Transaction[] public transactions;
    mapping(string => uint256) public categoryTotals;

    event TransactionRecorded(address indexed author, string description, uint256 amount, uint256 date);

    modifier onlyTreasurer() {
        require(hasRole(TREASURER_ROLE, msg.sender), "Only treasurer");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(TREASURER_ROLE, msg.sender);
        _setupRole(PRESIDENT_ROLE, msg.sender);
    }

    function recordTransaction(string memory _description, uint256 _amount, string memory _category)
        public onlyTreasurer {
        transactions.push(Transaction({
            author: msg.sender,
            description: _description,
            amount: _amount,
            date: block.timestamp,
            category: _category,
            confirmed: true
        }));
        categoryTotals[_category] += _amount;
        emit TransactionRecorded(msg.sender, _description, _amount, block.timestamp);
    }

    function getTransaction(uint256 index) public view returns (Transaction memory) {
        require(index < transactions.length, "Invalid index");
        return transactions[index];
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTotalBalance() public view returns (uint256) {
        uint256 total = 0;
        for (uint i = 0; i < transactions.length; i++) {
            total += transactions[i].amount;
        }
        return total;
    }

    function getCategoryTotal(string memory _category) public view returns (uint256) {
        return categoryTotals[_category];
    }
}
