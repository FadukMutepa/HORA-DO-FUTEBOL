/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import stadiumImage from "./assets/images/stadium_hero_banner_1782293718576.jpg";
import ballImage from "./assets/images/soccer_ball_on_pitch_1782293734584.jpg";
import trophyImage from "./assets/images/soccer_championship_trophy_1782293747985.jpg";
import playerImage from "./assets/images/football_player_running_1782293763052.jpg";
import { 
  Flame, 
  Clock, 
  Share2, 
  Heart, 
  Bookmark, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  User, 
  Calendar, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Menu, 
  X, 
  Check, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowUpRight,
  TrendingUp,
  Newspaper,
  Info,
  SlidersHorizontal,
  ThumbsUp,
  MessageSquare,
  BookmarkCheck,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  category: "Nacional" | "Copas" | "Mercado";
  readTime: string;
  date: string;
  image: string;
  author: string;
  bulletSummary: string[];
  fullText: string[];
}

// Fixed Predefined News Database with beautiful content in Portuguese
const INITIAL_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "O Novo Rei da Camisa 10: Promessa da base assume protagonismo e lidera arrancada",
    subtitle: "Com apenas 18 anos, jovem meia-atacante encanta a torcida e atrai olhares de gigantes europeus.",
    summary: "Criado no terrão, Thiago Santos assume a mítica camisa 10, quebra recordes de precocidade e comanda a espetacular arrancada do time rumo à liderança do campeonato nacional.",
    category: "Nacional",
    readTime: "2 min",
    date: "Hoje, 10:24",
    image: ballImage,
    author: "Mateus Ribeiro",
    bulletSummary: [
      "Jovem de 18 anos assumiu a titularidade após lesão do capitão e não saiu mais do time.",
      "Soma 5 gols e 4 assistências nos últimos seis jogos do campeonato.",
      "Multa rescisória de €60 milhões já é considerada 'alvo' de clubes ingleses e espanhóis."
    ],
    fullText: [
      "A ascensão meteórica de Thiago Santos na temporada tem sido o principal assunto nas mesas redondas do país. O jovem revelado nas categorias de base assumiu a lendária camisa 10 e, com atuações de gala, gols decisivos e assistências primorosas, colocou sua equipe no topo absoluto da tabela.",
      "Especialistas já o apontam como a maior revelação do futebol brasileiro dos últimos cinco anos. Seu estilo de jogo, que mescla o drible curto clássico com uma inteligência tática incomum para a idade, tem encantado até os torcedores rivais.",
      "O treinador da equipe destacou na última coletiva de imprensa: 'Ele tem a cabeça muito no lugar, uma estrutura familiar sólida e um talento verdadeiramente raro. Nosso papel é protegê-lo, mas é impossível esconder um futebol desse nível.'",
      "Nos bastidores, a diretoria corre para readequar o plano de carreira do atleta, ciente de que a janela europeia de julho trará propostas astronômicas."
    ]
  },
  {
    id: "2",
    title: "Glória Eterna: Final histórica promete parar o continente no próximo sábado",
    subtitle: "Rivalidade centenária, táticas opostas e a busca pela taça mais cobiçada das Américas.",
    summary: "Os dois maiores gigantes do continente se enfrentam na grande decisão. Preparação intensa, mistério nas escalações e a obsessão pela consagração máxima do futebol.",
    category: "Copas",
    readTime: "3 min",
    date: "Há 2 horas",
    image: trophyImage,
    author: "Clarice Fontes",
    bulletSummary: [
      "Ambos os finalistas chegam sem desfalques por suspensão, força máxima garantida.",
      "Confronto marca o duelo entre a defesa menos vazada e o ataque mais prolífico do torneio.",
      "Mais de 50 mil torcedores são esperados na cidade sede para acompanhar a decisão histórica."
    ],
    fullText: [
      "A expectativa é máxima para a grande final continental que acontecerá no próximo sábado. Com ingressos esgotados há semanas e uma atmosfera de festa que já toma as ruas da cidade sede, os finalistas chegam em momentos distintos, mas movidos pela mesma obsessão.",
      "De um lado, o time de melhor sistema defensivo da competição, conhecido por sua solidez e transição rápida. Do outro, um futebol vistoso, apoiado no ataque mais avassalador da temporada, que goleou em quase todas as fases anteriores.",
      "Analistas preveem um duelo tático tenso e extremamente equilibrado, decidido em pequenos detalhes ou lances de bola parada. Ambos os treinadores optaram por portões fechados nos últimos treinamentos da semana, alimentando o mistério sobre as escalações oficiais.",
      "Seja qual for o resultado, o continente conhecerá um campeão indiscutível que escreverá seu nome na galeria de ouro da história do esporte."
    ]
  },
  {
    id: "3",
    title: "Janela Ferve: Gigante europeu prepara proposta astronômica por artilheiro",
    subtitle: "Mercado da bola agitado com oferta bilionária que pode quebrar recordes nacionais.",
    summary: "Clube da Premier League estaria disposto a desembolsar cifras históricas para contar com o atual goleador da liga nacional já na próxima janela de transferências.",
    category: "Mercado",
    readTime: "2 min",
    date: "Há 4 horas",
    image: playerImage,
    author: "Bruno Alencar",
    bulletSummary: [
      "Clube inglês sinaliza com proposta de 120 milhões de euros pelo centroavante.",
      "Staff do jogador vê com bons olhos a transferência para a liga mais competitiva do mundo.",
      "Clube detentor dos direitos promete fazer jogo duro e exige pagamento da multa à vista."
    ],
    fullText: [
      "Os bastidores do mercado da bola estão pegando fogo com a abertura iminente da janela de transferências europeia. Informações exclusivas obtidas pela nossa reportagem apontam que um gigante da Premier League está preparando uma oferta formal histórica.",
      "A proposta gira em torno de valores que podem quebrar o recorde histórico de transferências do clube nacional. O atacante, que desconversou sobre o seu futuro na última coletiva de imprensa, vive o melhor momento de sua carreira, liderando com folga a artilharia da temporada.",
      "Pessoas próximas ao atleta confirmam que o desafio de disputar a Premier League e a Champions League atrai o jogador, que acredita estar no momento ideal de maturação física e mental para dar o salto ao Velho Continente.",
      "Nos próximos dias, representantes do clube europeu devem desembarcar no país para iniciar oficialmente as tratativas com a diretoria do clube."
    ]
  }
];

