// 60 Questions for Business Archetypes Assessment
// 5 questions per archetype (12 archetypes × 5 = 60 questions)
// All archetype names in English

const questions = [
  // The Sage (5 questions)
  { text: "I prioritize gaining knowledge and understanding over quick action.", archetyp: "The Sage" },
  { text: "I enjoy analyzing data and information to find deeper insights.", archetyp: "The Sage" },
  { text: "People often come to me for advice and guidance.", archetyp: "The Sage" },
  { text: "I believe that continuous learning is essential for success.", archetyp: "The Sage" },
  { text: "I prefer to make decisions based on thorough research and evidence.", archetyp: "The Sage" },

  // The Visionary (5 questions)
  { text: "I often see possibilities that others miss.", archetyp: "The Visionary" },
  { text: "I'm energized by imagining future possibilities and innovations.", archetyp: "The Visionary" },
  { text: "I feel frustrated when people can't see the bigger picture.", archetyp: "The Visionary" },
  { text: "I enjoy challenging conventional thinking and the status quo.", archetyp: "The Visionary" },
  { text: "I'm naturally drawn to creating something entirely new rather than improving what exists.", archetyp: "The Visionary" },

  // The Builder (5 questions)
  { text: "I excel at creating systems and structures that last.", archetyp: "The Builder" },
  { text: "I value stability and predictability in my work environment.", archetyp: "The Builder" },
  { text: "I prefer step-by-step plans over spontaneous approaches.", archetyp: "The Builder" },
  { text: "I take pride in building something that stands the test of time.", archetyp: "The Builder" },
  { text: "I believe sustainable growth is more important than rapid expansion.", archetyp: "The Builder" },

  // The Guardian (5 questions)
  { text: "I'm naturally vigilant about potential risks and problems.", archetyp: "The Guardian" },
  { text: "Protecting people and resources is a top priority for me.", archetyp: "The Guardian" },
  { text: "I feel responsible for maintaining safety and security.", archetyp: "The Guardian" },
  { text: "I'm thorough in my approach to prevent mistakes and losses.", archetyp: "The Guardian" },
  { text: "I believe that preparation and caution are signs of wisdom.", archetyp: "The Guardian" },

  // The Sovereign (5 questions)
  { text: "I naturally take charge in group situations.", archetyp: "The Sovereign" },
  { text: "I'm comfortable making tough decisions that affect others.", archetyp: "The Sovereign" },
  { text: "I believe strong leadership creates order and prosperity.", archetyp: "The Sovereign" },
  { text: "I take responsibility for outcomes even when it's difficult.", archetyp: "The Sovereign" },
  { text: "I'm driven to create stability and success for my team or organization.", archetyp: "The Sovereign" },

  // The Diplomat (5 questions)
  { text: "I excel at finding common ground between different perspectives.", archetyp: "The Diplomat" },
  { text: "I naturally mediate conflicts and build bridges between people.", archetyp: "The Diplomat" },
  { text: "I believe that understanding and connection solve most problems.", archetyp: "The Diplomat" },
  { text: "I'm skilled at navigating complex social and political situations.", archetyp: "The Diplomat" },
  { text: "I prioritize maintaining harmony and positive relationships.", archetyp: "The Diplomat" },

  // The Catalyst (5 questions)
  { text: "I thrive on initiating change and getting things moving.", archetyp: "The Catalyst" },
  { text: "I become impatient when progress stalls or momentum slows.", archetyp: "The Catalyst" },
  { text: "I'm energized by dynamic, fast-paced environments.", archetyp: "The Catalyst" },
  { text: "I have a talent for seeing opportunities for immediate action.", archetyp: "The Catalyst" },
  { text: "I believe that taking action is better than waiting for perfect conditions.", archetyp: "The Catalyst" },

  // The Explorer (5 questions)
  { text: "I feel confined by too many rules and restrictions.", archetyp: "The Explorer" },
  { text: "I'm drawn to new experiences and uncharted territory.", archetyp: "The Explorer" },
  { text: "I value freedom and autonomy above security.", archetyp: "The Explorer" },
  { text: "I learn best through direct experience and experimentation.", archetyp: "The Explorer" },
  { text: "I believe that discovery and adventure are essential to growth.", archetyp: "The Explorer" },

  // The Alchemist (5 questions)
  { text: "I see potential for transformation in challenging situations.", archetyp: "The Alchemist" },
  { text: "I'm skilled at recognizing patterns and connections others miss.", archetyp: "The Alchemist" },
  { text: "I believe that deep change comes from working with underlying forces.", archetyp: "The Alchemist" },
  { text: "I'm drawn to facilitating profound shifts in perspective and understanding.", archetyp: "The Alchemist" },
  { text: "I have an intuitive sense of how to catalyze growth and transformation.", archetyp: "The Alchemist" },

  // The Healer (5 questions)
  { text: "I'm naturally empathetic and attuned to others' emotional needs.", archetyp: "The Healer" },
  { text: "I create safe spaces where people feel comfortable being vulnerable.", archetyp: "The Healer" },
  { text: "I'm motivated by helping others overcome challenges and find wholeness.", archetyp: "The Healer" },
  { text: "I have a gift for understanding what others need to heal and grow.", archetyp: "The Healer" },
  { text: "I believe that compassion and understanding are powerful forces for change.", archetyp: "The Healer" },

  // The Warrior (5 questions)
  { text: "I'm energized by competition and challenges.", archetyp: "The Warrior" },
  { text: "I have strong discipline and don't give up easily.", archetyp: "The Warrior" },
  { text: "I believe that courage and perseverance lead to victory.", archetyp: "The Warrior" },
  { text: "I'm willing to face difficult situations head-on.", archetyp: "The Warrior" },
  { text: "I thrive when I have clear goals to fight for and achieve.", archetyp: "The Warrior" },

  // The Artisan (5 questions)
  { text: "I take great pride in the quality and precision of my work.", archetyp: "The Artisan" },
  { text: "I'm dedicated to mastering the skills of my craft.", archetyp: "The Artisan" },
  { text: "I believe that excellence requires attention to detail and dedication.", archetyp: "The Artisan" },
  { text: "I find deep satisfaction in creating something beautiful and functional.", archetyp: "The Artisan" },
  { text: "I'm patient with the iterative process of perfecting my work.", archetyp: "The Artisan" }
];

// Shuffle function to randomize question order
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
