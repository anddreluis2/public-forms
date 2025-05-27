export const CATEGORY_STYLES: {
  [key: string]: { color: string; backgroundColor: string };
} = {
  Ansiedade: { color: "#712B2B", backgroundColor: "#FAE6E6" },
  "Avaliação do Clínico": { color: "#094871", backgroundColor: "#DFF1FF" },
  TDAH: { color: "#3F2D85", backgroundColor: "#E6E6FA" },
  Diagnóstico: { color: "#094871", backgroundColor: "#DFF1FF" },
  Dependência: { color: "#52315E", backgroundColor: "#F5EEF9" },
  Mensuração: { color: "#274553", backgroundColor: "#D3E4ED" },
  Burnout: { color: "#1E293B", backgroundColor: "#EDEDED" },
  "Bem-estar": { color: "#234424", backgroundColor: "#E5F4E4" },
  Autismo: { color: "#3F2D85", backgroundColor: "#E6E6FA" },
  Avaliação: { color: "#094871", backgroundColor: "#DFF1FF" },
  "Baseado em Feedback": { color: "#274553", backgroundColor: "#D3E4ED" },
  "Monitoramento de Progresso": {
    color: "#274553",
    backgroundColor: "#D3E4ED",
  },
  Depressão: { color: "#5A67D8", backgroundColor: "#EBF4FF" },
  Carreira: { color: "#38A169", backgroundColor: "#E6FFFA" },
  // IMPORTANT: Add all your categories and their fixed colors here.
  // This DEFAULT style will be used for any category name from the API
  // that is not explicitly defined above.
  DEFAULT: { color: "#4A5568", backgroundColor: "#EDF2F7" },
};