// Mock Standings Table
const LEAGUE_STANDINGS = [
  { position: 1, team: "Hora do Gol FC", points: 32, matches: 14, form: ["V", "V", "E", "V", "V"] },
  { position: 2, team: "União dos Gramados", points: 29, matches: 14, form: ["V", "E", "V", "D", "V"] },
  { position: 3, team: "Atlético Campestre", points: 26, matches: 14, form: ["E", "V", "D", "V", "E"] },
  { position: 4, team: "Real Futebol", points: 25, matches: 14, form: ["V", "D", "V", "V", "D"] },
  { position: 5, team: "Esporte Aliança", points: 23, matches: 14, form: ["D", "V", "E", "D", "E"] }
];

// Mock Poll
const INITIAL_POLL = {
  question: "Quem tem o elenco mais forte para faturar a taça continental?",
  options: [
    { id: "A", text: "Hora do Gol FC (Defesa sólida)", votes: 412 },
    { id: "B", text: "União dos Gramados (Ataque letal)", votes: 345 },
    { id: "C", text: "Outro concorrente 'correndo por fora'", votes: 128 }
  ]
};

// Breaking News Ticker Items
const TICKER_ITEMS = [
  "🚨 URGENTE: Lateral da seleção sofre estiramento e vira dúvida para amistosos de julho.",
  "⚽ MERCADO: Meia do União recusa renovação e indica desejo de atuar no exterior.",
  "🏆 COPA COBIÇADA: CBF divulga datas e horários detalhados dos confrontos das oitavas.",
  "📈 RECORDE: Final de sábado registra maior procura por ingressos da história do torneio."
];

