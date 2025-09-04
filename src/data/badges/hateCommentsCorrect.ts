import { Badge } from '../../types/game'

export const hateCommentsCorrect: Badge = {
  id: 'hate-comments-correct',
  name: 'Hate Comments',
  description: 'Learn to handle negative comments while protecting your mental health',
  icon: '💬',
  phases: [
    // PHASE 0: INTRODUCTION
    {
      id: 'introduction',
      type: 'scenario',
      narrative: 'You post a video. Suddenly, hate comments start appearing.',
      steps: [
        {
          id: 'initial-post',
          cards: [
            {
              id: 'user-post',
              type: 'post',
              content: 'My latest video on staying positive online is now live!',
              isUserPost: true,
              author: 'You',
              timestamp: '2 min ago'
            }
          ],
          requiresChoiceToProgress: false
        },
        {
          id: 'meter-explanation',
          cards: [
            {
              id: 'meters-info',
              type: 'feedback',
              content: 'Watch your metrics: Followers: 10, Stress Level: 30% (green zone). Your choices will impact both throughout this simulation.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },
    
    // PHASE 1: BAD STRATEGIES - FIRST HATE COMMENT
    {
      id: 'bad-strategies-comment1',
      type: 'scenario',
      narrative: 'Teaching the Outcome of Wrong Reactions',
      steps: [
        {
          id: 'first-hate-comment',
          cards: [
            {
              id: 'hate-comment-1',
              type: 'comment',
              content: 'You\'re so cringe, delete your channel.',
              author: 'TrollUser123',
              timestamp: '1 min ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'reply-angry-1',
          text: 'Reply angrily',
          effects: {
            mentalHealth: -40, // Stress +40
            communityTrust: 10  // Followers +10
          },
          feedback: 'Your angry reply: "Why don\'t you get a life instead of trolling here?"'
        },
        {
          id: 'ignore-1', 
          text: 'Ignore the comment',
          effects: {
            mentalHealth: -20, // Stress +20
            communityTrust: 0   // Followers no change
          },
          feedback: 'You chose to ignore; stress builds silently.'
        }
      ]
    },

    // PHASE 1: BAD STRATEGIES - SECOND HATE COMMENT (FORCE OTHER CHOICE)
    {
      id: 'bad-strategies-comment2',
      type: 'scenario',
      narrative: 'Now try the other response to see how it compares',
      steps: [
        {
          id: 'second-hate-comment',
          cards: [
            {
              id: 'hate-comment-2',
              type: 'comment',
              content: 'You\'re so fake, everyone can tell.',
              author: 'HaterBot456',
              timestamp: '30 sec ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'reply-angry-2',
          text: 'Reply angrily',
          effects: {
            mentalHealth: -40, // Stress +40
            communityTrust: 10  // Followers +10
          },
          feedback: 'Your angry reply escalates the conflict and attracts more trolls.'
        },
        {
          id: 'ignore-2',
          text: 'Ignore the comment', 
          effects: {
            mentalHealth: -20, // Stress +20
            communityTrust: 0   // Followers no change
          },
          feedback: 'Ignoring builds internal stress without resolution.'
        }
      ]
    },

    // PHASE 1: TEACHING MOMENT
    {
      id: 'bad-strategies-lesson',
      type: 'lesson',
      narrative: 'Learning from Bad Strategies',
      steps: [
        {
          id: 'teaching-card',
          cards: [
            {
              id: 'teaching-feedback',
              type: 'feedback',
              content: 'Neither angrily replying nor ignoring is sustainable. Both raise your stress or hurt your followers. Let\'s try better strategies next.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // PHASE 2: GOOD STRATEGIES INTRO
    {
      id: 'good-strategies-intro',
      type: 'scenario',
      narrative: 'Teaching the Outcome of Good Strategies',
      steps: [
        {
          id: 'new-video-post',
          cards: [
            {
              id: 'followup-post',
              type: 'post',
              content: 'Here\'s my follow-up video, let\'s stay positive!',
              isUserPost: true,
              author: 'You',
              timestamp: 'just now'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // PHASE 2: GOOD STRATEGY 1
    {
      id: 'good-strategy-comment1',
      type: 'scenario',
      narrative: 'Practice Good Strategies - Comment 1',
      steps: [
        {
          id: 'hate-comment-3',
          cards: [
            {
              id: 'hate-comment-block',
              type: 'comment',
              content: 'Stop stealing content, loser.',
              author: 'ContentThief789',
              timestamp: '2 min ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'block-report',
          text: 'Block/report user',
          effects: {
            mentalHealth: 15,  // Stress -15
            communityTrust: 2  // Followers +2
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        },
        {
          id: 'pin-positive',
          text: 'Pin a positive fan comment',
          effects: {
            mentalHealth: 10,  // Stress -10
            communityTrust: 10 // Followers +10
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        }
      ]
    },

    // PHASE 2: GOOD STRATEGY 2
    {
      id: 'good-strategy-comment2',
      type: 'scenario',
      narrative: 'Practice Good Strategies - Comment 2', 
      steps: [
        {
          id: 'hate-comment-4',
          cards: [
            {
              id: 'boring-comment',
              type: 'comment',
              content: 'You\'re boring and unoriginal.',
              author: 'CriticUser101',
              timestamp: '1 min ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'calm-reply',
          text: 'Reply with a positive, calm comment',
          effects: {
            mentalHealth: 8,   // Stress -8
            communityTrust: 8  // Followers +8
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        },
        {
          id: 'ignore-better',
          text: 'Ignore (not ideal but less harmful)',
          effects: {
            mentalHealth: -5,  // Stress +5
            communityTrust: 0  // Followers no change
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        }
      ]
    },

    // PHASE 2: GOOD STRATEGY 3
    {
      id: 'good-strategy-comment3',
      type: 'scenario',
      narrative: 'Practice Good Strategies - Comment 3',
      steps: [
        {
          id: 'hate-comment-5',
          cards: [
            {
              id: 'everyone-hates',
              type: 'comment', 
              content: 'Everyone hates your channel.',
              author: 'ToxicTroll999',
              timestamp: '30 sec ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'moderation-tools',
          text: 'Use social media moderation tool (simulate blocking spammers)',
          effects: {
            mentalHealth: 20,  // Stress -20
            communityTrust: 0  // Followers no change
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        },
        {
          id: 'gratitude-post',
          text: 'Post a community gratitude message',
          effects: {
            mentalHealth: 12,  // Stress -12
            communityTrust: 12 // Followers +12
          },
          feedback: 'Good strategy! Your stress levels decrease and your community grows stronger.'
        }
      ]
    },

    // PHASE 3: FREEFORM PRACTICE
    {
      id: 'freeform-practice',
      type: 'practice',
      narrative: 'Integrated Practice Mode',
      steps: [
        {
          id: 'practice-hate-comment',
          cards: [
            {
              id: 'final-practice-comment',
              type: 'comment',
              content: 'Nobody watches your boring content. Stop embarrassing yourself.',
              author: 'FinalBoss666',
              timestamp: 'just now'
            }
          ],
          requiresChoiceToProgress: false
        },
        {
          id: 'freeform-prompt',
          cards: [
            {
              id: 'practice-prompt',
              type: 'feedback',
              content: 'How would you respond? Type your reply below.'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'freeform-response',
          text: 'Submit your response',
          effects: {
            mentalHealth: 0,
            communityTrust: 0
          },
          isFreeform: true
        }
      ]
    },

    // COMPLETION
    {
      id: 'completion',
      type: 'completion',
      narrative: 'Congratulations! You\'ve completed the Hate Comments badge.',
      steps: [
        {
          id: 'badge-earned',
          cards: [
            {
              id: 'completion-message',
              type: 'feedback',
              content: 'You\'ve learned to protect your mental health while building trust with your community. You\'ve earned the Hate Comments Resilience Badge!'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    }
  ]
}