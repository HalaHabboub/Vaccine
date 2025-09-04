# 💊 VACCINE - Claude Project Context

**Project Name**: Vaccine  
**Description**: Interactive Resilience Simulator for Content Creators  
**Tagline**: Immunize Against Online Hate  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS  
**Status**: Development Phase  

---

## 🎯 Project Overview

Vaccine is a frontend-focused web application designed to help content creators build psychological resilience against online harassment through interactive simulations and real-time crisis support.

### Core Philosophy
- **Experiential Learning**: Active decision-making in simulated stress situations
- **Safe Experimentation**: Practice responses without real-world consequences
- **Feedback & Reflection**: Visual meters show Mental Health and Community Trust impact
- **Positive Reinforcement**: Reward healthy strategies over punishment
- **Scaffolded Practice**: Multiple-choice → Free-form responses

---

## 🏗️ Architecture

### Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom purple/orange color scheme
- **Animations**: Framer Motion for smooth interactions
- **State Management**: Client-side only (no database)
- **Deployment**: Static hosting ready (Netlify/Vercel)

### Color Palette
- **Primary Purple**: `#9333ea` (with light/dark variants)
- **Primary Orange**: `#f97316` (with light/dark variants)
- **Gradients**: Purple-to-orange for dynamic effects

### Project Structure
```
/src
  /components
    - HomePage.tsx          # Main landing page
    - GameController.tsx    # Practice mode orchestrator
    - ScenarioCard.tsx      # Individual scenario display
    - MeterDisplay.tsx      # Mental health/trust meters
    - CrisisMode.tsx        # Real-time help mode
  /data
    /badges
      - hateComments.ts     # Badge scenario data
  /types
    - game.ts              # TypeScript interfaces
  /utils
    - mcpClient.ts         # React Bits MCP integration
  /styles
    - index.css           # Global styles
```

---

## 🎮 Core Features

### 1. Landing Page (HomePage)
- **Bold Design**: Large "VACCINE" title with gradient background
- **Two Main Actions**:
  - 🎮 **Practice**: Enter training simulations
  - 🆘 **Get Help**: Real-time crisis support
- **Animations**: Floating elements, hover effects, smooth transitions

### 2. Practice Mode (GameController)
- **Badge System**: Modular challenge categories
- **Current Badge**: "Hate Comments" (fully implemented)
- **Flow**: Introduction → Bad Strategy → Consequences → Healthy Strategy → Resolution → Practice
- **Meters**: Real-time Mental Health and Community Trust tracking
- **Progress**: Visual progress bar through phases

### 3. Crisis Mode (CrisisMode)
- **Input**: Paste real hateful comments
- **Analysis**: AI-powered response strategy suggestions
- **Options**: 4 response strategies with impact predictions
- **Guidance**: Recommended vs. risky strategies clearly marked

### 4. Badge Architecture
**Implemented**:
- Hate Comments Badge (6 phases complete)

**Planned**:
- Cancel Culture / Mass Criticism
- False Accusations
- Pressure to Respond
- Comparison & Jealousy
- Platform Harassment

---

## 📊 Game Mechanics

### Meters System
- **Mental Health**: 0-100, affected by stress/resilience choices
- **Community Trust**: 0-100, reflects audience perception impact
- **Visual**: Gradient progress bars with smooth animations
- **Colors**: Green (high), Orange (medium), Red (low)

### Scenario Structure
Each phase contains:
- `id`: Unique identifier
- `type`: 'scenario' | 'lesson' | 'practice' | 'completion'
- `narrative`: Story text
- `choices`: Array of response options with effects
- `lessonText`: Optional educational content

### Choice Effects
```typescript
effects: {
  mentalHealth?: number,    // +/- impact on psychological state
  communityTrust?: number   // +/- impact on reputation
}
```

---

## 🔌 Integrations

### React Bits MCP Server
- **Endpoint**: `https://react-bits-mcp.davidhzdev.workers.dev/`
- **Purpose**: AI-powered React component recommendations
- **Client**: Custom TypeScript client (`mcpClient.ts`)
- **Methods**: Search, get component details, browse categories

