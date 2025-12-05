import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {

  /** Langue actuelle */
  private lang = signal<'fr' | 'en'>('fr');

  // =====================================================================
  // 🇫🇷 FRANÇAIS
  // =====================================================================
  private fr = {

    // ------------------------ NAVIGATION ------------------------
    nav: {
      howItWorks: "Comment ça marche ?",
      meetTeam: "Rencontrez l’équipe",
      faq: "FAQ",
      talkToVera: "Parler à Vera"
    },

    // ------------------------ FOOTER ------------------------
    footer: {
    rights: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
    cgu: "CGU & Mentions légales",
    product: "Produit",
    team: "Équipe",
    help: "Aide",
    contact: "Contactez-nous",
    chatbot: "Chatbot",
    description1: "Vera vérifie toute information, fournissant des sources fiables",
    description2: "à travers des conversations par téléphone ou WhatsApp —",
    description3: "sans besoin d’application !",
  },


    // ------------------------ COMMENT SECTION ------------------------
    comment: {
      howItWorks: "Comment ça marche ?",
      askQuestion: "Posez une question",
      byPhoneOrSocial: "par téléphone, Whatsapp ou Instagram",
      addVera: "Ajoutez Vera",
      showNumber: "Voir le numéro",
      callHer: "Appelez-la",
      byPhone: "par téléphone",
      writeHer: "Écrivez-lui",
      onWhatsInstagram: "sur Whatsapp et Instagram",
    },

    // ------------------------ TOOLS SECTION ------------------------
    tools: {
      trustTool1: "L’",
      trustTool2: "outil de confiance",
      trustTool3: "pour vérifier les faits",
      description:
        "Un seul numéro (gratuit) pour contrer la désinformation et apaiser le débat public. Également disponible en DM Whatsapp et Instagram !",
      accessibleEverywhere: "Accessible sans internet, sur tous les téléphones",
      talkToVera: "Parler avec Vera",
      watchDemo: "Regarder la démo",
    },

    // ------------------------ TEAM SECTION ------------------------
    teamSection: {
        meetTeam: "Rencontrez l’équipe",
        weAre: "Nous sommes l’ONG",
        orgName: "LaReponse.Tech",
        description:
            "LaReponse.tech est un collectif de citoyennes et citoyens de la tech réunissant une expérience significative dans les projets à impact social. Nous créons des réponses numériques innovantes face aux enjeux majeurs de notre société, tels que la lutte contre la désinformation, la protection de la démocratie et la préservation de la planète. Notre conviction est que la technologie, utilisée de manière éclairée, peut devenir un levier puissant pour générer des transformations positives et durables.",
        visit: "Visiter LaReponse.Tech"
        },

        faq: {
            title: "Questions fréquentes",
            q1: "Comment garantir que Vera utilise des sources fiables ?",
            q2: "Qui finance LaReponse.tech ?",
            q3: "Vera a-t-elle des engagements politiques ?",
            q4: "Quelle est l’empreinte carbone de Vera ?",
            q5: "Qui sont ces « vérificateurs de faits » ?",
            q6: "Est-ce gratuit d’appeler Vera ?",
            q7: "Comment fonctionne Vera ?",
            q8: "Vera peut-elle se tromper ?",
            q9: "Quelle est la différence entre Vera et ChatGPT ?",
            q10: "Comment limitez-vous les “hallucinations” ?",
            q11: "Comment avez-vous choisi les sources ?",
            q12: "Comment garantissez-vous votre impartialité ?",
            q13: "Qui finance les coûts de Vera ?"
            },

    // ------------------------ EXPERTS ------------------------
    experts: {
      our: "Notre",
      expertCommittee: "comité d’experts",
      helpEvaluate:
        "Nous aide à évaluer la pertinence des réponses de Vera et à mesurer son impact",
      aude: "Fondatrice Fakeoff / Présidente CitizenFacts",
      rudy: "Fondateur Conspiracy Watch",
      camille: "Professeure à Columbia University School",
      valdez: "Rédacteur en chef Africa Check FR",
      benjamin: "Medialab de Sciences-Po",
    },

    // ------------------------ FACT CHECK ------------------------
    fact: {
      title1: "Vera est connectée en",
      title2: "temps réel",
      title3: "à 400+ sites de fact-checking",
      card1_title: "150+ sites de fact-checking",
      card1_sub: "Pour la vérification de faits",
      card1_point1: "Signataires des chartes européennes IFCN et EFCSN",
      card1_point2: "Agences de presse spécialisées en fact-checking",
      card2_title: "250+ médias fiables et reconnus",
      card2_sub: "Pour connaître l'actualité",
      card2_point1: "Tous les bords politiques",
      card2_point2: "Réputés comme fiables et sérieux",
      showSources: "Voir la liste des sources",
    },

    // ------------------------ LEGAL ------------------------
    legal: {
      privacyTitle: "Politique de confidentialité",
      cguTitle: "Conditions générales d'utilisation et Mentions Légales",
      lastUpdate: "Dernière mise à jour",
      readPrivacy: "Lire la politique de confidentialité",
      readCGU: "Lire les CGU",
      accept: "J'accepte",
      refuse: "Je refuse",
    },

    // ------------------------ QUESTIONS SECTION ------------------------
    questions: {
      title: "Quelles questions puis-je poser à Vera ?",
      q1: "Un collègue me dit que les inondations en Espagne viennent de l’ensemencement des nuages ??",
      q2: "C’est vrai que les vaccins anticovid provoquent des turbocancers ?",
      q3: "Zelensky se serait offert la Mercedes d’Hitler : c’est vrai ?",
      q4: "J’ai lu qu’Elon Musk travaille sur un projet secret d’avion militaire hypersonique",
      q5: "C’est vrai que des milliers de scientifiques dénoncent le canular de la crise climatique ?",
      q6: "Mon père dit que le gilet fluo va être obligatoire pour se promener en forêt",
    },
  };

  // =====================================================================
  // 🇬🇧 ENGLISH
  // =====================================================================
  private en = {

    nav: {
      howItWorks: "How it works",
      meetTeam: "Meet the team",
      faq: "FAQ",
      talkToVera: "Talk to Vera"
    },

    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      cgu: "Terms & Legal Notice",
      product: "Product",
      team: "Team",
      help: "Help",
      contact: "Contact us",
      chatbot: "Chatbot",
      description1: "Vera verifies any information using reliable sources",
      description2: "through conversations by phone or WhatsApp —",
      description3: "with no app required!",
    },


    comment: {
      howItWorks: "How does it work?",
      askQuestion: "Ask a question",
      byPhoneOrSocial: "by phone, Whatsapp or Instagram",
      addVera: "Add Vera",
      showNumber: "Show number",
      callHer: "Call her",
      byPhone: "by phone",
      writeHer: "Write to her",
      onWhatsInstagram: "on Whatsapp and Instagram",
    },

    tools: {
      trustTool1: "The ",
      trustTool2: "trusted tool",
      trustTool3: "to fact-check everything",
      description:
        "One free number to fight misinformation and calm public debate. Also available via WhatsApp and Instagram DM!",
      accessibleEverywhere: "Accessible without internet, on any phone",
      talkToVera: "Talk with Vera",
      watchDemo: "Watch the demo",
    },

    teamSection: {
        meetTeam: "Meet the team",
        weAre: "We are the NGO",
        orgName: "LaReponse.Tech",
        description:
            "LaReponse.tech is a collective of tech citizens with significant experience in social impact projects. We create innovative digital solutions to address major societal challenges such as fighting misinformation, protecting democracy, and preserving the planet. We believe that technology, when used wisely, can be a powerful lever for positive and lasting transformation.",
        visit: "Visit LaReponse.Tech"
        },

    experts: {
      our: "Our",
      expertCommittee: "expert committee",
      helpEvaluate:
        "Helps us evaluate the relevance of Vera’s answers and measure its impact",
      aude: "Founder Fakeoff / President CitizenFacts",
      rudy: "Founder Conspiracy Watch",
      camille: "Professor at Columbia University School",
      valdez: "Editor-in-chief Africa Check FR",
      benjamin: "Sciences-Po Medialab",
    },
    faq: {
        title: "Frequently Asked Questions",
        q1: "How do you ensure Vera uses reliable sources?",
        q2: "Who funds LaReponse.tech?",
        q3: "Does Vera have political affiliations?",
        q4: "What is Vera’s carbon footprint?",
        q5: "Who are these “fact-checkers”?",
        q6: "Is it free to call Vera?",
        q7: "How does Vera work?",
        q8: "Can Vera make mistakes?",
        q9: "What is the difference between Vera and ChatGPT?",
        q10: "How do you limit hallucinations?",
        q11: "How did you choose the sources?",
        q12: "How do you guarantee impartiality?",
        q13: "Who pays for Vera’s operational costs?"
        },

    fact: {
      title1: "Vera is connected in",
      title2: "real-time",
      title3: "to 400+ fact-checking websites",
      card1_title: "150+ fact-checking websites",
      card1_sub: "For verifying facts",
      card1_point1: "Signatories of the IFCN and EFCSN charters",
      card1_point2: "Fact-checking press agencies",
      card2_title: "250+ reliable and recognized media outlets",
      card2_sub: "To follow the news",
      card2_point1: "All political viewpoints",
      card2_point2: "Recognized as reliable and trustworthy",
      showSources: "See the source list",
    },

    legal: {
      privacyTitle: "Privacy Policy",
      cguTitle: "Terms of Use and Legal Notice",
      lastUpdate: "Last updated",
      readPrivacy: "Read the privacy policy",
      readCGU: "Read the terms",
      accept: "I accept",
      refuse: "I refuse",
    },

    questions: {
      title: "What kind of questions can I ask Vera?",
      q1: "A colleague told me the floods in Spain were caused by cloud seeding??",
      q2: "Is it true that covid vaccines cause ‘turbo cancers’?",
      q3: "Did Zelensky really buy Hitler’s Mercedes?",
      q4: "I read Elon Musk is working on a secret hypersonic military aircraft project",
      q5: "Is it true that thousands of scientists say climate change is a hoax?",
      q6: "My dad says fluorescent vests will soon be mandatory to walk in forests",
    },
  };

  // =====================================================================
  // METHODS
  // =====================================================================

  setLang(lang: 'fr' | 'en') {
    this.lang.set(lang);
  }

  currentLang() {
    return this.lang();
  }

  /** Accès à une traduction via "group.key" */
  t(path: string) {
    const source = this.lang() === 'fr' ? this.fr : this.en;
    return path.split('.').reduce((acc: any, key) => acc?.[key], source) ?? path;
  }
}
