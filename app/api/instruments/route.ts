import { NextResponse } from "next/server";

interface Instrument {
  id: string;
  title: string;
  acronym: string;
  category: string;
  description: string;
  fields: {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
  }[];
  metadata: {
    author: string;
    year: string;
    reference: string;
    purpose: string;
    targetPopulation: string;
    reliability: string;
    validity: string;
    scoring: string;
  };
}

export const instruments: Instrument[] = [
  {
    id: "1",
    title: "Generalized Anxiety Disorder-7",
    acronym: "GAD-7",
    category: "Ansiedade",
    description: "Avaliação do transtorno de ansiedade generalizada",
    fields: [
      {
        id: "q1",
        label: "Sentir-se nervoso, ansioso ou muito tenso",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q2",
        label: "Não ser capaz de parar ou controlar a preocupação",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q3",
        label: "Preocupar-se demais com diferentes coisas",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q4",
        label: "Dificuldade para relaxar",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q5",
        label: "Ficar tão inquieto que é difícil ficar parado",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q6",
        label: "Ficar facilmente aborrecido ou irritado",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q7",
        label: "Sentir medo como se algo horrível fosse acontecer",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
    ],
    metadata: {
      author: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B.",
      year: "2006",
      reference: "Archives of Internal Medicine",
      purpose:
        "Rastreamento e avaliação da gravidade do transtorno de ansiedade generalizada",
      targetPopulation: "Adultos",
      reliability: "Alta confiabilidade (α = 0.92)",
      validity: "Boa validade convergente e discriminante",
      scoring:
        "Soma dos itens (0-21): 0-4 (mínimo), 5-9 (leve), 10-14 (moderado), 15-21 (grave)",
    },
  },
  {
    id: "2",
    title: "Patient Health Questionnaire-9",
    acronym: "PHQ-9",
    category: "Depressão",
    description: "Avaliação de sintomas depressivos",
    fields: [
      {
        id: "q1",
        label: "Pouco interesse ou prazer em fazer as coisas",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q2",
        label: "Se sentindo para baixo, deprimido ou sem perspectiva",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q3",
        label:
          "Dificuldade para pegar no sono ou permanecer dormindo, ou dormindo mais do que de costume",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q4",
        label: "Se sentindo cansado ou com pouca energia",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q5",
        label: "Falta de apetite ou comendo demais",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q6",
        label:
          "Se sentindo mal consigo mesmo — ou achando que é um fracasso ou que decepcionou sua família ou você mesmo",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q7",
        label:
          "Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q8",
        label:
          "Lentidão para se movimentar ou falar, a ponto das outras pessoas perceberem? Ou o oposto – estar tão agitado ou inquieto que você fica andando de um lado para o outro muito mais do que de costume",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
      {
        id: "q9",
        label:
          "Pensamentos de que seria melhor estar morto ou se ferir de alguma maneira",
        type: "select",
        required: true,
        options: [
          "Nenhuma vez",
          "Vários dias",
          "Mais da metade dos dias",
          "Quase todos os dias",
        ],
      },
    ],
    metadata: {
      author: "Kroenke, K., Spitzer, R. L., & Williams, J. B.",
      year: "2001",
      reference: "Journal of General Internal Medicine",
      purpose: "Rastreamento e avaliação da gravidade da depressão",
      targetPopulation: "Adultos",
      reliability: "Alta confiabilidade (α = 0.89)",
      validity: "Excelente validade diagnóstica",
      scoring:
        "Soma dos itens (0-27): 0-4 (mínimo), 5-9 (leve), 10-14 (moderado), 15-19 (moderadamente grave), 20-27 (grave)",
    },
  },
  {
    id: "3",
    title: "Adult ADHD Self-Report Scale",
    acronym: "ASRS",
    category: "TDAH",
    description:
      "Escala de autoavaliação para sintomas de TDAH em adultos, desenvolvida em colaboração com a OMS",
    fields: [
      {
        id: "q1",
        label:
          "Com que frequência você tem dificuldade para terminar os detalhes finais de um projeto, depois que as partes mais desafiadoras foram feitas?",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Raramente",
          "Algumas vezes",
          "Frequentemente",
          "Muito frequentemente",
        ],
      },
      {
        id: "q2",
        label:
          "Com que frequência você tem dificuldade para organizar as coisas quando você tem que fazer uma tarefa que exige organização?",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Raramente",
          "Algumas vezes",
          "Frequentemente",
          "Muito frequentemente",
        ],
      },
    ],
    metadata: {
      author: "Kessler, R. C., et al.",
      year: "2005",
      reference: "Psychological Medicine",
      purpose: "Triagem de sintomas de TDAH em adultos",
      targetPopulation: "Adultos",
      reliability: "Boa confiabilidade teste-reteste",
      validity: "Alta sensibilidade e especificidade",
      scoring: "Pontuações mais altas indicam maior probabilidade de TDAH",
    },
  },
  {
    id: "4",
    title: "Maslach Burnout Inventory",
    acronym: "MBI",
    category: "Burnout",
    description:
      "Instrumento padrão-ouro para avaliação da síndrome de burnout em profissionais",
    fields: [
      {
        id: "q1",
        label: "Sinto-me emocionalmente esgotado com meu trabalho",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Algumas vezes ao ano",
          "Uma vez ao mês",
          "Algumas vezes ao mês",
          "Uma vez por semana",
          "Algumas vezes por semana",
          "Todos os dias",
        ],
      },
      {
        id: "q2",
        label: "Sinto-me exausto ao final de um dia de trabalho",
        type: "select",
        required: true,
        options: [
          "Nunca",
          "Algumas vezes ao ano",
          "Uma vez ao mês",
          "Algumas vezes ao mês",
          "Uma vez por semana",
          "Algumas vezes por semana",
          "Todos os dias",
        ],
      },
    ],
    metadata: {
      author: "Maslach, C., & Jackson, S. E.",
      year: "1981",
      reference: "Journal of Occupational Behavior",
      purpose: "Avaliação das dimensões da síndrome de burnout",
      targetPopulation: "Profissionais de diversas áreas",
      reliability: "Alta consistência interna",
      validity: "Validado internacionalmente",
      scoring:
        "Avalia três dimensões: exaustão emocional, despersonalização e realização profissional",
    },
  },
  {
    id: "5",
    title: "Modified Checklist for Autism in Toddlers",
    acronym: "M-CHAT",
    category: "Autismo",
    description:
      "Instrumento de triagem para transtorno do espectro autista em crianças pequenas",
    fields: [
      {
        id: "q1",
        label:
          "Seu filho gosta de brincar de cavalinho ou de pular no seu colo?",
        type: "select",
        required: true,
        options: ["Sim", "Não"],
      },
      {
        id: "q2",
        label: "Seu filho se interessa por outras crianças?",
        type: "select",
        required: true,
        options: ["Sim", "Não"],
      },
    ],
    metadata: {
      author: "Robins, D. L., et al.",
      year: "2001",
      reference: "Journal of Autism and Developmental Disorders",
      purpose: "Triagem precoce de sinais de autismo",
      targetPopulation: "Crianças de 16 a 30 meses",
      reliability: "Alta sensibilidade",
      validity: "Boa especificidade",
      scoring: "Pontuação de risco baseada em respostas específicas",
    },
  },
];

export async function GET() {
  return NextResponse.json(instruments);
}

export async function GET_BY_ID(
  request: Request,
  { params }: { params: { id: string } }
) {
  const instrument = instruments.find((i) => i.id === params.id);
  if (!instrument) {
    return NextResponse.json(
      { error: "Instrument not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(instrument);
}
