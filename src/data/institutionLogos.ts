export const institutionLogos = {
  "Illinois Institute of Technology": { mark: "IIT", src: "https://www.iit.edu/favicon.ico", url: "https://www.iit.edu/" },
  "Montgomery College": { mark: "MC", src: "https://www.montgomerycollege.edu/favicon.ico", url: "https://www.montgomerycollege.edu/" },
  "P-TECH / Clarksburg High School": { mark: "P", src: "https://www.montgomeryschoolsmd.org/siteassets/schools/high-schools/a-j/clarksburghs/uploadedimages/academics/specialservices/pathways20logo_final.png?n=4788", url: "https://www.montgomeryschoolsmd.org/schools/clarksburghs/" },
  "Technology Transition Paradigm": { mark: "TTP", src: "https://www.transitionparadigm.com/favicon.ico", url: "https://www.transitionparadigm.com/" },
  "OfficePro": { mark: "OP", src: "https://www.officeproinc.com/favicon.ico", url: "https://www.officeproinc.com/" },
  "GitHub": { mark: "GH", src: "https://github.githubassets.com/favicons/favicon.svg", url: "https://github.com/DanishNadar" },
  "Hugging Face": { mark: "HF", src: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co/" },
  "OpenAI": { mark: "OAI", src: "https://openai.com/favicon.ico", url: "https://openai.com/" },
  "Anthropic": { mark: "ANT", src: "https://www.anthropic.com/favicon.ico", url: "https://www.anthropic.com/" },
  "Microsoft": { mark: "MS", src: "https://www.microsoft.com/favicon.ico", url: "https://www.microsoft.com/" },
} as const;

export const logoShowcase = Object.entries(institutionLogos).map(([name, value]) => ({ name, ...value }));
