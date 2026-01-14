// Business Recommendations based on Archetype Profile
// These recommendations are sent to MailerLite but NOT displayed on the results page

const businessRecommendations = {
  "The Sage": {
    recommendation: "As a Sage, your business should leverage your analytical mind and quest for knowledge. Consider:",
    strategies: [
      "**Consulting & Advisory Services**: Position yourself as a trusted expert who helps others navigate complex decisions through data-driven insights.",
      "**Educational Content Creation**: Develop courses, workshops, or thought leadership content that shares your deep understanding with others.",
      "**Research & Analysis**: Build a business around providing thorough research, market analysis, or strategic planning services.",
      "**Knowledge Platforms**: Create tools or platforms that help others access, organize, and apply information effectively."
    ],
    focus: "Your competitive advantage lies in depth over speed. Invest in continuous learning and build systems that capture and share your insights systematically."
  },
  
  "The Visionary": {
    recommendation: "As a Visionary, your business should focus on innovation and transformative change. Consider:",
    strategies: [
      "**Innovation Consulting**: Help established companies reimagine their future and identify disruptive opportunities.",
      "**Startup Ventures**: Launch businesses that challenge industry norms and create entirely new markets or solutions.",
      "**Strategic Foresight**: Offer services that help organizations anticipate and prepare for future trends and shifts.",
      "**Innovation Labs**: Build environments where breakthrough ideas can be explored and developed."
    ],
    focus: "Balance your visionary thinking with execution partners. Surround yourself with Builders and Guardians who can turn your vision into reality while you focus on the next horizon."
  },
  
  "The Builder": {
    recommendation: "As a Builder, your business should emphasize structure, reliability, and long-term value. Consider:",
    strategies: [
      "**Systems Design & Implementation**: Help organizations build robust processes, workflows, and operational frameworks.",
      "**Project Management**: Lead complex projects that require methodical planning and flawless execution.",
      "**Infrastructure Development**: Create foundational tools, platforms, or services that others can build upon.",
      "**Quality Assurance**: Offer services that ensure consistency, reliability, and adherence to standards."
    ],
    focus: "Your strength is in creating things that last. Build business models with recurring revenue, strong foundations, and scalable systems that can withstand market changes."
  },
  
  "The Guardian": {
    recommendation: "As a Guardian, your business should focus on protection, security, and risk management. Consider:",
    strategies: [
      "**Risk Management Consulting**: Help organizations identify vulnerabilities and implement protective measures.",
      "**Compliance & Governance**: Provide expertise in regulatory compliance, data protection, and corporate governance.",
      "**Security Services**: Offer cybersecurity, physical security, or information security solutions.",
      "**Crisis Management**: Build a practice around helping organizations prepare for and respond to crises."
    ],
    focus: "Your clients value peace of mind. Build trust through transparency, reliability, and demonstrated expertise in keeping what matters most safe and secure."
  },
  
  "The Sovereign": {
    recommendation: "As a Sovereign, your business should leverage your leadership and ability to create order. Consider:",
    strategies: [
      "**Executive Leadership Coaching**: Guide other leaders in developing authority, making tough decisions, and creating thriving organizations.",
      "**Organizational Transformation**: Lead large-scale change initiatives that require clear direction and decisive action.",
      "**Premium Services**: Offer high-end, exclusive services that reflect quality, status, and excellence.",
      "**Empire Building**: Create a portfolio of complementary businesses or investments that you oversee and direct."
    ],
    focus: "Build businesses that reflect quality and authority. Position yourself at the top of your market and delegate operational details to trusted team members while you focus on strategy and vision."
  },
  
  "The Diplomat": {
    recommendation: "As a Diplomat, your business should focus on connection, mediation, and relationship-building. Consider:",
    strategies: [
      "**Negotiation & Mediation Services**: Help parties find common ground and reach mutually beneficial agreements.",
      "**Partnership Development**: Connect organizations, facilitate strategic alliances, and broker win-win deals.",
      "**Stakeholder Engagement**: Offer expertise in managing complex stakeholder relationships and building consensus.",
      "**Community Building**: Create platforms or events that bring diverse groups together for collaboration."
    ],
    focus: "Your network is your net worth. Build businesses that thrive on relationships, referrals, and repeat partnerships. Invest in long-term connections over short-term transactions."
  },
  
  "The Catalyst": {
    recommendation: "As a Catalyst, your business should focus on initiating change and creating momentum. Consider:",
    strategies: [
      "**Change Management Consulting**: Help organizations that are stuck get moving and accelerate transformation initiatives.",
      "**Launch Services**: Specialize in helping others launch products, businesses, or initiatives successfully.",
      "**Turnaround Expertise**: Take on businesses or projects that need urgent revitalization and rapid results.",
      "**Event & Campaign Creation**: Design and execute high-impact events or campaigns that generate buzz and action."
    ],
    focus: "You thrive on variety and momentum. Consider business models that involve multiple shorter-term engagements rather than long commitments. Partner with Builders to sustain what you start."
  },
  
  "The Explorer": {
    recommendation: "As an Explorer, your business should embrace freedom, discovery, and authentic self-expression. Consider:",
    strategies: [
      "**Experience Design**: Create unique experiences, adventures, or journeys for others seeking novelty and growth.",
      "**Independent Consulting**: Build a location-independent practice that allows you freedom while delivering expertise.",
      "**Market Research & Trend Spotting**: Use your curiosity to discover emerging opportunities before others.",
      "**Personal Brand Building**: Develop a business around your unique perspective, adventures, and discoveries."
    ],
    focus: "Design your business for maximum autonomy and flexibility. Avoid long-term commitments that feel restrictive. Your authentic voice and unique experiences are valuable—don't compromise them for conventional success."
  },
  
  "The Alchemist": {
    recommendation: "As an Alchemist, your business should focus on transformation and seeing hidden potential. Consider:",
    strategies: [
      "**Business Transformation**: Help struggling businesses or individuals undergo deep, meaningful change.",
      "**Executive Coaching**: Guide leaders through personal and professional metamorphosis.",
      "**Innovation Facilitation**: Create processes that help teams discover breakthrough solutions from unlikely combinations.",
      "**Rebranding & Repositioning**: Transform how organizations or individuals are perceived in the marketplace."
    ],
    focus: "You see possibilities others miss. Build businesses around identifying undervalued assets, hidden potential, or overlooked opportunities. Trust your intuition and ability to catalyze profound change."
  },
  
  "The Healer": {
    recommendation: "As a Healer, your business should focus on helping others overcome challenges and find wholeness. Consider:",
    strategies: [
      "**Coaching & Therapy**: Provide one-on-one support for individuals working through personal or professional challenges.",
      "**Organizational Health Consulting**: Help companies heal toxic cultures and create psychologically safe workplaces.",
      "**Wellness Services**: Offer services that support mental, emotional, or physical well-being.",
      "**Support Communities**: Build platforms or groups where people can find support, healing, and growth."
    ],
    focus: "Create sustainable practices with clear boundaries. Your empathy is powerful but can lead to burnout. Build business models that allow you to help many while protecting your own energy and well-being."
  },
  
  "The Warrior": {
    recommendation: "As a Warrior, your business should embrace competition, achievement, and overcoming obstacles. Consider:",
    strategies: [
      "**Performance Coaching**: Help individuals and teams push past their limits and achieve ambitious goals.",
      "**Competitive Strategy**: Offer expertise in outmaneuvering competitors and winning in challenging markets.",
      "**Sales & Business Development**: Excel in high-stakes sales, negotiations, or business development roles.",
      "**Challenge-Based Services**: Create offerings for clients who need someone to fight for them or help them fight for themselves."
    ],
    focus: "Channel your competitive nature into clear goals and measurable wins. Build businesses in competitive markets where your determination gives you an edge. Celebrate victories, learn from defeats, and never stop pushing forward."
  },
  
  "The Artisan": {
    recommendation: "As an Artisan, your business should center on craftsmanship, quality, and mastery. Consider:",
    strategies: [
      "**Premium Craft Services**: Offer highly specialized skills where quality and attention to detail command premium prices.",
      "**Boutique Consulting**: Provide bespoke, carefully crafted solutions rather than standardized packages.",
      "**Teaching & Mentorship**: Share your expertise with others who value mastery and are willing to invest in learning.",
      "**Limited Edition Offerings**: Create exclusive products or services that reflect exceptional skill and care."
    ],
    focus: "Resist the pressure to scale if it compromises quality. Your work speaks for itself—build a reputation for excellence and let your craftsmanship attract clients who value true quality over speed or volume."
  }
};

