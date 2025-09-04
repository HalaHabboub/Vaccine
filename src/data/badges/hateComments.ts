import type { Badge } from '../../types/game'

export const hateCommentsBadge: Badge = {
  id: 'hate-comments',
  name: 'Hate Comments Badge',
  description: 'Learn to handle direct trolling, insults, and personal attacks',
  icon: '🛡️',
  phases: [
    {
      id: 'intro',
      type: 'scenario',
      narrative: "You've just uploaded a video. The first few responses are positive. Suddenly, the hate begins. This badge will guide you through how to respond when faced with direct, personal attacks.",
      choices: [
        {
          id: 'continue',
          text: 'Continue',
          effects: {}
        }
      ]
    },
    {
      id: 'first-reaction',
      type: 'scenario',
      narrative: 'A hateful comment appears:\n\n"You\'re so cringe. Delete your channel."\n\nHow do you respond?',
      choices: [
        {
          id: 'reply-angry',
          text: 'Reply Angrily',
          effects: {
            mentalHealth: 5,
            communityTrust: -20
          },
          feedback: 'You feel a moment of satisfaction, but your community sees you as reactive.'
        },
        {
          id: 'ignore',
          text: 'Ignore It',
          effects: {
            mentalHealth: -10,
            communityTrust: 0
          },
          feedback: 'You maintain composure publicly, but the comment eats at you internally.'
        }
      ]
    },
    {
      id: 'consequences',
      type: 'lesson',
      narrative: 'Neither pure silence nor anger is sustainable.',
      lessonText: 'Angry responses feed trolls and damage your reputation. Ignoring everything drains you mentally. Let\'s explore constructive approaches.',
      choices: [
        {
          id: 'learn-more',
          text: 'Learn Better Strategies',
          effects: {}
        }
      ]
    },
    {
      id: 'healthy-strategy',
      type: 'scenario',
      narrative: 'Another hate comment appears:\n\n"Stop stealing content, loser."\n\nThis time, try a healthier approach:',
      choices: [
        {
          id: 'block-report',
          text: 'Block/Report User',
          effects: {
            mentalHealth: 15,
            communityTrust: 0
          },
          feedback: 'The troll disappears from your view. You feel immediate relief.'
        },
        {
          id: 'pin-positive',
          text: 'Pin Positive Fan Comment',
          effects: {
            mentalHealth: 10,
            communityTrust: 20
          },
          feedback: 'You amplify positivity. Your community feels valued and rallies around you.'
        }
      ]
    },
    {
      id: 'escalation',
      type: 'scenario',
      narrative: 'The hate intensifies. Trolls begin spamming across multiple posts. Your stress is mounting. What\'s your strategy?',
      choices: [
        {
          id: 'public-rant',
          text: 'Post Public Angry Rant',
          effects: {
            mentalHealth: -30,
            communityTrust: -40
          },
          feedback: 'Short-term venting leads to long-term regret. The trolls celebrate their victory.'
        },
        {
          id: 'calm-post',
          text: 'Post Message to Supportive Fans',
          effects: {
            mentalHealth: 20,
            communityTrust: 30
          },
          feedback: 'You strengthen bonds with real supporters. The trolls lose their power.'
        }
      ]
    },
    {
      id: 'resolution',
      type: 'lesson',
      narrative: '🏆 Hate Comment Survivor Badge Unlocked!',
      lessonText: 'Key lessons learned:\n❌ Anger fuels trolls\n❌ Silence drains you\n✅ Healthy strategies protect you long-term\n\nEnergy invested in your loyal community builds resilience. Feeding trolls only weakens you.',
      choices: [
        {
          id: 'practice',
          text: 'Practice Your Skills',
          effects: {}
        }
      ]
    },
    {
      id: 'practice',
      type: 'practice',
      narrative: 'Practice challenge:\n\nWrite your own response to this hate comment:\n\n"Nobody watches your boring content, stop embarrassing yourself."',
      choices: []
    }
  ]
}