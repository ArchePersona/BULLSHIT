/**
 * IS THIS BULLSHIT? — Application Logic & Neural Heuristic Engine
 * Forensic claim parser, interactive highlighters, canvas scorecard exporter, and Web Audio synthesis.
 */

// --- State Management ---
const state = {
  soundEnabled: true,
  currentResult: null,
  selectedFilter: 'all',
  activePreset: null,
  config: {
    engine: 'heuristic', // 'heuristic' | 'openai' | 'anthropic' | 'openrouter'
    apiKey: '',
    model: ''
  }
};

// --- Presets Data ---
const PRESETS = {
  layoff: `Today, in order to strategically optimize our multi-horizon operational velocity and realign our cross-functional synergistic paradigms for sustainable quantum growth, we are taking decisive measures to re-architect our global talent footprint. 

While market headwinds and macroeconomic inflection points necessitate streamlining our core headcount by 14.5%, we remain profoundly grateful to our alumni whose unyielding passion shaped our corporate DNA. This proactive recalibration ensures our ecosystem remains agile, frictionless, and positioned for hyperbolic enterprise leverage. We are not firing people; we are empowering individuals to graduate into the broader market ecosystem.`,
  
  linkedin: `I woke up at 3:42 AM today, took an ice bath in Himalayan glacier water, and turned down a $75 million seed check before breakfast. Why? Because true visionary founders don't sell their soul for liquidity events. 

I then spent 45 minutes mentoring a stray dog in product-market fit. The dog didn't speak, but its eyes conveyed a deep comprehension of our AI-native B2B pipeline. If you are not working 118 hours a week, you don't want success. You want comfort. Agree? Thoughts? 🚀💡`,
  
  crypto: `HyperZero is an omnichain zero-knowledge proof-of-stake quantum oracle network built to democratize decentralized yield primitives across Web4. By harnessing our proprietary Proof-of-Intuition consensus engine, the network seamlessly achieves 4,000,000 TPS with zero gas fees and guaranteed 480% non-inflationary staking rewards. 

Our audited tokenomics create a hyper-deflationary vortex backed by mathematical certainty and tier-1 algorithmic synthetic reserves. It is mathematically impossible for the floor price to drop below historical resistance.`,
  
  startup: `We are the Uber for artisanal subterranean moss. With a $420B total addressable market and an organic viral coefficient of 8.9x MoM, our decentralized distribution network leverages hyper-local kinetic crowdsourcing to completely disrupt biological decor. 

Top Tier-1 venture partners are already preempting our Series A, and we expect 100x net revenue retention by next Tuesday.`,
  
  sane: `In our quarterly review, revenue increased by 4.2% year-over-year to $12.4 million, driven primarily by our enterprise tier expansion. Operating expenses rose 3.1% due to inflation and infrastructure hosting costs on AWS. 

While our churn rate increased slightly from 1.8% to 2.1%, customer lifetime value remained steady at $4,200. We anticipate modest 3-5% growth next quarter assuming market conditions remain stable.`
};

// --- Sound Effects System (Web Audio API) ---
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) { /* ignore */ }
  }

  playScanPing(step) {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const freq = 440 + step * 120;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) { /* ignore */ }
  }

  playStampSlam() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) { /* ignore */ }
  }
}

const sfx = new SoundFX();

// --- Toast Notifications ---
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Core Rhetorical Analysis Engine ---
class ForensicAnalysisEngine {
  static BUZZWORDS = [
    'synergy', 'synergistic', 'paradigm', 'quantum', 'velocity', 'leverage', 'frictionless',
    'hyper-deflationary', 'omnichain', 'web4', 'ai-native', 'proof-of-intuition', 'disrupt',
    'headwinds', 'recalibrate', 'footprint', 'macroeconomic', 'inflection point',
    'hyperbolic', 'total addressable market', 'viral coefficient', 'preempting', 'flywheel',
    'holistic', 'bandwidth', 'ideate', 'game-changer', 'scalable', 'exponential', 'unprecedented'
  ];

  static WEASEL_PHRASES = [
    'experts agree', 'growing consensus', 'some say', 'widely recognized', 'studies suggest',
    'it is known that', 'market whispers indicate', 'virtually guaranteed', 'strategically optimize',
    'realign our cross-functional', 'empowering individuals to graduate', 'decisive measures',
    'positioned for', 'mathematically impossible', 'guaranteed', 'audited tokenomics'
  ];

