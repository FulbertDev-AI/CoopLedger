import axios from 'axios';

const API_BASE = (import.meta as any).env?.VITE_LARAVEL_API || 'http://localhost:8000/api';
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    // Gestion centralisée des erreurs
    if (error.response) {
      alert(error.response.data.message || 'Erreur serveur');
    } else {
      alert('Erreur réseau');
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  async getHistoriqueTransactions(filtres: Record<string, any> = {}): Promise<any> {
    const { data } = await api.get('/transactions', { params: filtres });
    return data;
  },
  async getRapportMensuel(mois: number, annee: number): Promise<any> {
    const { data } = await api.get(`/reports/monthly/${mois}/${annee}`);
    return data;
  },
  async getCategoryBreakdown(): Promise<any> {
    const { data } = await api.get('/analytics/categories');
    return data;
  },
  async getUserRole(walletAddress: string): Promise<any> {
    const { data } = await api.get(`/users/${walletAddress}/role`);
    return data;
  },
  async soumettreTransaction(description: string, montant: number, categorie: string): Promise<any> {
    const { data } = await api.post('/transactions', { description, montant, categorie });
    return data;
  },
};

export default ApiService;
