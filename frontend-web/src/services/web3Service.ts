import { BrowserProvider, Contract, formatEther } from 'ethers';
import { Transaction, Vote } from '../types';

declare global {
  interface Window { ethereum?: any }
}

class Web3Service {
  provider: BrowserProvider | null = null;
  signer: any = null;
  contrats: { CoopLedger?: Contract; Voting?: Contract } = {};

  async connecterWallet() {
    if (!(window as any).ethereum) throw new Error('MetaMask non installé');
    const comptes = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    this.provider = new BrowserProvider((window as any).ethereum);
    this.signer = await this.provider.getSigner();
    return comptes[0];
  }

  async getBalance(): Promise<number> {
    if (!this.contrats.CoopLedger) await this.chargerContrats();
    const solde = await this.contrats?.CoopLedger?.getTotalBalance();
    return Number(formatEther(solde ?? 0));
  }

  async getTransactions(): Promise<Transaction[]> {
    if (!this.contrats.CoopLedger) await this.chargerContrats();
    const count = Number(await this.contrats?.CoopLedger?.getTransactionCount());
    const txs: Transaction[] = [];
    for (let i = Math.max(0, count - 50); i < count; i++) {
      const tx = await this.contrats?.CoopLedger?.getTransaction(i);
      if (tx) {
        txs.push({
          id: i,
          auteur: tx.author,
          description: tx.description,
          montant: Number(formatEther(tx.amount)),
          date: new Date(Number(tx.date) * 1000),
          categorie: tx.category,
          confirme: tx.confirmed
        });
      }
    }
    return txs;
  }

  async getActiveVotes(): Promise<Vote[]> {
    if (!this.contrats.Voting) await this.chargerContrats();
    const count = Number(await this.contrats?.Voting?.getProposalCount());
    const votes: Vote[] = [];
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 0; i < count; i++) {
      const proposalData = await this.contrats?.Voting?.getProposal(i);
      
      if (proposalData) {
        const [desc, montant, votesPour, votesContre, dateLimite, execute] = proposalData;
        votes.push({
          id: i,
          description: desc,
          montant: Number(formatEther(montant)),
          votesPour: Number(votesPour),
          votesContre: Number(votesContre),
          dateLimite: new Date(Number(dateLimite) * 1000),
          actif: Number(dateLimite) > now && !execute,
          execute: Boolean(execute)
        });
      }
    }
    return votes;
  }

  async chargerContrats() {
    const addressesModule = await import('../config/contract-addresses.json');
    const CoopLedgerABIModule = await import('../abis/CoopLedger.json');
    const VotingABIModule = await import('../abis/Voting.json');
    const addresses = (addressesModule as any).default || addressesModule;
    const CoopLedgerABI = (CoopLedgerABIModule as any).default || CoopLedgerABIModule;
    const VotingABI = (VotingABIModule as any).default || VotingABIModule;
    this.contrats.CoopLedger = new Contract(addresses.CoopLedger, CoopLedgerABI, this.signer);
    this.contrats.Voting = new Contract(addresses.Voting, VotingABI, this.signer);
  }
}

export default new Web3Service();