  static FALLACY_PATTERNS = [
    { regex: /\b(\d+x|\d+% (non-inflationary|staking|return))\b/gi, category: 'fiction', tag: 'Pure Fiction', label: 'Math Illusion' },
    { regex: /\b(true visionary|if you are not working|sell your soul)\b/gi, category: 'gaslight', tag: 'Corporate Gaslighting', label: 'False Dichotomy' },
    { regex: /\b(we are not firing people|talent footprint|re-architect)\b/gi, category: 'gaslight', tag: 'Corporate Gaslighting', label: 'Euphemistic Fog' },
    { regex: /\b(democratize|yield primitives|zero gas fees|historical resistance)\b/gi, category: 'buzzword', tag: 'Buzzword Overdose', label: 'Jargon Camouflage' },
    { regex: /\b(mentoring a stray dog|eyes conveyed a deep comprehension)\b/gi, category: 'fiction', tag: 'Pure Fiction', label: 'Hallucinatory Narrative' },
    { regex: /\b(market headwinds|proactive recalibration|frictionless)\b/gi, category: 'weasel', tag: 'Weasel Words', label: 'Accountability Evasion' },
    { regex: /\b(mathematically impossible|guaranteed|backed by mathematical certainty)\b/gi, category: 'source', tag: 'Source: Trust Me Bro', label: 'Unfalsifiable Assertion' },
    { regex: /\b(kinetic crowdsourcing|subterranean moss|by next tuesday)\b/gi, category: 'leap', tag: 'Logical Leap', label: 'Absurd Extrapolation' }
  ];

  static runHeuristicAudit(text, isStrict = true, hasSnark = true) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    if (wordCount === 0) return null;

