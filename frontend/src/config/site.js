export const siteConfig = {
  siteName: "Rénovation Prestige",
  tagline: "Votre partenaire de confiance pour tous vos projets de rénovation",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  
  // Social Media
  socialMedia: {
    facebook: "",
    instagram: "",
    linkedin: ""
  },
  
  // Contact Info (fallback if API is down)
  contact: {
    phone: "+33 1 23 45 67 89",
    email: "contact@renovation-prestige.fr",
    address: "123 Rue de la Rénovation, 75000 Paris"
  },
  
  // SEO
  seo: {
    defaultTitle: "Rénovation Prestige - Expert en Rénovation",
    defaultDescription: "Entreprise de rénovation spécialisée dans les travaux de rénovation complète, cuisine, salle de bain et bien plus.",
    defaultKeywords: "rénovation, travaux, rénovation maison, rénovation appartement, cuisine, salle de bain, Paris"
  }
};
