export type Question = {
  id: number;
  lecture: string;
  topic: string;
  prompt: string;
  multiple?: boolean;
  options: string[];
  correct: number[];
};

const q = (id: number, lecture: string, prompt: string, options: string[], correct: number[], multiple = false): Question => ({
  id, lecture, topic: lecture.replace(/^Lecture \d+: /, ""), prompt, options, correct, multiple
});

export const questions: Question[] = [
  q(1, "Lecture 1: Introduction to Innovation", "Which scenarios represent an Innovation rather than a pure Invention?", [
    "An inventor discovers a completely novel chemical compound in a laboratory.",
    "An enterprise integrates a pre-existing microprocessor into a new smart home framework, adding customer value.",
    "A company re-engineers an established delivery process to drastically reduce wait times.",
    "A researcher files a patent for an untested theoretical quantum algorithm."
  ], [1, 2], true),
  q(2, "Lecture 1: Introduction to Innovation", "How do Incremental Innovation and Radical Innovation fundamentally differ?", [
    "Incremental innovations make smaller, manageable improvements; radical innovations introduce major changes to established systems.",
    "Incremental innovations require breakthrough R&D, while radical innovations are rapid adjustments.",
    "Incremental innovations replace old markets, while radical innovations only cut internal costs.",
    "Incremental innovations carry the highest risks, while radical innovations carry zero financial risk."
  ], [0]),
  q(3, "Lecture 1: Introduction to Innovation", "Which classification has HIGH impact on component knowledge but LOW impact on architectural knowledge?", [
    "Incremental Innovation", "Radical Innovation", "Modular Innovation", "Architectural Innovation"
  ], [2]),
  q(4, "Lecture 1: Introduction to Innovation", "Which example best maps to Drucker’s “Unexpected Success or Failure”?", [
    "Henry Ford implementing an automated car assembly line due to process necessity.",
    "Pfizer’s Sildenafil failed as an anti-angina treatment but unexpectedly yielded high rates of male erections.",
    "Demographic age changes creating new lifestyle needs.",
    "Industry and market changes catching traditional competitors unaware."
  ], [1]),
  q(5, "Lecture 1: Introduction to Innovation", "Which descriptions characterize Drucker’s “Incongruity” sources of innovation?", [
    "Incongruity between reality and economic assumptions, where industry shifts create discrepancies.",
    "Incongruity in a process where the current way of working does not make sense.",
    "Incongruity between perception and reality caused by misinformation or cultural bias.",
    "A laboratory accident leading directly to a new chemical compound."
  ], [0, 1, 2], true),
  q(6, "Lecture 2: Innovation Management Techniques", "What is the primary strategic function of a patent search within IPR management?", [
    "To guarantee immediate venture capital funding.",
    "To develop alternative solutions, identify prior art, and map technology white spaces.",
    "To eliminate all execution and demand risk for a startup.",
    "To automate the Stage-Gate pipeline without customer feedback."
  ], [1]),
  q(7, "Lecture 2: Innovation Management Techniques", "Which are standard components of Knowledge Management strategies?", [
    "Communities of Practice and storytelling sessions.",
    "After action reviews and reflections.",
    "Groupware and Document/Content Management systems.",
    "Patent licensing auction protocols exclusively."
  ], [0, 1, 2], true),
  q(8, "Lecture 2: Innovation Management Techniques", "Which rules apply during the initial idea-generation phase of brainstorming?", [
    "Focus on one logical answer and criticize unviable ideas immediately.",
    "Focus on quantity, welcome wild concepts, and combine or improve suggestions.",
    "Eliminate ambiguity and maintain rigid conformity.",
    "Delegate all idea generation to the R&D department."
  ], [1]),
  q(9, "Lecture 2: Innovation Management Techniques", "What is the primary distinction between a Mind Map and a QFD matrix?", [
    "A Mind Map organizes concepts non-linearly around a subject; QFD translates customer demands into engineering parameters.",
    "A Mind Map is for financial risk; QFD is a creative-writing rule.",
    "A Mind Map is a legal IP document; QFD is an HR technique.",
    "There is no structural difference; both describe Stage-Gate."
  ], [0]),
  q(10, "Lecture 2: Innovation Management Techniques", "Which characteristics define the Business Simulation tool?", [
    "It assesses dynamic process behavior over time in response to environmental changes.",
    "It provides insights to improve performance, resource use, and customer satisfaction.",
    "Marketing simulations test pricing, positioning, and consumer behavior.",
    "It physically manufactures a scale model using 3D CAD data."
  ], [0, 1, 2], true),
  q(11, "Lecture 3: Dynamics of Ideation & Creativity", "What occurs during the Incubation stage of Graham Wallas’s Creative Process?", [
    "Active information gathering and problem immersion.",
    "The subconscious processes information without intense conscious concentration.",
    "The sudden “Aha!” moment of illumination.",
    "Rigorous commercialization and prototype implementation."
  ], [1]),
  q(12, "Lecture 3: Dynamics of Ideation & Creativity", "Which are recognized creative idea generation techniques?", [
    "Attribute Listing: breaking a product into parts and recombining them.",
    "Active search for solutions and role-playing scenarios.",
    "Expert opinions, user research/empathy building, and storyboards.",
    "Rigid adherence to status-quo rules."
  ], [0, 1, 2], true),
  q(13, "Lecture 3: Dynamics of Ideation & Creativity", "How can leaders enhance creativity within their teams?", [
    "Provide time and resources for exploratory thinking.",
    "Expect and tolerate failure, removing fear of mistakes.",
    "Encourage curiosity with “what if” questions and challenge assumptions.",
    "Punish non-conforming ideas to enforce uniformity."
  ], [0, 1, 2], true),
  q(14, "Lecture 3: Dynamics of Ideation & Creativity", "Which factors act as primary Barriers to Creativity?", [
    "Searching for the single right answer and being too logical early on.",
    "Fearing looking foolish, ambiguity, mistakes, and failure.",
    "Believing that “I am not creative”.",
    "All of the above."
  ], [3]),
  q(15, "Lecture 3: Dynamics of Ideation & Creativity", "Which components form The Process (Idea to Opportunity)?", [
    "Strategic Fit", "A comprehensive Business Plan", "A dedicated Team and effective Leadership", "Necessary Resources"
  ], [0, 1, 2, 3], true),
  q(16, "Lecture 4: New Product Development Process", "What primary variables drive customer needs in NPD?", [
    "Cost, time, and quality.", "Patent filings, trademarks, and royalties.", "Venture capital valuation and equity dilution.", "Board speed and legal compliance."
  ], [0]),
  q(17, "Lecture 4: New Product Development Process", "What are the exact chronological stages of the standard Design Thinking Process?", [
    "Define → Ideate → Test → Prototype → Empathize",
    "Empathize → Define → Ideate → Prototype → Test",
    "Discover → Scope → Design → Develop → Scale Up",
    "Preparation → Incubation → Illumination → Evaluation → Implementation"
  ], [1]),
  q(18, "Lecture 4: New Product Development Process", "What is the primary purpose of the Roof Matrix in the House of Quality?", [
    "Calculate the global retail sales price.",
    "Facilitate engineering creativity, show features to improve together, and highlight trade-offs.",
    "Measure customer complaints about warranties.",
    "Determine corporate tax liabilities."
  ], [1]),
  q(19, "Lecture 4: New Product Development Process", "Which are linked houses in the comprehensive QFD manufacturing deployment sequence?", [
    "House of Quality (Customer Attributes → Engineering Characteristics)",
    "Parts Deployment (Engineering Characteristics → Parts Characteristics)",
    "Process Planning (Parts Characteristics → Key Process Operations)",
    "Production Planning (Key Process Operations → Production Requirements)"
  ], [0, 1, 2, 3], true),
  q(20, "Lecture 4: New Product Development Process", "What gate review decisions can a management committee make in Stage-Gate?", [
    "GO FORWARD (funding approved)", "STOP (project terminated)", "HOLD (temporarily suspended)", "RETURN (go back to complete criteria)"
  ], [0, 1, 2, 3], true),
  q(21, "Lecture 5: Entrepreneur and Entrepreneurship", "How does Professor Howard Stevenson define Entrepreneurship?", [
    "Management of large enterprises for short-term dividends.",
    "The pursuit of opportunity beyond resources currently controlled.",
    "Routine administrative tasks within wage employment.",
    "Invention of high-tech hardware without market validation."
  ], [1]),
  q(22, "Lecture 5: Entrepreneur and Entrepreneurship", "Which are the four main types of risks faced by entrepreneurs?", [
    "Operational, Legal, Environmental, and Political risk.",
    "Demand, Technology, Execution, and Financing risk.",
    "Inflation, Currency, Liquidity, and Credit risk.",
    "Supply chain, Inventory, Maintenance, and Labor risk."
  ], [1]),
  q(23, "Lecture 5: Entrepreneur and Entrepreneurship", "Which traits characterize Entrepreneurial Employment?", [
    "Self-generating nature with unlimited scope", "Innovative and problem-solving orientation",
    "Independent decision-making and generating national wealth", "Growing, surplus-generating earnings"
  ], [0, 1, 2, 3], true),
  q(24, "Lecture 5: Entrepreneur and Entrepreneurship", "Which entrepreneur qualities are classified as Essential, Difficult to screen for, and Capable of development?", [
    "Self-knowledge", "Autonomy", "Search skills", "Manage risk"
  ], [0, 1, 2, 3], true),
  q(25, "Lecture 5: Entrepreneur and Entrepreneurship", "What core skills must an innovative entrepreneur master?", [
    "Basic Financial Skills (budgeting and statement analysis)",
    "Networking to build teams and maintain industry pulse",
    "Acting on feedback and recognizing patterns in data/trends",
    "Strategic thinking, negotiation, and a growth mindset"
  ], [0, 1, 2, 3], true)
];