    let flaggedClaims = [];
    let weaselCount = 0;
    let buzzwordCount = 0;
    let leapCount = 0;
    let fictionCount = 0;
    let gaslightCount = 0;
    let trustMeCount = 0;

    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];

    sentences.forEach((sentence, sIdx) => {
      const cleanSentence = sentence.trim();
      if (!cleanSentence) return;

      let sentenceFlagged = false;

      // Check regex pattern hits
      for (const pattern of this.FALLACY_PATTERNS) {
        const match = cleanSentence.match(pattern.regex);
        if (match) {
          const phrase = match[0];
          flaggedClaims.push({
            id: `claim_${sIdx}_${flaggedClaims.length}`,
            phrase: phrase,
            sentence: cleanSentence,
            category: pattern.category,
            tag: pattern.tag,
            label: pattern.label,
            cringe: Math.min(99, Math.floor(70 + Math.random() * 28)),
            diagnosis: `Flagged under ${pattern.tag}: utilizes evasive or unfalsifiable construction to bypass logical scrutiny.`,
            reasoning: `Contains '${phrase}', which asserts high certainty or emotional spin without quantitative or empirical backing.`,
            translation: this.generatePlainEnglish(pattern.category, phrase)
          });
          sentenceFlagged = true;
          if (pattern.category === 'weasel') weaselCount++;
          if (pattern.category === 'buzzword') buzzwordCount++;
          if (pattern.category === 'leap') leapCount++;
          if (pattern.category === 'fiction') fictionCount++;
          if (pattern.category === 'gaslight') gaslightCount++;
          if (pattern.category === 'source') trustMeCount++;
        }
      }

      // Check standalone buzzwords
      this.BUZZWORDS.forEach(bw => {
        const bwRegex = new RegExp(`\\b${bw}\\b`, 'i');
        if (bwRegex.test(cleanSentence) && !sentenceFlagged) {
          buzzwordCount++;
          flaggedClaims.push({
            id: `bw_${sIdx}_${buzzwordCount}`,
            phrase: bw,
            sentence: cleanSentence,
            category: 'buzzword',
            tag: 'Buzzword Overdose',
            label: 'Linguistic Posturing',
            cringe: Math.floor(65 + Math.random() * 30),
            diagnosis: `Excessive reliance on pseudo-intellectual jargon ('${bw}') to simulate competence.`,
            reasoning: `Standard enterprise fluff designed to make routine or unpleasant facts sound groundbreaking.`,
            translation: `"${bw}" = "we don't have a clear idea, but it sounds expensive."`
          });
          sentenceFlagged = true;
        }
      });

      // Check weasel phrases
      this.WEASEL_PHRASES.forEach(wp => {
        const wpRegex = new RegExp(`\\b${wp}\\b`, 'i');
        if (wpRegex.test(cleanSentence) && !sentenceFlagged) {
          weaselCount++;
          flaggedClaims.push({
            id: `wp_${sIdx}_${weaselCount}`,
            phrase: wp,
            sentence: cleanSentence,
            category: 'weasel',
            tag: 'Weasel Words',
            label: 'Plausible Deniability',
            cringe: Math.floor(75 + Math.random() * 20),
            diagnosis: `Unattributed passive authority or rhetorical smoke screen ('${wp}').`,
            reasoning: `Hides agency and shifts blame onto anonymous entities.`,
            translation: `"${wp}" = "Nobody actually said this, but please don't check."`
          });
          sentenceFlagged = true;
        }
      });
    });

    // Remove duplicate phrases from claims
    const uniqueClaims = [];
    const seenPhrases = new Set();
    flaggedClaims.forEach(c => {
      const key = c.phrase.toLowerCase();
      if (!seenPhrases.has(key)) {
        seenPhrases.add(key);
        uniqueClaims.push(c);
      }
    });

    // Metric calculations
    const totalViolations = uniqueClaims.length;
    const densityPer100 = wordCount > 0 ? ((totalViolations / wordCount) * 100).toFixed(1) : '0.0';
    
    let baseBSScore = 0;
    if (wordCount < 15) {
      baseBSScore = totalViolations > 0 ? 60 : 15;
    } else {
      const violationImpact = (totalViolations / (wordCount * 0.15)) * 100;
      baseBSScore = Math.min(99, Math.max(5, Math.round(violationImpact)));
    }

    if (isStrict) {
      baseBSScore = Math.min(99, Math.round(baseBSScore * 1.15));
    }

    // Fact to Fluff
    const fluffRatio = Math.min(95, Math.max(8, baseBSScore));
    const factRatio = 100 - fluffRatio;

    // Verdict generation
    const verdict = this.buildVerdict(baseBSScore, uniqueClaims, hasSnark);

    return {
      score: baseBSScore,
      factRatio,
      fluffRatio,
      fallacyDensity: densityPer100,
      wordCount,
      counts: {
        weasel: weaselCount,
        buzzword: buzzwordCount,
        leap: leapCount,
        fiction: fictionCount,
        gaslight: gaslightCount,
        trustMe: trustMeCount,
        total: uniqueClaims.length
      },
      verdict,
      claims: uniqueClaims,
      originalText: text
    };
  }

  static generatePlainEnglish(category, phrase) {
    const mappings = {
      fiction: `"This number or story was forged in the fires of pure imagination."`,
      gaslight: `"We did something bad or selfish, but we've reframed it as an act of cosmic heroism for your benefit."`,
      buzzword: `"We used 14 syllables where 2 would suffice to justify our consulting invoice."`,
      weasel: `"We take zero legal or moral responsibility if this turns out to be entirely fabricated."`,
      source: `"Source: A vivid fever dream I had last Thursday."`,
      leap: `"Step 1: Drink water. Step 2: [UNKNOWN BLACK HOLE]. Step 3: Billionaire status."`
    };
    return mappings[category] || `"Translation: Please ignore the logical deficit behind '${phrase}'."`;
  }

  static buildVerdict(score, claims, hasSnark) {
    if (score >= 80) {
      return {
        stamp: 'CERTIFIED GRADE-A HOGWASH',
        stampClass: 'stamp-danger',
        riskTier: 'RHETORICAL RISK: BIOHAZARD (CRITICAL)',
        readability: 'READABILITY: WEASEL SOUP',
        headline: '"A Masterclass in Evasive Gaslighting"',
        description: 'This text exhibits terminal levels of jargon obfuscation, unfalsifiable claims, and corporate reality-distortion. Reading it without skeptical HAZMAT gear may cause acute loss of brain cells.',
        snarkQuote: '“If hot air were currency, this paragraph could pay off the national debt twice over.”',
        species: {
          emoji: '🎪',
          title: 'Hyperbolic Hustle Theater',
          desc: 'Conflates aggressive self-aggrandizement with actionable competence.',
          antidote: 'Request immediate receipts, audited spreadsheets, and a ban on buzzwords.'
        }
      };
    } else if (score >= 50) {
      return {
        stamp: 'SUSPICIOUSLY SLICK',
        stampClass: 'stamp-warning',
        riskTier: 'RHETORICAL RISK: ELEVATED',
        readability: 'READABILITY: GLOSS WITH SUBSTANCE GAPS',
        headline: '"Cleverly Disguised Half-Truths & Fluff"',
        description: 'Contains a kernel of real data, wrapped tightly in defensive corporate cushions and fashionable buzzwords. Proceed with heavy skepticism.',
        snarkQuote: '“50% actual information, 50% executive perfume sprayed on a spreadsheet.”',
        species: {
          emoji: '🦎',
          title: 'Chameleon PR Camouflage',
          desc: 'Adopts the linguistic plumage of innovation while delivering standard metrics.',
          antidote: 'Strip all adjectives and re-evaluate only the transitive verbs and numbers.'
        }
      };
    } else if (score >= 25) {
      return {
        stamp: 'MOSTLY HARMLESS',
        stampClass: 'stamp-neutral',
        riskTier: 'RHETORICAL RISK: MODERATE',
        readability: 'READABILITY: PASSABLE CLARITY',
        headline: '"A Few Weasel Words, But Mostly Sane"',
        description: 'Some modest marketing flourish detected, but the core communicative intent is relatively straightforward and grounded.',
        snarkQuote: '“A minor sprinkle of buzzwords, but nothing an editor with a red pen couldn\'t fix in 30 seconds.”',
        species: {
          emoji: '☕',
          title: 'Standard Business Dialect',
          desc: 'Uses mild customary pleasantries without aggressive cognitive distortion.',
          antidote: 'A gentle reminder to speak plainly.'
        }
      };
    } else {
      return {
        stamp: 'UNCHARACTERISTICALLY SANE',
        stampClass: 'stamp-clean',
        riskTier: 'RHETORICAL RISK: MINIMAL (PRISTINE)',
        readability: 'READABILITY: REFRESHINGLY DIRECT',
        headline: '"Miraculously Clear, Direct, and Grounded"',
        description: 'Astonishingly devoid of deceptive rhetoric. Claims are concrete, metrics are falsifiable, and no stray gurus were harmed in the making of this prose.',
        snarkQuote: '“Alert the press: someone wrote a document on the internet without trying to hustle us.”',
        species: {
          emoji: '🛡️',
          title: 'Empirical Directness',
          desc: 'Relies on factual reporting, verifiable numbers, and honest boundaries.',
          antidote: 'Preserve this artifact in a temperature-controlled vault.'
        }
      };
    }
  }
}