### MCP Configuration
```json
{
  "mcpServers": {
    "react-bits": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sse-client", "https://react-bits-mcp.davidhzdev.workers.dev/sse"]
    }
  }
}
```

---

## 🎨 Design System

### Typography
- **Headings**: Font-black, large sizes (text-6xl to text-9xl)
- **Body**: Clean, readable with good contrast
- **Buttons**: Bold, uppercase, tracked spacing

### Components Style
- **Cards**: Glassmorphism with backdrop-blur
- **Buttons**: Gradient backgrounds with hover animations
- **Meters**: Gradient fills with glow effects
- **Animations**: Float, glow, pulse effects

### Responsive Design
- **Mobile-first**: Stacked layouts on small screens
- **Desktop**: Side-by-side layouts with larger text
- **Touch-friendly**: Large button targets

---

## 🚀 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install dependencies
npm install
```

---

## 📁 Key Files to Know

### Configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration  
- `tailwind.config.js` - Custom colors and animations
- `vite.config.ts` - Build tool configuration

### Main Components
- `src/App.tsx` - Root component with mode routing
- `src/components/HomePage.tsx` - Landing page
- `src/components/GameController.tsx` - Practice mode
- `src/components/CrisisMode.tsx` - Crisis support

### Data
- `src/data/badges/hateComments.ts` - Complete badge scenario
- `src/types/game.ts` - TypeScript interfaces
- `RESILIENCE_SIMULATOR_INIT.md` - Detailed project specification

### Assets
- `vaccine_preview.gif` - Animated logo (800x300px, orange wave effect)

---

## 🎯 Development Priorities

### Phase 1 (Current)
- [x] Landing page with bold design
- [x] Practice mode with Hate Comments badge
- [x] Crisis mode for real-time help
- [x] Meter system with animations
- [x] Animated logo creation

### Phase 2 (Next)
- [ ] Additional badge scenarios
- [ ] Enhanced animations and transitions
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] User testing and feedback

### Phase 3 (Future)
- [ ] PWA capabilities
- [ ] Export/share functionality
- [ ] Analytics integration
- [ ] Accessibility improvements

---

## 💡 Key Principles for Development

### Code Quality
- **TypeScript**: Use strict typing throughout
- **Components**: Keep them focused and reusable
- **State**: Client-side only, no database dependencies
- **Performance**: Lazy loading and optimization

### User Experience
- **Simplicity**: Bold, clear interfaces
- **Feedback**: Immediate visual response to actions
- **Accessibility**: Keyboard navigation, screen readers
- **Mobile**: Touch-friendly, responsive design

### Content Strategy
- **Tone**: Supportive, non-judgmental
- **Education**: Learning through experience
- **Safety**: Safe space for experimentation
- **Empowerment**: Building confidence and skills

---

## 🔧 Troubleshooting

### Common Issues
1. **Import errors**: Check TypeScript paths in `tsconfig.json`
2. **Tailwind not working**: Verify `content` paths in config
3. **Animation glitches**: Check Framer Motion version compatibility
4. **Build failures**: Ensure all dependencies are installed

### Debug Commands
```bash
# Check TypeScript errors
npx tsc --noEmit

# Verify Tailwind classes
npx tailwindcss -i ./src/styles/index.css -o ./dist/output.css --watch

# Test component isolation
npm run storybook  # (if configured)
```

---

## 📚 Context for Claude

### When Working on This Project
1. **Maintain Design Consistency**: Always use the purple/orange color scheme
2. **Follow Component Pattern**: ScenarioCard → choices → meter updates → progression
3. **Keep Frontend Focus**: No backend/database assumptions
4. **Prioritize UX**: Smooth animations, clear feedback, accessibility
5. **Educational Purpose**: Remember this is about building resilience through safe practice

### Useful Prompts for Claude
- "Add a new badge scenario for [harassment type]"
- "Enhance the animation system for [component]"
- "Optimize the mobile experience for [screen]"
- "Create practice scenarios for [specific situation]"
- "Improve accessibility for [component/feature]"

### Project Goals
Help content creators build psychological immunity against online harassment through interactive, safe, and educational experiences that translate to real-world resilience.

---

**Last Updated**: September 2025  
**Version**: 1.0.0-dev  
**Claude Context**: Ready for development assistance 🚀