export const questionsV1: Question[] = questions;

export const questionsV2: Question[] = [
  // Part A – Introduction to Innovation
  q(1, "Lecture 1: Introduction to Innovation",
    "A mobile phone manufacturer introduces a completely new battery technology that significantly changes battery performance and creates a new market opportunity. Which type of innovation is MOST suitable?",
    [
      "Incremental Innovation",
      "Radical Innovation",
      "Process Innovation",
      "Knowledge Management",
      "Customer Relationship Management",
    ],
    [1]),

  q(2, "Lecture 1: Introduction to Innovation",
    "A company already has a successful online shopping application. It introduces small improvements such as faster loading, better navigation and an improved search function. Which statements are correct?",
    [
      "This is an example of Incremental Innovation.",
      "This is necessarily Radical Innovation.",
      "It improves an established product.",
      "Small improvements can create customer value.",
      "This cannot be considered innovation.",
    ],
    [0, 2, 3], true),

  q(3, "Lecture 1: Introduction to Innovation",
    "A company develops a new product by changing the way its existing components are connected, while keeping the individual components mostly unchanged. Which innovation type does this represent?",
    [
      "Modular Innovation",
      "Architectural Innovation",
      "Radical Innovation",
      "Process Innovation",
      "Service Innovation",
    ],
    [1]),

  q(4, "Lecture 1: Introduction to Innovation",
    "A company introduces an automated production system to reduce manufacturing time, minimize errors and increase productivity. Which type of innovation is MOST relevant?",
    [
      "Product Innovation",
      "Service Innovation",
      "Process Innovation",
      "Architectural Innovation",
      "Customer Relationship Management",
    ],
    [2]),

  q(5, "Lecture 1: Introduction to Innovation",
    "A company develops a new product. However, customers do not receive any additional value from it, and the product does not improve an existing solution. Which statement is MOST accurate according to the lecture's definition of innovation?",
    [
      "Every new product is automatically an innovation.",
      "Innovation requires introducing something new that adds value.",
      "Invention and innovation always mean the same thing.",
      "Innovation only depends on advanced technology.",
      "Innovation does not require customer value.",
    ],
    [1]),

  // Part B – Innovation Management Tools
  q(6, "Lecture 2: Innovation Management Techniques",
    "An experienced employee leaves a company. As a result, the organization loses important knowledge about how to solve certain technical problems. Which approach would BEST help prevent this situation?",
    [
      "Knowledge sharing",
      "Storytelling",
      "Knowledge mapping",
      "Customer Relationship Management only",
      "After-action reviews",
    ],
    [0, 1, 2, 4], true),

  q(7, "Lecture 2: Innovation Management Techniques",
    "A software company develops a unique software technology and wants another company to use it legally in exchange for payment, without selling ownership. Which IPR strategy is appropriate?",
    [
      "Donate",
      "License",
      "Sell",
      "Ignore",
      "Brainstorm",
    ],
    [1]),

  q(8, "Lecture 2: Innovation Management Techniques",
    "A restaurant receives repeated complaints that customers must wait too long for their food. Management interviews customers and studies their pain points before redesigning the ordering process. Which tools or techniques are being applied?",
    [
      "Customer Relationship Management",
      "Customer interviews",
      "Knowledge Management only",
      "Customer feedback during product or service development",
      "Intellectual Property Rights Management",
    ],
    [0, 1, 3], true),

  q(9, "Lecture 2: Innovation Management Techniques",
    "An online retailer analyzes customer purchase histories, competitor product data and sales trends to identify future business opportunities. Which BI techniques could support this activity?",
    [
      "Data mining",
      "Predictive analytics",
      "Reporting",
      "Online Analytical Processing (OLAP)",
      "Storyboarding",
    ],
    [0, 1, 2, 3], true),

  q(10, "Lecture 2: Innovation Management Techniques",
    "A product development team is conducting a brainstorming session. One employee suggests an unusual idea. Other members immediately criticize it because it seems unrealistic. Which brainstorming rules have been violated?",
    [
      "Welcome wild ideas.",
      "Withhold criticism.",
      "Combine and improve ideas.",
      "Go for quantity.",
      "Use only technically possible ideas.",
    ],
    [0, 1], true),

  // Part C – Dynamics of Ideation & Creativity
  q(11, "Lecture 3: Dynamics of Ideation & Creativity",
    "A designer observes how elderly people use public transport and identifies difficulties they face before developing a new transport assistance service. Which creative idea generation technique is MOST relevant?",
    [
      "Role Playing",
      "Empathy/User Research",
      "Attribute Listing",
      "Business Simulation",
      "Intellectual Property Search",
    ],
    [1]),

  q(12, "Lecture 3: Dynamics of Ideation & Creativity",
    "A company takes an existing product, separates it into individual features and components, and combines them in different ways to develop a new product. Which technique is being used?",
    [
      "Active Search",
      "Expert Opinion",
      "Attribute Listing",
      "Storyboarding",
      "Business Simulation",
    ],
    [2]),

  q(13, "Lecture 3: Dynamics of Ideation & Creativity",
    "A manager rejects every unusual idea because it is not practical at the beginning of the idea-generation process. Which barrier to creativity is MOST clearly demonstrated?",
    [
      "Encouraging curiosity",
      "Constantly being practical",
      "Providing creativity training",
      "Rewarding creativity",
      "Supporting experimentation",
    ],
    [1]),

  q(14, "Lecture 3: Dynamics of Ideation & Creativity",
    "An employee develops an innovative idea but refuses to share it because they are afraid colleagues will laugh at them if the idea fails. Which barriers to creativity are demonstrated?",
    [
      "Fearing looking foolish",
      "Fearing mistakes and failure",
      "Encouraging collaboration",
      "Providing support",
      "Modeling creative behavior",
    ],
    [0, 1], true),

  q(15, "Lecture 3: Dynamics of Ideation & Creativity",
    "A startup identifies a problem faced by university students and develops an application to solve it. However, the founders do not have a proper team, business plan or resources. According to the lecture, what is needed to convert the idea into an opportunity?",
    [
      "Strategic Fit",
      "Business Plan",
      "Team",
      "Leadership",
      "Resources",
    ],
    [0, 1, 2, 3, 4], true),

  // Part D – New Product Development Process
  q(16, "Lecture 4: New Product Development Process",
    "A company wants to develop a new smart watch. Before starting technical development, it conducts surveys to understand what customers expect from the product. Why is this important in NPD?",
    [
      "To understand customer needs and wants.",
      "To understand the competitive environment.",
      "To eliminate the need for product testing.",
      "To identify market opportunities.",
      "To guarantee that the product will be successful.",
    ],
    [0, 1, 3], true),

  q(17, "Lecture 4: New Product Development Process",
    "A company identifies that customers want a mobile phone with a longer battery life. The engineering team converts this requirement into measurable battery capacity and performance targets. Which House of Quality concept is MOST relevant?",
    [
      "Customer Attributes",
      "Engineering Characteristics",
      "Financial Risk",
      "Business Simulation",
      "Networking",
    ],
    [1]),

  q(18, "Lecture 4: New Product Development Process",
    "A product development team compares its product with competitors to identify areas where customer satisfaction can be improved. Which House of Quality activity is demonstrated?",
    [
      "Competitive comparison",
      "Identifying improvement opportunities",
      "Ignoring customer requirements",
      "Identifying strategic positioning",
      "Eliminating engineering characteristics",
    ],
    [0, 1, 3], true),

  q(19, "Lecture 4: New Product Development Process",
    "During product design, engineers discover that improving one technical feature may negatively affect another feature. Which part of the House of Quality helps identify these relationships and necessary trade-offs?",
    [
      "Customer Attributes",
      "Roof Matrix",
      "Customer Interviews",
      "Business Plan",
      "Stage Gate",
    ],
    [1]),

  q(20, "Lecture 4: New Product Development Process",
    "A company is developing a new product through several stages. At the end of each stage, management evaluates the project's performance and decides whether it should continue. What is the main purpose of this approach?",
    [
      "To approve every project automatically.",
      "To reduce technical uncertainty and economic risk.",
      "To collect information at each stage.",
      "To evaluate whether the project should proceed.",
      "To avoid all customer research.",
    ],
    [1, 2, 3], true),

  // Part E – Entrepreneur and Entrepreneurship
  q(21, "Lecture 5: Entrepreneur and Entrepreneurship",
    "A university student identifies an opportunity to develop an educational platform. The student has limited money but uses personal skills, time and partnerships to develop the first version. Which entrepreneurial concepts are demonstrated?",
    [
      "Pursuit of opportunity beyond resources controlled.",
      "Bootstrapping.",
      "Avoiding resource constraints.",
      "Mobilizing available resources.",
      "Financing risk is completely eliminated.",
    ],
    [0, 1, 3], true),

  q(22, "Lecture 5: Entrepreneur and Entrepreneurship",
    "A startup develops a technically successful application. However, customers are not interested in using it. Which entrepreneurial risk is MOST clearly demonstrated?",
    [
      "Technology Risk",
      "Demand Risk",
      "Execution Risk",
      "Financing Risk",
      "Operational Risk",
    ],
    [1]),

  q(23, "Lecture 5: Entrepreneur and Entrepreneurship",
    "A startup has identified a market opportunity and developed a business plan. However, it cannot find suitable employees and partners to implement the plan. Which risk is MOST relevant?",
    [
      "Demand Risk",
      "Technology Risk",
      "Execution Risk",
      "Financing Risk",
      "Market Perception Risk",
    ],
    [2]),

  q(24, "Lecture 5: Entrepreneur and Entrepreneurship",
    "An entrepreneur identifies an opportunity to sell an existing product to a completely different customer segment. According to Howard Stevenson's explanation, which statement is correct?",
    [
      "An opportunity must always involve inventing a completely new product.",
      "Targeting an existing product to new customers can be an entrepreneurial opportunity.",
      "Entrepreneurship only involves creating new technology.",
      "An existing product cannot create a new business opportunity.",
      "Entrepreneurship requires owning all required resources.",
    ],
    [1]),

  q(25, "Lecture 5: Entrepreneur and Entrepreneurship",
    "A startup founder regularly studies customer feedback, identifies patterns in sales data, negotiates with potential investors and changes business strategies based on market conditions. Which entrepreneurial skills are demonstrated?",
    [
      "Pattern Recognition",
      "Ability to accept and act on Feedback",
      "Negotiation",
      "Strategic Thinking",
      "Growth Mindset",
    ],
    [0, 1, 2, 3], true),
];

export const subjectVersions = [
  {
    id: "v1",
    name: "Version 1",
    tag: "Available Now",
    badge: "25 Questions",
    description: "Comprehensive exam set covering Innovation Fundamentals, IPR, Stage-Gate Pipelines, and Entrepreneurship.",
    questionCount: 25,
    durationMinutes: 60,
    status: "active" as const,
  },
  {
    id: "v2",
    name: "Version 2",
    tag: "Available Now",
    badge: "25 Questions",
    description: "Hard – Application Based exam set. Scenario-driven MCQs covering Innovation Types, Knowledge Management, Creativity Barriers, House of Quality, Stage-Gate, and Entrepreneurial Risks.",
    questionCount: 25,
    durationMinutes: 60,
    status: "active" as const,
  },
];