// --- UI Controller ---
class UIController {
  constructor() {
    this.initElements();
    this.bindEvents();
    this.checkUrlHash();
    this.updateCounters();
  }

  initElements() {
    this.inputText = document.getElementById('inputText');
    this.charWordCounter = document.getElementById('charWordCounter');
    this.textareaWarning = document.getElementById('textareaWarning');
    this.presetList = document.getElementById('presetList');
    this.analyzeBtn = document.getElementById('analyzeBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.strictModeToggle = document.getElementById('strictModeToggle');
    this.snarkLevelToggle = document.getElementById('snarkLevelToggle');
    
    // Scanning Elements
    this.scanningState = document.getElementById('scanningState');
    this.scannerProgress = document.getElementById('scannerProgress');
    this.scannerStatusMessage = document.getElementById('scannerStatusMessage');
    this.scannerSubMessage = document.getElementById('scannerSubMessage');
    
    // Results Elements
    this.resultsContainer = document.getElementById('resultsContainer');
    this.verdictStamp = document.getElementById('verdictStamp');
    this.riskTierBadge = document.getElementById('riskTierBadge');
    this.readabilityGrade = document.getElementById('readabilityGrade');
    this.verdictHeadline = document.getElementById('verdictHeadline');
    this.verdictDescription = document.getElementById('verdictDescription');
    this.verdictSnarkQuote = document.getElementById('verdictSnarkQuote');
    
    this.overallScoreVal = document.getElementById('overallScoreVal');
    this.meterProgressCircle = document.getElementById('meterProgressCircle');
    this.meterCaption = document.getElementById('meterCaption');
    this.ratioFactBar = document.getElementById('ratioFactBar');
    this.ratioFluffBar = document.getElementById('ratioFluffBar');
    this.factPct = document.getElementById('factPct');
    this.fluffPct = document.getElementById('fluffPct');
    this.fallacyDensityVal = document.getElementById('fallacyDensityVal');
    
    this.weaselCountBadge = document.getElementById('weaselCountBadge');
    this.buzzwordCountBadge = document.getElementById('buzzwordCountBadge');
    this.leapCountBadge = document.getElementById('leapCountBadge');
    this.speciesEmoji = document.getElementById('speciesEmoji');
    this.speciesTitle = document.getElementById('speciesTitle');
    this.speciesDesc = document.getElementById('speciesDesc');
    this.speciesAntidote = document.getElementById('speciesAntidote');
    
    this.annotatedTextBox = document.getElementById('annotatedTextBox');
    this.claimsListContainer = document.getElementById('claimsListContainer');
    this.totalFlagCount = document.getElementById('totalFlagCount');
    
    // Modals & Popovers
    this.claimPopoverModal = document.getElementById('claimPopoverModal');
    this.closePopoverBtn = document.getElementById('closePopoverBtn');
    this.popoverTag = document.getElementById('popoverTag');
    this.popoverQuoteText = document.getElementById('popoverQuoteText');
    this.popoverDiagnosis = document.getElementById('popoverDiagnosis');
    this.popoverReasoning = document.getElementById('popoverReasoning');
    this.popoverTranslation = document.getElementById('popoverTranslation');
    this.popoverCringeBar = document.getElementById('popoverCringeBar');
    this.popoverCringePct = document.getElementById('popoverCringePct');
    
    this.settingsModal = document.getElementById('settingsModal');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
    this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
    this.resetSettingsBtn = document.getElementById('resetSettingsBtn');
    this.engineSelect = document.getElementById('engineSelect');
    this.apiKeyGroup = document.getElementById('apiKeyGroup');
    this.customApiKey = document.getElementById('customApiKey');
    this.modelSelectGroup = document.getElementById('modelSelectGroup');
    this.customModelName = document.getElementById('customModelName');
    
    this.methodologyBtn = document.getElementById('methodologyBtn');
    this.methodologyModalBackdrop = document.getElementById('methodologyModalBackdrop');
    this.closeMethodologyBtn = document.getElementById('closeMethodologyBtn');
    
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundStatus = document.getElementById('soundStatus');
    
    // Export actions
    this.downloadCardBtn = document.getElementById('downloadCardBtn');
    this.copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
    this.tweetBtn = document.getElementById('tweetBtn');
    this.copyAnnotatedTextBtn = document.getElementById('copyAnnotatedTextBtn');
  }

  bindEvents() {
    this.inputText.addEventListener('input', () => this.updateCounters());

    // Presets
    this.presetList.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      sfx.playClick();
      const presetKey = btn.dataset.preset;
      if (PRESETS[presetKey]) {
        this.inputText.value = PRESETS[presetKey];
        this.updateCounters();
        this.startAnalysis();
      }
    });

