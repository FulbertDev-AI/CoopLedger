// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Voting is AccessControl {
    bytes32 public constant PRESIDENT_ROLE = keccak256("PRESIDENT_ROLE");
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    uint256 public constant VOTING_THRESHOLD = 200000 * 1e18; // FCFA, à adapter si besoin
    uint256 public constant VOTING_DURATION = 7 days;

    struct Proposal {
        string description;
        uint256 amount;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        mapping(address => bool) voted;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint256 indexed id, string description, uint256 amount, uint256 deadline);
    event VoteCasted(address indexed voter, uint256 indexed proposalId, bool vote);
    event ProposalExecuted(uint256 indexed id, bool accepted);

    modifier onlyMember() {
        require(hasRole(MEMBER_ROLE, msg.sender), "Only member");
        _;
    }

    modifier onlyPresident() {
        require(hasRole(PRESIDENT_ROLE, msg.sender), "Only president");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PRESIDENT_ROLE, msg.sender);
        _setupRole(MEMBER_ROLE, msg.sender);
    }

    function propose(string memory _description, uint256 _amount) public onlyPresident {
        require(_amount >= VOTING_THRESHOLD, "Amount below threshold");
        Proposal storage p = proposals.push();
        p.description = _description;
        p.amount = _amount;
        p.deadline = block.timestamp + VOTING_DURATION;
        p.executed = false;
        emit ProposalCreated(proposals.length - 1, _description, _amount, p.deadline);
    }

    function vote(uint256 _id, bool _choice) public onlyMember {
        require(_id < proposals.length, "Invalid proposal");
        Proposal storage p = proposals[_id];
        require(block.timestamp < p.deadline, "Voting closed");
        require(!p.voted[msg.sender], "Already voted");
        require(!p.executed, "Already executed");
        p.voted[msg.sender] = true;
        if (_choice) {
            p.votesFor++;
        } else {
            p.votesAgainst++;
        }
        emit VoteCasted(msg.sender, _id, _choice);
    }

    function closeVote(uint256 _id) public {
        require(_id < proposals.length, "Invalid proposal");
        Proposal storage p = proposals[_id];
        require(block.timestamp >= p.deadline, "Voting not closed");
        require(!p.executed, "Already executed");
        p.executed = true;
        bool accepted = p.votesFor > p.votesAgainst;
        emit ProposalExecuted(_id, accepted);
    }

    function getProposal(uint256 _id) public view returns (string memory, uint256, uint256, uint256, uint256, bool) {
        require(_id < proposals.length, "Invalid proposal");
        Proposal storage p = proposals[_id];
        return (p.description, p.amount, p.votesFor, p.votesAgainst, p.deadline, p.executed);
    }

    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }
}
