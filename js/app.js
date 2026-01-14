// Business Archetypes Assessment - Main Logic
class ArchetypenTest {
  constructor() {
    this.currentQuestion = 0;
    this.answers = [];
    this.results = null;
    this.userInfo = null; // Stores name and email
    
    this.initializeApp();
  }

  initializeApp() {
    // Event Listeners
    document.getElementById('intro-user-form').addEventListener('submit', (e) => this.handleIntroUserSubmit(e));
    document.getElementById('prev-question-btn').addEventListener('click', () => this.previousQuestion());
    
    console.log('✅ Business Archetypes Assessment initialized');
    console.log('📧 Email service: MailerLite');
  }

  handleIntroUserSubmit(e) {
    e.preventDefault();
    
    // Get user information
    const formData = new FormData(e.target);
    this.userInfo = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim()
    };
    
    console.log('👤 User info captured:', this.userInfo.name, this.userInfo.email);
    
    // Start the test
    this.startTest();
  }

  startTest() {
    // Shuffle questions for variety
    this.shuffledQuestions = shuffleArray(questions);
    
    // Hide intro, show question screen
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    
    // Initialize answer buttons
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = parseInt(e.currentTarget.dataset.value);
        this.handleAnswer(value);
      });
    });
    
    // Show first question
    this.displayQuestion();
  }

  displayQuestion() {
    const question = this.shuffledQuestions[this.currentQuestion];
    
    // Update question text
    document.getElementById('question-text').textContent = question.text;
    
    // Update progress
    const progress = ((this.currentQuestion + 1) / this.shuffledQuestions.length) * 100;
    document.getElementById('question-counter').textContent = `Question ${this.currentQuestion + 1} of ${this.shuffledQuestions.length}`;
    document.getElementById('progress-percentage').textContent = `${Math.round(progress)}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    // Update Previous button state
    const prevBtn = document.getElementById('prev-question-btn');
    if (this.currentQuestion === 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      prevBtn.disabled = false;
      prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Reset button styles
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.classList.remove('border-indigo-600', 'bg-indigo-50');
      btn.classList.add('border-gray-200');
    });
    
    // Highlight previous answer if going back
    if (this.answers[this.currentQuestion]) {
      const previousValue = this.answers[this.currentQuestion].value;
      const previousBtn = document.querySelector(`.answer-btn[data-value="${previousValue}"]`);
      if (previousBtn) {
        previousBtn.classList.add('border-indigo-600', 'bg-indigo-50');
        previousBtn.classList.remove('border-gray-200');
      }
    }
  }

  handleAnswer(value) {
    const question = this.shuffledQuestions[this.currentQuestion];
    
    // Store answer
    this.answers[this.currentQuestion] = {
      question: question.text,
      archetype: question.archetyp,
      value: value
    };
    
    // Move to next question or show results
    if (this.currentQuestion < this.shuffledQuestions.length - 1) {
      this.currentQuestion++;
      this.displayQuestion();
    } else {
      this.calculateResults();
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.displayQuestion();
    }
  }

  calculateResults() {
    // Calculate scores for each archetype
    const scores = {};
    
    this.answers.forEach(answer => {
      if (!scores[answer.archetype]) {
        scores[answer.archetype] = 0;
      }
      scores[answer.archetype] += answer.value;
    });
    
    // Calculate total score
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    // Calculate percentages and sort
    const results = Object.entries(scores)
      .map(([name, score]) => ({
        name: name,
        score: score,
        percentage: Math.round((score / totalScore) * 100)
      }))
      .sort((a, b) => b.score - a.score);
    
    this.results = results;
    
    console.log('🎯 Results calculated:', this.results);
    
    // Send to MailerLite and display results
    this.sendToMailerLite();
    this.displayResults();
  }

  async sendToMailerLite() {
    try {
      console.log('📧 Sending data to MailerLite...');
      
      // Get top 3 archetypes
      const top3 = this.results.slice(0, 3);
      
      const data = {
        email: this.userInfo.email,
        name: this.userInfo.name,
        archetype: this.results[0].name,
        archetypePercentage: this.results[0].percentage,
        top3Results: top3
      };
      
      console.log('📤 Data being sent:', data);
      
      const response = await fetch('/api/mailerlite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Successfully added to MailerLite:', result);
        console.log('📧 Email sequence will be triggered automatically');
      } else {
        console.warn('⚠️ MailerLite API warning:', result);
      }
      
    } catch (error) {
      console.error('❌ Error sending to MailerLite:', error);
      // Don't block the user flow
    }
  }

  displayResults() {
    // Hide question screen, show results
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    
    // Display dominant archetype
    const dominant = this.results[0];
    const archetypeData = archetypen.find(a => a.name === dominant.name);
    
    document.getElementById('dominant-archetype-name').textContent = archetypeData.title;
    document.getElementById('dominant-archetype-percentage').textContent = `${dominant.percentage}%`;
    
    // Display top 3 archetypes
    const top3Container = document.getElementById('top-archetypes');
    const top3 = this.results.slice(0, 3);
    
    top3Container.innerHTML = top3.map((result, index) => {
      const data = archetypen.find(a => a.name === result.name);
      const emoji = index === 0 ? '👑' : index === 1 ? '🥈' : '🥉';
      
      return `
        <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-lg">${emoji} ${data.title}</h4>
            <span class="text-2xl font-bold text-indigo-600">${result.percentage}%</span>
          </div>
          <p class="text-sm text-gray-600">${data.shortDescription}</p>
        </div>
      `;
    }).join('');
    
    // Display all archetypes
    const allContainer = document.getElementById('all-archetypes');
    allContainer.innerHTML = this.results.map(result => {
      const data = archetypen.find(a => a.name === result.name);
      
      return `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex-1">
            <h5 class="font-medium text-gray-900">${data.title}</h5>
            <p class="text-xs text-gray-500">${data.shortDescription}</p>
          </div>
          <div class="ml-4">
            <div class="flex items-center">
              <div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: ${result.percentage}%"></div>
              </div>
              <span class="text-sm font-semibold text-gray-700 w-12 text-right">${result.percentage}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArchetypenTest();
  });
} else {
  new ArchetypenTest();
}