/**
 * Get business recommendation for a given archetype
 * @param {string} archetypeName - Name of the dominant archetype
 * @returns {object} Business recommendation object with recommendation, strategies, and focus
 */
function getBusinessRecommendation(archetypeName) {
  return businessRecommendations[archetypeName] || {
    recommendation: "Build a business that aligns with your unique strengths and values.",
    strategies: [
      "Identify your core competencies and focus on areas where you naturally excel.",
      "Seek feedback from clients and mentors to understand where you create the most value.",
      "Build systems that leverage your strengths while compensating for weaknesses.",
      "Stay authentic to your values—sustainable success comes from alignment, not imitation."
    ],
    focus: "Your unique combination of archetypes creates opportunities that only you can see. Trust your instincts and build something that feels right for you."
  };
}

/**
 * Format business recommendation as HTML for email templates
 * @param {string} archetypeName - Name of the dominant archetype
 * @returns {string} HTML formatted business recommendation
 */
function formatBusinessRecommendationHTML(archetypeName) {
  const rec = getBusinessRecommendation(archetypeName);
  
  let html = `<div style="margin: 20px 0;">`;
  html += `<p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">${rec.recommendation}</p>`;
  html += `<ul style="font-size: 15px; line-height: 1.8; margin: 15px 0; padding-left: 20px;">`;
  
  rec.strategies.forEach(strategy => {
    html += `<li style="margin-bottom: 10px;">${strategy}</li>`;
  });
  
  html += `</ul>`;
  html += `<p style="font-size: 15px; line-height: 1.6; margin-top: 15px; padding: 15px; background-color: rgba(94, 234, 212, 0.1); border-left: 3px solid #5EEADC; border-radius: 4px;"><strong>Key Focus:</strong> ${rec.focus}</p>`;
  html += `</div>`;
  
  return html;
}

/**
 * Format business recommendation as plain text for MailerLite
 * @param {string} archetypeName - Name of the dominant archetype
 * @returns {string} Plain text business recommendation
 */
function formatBusinessRecommendationText(archetypeName) {
  const rec = getBusinessRecommendation(archetypeName);
  
  let text = `${rec.recommendation}\n\n`;
  
  rec.strategies.forEach((strategy, index) => {
    text += `${index + 1}. ${strategy.replace(/\*\*/g, '')}\n`;
  });
  
  text += `\nKEY FOCUS: ${rec.focus}`;
  
  return text;
}
