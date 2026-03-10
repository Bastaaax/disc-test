// Questions DISC — 25 lots comportementaux situationnels
// Chaque lot contient 4 affirmations (A, B, C, D)
// Le mapping DISC est géré dans scoringKey.js — NE PAS MODIFIER scoringKey.js

export const questions = [
  {
    id: 1,
    context: "Face à une décision importante à prendre rapidement...",
    answers: [
      { letter: "A", text: "Je prends le temps d'analyser avant d'agir, quitte à ralentir le groupe." },
      { letter: "B", text: "Je m'assure que tout le monde est à l'aise avec la décision avant d'avancer." },
      { letter: "C", text: "Je prends la parole pour mobiliser les autres et créer de l'élan." },
      { letter: "D", text: "Je tranche rapidement et j'assume la responsabilité du choix." }
    ]
  },
  {
    id: 2,
    context: "En réunion d'équipe, je suis naturellement celui qui...",
    answers: [
      { letter: "A", text: "Crée une bonne ambiance et met les gens à l'aise." },
      { letter: "B", text: "Écoute attentivement et intervient avec discrétion et précision." },
      { letter: "C", text: "Pousse à avancer et à obtenir des résultats concrets." },
      { letter: "D", text: "Structure les échanges et vérifie que les procédures sont respectées." }
    ]
  },
  {
    id: 3,
    context: "Quand je dois gérer une situation de tension ou de conflit...",
    answers: [
      { letter: "A", text: "Je cherche à apaiser et à trouver un terrain d'entente sans brusquer personne." },
      { letter: "B", text: "Je prends position clairement et je gère le problème de façon directe." },
      { letter: "C", text: "Je dédramatise avec humour et j'essaie de remotiver tout le monde." },
      { letter: "D", text: "J'analyse la situation calmement avant de proposer une solution structurée." }
    ]
  },
  {
    id: 4,
    context: "Ce qui me motive le plus dans mon travail, c'est...",
    answers: [
      { letter: "A", text: "Relever des défis ambitieux et dépasser mes objectifs." },
      { letter: "B", text: "Faire un travail rigoureux et sans erreur, dans un cadre clair." },
      { letter: "C", text: "Être entouré de bonnes personnes et contribuer à l'harmonie du groupe." },
      { letter: "D", text: "Partager, convaincre et créer du lien avec les autres." }
    ]
  },
  {
    id: 5,
    context: "Face à un problème complexe et nouveau, ma première réaction est de...",
    answers: [
      { letter: "A", text: "Recueillir toutes les données disponibles avant de me prononcer." },
      { letter: "B", text: "Foncer : tester, apprendre en faisant, corriger si besoin." },
      { letter: "C", text: "En discuter avec les personnes concernées pour trouver ensemble." },
      { letter: "D", text: "Brainstormer avec enthousiasme et explorer plein de pistes créatives." }
    ]
  },
  {
    id: 6,
    context: "Quand un collègue a besoin d'aide, je...",
    answers: [
      { letter: "A", text: "M'arrête pour l'écouter et lui apporter mon soutien, sans hésiter." },
      { letter: "B", text: "L'oriente vers les bonnes ressources ou les bonnes personnes." },
      { letter: "C", text: "Prends les choses en main et lui trouve une solution concrète rapidement." },
      { letter: "D", text: "Reste disponible tout en maintenant une certaine distance professionnelle." }
    ]
  },
  {
    id: 7,
    context: "Pour convaincre quelqu'un de mon point de vue, je...",
    answers: [
      { letter: "A", text: "Partage mon enthousiasme et use de mon relationnel pour embarquer l'autre." },
      { letter: "B", text: "Rassemble mes arguments, valide mes sources, puis présente ma démonstration." },
      { letter: "C", text: "Suis direct et affirmatif : j'énonce clairement ce que je veux." },
      { letter: "D", text: "Avance progressivement, à mon rythme, sans forcer." }
    ]
  },
  {
    id: 8,
    context: "Sous pression ou en situation de stress, j'ai tendance à...",
    answers: [
      { letter: "A", text: "Accélérer, être plus directif et attendre des résultats immédiats." },
      { letter: "B", text: "Chercher le soutien de mon entourage et partager ce que je ressens." },
      { letter: "C", text: "Prendre du recul pour m'assurer de ne pas commettre d'erreur." },
      { letter: "D", text: "Me replier sur moi-même et intérioriser pour ne pas impacter les autres." }
    ]
  },
  {
    id: 9,
    context: "Dans un projet en équipe, mon rôle naturel est plutôt de...",
    answers: [
      { letter: "A", text: "Veiller à ce que les relations restent bonnes et que personne ne soit laissé de côté." },
      { letter: "B", text: "Contrôler la qualité, vérifier les détails et m'assurer que tout est conforme." },
      { letter: "C", text: "Animer, fédérer et entretenir la motivation collective." },
      { letter: "D", text: "Définir les objectifs, distribuer les rôles et piloter l'avancement." }
    ]
  },
  {
    id: 10,
    context: "Ce que les autres remarquent souvent chez moi, c'est que...",
    answers: [
      { letter: "A", text: "Je m'affirme et je prends les choses en main quand il le faut." },
      { letter: "B", text: "Je suis à l'écoute et je mets les gens à l'aise." },
      { letter: "C", text: "Je suis communicant, expressif et j'anime les échanges." },
      { letter: "D", text: "Je suis rigoureux, organisé et fiable dans ce que je fais." }
    ]
  },
  {
    id: 11,
    context: "Quand on me confie une nouvelle mission, je préfère...",
    answers: [
      { letter: "A", text: "Avoir une équipe avec qui travailler en bonne intelligence." },
      { letter: "B", text: "Avoir des règles claires, des données et du temps pour bien faire." },
      { letter: "C", text: "Avoir un objectif ambitieux et la liberté de l'atteindre à ma façon." },
      { letter: "D", text: "Avoir de l'interaction, de la variété et des gens à qui parler." }
    ]
  },
  {
    id: 12,
    context: "Face à une règle ou une procédure qui me semble inefficace, je...",
    answers: [
      { letter: "A", text: "L'analyse pour comprendre pourquoi elle existe avant de la remettre en cause." },
      { letter: "B", text: "La contourne si elle ralentit l'atteinte de mes objectifs." },
      { letter: "C", text: "L'applique par respect pour le groupe, même si je ne suis pas d'accord." },
      { letter: "D", text: "En parle ouvertement pour susciter un débat et proposer une alternative." }
    ]
  },
  {
    id: 13,
    context: "Mon rapport au changement est le suivant...",
    answers: [
      { letter: "A", text: "Je préfère la stabilité : j'ai besoin de temps pour m'adapter." },
      { letter: "B", text: "J'adore le changement quand il vient d'une nouvelle idée ou d'une nouvelle rencontre." },
      { letter: "C", text: "J'analyse les pour et les contre avant d'accepter le changement." },
      { letter: "D", text: "J'initie le changement moi-même quand je juge que c'est nécessaire." }
    ]
  },
  {
    id: 14,
    context: "Pour prendre une décision difficile, je m'appuie surtout sur...",
    answers: [
      { letter: "A", text: "Mon instinct et ma détermination à avancer malgré les incertitudes." },
      { letter: "B", text: "Les données factuelles et une analyse méthodique de toutes les options." },
      { letter: "C", text: "Les avis et les ressentis des personnes concernées par la décision." },
      { letter: "D", text: "Mon optimisme et ma conviction que ça va bien se passer." }
    ]
  },
  {
    id: 15,
    context: "En matière de communication professionnelle, je suis plutôt...",
    answers: [
      { letter: "A", text: "Structuré et factuel : je rédige des messages précis avec des sources." },
      { letter: "B", text: "Chaleureux et à l'écoute : je privilégie l'échange humain." },
      { letter: "C", text: "Direct et efficace : j'exprime l'essentiel sans détours." },
      { letter: "D", text: "Expressif et persuasif : je mets de l'énergie dans ce que je dis." }
    ]
  },
  {
    id: 16,
    context: "Lors d'un projet en retard, je réagis en priorité en...",
    answers: [
      { letter: "A", text: "Redonnant de l'énergie à l'équipe pour remotiver tout le monde." },
      { letter: "B", text: "Imposant des décisions rapides pour rattraper le temps perdu." },
      { letter: "C", text: "Cherchant d'abord à comprendre les causes avant de corriger le tir." },
      { letter: "D", text: "Soutenant les personnes impactées et en gérant l'impact humain." }
    ]
  },
  {
    id: 17,
    context: "Quand je travaille sur un sujet complexe, je préfère...",
    answers: [
      { letter: "A", text: "Collaborer avec bienveillance, même si ça prend plus de temps." },
      { letter: "B", text: "Travailler seul avec des données fiables pour approfondir sans être dérangé." },
      { letter: "C", text: "Avancer vite, quitte à ajuster en cours de route." },
      { letter: "D", text: "Impliquer les autres, partager les idées et progresser ensemble." }
    ]
  },
  {
    id: 18,
    context: "Ce qui me caractérise le mieux dans ma façon de travailler, c'est...",
    answers: [
      { letter: "A", text: "Mon aisance relationnelle et ma capacité à fédérer." },
      { letter: "B", text: "Ma discrétion et ma profondeur d'analyse." },
      { letter: "C", text: "Ma capacité à anticiper les risques et à éviter les erreurs." },
      { letter: "D", text: "Ma pugnacité et mon orientation vers les résultats." }
    ]
  },
  {
    id: 19,
    context: "Face à une tâche que je dois organiser de zéro, je commence par...",
    answers: [
      { letter: "A", text: "Définir une méthode claire, un plan et des étapes précises à respecter." },
      { letter: "B", text: "Identifier l'objectif prioritaire et foncer vers lui sans trop planifier." },
      { letter: "C", text: "Parler à tout le monde pour recueillir les besoins et impliquer l'équipe." },
      { letter: "D", text: "M'assurer que l'équipe est soudée et que personne ne sera laissé seul." }
    ]
  },
  {
    id: 20,
    context: "Ce que je redoute le plus dans mon travail, c'est...",
    answers: [
      { letter: "A", text: "Être bloqué sans pouvoir agir ou ne pas atteindre mes objectifs." },
      { letter: "B", text: "Devoir improviser sans données fiables ni cadre clair." },
      { letter: "C", text: "Le désaccord, la tension relationnelle ou l'atmosphère négative." },
      { letter: "D", text: "La routine et l'absence de nouveauté ou de contacts humains." }
    ]
  },
  {
    id: 21,
    context: "Pour préparer une présentation ou un rapport, je...",
    answers: [
      { letter: "A", text: "Vérifie chaque chiffre, anticipe les objections et structure soigneusement." },
      { letter: "B", text: "Reste centré sur les impacts humains et comment les personnes le vivront." },
      { letter: "C", text: "Vais droit au but : je présente les conclusions et les décisions à prendre." },
      { letter: "D", text: "Mise sur ma capacité à raconter, à animer et à capter l'attention." }
    ]
  },
  {
    id: 22,
    context: "Quand je dois travailler avec quelqu'un de très différent de moi, je...",
    answers: [
      { letter: "A", text: "Prends les choses en main et gère ce que l'autre ne gère pas." },
      { letter: "B", text: "Cherche à comprendre ses besoins et à trouver un fonctionnement commun." },
      { letter: "C", text: "Adapte ma communication après avoir observé comment il fonctionne." },
      { letter: "D", text: "Essaie de créer une bonne dynamique relationnelle pour que ça colle." }
    ]
  },
  {
    id: 23,
    context: "Ce qui caractérise ma relation aux autres au quotidien, c'est...",
    answers: [
      { letter: "A", text: "Mon enthousiasme et ma spontanéité dans les échanges." },
      { letter: "B", text: "Mon efficacité et ma franchise : j'exprime clairement ce que je pense." },
      { letter: "C", text: "Mon écoute et mon souci de l'autre avant tout." },
      { letter: "D", text: "Ma rigueur et ma fiabilité : je tiens mes engagements." }
    ]
  },
  {
    id: 24,
    context: "Quand je réfléchis à mes forces, ce qui me vient en premier c'est...",
    answers: [
      { letter: "A", text: "Ma stabilité et ma capacité à garder le calme même sous tension." },
      { letter: "B", text: "Mon audace et ma capacité à obtenir des résultats." },
      { letter: "C", text: "Ma rigueur et mon sens du détail qui évitent les erreurs." },
      { letter: "D", text: "Mon énergie communicative et ma façon de créer du lien." }
    ]
  },
  {
    id: 25,
    context: "Si je devais décrire mon style naturel en une phrase, ce serait...",
    answers: [
      { letter: "A", text: "Je m'assure que les choses sont faites correctement, dans les règles." },
      { letter: "B", text: "J'avance, je décide, je n'attends pas que les conditions soient parfaites." },
      { letter: "C", text: "Je mets de la vie dans ce que je fais et j'entraîne les autres avec moi." },
      { letter: "D", text: "Je suis là pour les autres, j'ai à cœur que chacun se sente bien." }
    ]
  }
]