export default function App() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("hdg_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  // Newsletter state
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  
  // Poll state
  const [pollVotes, setPollVotes] = useState(INITIAL_POLL);
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem("hdg_voted_poll") === "true";
  });
  const [votedOptionId, setVotedOptionId] = useState<string | null>(() => {
    return localStorage.getItem("hdg_voted_option_id");
  });

  // Comments state (loaded from localstorage or empty default)
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem("hdg_comments");
    if (saved) return JSON.parse(saved);
    
    // Default mock comments
    return {
      "1": [
        { id: "c1", author: "Roberto Souza", text: "Esse menino joga bola demais! Lembra muito o início do Neymar no Santos.", time: "Há 1 hora" },
        { id: "c2", author: "Julio_futebol", text: "Tomara que a diretoria segure ele pelo menos até o fim do campeonato para sermos campeões.", time: "Há 42 min" }
      ],
      "2": [
        { id: "c3", author: "Amanda G.", text: "Coração já está saindo pela boca! Sábado o país vai parar de verdade.", time: "Há 2 horas" }
      ],
      "3": [
        { id: "c4", author: "Carlos_Galo", text: "120 milhões de euros é irrecusável. Tem que vender e reforçar o restante do elenco.", time: "Há 3 horas" }
      ]
    };
  });

  // TTS Reading Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechInstance, setSpeechInstance] = useState<SpeechSynthesisUtterance | null>(null);

  // Sync bookmarks to localstorage
  useEffect(() => {
    localStorage.setItem("hdg_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync comments to localstorage
  useEffect(() => {
    localStorage.setItem("hdg_comments", JSON.stringify(commentsMap));
  }, [commentsMap]);

  // Scroll handler for sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(bId => bId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Vote handler
  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setPollVotes(prev => {
      const updatedOptions = prev.options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      return { ...prev, options: updatedOptions };
    });
    
    setHasVoted(true);
    setVotedOptionId(optionId);
    localStorage.setItem("hdg_voted_poll", "true");
    localStorage.setItem("hdg_voted_option_id", optionId);
  };

  // Subscribe newsletter
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      // Auto-dismiss success after 5s
      setSubscribed(false);
    }, 5000);
  };

  // Add Comment
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (newsId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: "comment_" + Date.now(),
      author: newCommentName.trim(),
      text: newCommentText.trim(),
      time: "Agora mesmo"
    };

    setCommentsMap(prev => ({
      ...prev,
      [newsId]: [newComment, ...(prev[newsId] || [])]
    }));

    setNewCommentName("");
    setNewCommentText("");
  };

  // Browser Text To Speech
  const startReading = (textArray: string[]) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }

      const fullTextToRead = textArray.join(" ");
      const utterance = new SpeechSynthesisUtterance(fullTextToRead);
      utterance.lang = "pt-BR";
      utterance.rate = 1.1;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setSpeechInstance(utterance);
      setIsPlayingAudio(true);
    } else {
      alert("Seu navegador não suporta leitura de texto por voz.");
    }
  };

  // Stop Speech when modal closes
  const closeModal = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setSelectedNews(null);
  };

  // Filtered News Logic
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const filteredNews = news.filter(item => {
    const matchesCategory = filter === "Tudo" || item.category === filter;
    const matchesSearch = trimmedSearch === "" || 
      item.title.toLowerCase().includes(trimmedSearch) || 
      item.summary.toLowerCase().includes(trimmedSearch) ||
      item.category.toLowerCase().includes(trimmedSearch);
    return matchesCategory && matchesSearch;
  });

  const totalPollVotes = pollVotes.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-500 selection:text-white" id="home">
      
      {/* 1. CABEÇALHO (HEADER) */}
      <header className="sticky top-0 z-40 border-b border-emerald-950/10 bg-slate-900/95 text-white backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo Brand */}
          <div 
            className="flex cursor-pointer items-center space-x-2.5 transition-transform duration-200 active:scale-95"
            onClick={() => scrollToSection("home")}
            id="brand-logo"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-950/20">
              <span className="font-display text-xl font-extrabold tracking-tighter text-white">⚽</span>
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tight uppercase block leading-none text-white">
                Hora do <span className="text-emerald-400">Gol</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-emerald-300/80 font-bold block mt-0.5">
                Leitura Rápida
              </span>
            </div>
          </div>

          {/* Desktop Nav Menu */}
          <nav className="hidden items-center space-x-8 md:flex">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-sm font-semibold tracking-wide text-slate-300 transition-colors duration-150 hover:text-white"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("noticias")}
              className="text-sm font-semibold tracking-wide text-slate-300 transition-colors duration-150 hover:text-white"
            >
              Notícias
            </button>
            <button 
              onClick={() => scrollToSection("sobre")}
              className="text-sm font-semibold tracking-wide text-slate-300 transition-colors duration-150 hover:text-white"
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => scrollToSection("interativo")}
              className="text-sm font-semibold tracking-wide text-slate-300 transition-colors duration-150 hover:text-white flex items-center gap-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Interativo
            </button>
          </nav>

          {/* Action Buttons: Bookmark List, Search trigger, Mobile menu */}
          <div className="flex items-center space-x-3">
            {/* Saved Bookmarks Quick Icon */}
            <button 
              onClick={() => {
                const element = document.getElementById("noticias");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setFilter("Salvos");
              }}
              className="relative rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-150"
              title="Notícias Salvas"
              id="bookmarks-button"
            >
              <Bookmark className="h-5 w-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-emerald-400" />
              )}
            </button>

            {/* Newsletter Shortcut */}
            <button
              onClick={() => scrollToSection("newsletter")}
              className="hidden rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all duration-150 sm:block"
            >
              Clube HDG
            </button>
          </div>
        </div>

        {/* Live Ticker Bar (Breaking News marquee) */}
        <div className="border-t border-slate-800 bg-slate-950 py-1.5 text-xs">
          <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <span className="mr-3 flex items-center gap-1 font-mono font-bold uppercase text-emerald-400 whitespace-nowrap">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Último Minuto:
            </span>
            <div className="relative w-full overflow-hidden">
              <div className="flex animate-[marquee_25s_linear_infinite] space-x-12 whitespace-nowrap hover:[animation-play-state:paused]">
                {TICKER_ITEMS.map((item, index) => (
                  <span 
                    key={index} 
                    className="cursor-pointer text-slate-300 hover:text-emerald-300 transition-colors duration-150 font-medium"
                    onClick={() => {
                      // Trigger a quick read alert or modal simulated view
                      const simulatedNews: NewsItem = {
                        id: `ticker-${index}`,
                        title: item.replace(/🚨|⚽|🏆|📈|URGENTE:|MERCADO:|COPA COBIÇADA:|RECORDE:/g, "").trim(),
                        subtitle: "Fato urgente acompanhado em tempo real pelo portal Hora do Gol.",
                        summary: item,
                        category: "Nacional",
                        readTime: "1 min",
                        date: "Agora",
                        image: stadiumImage,
                        author: "Plantão Hora do Gol",
                        bulletSummary: [item, "Informação apurada em primeira mão pelos nossos correspondentes.", "Novas atualizações serão inseridas na grade principal em instantes."],
                        fullText: [item, "Nossa equipe de jornalismo esportivo está em contato direto com as fontes para trazer todos os desdobramentos deste fato.", "Acompanhe as próximas edições para mais informações sobre as consequências nos clubes e na tabela de classificação."]
                      };
                      setSelectedNews(simulatedNews);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ÁREA DE DESTAQUE (BANNER / HERO) */}
      <section className="relative overflow-hidden bg-slate-950 text-white" id="banner">
        {/* Stadium Background Image with premium darken overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={stadiumImage} 
            alt="Estádio de futebol lotado sob holofotes" 
            className="h-full w-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase"
            >
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              <span>O Jogo Sem Enrolação</span>
            </motion.div>

            {/* Impact Phrase Headings */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Cada lance, cada história, <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                o futebol direto ao ponto.
              </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl sm:text-xl"
            >
              Informação ágil e curadoria premium sobre o futebol nacional e internacional. Criado para torcedores que querem saber o que realmente importa, sem sensacionalismo.
            </motion.p>

            {/* Interactive Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => scrollToSection("noticias")}
                className="group flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:shadow-emerald-500/35 active:scale-[0.98] transition-all duration-150"
              >
                <span>Ler Notícias Fixadas</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection("sobre")}
                className="flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm hover:bg-slate-900 hover:text-white hover:border-slate-500 active:scale-[0.98] transition-all duration-150"
              >
                <span>Conhecer o Projeto</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Subtle decorative stadium architectural shape line */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </section>

      {/* Main Grid & Widgets Container */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Grid layout with main column and a sleek sports sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT 2 COLUMNS: NOTÍCIAS FIXADAS (GRID DE NOTÍCIAS) */}
          <div className="lg:col-span-2 space-y-10" id="noticias">
            
            {/* Section Header with categories and search */}
            <div className="flex flex-col space-y-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-emerald-600" />
                  Notícias Fixadas
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Artigos selecionados para uma leitura ágil de até 3 minutos.
                </p>
              </div>

              {/* Categories Navigation */}
              <div className="flex flex-wrap gap-1.5">
                {["Tudo", "Nacional", "Copas", "Mercado", "Salvos"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                    }}
                    className={`relative rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-150 ${
                      filter === cat
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {cat === "Salvos" ? "💾 Salvas" : cat}
                    {cat === "Salvos" && bookmarks.length > 0 && (
                      <span className="ml-1.5 rounded-full bg-emerald-500 text-slate-950 px-1.5 py-0.2 text-[10px] font-black">
                        {bookmarks.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Cards (Exactly 3 main cards side by side in standard layouts, dynamic grid) */}
            {filteredNews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Newspaper className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-slate-800">Nenhuma notícia encontrada</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                  {filter === "Salvos" 
                    ? "Você ainda não favoritou nenhuma notícia. Clique no ícone de marcador nas notícias para salvá-las aqui."
                    : "Não encontramos notícias nesta categoria de momento ou sua busca não retornou resultados."
                  }
                </p>
                <button
                  onClick={() => {
                    setFilter("Tudo");
                    setSearchQuery(" ");
                  }}
                  className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors duration-150"
                >
                  Ver todas as notícias
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((item, index) => {
                  const isBookmarked = bookmarks.includes(item.id);
                  return (
                    <motion.article
                      layoutId={`news-card-${item.id}`}
                      key={item.id}
                      onClick={() => setSelectedNews(item)}
                      className="group flex flex-col h-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-500/20 active:scale-[0.99] transition-all duration-200"
                    >
                      {/* Card Thumbnail Image Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Gradient shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-60" />
                        
                        {/* Category Badge & Read Time top indicators */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                          <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-950 shadow-sm">
                            {item.category}
                          </span>
                        </div>

                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                          {/* Bookmark Action */}
                          <button
                            onClick={(e) => toggleBookmark(item.id, e)}
                            className={`rounded-md p-1.5 transition-all duration-150 shadow-sm ${
                              isBookmarked 
                                ? "bg-emerald-500 text-slate-950" 
                                : "bg-slate-900/70 text-slate-100 hover:bg-slate-900 hover:text-white"
                            }`}
                            title={isBookmarked ? "Remover dos salvos" : "Salvar notícia"}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Quick details bottom overlap */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                          <div className="flex items-center gap-1 bg-slate-950/40 backdrop-blur-sm rounded px-1.5 py-0.5 font-mono">
                            <Clock className="h-3 w-3 text-emerald-400" />
                            <span>{item.readTime} de leitura</span>
                          </div>
                          <span className="font-medium text-slate-200">{item.date}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors duration-150 leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-xs text-slate-500 line-clamp-3 leading-relaxed flex-1">
                          {item.summary}
                        </p>
                        
                        {/* Author & Button */}
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                              <User className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-xs font-semibold text-slate-600">{item.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 group-hover:text-emerald-700 transition-all duration-150">
                            <span>Ler Mais</span>
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {/* Quick reading prompt box */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-900 p-6 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-emerald-500/10 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-emerald-400 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Tecnologia de Áudio Ativa
                  </h3>
                  <p className="text-slate-300 text-xs mt-1.5 leading-relaxed max-w-xl">
                    Sem tempo para ler? Agora você pode clicar em qualquer notícia acima e escutar o resumo em áudio simulado diretamente pelo seu navegador. É o futebol no seu ritmo!
                  </p>
                </div>
                <button 
                  onClick={() => {
                    // Open first news as template
                    setSelectedNews(news[0]);
                  }}
                  className="rounded-xl bg-white text-slate-950 font-extrabold text-xs py-2.5 px-4 self-start md:self-auto hover:bg-slate-100 active:scale-95 transition-all duration-150"
                >
                  Experimentar Agora
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: MODERN SPORTS SIDEBAR */}
          <div className="space-y-8" id="interativo">
            
            {/* Widget 1: Enquete do Dia */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-extrabold text-slate-900">
                    Enquete do Dia
                  </h3>
                </div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 uppercase font-bold">
                  Votos Ativos
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-800 leading-snug">
                  {pollVotes.question}
                </h4>

                <div className="mt-4 space-y-2.5">
                  {pollVotes.options.map((option) => {
                    const percentage = totalPollVotes > 0 
                      ? Math.round((option.votes / totalPollVotes) * 100) 
                      : 0;
                    const isSelected = votedOptionId === option.id;

                    return (
                      <button
                        key={option.id}
                        disabled={hasVoted}
                        onClick={() => handleVote(option.id)}
                        className={`relative w-full overflow-hidden rounded-xl border text-left p-3.5 transition-all duration-200 ${
                          hasVoted 
                            ? isSelected 
                              ? "border-emerald-500 bg-emerald-50/20" 
                              : "border-slate-100 bg-slate-50"
                            : "border-slate-200 hover:border-emerald-500 hover:bg-slate-50 cursor-pointer"
                        }`}
                      >
                        {/* Vote background filling bar */}
                        {hasVoted && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`absolute inset-y-0 left-0 -z-10 ${
                              isSelected ? "bg-emerald-500/10" : "bg-slate-200/40"
                            }`}
                          />
                        )}

                        <div className="relative z-10 flex items-center justify-between text-xs font-semibold">
                          <span className={isSelected ? "text-emerald-700 font-bold" : "text-slate-700"}>
                            {option.text}
                          </span>
                          {hasVoted && (
                            <span className={`font-mono font-bold ml-2 ${isSelected ? "text-emerald-600" : "text-slate-500"}`}>
                              {percentage}%
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Total de votos: {totalPollVotes}</span>
                  {hasVoted && (
                    <span className="text-emerald-600 flex items-center gap-0.5 font-bold">
                      <Check className="h-3 w-3" /> Voto computado
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Widget 2: Tabela do Campeonato */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    🏆
                  </span>
                  <h3 className="font-display text-base font-extrabold text-slate-900">
                    Tabela Liga HDG
                  </h3>
                </div>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-mono text-emerald-600 font-bold">
                  Série A
                </span>
              </div>

              {/* Table rendering */}
              <div className="mt-4 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-mono text-slate-400 border-b border-slate-100">
                      <th className="pb-2 font-bold w-6">Pos</th>
                      <th className="pb-2 font-bold pl-2">Time</th>
                      <th className="pb-2 font-bold text-center w-8">P</th>
                      <th className="pb-2 font-bold text-center w-8">J</th>
                      <th className="pb-2 font-bold text-right w-16">Forma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {LEAGUE_STANDINGS.map((row) => (
                      <tr key={row.position} className="hover:bg-slate-50/50">
                        <td className={`py-2.5 font-mono ${row.position <= 2 ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                          {row.position}º
                        </td>
                        <td className="py-2.5 pl-2 truncate max-w-[100px] text-slate-800">
                          {row.team}
                        </td>
                        <td className="py-2.5 text-center font-bold font-mono text-slate-900">
                          {row.points}
                        </td>
                        <td className="py-2.5 text-center text-slate-500 font-mono">
                          {row.matches}
                        </td>
                        <td className="py-2.5">
                          <div className="flex items-center justify-end space-x-0.5">
                            {row.form.map((res, i) => (
                              <span 
                                key={i}
                                className={`inline-block h-3.5 w-3.5 rounded text-[8px] font-bold text-center leading-3.5 ${
                                  res === "V" 
                                    ? "bg-emerald-500 text-white" 
                                    : res === "E" 
                                      ? "bg-slate-200 text-slate-600" 
                                      : "bg-red-500 text-white"
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Widget 3: Newsletter Box */}
            <section className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm" id="newsletter">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <h3 className="font-display text-base font-extrabold uppercase tracking-wide">
                  Clube Hora do Gol
                </h3>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Inscreva-se gratuitamente e receba um resumo diário das notícias esportivas mais cruciais diretamente no seu email.
              </p>

              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-center"
                >
                  <p className="text-xs font-bold text-emerald-400">
                    ⚽ Bem-vindo ao time!
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Enviamos um email de confirmação.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center space-x-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all duration-150"
                  >
                    <span>Entrar Pro Clube</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </section>

          </div>

        </div>

        {/* 5. SEÇÃO DE FILOSOFIA / SOBRE NÓS */}
        <section className="mt-16 border-t border-slate-200 pt-16" id="sobre">
          <div className="rounded-3xl bg-slate-100 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="font-mono text-xs font-extrabold tracking-wider text-emerald-600 uppercase">
                  Nossa Filosofia
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Por que ler notícias na <br />Hora do Gol?
                </h3>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  Sabemos que o futebol moderno está repleto de fofocas infinitas, especulações vazias e clickbaits irritantes. O <strong>Hora do Gol</strong> nasceu para resgatar a essência do esporte. 
                </p>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Nossa equipe sintetiza acontecimentos em resumos ultra-rápidos de até 3 minutos, destacando os fatos e impactos reais nas partidas. Futebol limpo, rápido e focado em informação de verdade.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px] mt-0.5">✔</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Sem Clickbait</h4>
                      <p className="text-[11px] text-slate-500">Títulos informativos que dizem exatamente o que aconteceu.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px] mt-0.5">✔</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Text-to-Speech</h4>
                      <p className="text-[11px] text-slate-500">Escute qualquer notícia resumida enquanto faz outras tarefas.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimalist illustration card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-xl shadow-emerald-950/10">
                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 h-64 w-64 rounded-full bg-emerald-400/10 pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-3xl">⚽</span>
                  <p className="mt-6 font-display text-lg font-bold italic leading-relaxed text-slate-100">
                    "O futebol é a coisa mais importante dentre as coisas menos importantes da vida."
                  </p>
                  <div className="mt-8 flex items-center space-x-3 border-t border-emerald-500/30 pt-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
                      HG
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Hora do Gol Editorial</h4>
                      <p className="text-[10px] text-emerald-200">São Paulo, Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 4. RODAPÉ (FOOTER) */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                  <span className="text-sm font-black">HG</span>
                </div>
                <span className="font-display text-lg font-bold tracking-tight uppercase text-white">
                  Hora do <span className="text-emerald-400">Gol</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                O maior portal brasileiro independente focado em notícias de leitura rápida de futebol. Sem ruído, apenas o jogo.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#_" className="hover:text-emerald-400 transition-colors duration-150"><Facebook className="h-4 w-4" /></a>
                <a href="#_" className="hover:text-emerald-400 transition-colors duration-150"><Twitter className="h-4 w-4" /></a>
                <a href="#_" className="hover:text-emerald-400 transition-colors duration-150"><Instagram className="h-4 w-4" /></a>
                <a href="#_" className="hover:text-emerald-400 transition-colors duration-150"><Youtube className="h-4 w-4" /></a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-emerald-500 pl-2">
                Categorias
              </h4>
              <ul className="mt-4 space-y-2 text-xs">
                <li>
                  <button onClick={() => { setFilter("Nacional"); scrollToSection("noticias"); }} className="hover:text-emerald-400 transition-colors duration-150 text-left">
                    Futebol Nacional
                  </button>
                </li>
                <li>
                  <button onClick={() => { setFilter("Copas"); scrollToSection("noticias"); }} className="hover:text-emerald-400 transition-colors duration-150 text-left">
                    Copas Continentais
                  </button>
                </li>
                <li>
                  <button onClick={() => { setFilter("Mercado"); scrollToSection("noticias"); }} className="hover:text-emerald-400 transition-colors duration-150 text-left">
                    Mercado da Bola
                  </button>
                </li>
                <li>
                  <button onClick={() => { setFilter("Salvos"); scrollToSection("noticias"); }} className="hover:text-emerald-400 transition-colors duration-150 text-left">
                    Favoritos
                  </button>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-emerald-500 pl-2">
                Suporte & Contato
              </h4>
              <ul className="mt-4 space-y-2 text-xs">
                <li><a href="#_" className="hover:text-emerald-400 transition-colors duration-150">Fale Conosco</a></li>
                <li><a href="#_" className="hover:text-emerald-400 transition-colors duration-150">Parcerias Comerciais</a></li>
                <li><a href="#_" className="hover:text-emerald-400 transition-colors duration-150">Políticas de Privacidade</a></li>
                <li><a href="#_" className="hover:text-emerald-400 transition-colors duration-150">Termos de Uso</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-mono">
            <span>© {new Date().getFullYear()} Hora do Gol. Todos os direitos reservados.</span>
            <span className="mt-2 sm:mt-0 flex items-center gap-1">
              Desenvolvido com paixão pelo futebol brasileiro ⚽💚
            </span>
          </div>
        </div>
      </footer>


      {/* NEWS FULL READ MODAL WITH TRANSITION ANIMATIONS (Leitura Rápida Drawer/Modal) */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm">
            
            {/* Modal backdrop closer click */}
            <div className="absolute inset-0 cursor-default" onClick={closeModal} />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl overflow-hidden"
              id="news-modal"
            >
              
              {/* Header inside Modal with controls */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 text-white px-5 py-3.5">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-emerald-500 px-2 py-0.5 text-[10px] font-black uppercase text-slate-950">
                    {selectedNews.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-300">
                    ⏱ {selectedNews.readTime} de leitura
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Speech reader toggle */}
                  <button
                    onClick={() => startReading([...selectedNews.bulletSummary, ...selectedNews.fullText])}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-150 ${
                      isPlayingAudio 
                        ? "bg-red-500 text-white animate-pulse" 
                        : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                    }`}
                    title={isPlayingAudio ? "Pausar leitura de voz" : "Ouvir notícia (Text-to-Speech)"}
                  >
                    {isPlayingAudio ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline">{isPlayingAudio ? "Parar Voz" : "Ouvir Notícia"}</span>
                  </button>

                  {/* Bookmark Button inside modal */}
                  <button
                    onClick={() => toggleBookmark(selectedNews.id)}
                    className={`rounded-lg p-1.5 transition-all duration-150 ${
                      bookmarks.includes(selectedNews.id)
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                    title="Salvar"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>

                  <button
                    onClick={closeModal}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150"
                    id="close-modal-button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                
                {/* News Header titles */}
                <div className="space-y-3">
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 leading-tight">
                    {selectedNews.title}
                  </h2>
                  <p className="text-sm text-slate-500 italic leading-relaxed">
                    {selectedNews.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                        {selectedNews.author[0]}
                      </div>
                      <span className="font-bold text-slate-600">Por {selectedNews.author}</span>
                    </div>
                    <span>{selectedNews.date}</span>
                  </div>
                </div>

                {/* News Image */}
                <div className="relative aspect-[16:9] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 1. SEÇÃO EM DESTAQUE: RESUMO RÁPIDO (BENTO CARD VIBE) */}
                <div className="rounded-2xl border border-emerald-500/10 bg-emerald-50/20 p-5 space-y-3">
                  <h3 className="font-display text-xs font-black tracking-wider text-emerald-800 uppercase flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    Resumo em 3 Tópicos (Leitura de 30s)
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                    {selectedNews.bulletSummary.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-black">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5 leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full article narrative text */}
                <div className="prose prose-slate text-sm text-slate-700 leading-relaxed space-y-4">
                  {selectedNews.fullText.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* SOCIAL SHARE BOX */}
                <div className="flex items-center justify-between border-t border-b border-slate-100 py-3 text-xs">
                  <span className="font-bold text-slate-500 flex items-center gap-1">
                    <Share2 className="h-3.5 w-3.5" /> Compartilhar notícia:
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert("Link copiado para a área de transferência!")}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200"
                    >
                      Copiar Link
                    </button>
                    <a href="#_" className="rounded-lg bg-emerald-500 text-slate-950 px-3 py-1.5 font-bold hover:bg-emerald-400">
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* INTERACTIVE COMMENTS COMPONENT */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="h-4.5 w-4.5 text-emerald-600" />
                    Discussão da Torcida ({commentsMap[selectedNews.id]?.length || 0})
                  </h3>

                  {/* Form to leave comment */}
                  <form onSubmit={(e) => handleAddComment(selectedNews.id, e)} className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Seu nome ou apelido"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <textarea
                      required
                      placeholder="O que você achou dessa notícia? Deixe sua opinião de torcedor..."
                      rows={2}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-slate-800 active:scale-95 transition-all duration-150"
                    >
                      Enviar Opinião
                    </button>
                  </form>

                  {/* Render comments */}
                  <div className="space-y-3">
                    {!commentsMap[selectedNews.id] || commentsMap[selectedNews.id].length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-4">
                        Nenhum comentário ainda. Seja o primeiro a opinar!
                      </p>
                    ) : (
                      commentsMap[selectedNews.id].map((c) => (
                        <div key={c.id} className="rounded-xl bg-slate-50/50 p-3.5 border border-slate-100">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-800">{c.author}</span>
                            <span className="font-mono text-slate-400">{c.time}</span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                            {c.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom footer bar of modal */}
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-center text-[10px] text-slate-400 font-mono">
                Hora do Gol • Jornalismo esportivo direto ao ponto • {new Date().getFullYear()}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
