import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  // Langue actuelle
  private lang = signal<'fr' | 'en'>('fr');

  // 🇫🇷 Dictionnaire FR
  private fr = {
    comment: {
      howItWorks: "Comment ça marche ?",
      askQuestion: "Posez une question",
      byPhoneOrSocial: "par téléphone, Whatsapp ou Instagram",

      addVera: "Ajoutez Vera",
      showNumber: "Voir le numéro",

      callHer: "Appelez-la",
      byPhone: "par téléphone",

      writeHer: "Écrivez-lui",
      onWhatsInstagram: "sur Whatsapp et Instagram"
    },

    tools: {
      trustTool1: "L’",
      trustTool2: "outil de confiance",
      trustTool3: "pour vérifier les faits",
      description:
        "Un seul numéro (gratuit) pour contrer la désinformation et apaiser le débat public. Également disponible en DM Whatsapp et Instagram !",
      accessibleEverywhere:
        "Accessible sans internet, sur tous les téléphones",
      talkToVera: "Parler avec Vera",
      watchDemo: "Regarder la démo"
    },

    team: {
      theTeam: "L’équipe",
      behindVera: "derrière Vera",
      originServices: "À l’origine de nombreux services numériques d’intérêt général",

      product: "PRODUCT",
      design: "DESIGN",
      tech: "TECH",
      gtm: "GO-TO-MARKET",
      expert: "EXPERT",
      security: "SECURITY",
      partnership: "PARTNERSHIP",
      dpo: "DPO",
      redteam: "RED TEAM & AI",
      com: "COM",
      ai: "AI",
      journalist: "JOURNALIST"
        },
        experts: {
    our: "Notre",
    expertCommittee: "comité d’experts",
    helpEvaluate: "Nous aide à évaluer la pertinence des réponses de Vera et à mesurer son impact",

    aude: "Fondatrice Fakeoff Présidente<br>CitizenFacts",
    rudy: "Fondateur Conspiracy Watch",
    camille: "Professeure à Columbia<br>University School",
    valdez: "Rédac. chef Africa Check FR",
    benjamin: "Medialab de Sciences-Po"
    }
  };

  // 🇬🇧 Dictionnaire EN
  private en = {
    comment: {
      howItWorks: "How does it work?",
      askQuestion: "Ask a question",
      byPhoneOrSocial: "by phone, Whatsapp or Instagram",

      addVera: "Add Vera",
      showNumber: "Show number",

      callHer: "Call her",
      byPhone: "by phone",

      writeHer: "Write to her",
      onWhatsInstagram: "on Whatsapp and Instagram"
    },

    tools: {
      trustTool1: "The ",
      trustTool2: "trusted tool",
      trustTool3: "to fact-check everything",
      description:
        "One free number to fight misinformation and calm public debate. Also available via WhatsApp and Instagram DM!",
      accessibleEverywhere:
        "Accessible without internet, on any phone",
      talkToVera: "Talk with Vera",
      watchDemo: "Watch the demo"
    },

    team: {
      theTeam: "The team",
      behindVera: "behind Vera",
      originServices: "Creators of many public-interest digital services",

      product: "PRODUCT",
      design: "DESIGN",
      tech: "TECH",
      gtm: "GO-TO-MARKET",
      expert: "EXPERT",
      security: "SECURITY",
      partnership: "PARTNERSHIP",
      dpo: "DPO",
      redteam: "RED TEAM & AI",
      com: "COM",
      ai: "AI",
      journalist: "JOURNALIST"
    },
    experts: {
  our: "Our",
  expertCommittee: "expert committee",
  helpEvaluate: "Helps us evaluate the relevance of Vera’s answers and measure its impact",

  aude: "Founder of Fakeoff / President of CitizenFacts",
  rudy: "Founder of Conspiracy Watch",
  camille: "Professor at Columbia University School",
  valdez: "Editor-in-chief Africa Check FR",
  benjamin: "Sciences-Po Medialab"
}

  };

  // --- Méthodes ---

  setLang(lang: 'fr' | 'en') {
    this.lang.set(lang);
  }

  currentLang() {
    return this.lang();
  }

  t(path: string) {
    const obj = this.lang() === 'fr' ? this.fr : this.en;
    return path.split('.').reduce((acc: any, key) => acc?.[key], obj) ?? path;
  }
}
