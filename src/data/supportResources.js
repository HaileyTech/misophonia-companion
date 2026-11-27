export const supportCategories = [
  "All resources",
  "Questionnaires",
  "Peer support",
  "Professional support",
  "Practical tools",
  "Research",
  "Education"
]

export const supportResources = [
  {
    "id": "duke-questionnaire",
    "title": "Duke Misophonia Questionnaire",
    "category": "Questionnaires",
    "description": "A questionnaire developed to assess different dimensions of misophonia experiences. It is a research and self-reflection resource, not a standalone diagnosis.",
    "url": "https://psychiatry.duke.edu/duke-center-misophonia-and-emotion-regulation/resources/resources-clinicians-researchers"
  },
  {
    "id": "soquiet-misoquest",
    "title": "SoQuiet MisoQuest",
    "category": "Questionnaires",
    "description": "An online self-assessment for personal reflection. It is not a diagnostic tool.",
    "url": "https://www.soquiet.org/misophonia-survey"
  },
  {
    "id": "soquiet-peer-support",
    "title": "SoQuiet peer support groups",
    "category": "Peer support",
    "description": "Free virtual peer-led meetings for people with misophonia and their families.",
    "url": "https://www.soquiet.org/groups"
  },
  {
    "id": "misophonia-association-groups",
    "title": "Misophonia Association support groups",
    "category": "Peer support",
    "description": "Links to online communities and Facebook support groups for people with misophonia and their families.",
    "url": "https://misophonia-association.org/online-support-groups/"
  },
  {
    "id": "soquiet-clinicians",
    "title": "SoQuiet clinician directory",
    "category": "Professional support",
    "description": "A directory of providers listed as having experience working with people with misophonia.",
    "url": "https://www.misophoniaproviders.com/"
  },
  {
    "id": "imf-clinicians",
    "title": "IMF clinician directory",
    "category": "Professional support",
    "description": "Explore clinicians who list misophonia-related experience.",
    "url": "https://misophoniafoundation.com/clinician-directory/"
  },
  {
    "id": "soquiet-tools",
    "title": "SoQuiet free tools and resources",
    "category": "Practical tools",
    "description": "School and workplace letters, classroom suggestions, printable trigger journals, and other downloads.",
    "url": "https://www.soquiet.org/misophoniatools"
  },
  {
    "id": "imf-resources",
    "title": "IMF free resources",
    "category": "Practical tools",
    "description": "Free educational guides, worksheets, classes, and other resources for individuals, families, and professionals.",
    "url": "https://misophoniafoundation.com/free-resources/"
  },
  {
    "id": "soquiet-research-pool",
    "title": "SoQuiet research participant pool",
    "category": "Research",
    "description": "A way to register interest in being contacted about future studies.",
    "url": "https://www.soquiet.org/pool"
  },
  {
    "id": "misophonia-research-fund",
    "title": "Misophonia Research Fund",
    "category": "Research",
    "description": "Explore research publications and findings related to misophonia, including work supported or highlighted by the organization.",
    "url": "https://www.misophoniaresearchfund.org/publications"
  },
  {
    "id": "duke-center",
    "title": "Duke Center for Misophonia and Emotion Regulation",
    "category": "Education",
    "description": "Research-based information, publications, and educational material.",
    "url": "https://psychiatry.duke.edu/duke-center-misophonia-and-emotion-regulation/what-misophonia"
  },
  {
    "id": "sounds-like-misophonia",
    "title": "Sounds Like Misophonia",
    "category": "Education",
    "description": "Plain-language educational information and perspectives from a clinical psychologist and misophonia researcher.",
    "url": "https://soundslikemisophonia.com/"
  }
]

export function filterResources(category) {
  return category === "All resources"
    ? supportResources
    : supportResources.filter((resource) => resource.category === category)
}
