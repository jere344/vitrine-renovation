export const siteConfig = {
  siteName: "Campilongo Frères Rénovation",
  tagline: "Depuis 20 ans, nous transformons vos rêves de rénovation en réalité",
  description: "Notre entreprise familiale, installée à Lattes, est spécialisée dans la plomberie, la rénovation intérieure et la remise à neuf complète d'espaces de vie ou professionnels.",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  
  // Company story
  story: {
    title: "Notre histoire",
    content: "Depuis plus de 20 ans, Campilongo Frères Rénovation perpétue une tradition d'excellence dans le domaine de la rénovation et de la plomberie. Basée à Lattes, notre entreprise familiale s'est forgée une réputation solide grâce à notre savoir-faire artisanal et notre engagement envers la qualité. Nous travaillons aussi bien avec des particuliers qu'avec des architectes et maîtres d'œuvre, en assurant une coordination fluide avec tous les corps de métier pour mener à bien vos projets les plus ambitieux."
  },
  
  // Specialties
  specialties: [
    "Plomberie générale, chauffage et sanitaire",
    "Réaménagement complet d'appartements, maisons et locaux",
    "Création et rénovation de salles de bains",
    "Finitions, carrelage, revêtements, petits travaux de maçonnerie",
    "Coordination fluide avec les autres corps de métier"
  ],
  
  // Social Media
  socialMedia: {
    facebook: "",
    instagram: "",
    linkedin: ""
  },
  
  // Contact Info
  contact: {
    phone: "+33 X XX XX XX XX",
    email: "thomascampilongo@yahoo.fr",
    address: "Lattes, France"
  },
  
  // SEO
  seo: {
    defaultTitle: "Campilongo Frères Rénovation - Expert en Rénovation à Lattes",
    defaultDescription: "Entreprise familiale spécialisée dans la plomberie, la rénovation intérieure et la remise à neuf complète. Plus de 20 ans d'expérience à Lattes.",
    defaultKeywords: "rénovation, travaux, plomberie, salle de bain, cuisine, Lattes, Montpellier, entreprise familiale, rénovation complète"
  }
};