    // Actions
    this.analyzeBtn.addEventListener('click', () => {
      sfx.playClick();
      this.startAnalysis();
    });

    this.clearBtn.addEventListener('click', () => {
      sfx.playClick();
      this.inputText.value = '';
      this.updateCounters();
      this.resultsContainer.classList.add('hidden');
    });

    // Sound Toggle
    this.soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      this.soundStatus.textContent = state.soundEnabled ? 'ON' : 'OFF';
      if (state.soundEnabled) sfx.playClick();
      showToast(`Sound FX ${state.soundEnabled ? 'Enabled' : 'Muted'}`);
    });

    // Popover Close
    this.closePopoverBtn.addEventListener('click', () => {
      this.claimPopoverModal.classList.add('hidden');
    });
    this.claimPopoverModal.addEventListener('click', (e) => {
      if (e.target === this.claimPopoverModal) this.claimPopoverModal.classList.add('hidden');
    });

    // Filter Pills
    const teardownFilters = document.getElementById('teardownFilters');
    teardownFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      sfx.playClick();
      teardownFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      state.selectedFilter = btn.dataset.filter;
      this.renderClaimsList();
    });

    // Settings Modal
    this.settingsBtn.addEventListener('click', () => {
      sfx.playClick();
      this.settingsModal.classList.remove('hidden');
    });
    this.closeSettingsBtn.addEventListener('click', () => {
      this.settingsModal.classList.add('hidden');
    });
    this.settingsModal.addEventListener('click', (e) => {
      if (e.target === this.settingsModal) this.settingsModal.classList.add('hidden');
    });
    this.engineSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'heuristic') {
        this.apiKeyGroup.classList.add('hidden');
        this.modelSelectGroup.classList.add('hidden');
      } else {
        this.apiKeyGroup.classList.remove('hidden');
        this.modelSelectGroup.classList.remove('hidden');
      }
    });
    this.saveSettingsBtn.addEventListener('click', () => {
      state.config.engine = this.engineSelect.value;
      state.config.apiKey = this.customApiKey.value.trim();
      state.config.model = this.customModelName.value.trim();
      this.settingsModal.classList.add('hidden');
      showToast('Engine preferences saved locally.');
    });
    this.resetSettingsBtn.addEventListener('click', () => {
      this.engineSelect.value = 'heuristic';
      this.customApiKey.value = '';
      this.customModelName.value = '';
      this.apiKeyGroup.classList.add('hidden');
      this.modelSelectGroup.classList.add('hidden');
      state.config = { engine: 'heuristic', apiKey: '', model: '' };
      showToast('Reset to built-in Forensic Heuristics.');
    });

    // Methodology Modal
    this.methodologyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sfx.playClick();
      this.methodologyModalBackdrop.classList.remove('hidden');
    });
    this.closeMethodologyBtn.addEventListener('click', () => {
      this.methodologyModalBackdrop.classList.add('hidden');
    });
    this.methodologyModalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.methodologyModalBackdrop) this.methodologyModalBackdrop.classList.add('hidden');
    });

    // Export actions
    this.downloadCardBtn.addEventListener('click', () => this.exportScorecardPNG());
    this.copyShareUrlBtn.addEventListener('click', () => this.generateShareLink());
    this.tweetBtn.addEventListener('click', () => this.shareToTwitter());
    this.copyAnnotatedTextBtn.addEventListener('click', () => {
      if (!state.currentResult) return;
      navigator.clipboard.writeText(state.currentResult.originalText);
      showToast('Copied original text to clipboard.');
    });
  }

  updateCounters() {
    const text = this.inputText.value || '';
    const charCount = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    this.charWordCounter.textContent = `${wordCount} words | ${charCount.toLocaleString()} / 25,000 chars`;

    if (wordCount > 5000) {
      this.textareaWarning.classList.remove('hidden');
    } else {
      this.textareaWarning.classList.add('hidden');
    }
  }

  async startAnalysis() {
    let text = this.inputText.value.trim();
    if (!text) {
      showToast('⚠️ Please paste or type some text first.');
      this.inputText.focus();
      return;
    }

    // Auto trim beyond 5,000 words
    const words = text.split(/\s+/);
    if (words.length > 5000) {
      text = words.slice(0, 5000).join(' ');
      this.inputText.value = text;
      this.updateCounters();
    }

    // UI Progress sequence
    this.scanningState.classList.remove('hidden');
    this.resultsContainer.classList.add('hidden');
    this.scanningState.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const scanSteps = [
      { pct: 20, msg: 'Calibrating skepticism sensors...', sub: 'Tokenizing claims and syntactic structures...' },
      { pct: 45, msg: 'Checking for missing citations...', sub: 'Scanning passive voice and unattributed authority...' },
      { pct: 75, msg: 'Filtering jargon soup & buzzword density...', sub: 'Deconstructing syllogistic leaps and marketing euphemisms...' },
      { pct: 95, msg: 'Rendering Forensic Bullshit Verdict...', sub: 'Synthesizing plain English diagnosis...' }
    ];

    for (let i = 0; i < scanSteps.length; i++) {
      const step = scanSteps[i];
      this.scannerProgress.style.width = `${step.pct}%`;
      this.scannerStatusMessage.textContent = step.msg;
      this.scannerSubMessage.textContent = step.sub;
      sfx.playScanPing(i + 1);
      await new Promise(r => setTimeout(r, 260));
    }

    // Run analysis (Heuristic or API)
    let result;
    try {
      if (state.config.engine !== 'heuristic' && state.config.apiKey) {
        result = await this.runExternalLLMAudit(text);
      } else {
        result = ForensicAnalysisEngine.runHeuristicAudit(
          text,
          this.strictModeToggle.checked,
          this.snarkLevelToggle.checked
        );
      }
    } catch (err) {
      console.warn('Falling back to local heuristic parser:', err);
      result = ForensicAnalysisEngine.runHeuristicAudit(
        text,
        this.strictModeToggle.checked,
        this.snarkLevelToggle.checked
      );
    }

    state.currentResult = result;
    this.scanningState.classList.add('hidden');
    this.renderResults(result);
    sfx.playStampSlam();
  }

  renderResults(res) {
    this.resultsContainer.classList.remove('hidden');

    // Verdict Card
    this.verdictStamp.textContent = res.verdict.stamp;
    this.verdictStamp.className = `verdict-stamp ${res.verdict.stampClass}`;
    this.riskTierBadge.textContent = res.verdict.riskTier;
    this.readabilityGrade.textContent = res.verdict.readability;
    this.verdictHeadline.textContent = res.verdict.headline;
    this.verdictDescription.textContent = res.verdict.description;
    this.verdictSnarkQuote.textContent = res.verdict.snarkQuote;

    // Metric Circle Meter
    this.overallScoreVal.textContent = `${res.score}%`;
    const circumference = 2 * Math.PI * 52; // 326.72
    const offset = circumference - (res.score / 100) * circumference;
    this.meterProgressCircle.style.strokeDasharray = `${circumference}`;
    this.meterProgressCircle.style.strokeDashoffset = `${offset}`;
    
    if (res.score >= 75) {
      this.meterProgressCircle.style.stroke = '#ff0055';
      this.meterCaption.textContent = 'Severe cognitive hazard quarantine required.';
    } else if (res.score >= 45) {
      this.meterProgressCircle.style.stroke = '#fcee0a';
      this.meterCaption.textContent = 'High level of corporate cushioning detected.';
    } else {
      this.meterProgressCircle.style.stroke = '#00ff66';
      this.meterCaption.textContent = 'Acceptably clean and empirically grounded.';
    }

    // Fact vs Fluff
    this.factPct.textContent = `${res.factRatio}%`;
    this.fluffPct.textContent = `${res.fluffRatio}%`;
    this.ratioFactBar.style.width = `${res.factRatio}%`;
    this.ratioFluffBar.style.width = `${res.fluffRatio}%`;

    // Fallacy Density
    this.fallacyDensityVal.textContent = res.fallacyDensity;
    this.weaselCountBadge.textContent = `${res.counts.weasel} Weasel Words`;
    this.buzzwordCountBadge.textContent = `${res.counts.buzzword} Buzzwords`;
    this.leapCountBadge.textContent = `${res.counts.leap} Logical Leaps`;

    // Species
    this.speciesEmoji.textContent = res.verdict.species.emoji;
    this.speciesTitle.textContent = res.verdict.species.title;
    this.speciesDesc.textContent = res.verdict.species.desc;
    this.speciesAntidote.textContent = res.verdict.species.antidote;

    // Total Count & Lists
    this.totalFlagCount.textContent = res.claims.length;
    this.renderAnnotatedViewer(res);
    this.renderClaimsList();

    // Smooth scroll to results
    this.resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderAnnotatedViewer(res) {
    let annotatedHtml = res.originalText;
    // Sort claims by phrase length descending to avoid nested string replacements
    const sortedClaims = [...res.claims].sort((a, b) => b.phrase.length - a.phrase.length);

    sortedClaims.forEach(claim => {
      const escaped = claim.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const badgeClass = `hl-${claim.category}`;
      annotatedHtml = annotatedHtml.replace(regex, `<span class="highlight-span ${badgeClass}" data-claim-id="${claim.id}">$1</span>`);
    });

    this.annotatedTextBox.innerHTML = annotatedHtml;

    // Attach click listeners to inline highlighted words
    this.annotatedTextBox.querySelectorAll('.highlight-span').forEach(span => {
      span.addEventListener('click', () => {
        const claimId = span.dataset.claimId;
        const found = res.claims.find(c => c.id === claimId);
        if (found) {
          sfx.playClick();
          this.openClaimPopover(found);
        }
      });
    });
  }

  renderClaimsList() {
    if (!state.currentResult) return;
    const claims = state.currentResult.claims;
    const filter = state.selectedFilter;

    const filtered = filter === 'all' 
      ? claims 
      : claims.filter(c => c.category === filter);

    this.claimsListContainer.innerHTML = '';

    if (filtered.length === 0) {
      this.claimsListContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px; font-family: var(--font-mono); font-size: 0.85rem;">No violations under '${filter}' filter.</div>`;
      return;
    }

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = `claim-card`;
      card.style.borderLeftColor = this.getCategoryColor(c.category);
      card.innerHTML = `
        <div class="claim-card-header">
          <span class="badge-category" style="background:${this.getCategoryColor(c.category)}; color:#000;">${c.tag}</span>
          <span class="claim-cringe-score">CRINGE: ${c.cringe}%</span>
        </div>
        <div class="claim-snippet">"${this.escapeHtml(c.phrase)}"</div>
        <div class="claim-quick-diag">${this.escapeHtml(c.label)} &bull; ${this.escapeHtml(c.diagnosis)}</div>
      `;
      card.addEventListener('click', () => {
        sfx.playClick();
        this.openClaimPopover(c);
      });
      this.claimsListContainer.appendChild(card);
    });
  }

  getCategoryColor(cat) {
    switch(cat) {
      case 'fiction': return '#ff0055';
      case 'weasel': return '#fcee0a';
      case 'source': return '#b026ff';
      case 'buzzword': return '#00f0ff';
      case 'leap': return '#ff7700';
      case 'gaslight': return '#00ff66';
      default: return '#cbd5e1';
    }
  }

  openClaimPopover(claim) {
    this.popoverTag.textContent = claim.tag;
    this.popoverTag.style.backgroundColor = this.getCategoryColor(claim.category);
    this.popoverTag.style.color = (claim.category === 'weasel' || claim.category === 'buzzword' || claim.category === 'gaslight') ? '#000' : '#fff';
    
    this.popoverQuoteText.textContent = `“${claim.sentence || claim.phrase}”`;
    this.popoverDiagnosis.textContent = `${claim.label} — ${claim.diagnosis}`;
    this.popoverReasoning.textContent = claim.reasoning;
    this.popoverTranslation.textContent = claim.translation;
    this.popoverCringePct.textContent = `${claim.cringe}%`;
    this.popoverCringeBar.style.width = `${claim.cringe}%`;
    
    this.claimPopoverModal.classList.remove('hidden');
  }

  // --- Share & Card Export Engine ---
  exportScorecardPNG() {
    if (!state.currentResult) return;
    sfx.playClick();
    const res = state.currentResult;
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');

    const W = 1200;
    const H = 675;
    canvas.width = W;
    canvas.height = H;

    // Background Dark Brutalist Fill
    ctx.fillStyle = '#0a0c10';
    ctx.fillRect(0, 0, W, H);

    // Grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Border Outline
    ctx.strokeStyle = '#fcee0a';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, W - 12, H - 12);

    // Brand Header
    ctx.fillStyle = '#fcee0a';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('IS THIS BULLSHIT? // FORENSIC RHETORIC SCORECARD', 50, 60);

    // Headline & Verdict
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.fillText(res.verdict.headline, 50, 120);

    // Big Stamp (Rotated)
    ctx.save();
    ctx.translate(920, 120);
    ctx.rotate((8 * Math.PI) / 180);
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 5;
    ctx.strokeRect(-180, -35, 360, 70);
    ctx.fillStyle = '#ff0055';
    ctx.font = '900 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(res.verdict.stamp, 0, 0);
    ctx.restore();

    // Metrics Box
    ctx.fillStyle = '#151922';
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(50, 170, 1100, 240, 8);
    ctx.fill();
    ctx.stroke();

    // Stat 1: Overall BS Score
    ctx.fillStyle = '#a0aec0';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('BS INDEX', 90, 220);
    ctx.fillStyle = '#ff0055';
    ctx.font = '900 72px "JetBrains Mono", monospace';
    ctx.fillText(`${res.score}%`, 90, 290);

    // Stat 2: Fact to Fluff
    ctx.fillStyle = '#a0aec0';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('FACT VS FLUFF', 400, 220);
    ctx.fillStyle = '#00ff66';
    ctx.font = 'bold 32px "JetBrains Mono", monospace';
    ctx.fillText(`Fact: ${res.factRatio}%`, 400, 270);
    ctx.fillStyle = '#ff0055';
    ctx.fillText(`Fluff: ${res.fluffRatio}%`, 400, 310);

    // Stat 3: Violations
    ctx.fillStyle = '#a0aec0';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('VIOLATIONS', 720, 220);
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 28px "Space Grotesk", sans-serif';
    ctx.fillText(`🦡 ${res.counts.weasel} Weasels`, 720, 265);
    ctx.fillText(`⚡ ${res.counts.buzzword} Buzzwords`, 720, 305);
    ctx.fillText(`🦘 ${res.counts.leap} Leaps`, 720, 345);

    // Quote Box
    ctx.fillStyle = '#111620';
    ctx.beginPath();
    ctx.roundRect(50, 430, 1100, 140, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'italic 22px "Space Grotesk", sans-serif';
    ctx.fillText(res.verdict.snarkQuote, 80, 480);
    
    ctx.fillStyle = '#a0aec0';
    ctx.font = '18px "Space Grotesk", sans-serif';
    ctx.fillText(`Diagnosis: ${res.verdict.description.substring(0, 110)}...`, 80, 525);

    // Footer Tagline
    ctx.fillStyle = '#718096';
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillText('Audited with isthisbullshit.app • Forensic Rhetoric & Fluff Detection', 50, 620);

    // Download link
    const link = document.createElement('a');
    link.download = `BS-Audit-Scorecard-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Scorecard PNG downloaded.');
  }

  generateShareLink() {
    if (!state.currentResult) return;
    try {
      const payload = {
        text: state.currentResult.originalText.slice(0, 500),
        score: state.currentResult.score,
        stamp: state.currentResult.verdict.stamp
      };
      const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
      const url = `${window.location.origin}${window.location.pathname}#report=${encoded}`;
      navigator.clipboard.writeText(url);
      showToast('🔗 Direct shareable report link copied to clipboard!');
    } catch (e) {
      showToast('Failed to create hash URL.');
    }
  }

  shareToTwitter() {
    if (!state.currentResult) return;
    const res = state.currentResult;
    const tweetText = encodeURIComponent(
      `🚨 I just audited text with 'IS THIS BULLSHIT?'\n\n` +
      `Score: ${res.score}% BS\n` +
      `Verdict: ${res.verdict.stamp}\n` +
      `Fact-to-Fluff: ${res.factRatio}% / ${res.fluffRatio}%\n\n` +
      `Audit your corporate emails & hype posts here:`
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  }

  checkUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#report=')) {
      try {
        const base64 = hash.replace('#report=', '');
        const decoded = JSON.parse(decodeURIComponent(atob(base64)));
        if (decoded && decoded.text) {
          this.inputText.value = decoded.text;
          this.updateCounters();
          setTimeout(() => this.startAnalysis(), 400);
        }
      } catch (e) {
        console.error('Invalid hash payload');
      }
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async runExternalLLMAudit(text) {
    // Extensible endpoint for OpenAI / Anthropic / OpenRouter proxy
    const endpoint = state.config.engine === 'openai'
      ? 'https://api.openai.com/v1/chat/completions'
      : state.config.engine === 'openrouter'
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : null;

    if (!endpoint) {
      throw new Error('Unsupported direct endpoint');
    }

    const model = state.config.model || (state.config.engine === 'openai' ? 'gpt-4o-mini' : 'anthropic/claude-3.5-sonnet');
    
    const prompt = `You are the forensic parser for "IS THIS BULLSHIT?". Analyze this text and return strict JSON with schema:
    {
      "score": (0-100 number),
      "factRatio": (0-100 number),
      "fluffRatio": (0-100 number),
      "fallacyDensity": (string number),
      "verdict": {
        "stamp": (short all-caps witty title),
        "stampClass": ("stamp-danger" | "stamp-warning" | "stamp-neutral" | "stamp-clean"),
        "riskTier": (string),
        "readability": (string),
        "headline": (string),
        "description": (string),
        "snarkQuote": (string),
        "species": { "emoji": (single emoji), "title": (string), "desc": (string), "antidote": (string) }
      },
      "claims": [
        {
          "id": (string),
          "phrase": (exact matched phrase),
          "sentence": (full sentence),
          "category": ("fiction" | "weasel" | "source" | "buzzword" | "leap" | "gaslight"),
          "tag": (string tag),
          "label": (string),
          "cringe": (0-100 number),
          "diagnosis": (string),
          "reasoning": (string),
          "translation": (string)
        }
      ]
    }
    Text: "${text.replace(/"/g, '\\"')}"`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.config.apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3
      })
    });

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    parsed.originalText = text;
    parsed.wordCount = text.split(/\s+/).filter(Boolean).length;
    parsed.counts = {
      weasel: parsed.claims.filter(c => c.category === 'weasel').length,
      buzzword: parsed.claims.filter(c => c.category === 'buzzword').length,
      leap: parsed.claims.filter(c => c.category === 'leap').length,
      fiction: parsed.claims.filter(c => c.category === 'fiction').length,
      gaslight: parsed.claims.filter(c => c.category === 'gaslight').length,
      trustMe: parsed.claims.filter(c => c.category === 'source').length,
      total: parsed.claims.length
    };
    return parsed;
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  window.app = new UIController();
});
