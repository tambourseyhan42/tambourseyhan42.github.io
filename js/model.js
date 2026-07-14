const Model = {

  githubUser: "fivethegoat", // TODO: vérifie que c'est bien ton username GitHub

  contactEmail: "TON_EMAIL_ICI@example.com", // TODO

  state: {
    screen: "home",
    menuIndex: 0,
    reposLoaded: false,
    skillsBuilt: false,
  },

  featured: [
    {
      title: "Kokichi - Desktop Pet",
      tag: "Python · IA", color: "#3572A5",
      url: "https://github.com/fivethegoat", cta: "Je gatekeep mdr", // TODO: lien exact du repo
      img: "assets/projects/kokichi.png",
      desc: "Un desktop pet en PyQt6 qui incarne Kokichi Ôma (Danganronpa V3) : machine à états, sprites animés et dialogues générés via l'API Claude pour rester fidèle au perso.",
    },
    {
      title: "Pizzayolo",
      tag: "Godot 4", color: "#478cbf",
      url: "https://github.com/fivethegoat", cta: "Je gatekeep aussi ;)", // TODO
      img: "assets/projects/pizzayolo.png",
      desc: "Un endless runner sous Godot 4 : le joueur ramasse des pizzas en étant poursuivi par Monokuma. Mon premier projet de gamedev complet.",
    },
    {
      title: "Site de révision BTS SIO",
      tag: "Web", color: "#e34c26",
      url: "https://fivethegoat.github.io", cta: "plus dispo vu qu'on a passé l'année",
      img: "assets/projects/revision.png",
      desc: "Site interactif hébergé sur GitHub Pages couvrant 21 chapitres du BTS SIO avec quiz, synthèse vocale et interface sombre — pour réviser sans (trop) souffrir.",
    },
    {
      title: "Labs réseau SISR",
      tag: "Réseau", color: "#e60012",
      url: "https://fivethegoat.github.io", cta: "Voir le portfolio E5 →", // TODO
      img: "assets/projects/reseau.png",
      desc: "Configurations VLAN, routage inter-VLAN, NAT et ACL sur du matériel Cisco 2960/4221 et Aruba 2930F, réalisées dans le cadre de l'épreuve E5 du BTS.",
    },
  ],

  // Si un de ces noms correspond à un vrai repo GitHub, il sera masqué de la liste automatique
  // pour éviter le doublon avec les cartes "à la une" ci-dessus.
  featuredRepoNames: [
    // "nom-exact-du-repo",
  ],

  fallbackRepos: [
    // Affiché seulement si l'API GitHub est injoignable. Ajoute tes vrais repos ici si tu veux.
  ],

  projectImages: {
    // "NomDuRepo": "assets/projects/NomDuRepo.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", GDScript: "#355570", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  skills: [
    { group: "Réseaux & Infra", items: [
      ["Cisco (2960 / 4221) · VLAN · Routage inter-VLAN", 82],
      ["Aruba 2930F · Port security · ACL", 78],
      ["NAT · DHCP relay · Windows Server", 76],
      ["Packet Tracer", 80],
    ]},
    { group: "Sécurité & Systèmes", items: [
      ["Zabbix · Supervision", 72],
      ["Squid Proxy · SSL Bump", 70],
      ["Cybersécurité · DMZ · Cryptographie", 74],
      ["RGPD", 75],
    ]},
    { group: "Développement", items: [
      ["Python · PyQt6", 80],
      ["Godot 4 · GDScript", 68],
      ["HTML / CSS / JavaScript", 78],
      ["API Anthropic / IA générative", 76],
    ]},
    { group: "Autres", items: [
      ["Bash · PowerShell", 65],
      ["Anglais", 80],
    ]},
  ],

  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
