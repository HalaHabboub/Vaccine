import { Badge } from '../../types/game'

export const hateCommentsSimple: Badge = {
  id: 'hate-comments-simple',
  name: 'Hate Comments',
  description: 'Learn to handle negative comments while protecting your mental health',
  icon: '💬',
  phases: [
    // Step 1: Your initial post
    {
      id: 'step-1-initial-post',
      type: 'scenario',
      narrative: 'Step 1: Your Initial Post',
      steps: [
        {
          id: 'show-post',
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
        }
      ],
      choices: []
    },

    // Step 2: Meter explanation
    {
      id: 'step-2-meter-explanation',
      type: 'scenario',
      narrative: 'Step 2: Understanding Your Metrics',
      steps: [
        {
          id: 'meter-info',
          cards: [
            {
              id: 'meters-explanation',
              type: 'feedback',
              content: 'Watch your metrics: Followers: 10, Stress Level: 30% (green zone). Your choices will impact both.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 3: First hate comment appears
    {
      id: 'step-3-first-hate-comment',
      type: 'scenario',
      narrative: 'Step 3: First Hate Comment Appears',
      steps: [
        {
          id: 'hate-comment-1',
          cards: [
            {
              id: 'comment-1',
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
            mentalHealth: -40,
            communityTrust: 10
          }
        },
        {
          id: 'ignore-1',
          text: 'Ignore the comment',
          effects: {
            mentalHealth: -20,
            communityTrust: 0
          }
        }
      ]
    },

    // Step 4: Show outcome of first choice
    {
      id: 'step-4-first-choice-outcome',
      type: 'scenario',
      narrative: 'Step 4: Your Response and Its Effect',
      steps: [
        {
          id: 'outcome-card',
          cards: [], // Will be populated dynamically based on choice
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 5: Second hate comment (force other choice)
    {
      id: 'step-5-second-hate-comment',
      type: 'scenario',
      narrative: 'Step 5: Another Hate Comment - Try the Other Response',
      steps: [
        {
          id: 'hate-comment-2',
          cards: [
            {
              id: 'comment-2',
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
            mentalHealth: -40,
            communityTrust: 10
          }
        },
        {
          id: 'ignore-2',
          text: 'Ignore the comment',
          effects: {
            mentalHealth: -20,
            communityTrust: 0
          }
        }
      ]
    },

    // Step 6: Show outcome of second choice
    {
      id: 'step-6-second-choice-outcome',
      type: 'scenario',
      narrative: 'Step 6: Second Response and Its Effect',
      steps: [
        {
          id: 'outcome-card-2',
          cards: [], // Will be populated dynamically
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 7: Teaching moment
    {
      id: 'step-7-teaching-moment',
      type: 'lesson',
      narrative: 'Step 7: Learning from Bad Strategies',
      steps: [
        {
          id: 'teaching-card',
          cards: [
            {
              id: 'teaching',
              type: 'feedback',
              content: 'Neither angrily replying nor ignoring is sustainable. Both raise your stress or hurt your followers. Let\'s try better strategies next.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 8: New video post
    {
      id: 'step-8-new-video',
      type: 'scenario',
      narrative: 'Step 8: Your Follow-up Video',
      steps: [
        {
          id: 'new-post',
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

    // Step 9: Good strategy 1
    {
      id: 'step-9-good-strategy-1',
      type: 'scenario',
      narrative: 'Step 9: Practice Good Strategy - Comment 1',
      steps: [
        {
          id: 'good-comment-1',
          cards: [
            {
              id: 'comment-good-1',
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
          id: 'block-report-1',
          text: 'Block/report user',
          effects: {
            mentalHealth: 15,
            communityTrust: 2
          }
        },
        {
          id: 'pin-positive-1',
          text: 'Pin a positive fan comment',
          effects: {
            mentalHealth: 10,
            communityTrust: 10
          }
        }
      ]
    },

    // Step 10: Good strategy 1 outcome
    {
      id: 'step-10-good-outcome-1',
      type: 'scenario',
      narrative: 'Step 10: Good Strategy Result',
      steps: [
        {
          id: 'good-outcome-1',
          cards: [
            {
              id: 'good-feedback-1',
              type: 'feedback',
              content: 'Good strategy! Your stress levels decrease and your community grows stronger.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 11: Good strategy 2
    {
      id: 'step-11-good-strategy-2',
      type: 'scenario',
      narrative: 'Step 11: Practice Good Strategy - Comment 2',
      steps: [
        {
          id: 'good-comment-2',
          cards: [
            {
              id: 'comment-good-2',
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
          id: 'calm-reply-2',
          text: 'Reply with a positive, calm comment',
          effects: {
            mentalHealth: 8,
            communityTrust: 8
          }
        },
        {
          id: 'ignore-better-2',
          text: 'Ignore (not ideal but less harmful)',
          effects: {
            mentalHealth: -5,
            communityTrust: 0
          }
        }
      ]
    },

    // Step 12: Good strategy 2 outcome
    {
      id: 'step-12-good-outcome-2',
      type: 'scenario',
      narrative: 'Step 12: Good Strategy Result',
      steps: [
        {
          id: 'good-outcome-2',
          cards: [
            {
              id: 'good-feedback-2',
              type: 'feedback',
              content: 'Good strategy! Your stress levels decrease and your community grows stronger.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 13: Good strategy 3
    {
      id: 'step-13-good-strategy-3',
      type: 'scenario',
      narrative: 'Step 13: Practice Good Strategy - Comment 3',
      steps: [
        {
          id: 'good-comment-3',
          cards: [
            {
              id: 'comment-good-3',
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
          id: 'moderation-tools-3',
          text: 'Use social media moderation tool (simulate blocking spammers)',
          effects: {
            mentalHealth: 20,
            communityTrust: 0
          }
        },
        {
          id: 'gratitude-post-3',
          text: 'Post a community gratitude message',
          effects: {
            mentalHealth: 12,
            communityTrust: 12
          }
        }
      ]
    },

    // Step 14: Good strategy 3 outcome
    {
      id: 'step-14-good-outcome-3',
      type: 'scenario',
      narrative: 'Step 14: Good Strategy Result',
      steps: [
        {
          id: 'good-outcome-3',
          cards: [
            {
              id: 'good-feedback-3',
              type: 'feedback',
              content: 'Good strategy! Your stress levels decrease and your community grows stronger.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 15: Final practice comment
    {
      id: 'step-15-practice-comment',
      type: 'scenario',
      narrative: 'Step 15: Final Practice - Your Turn',
      steps: [
        {
          id: 'practice-comment',
          cards: [
            {
              id: 'final-comment',
              type: 'comment',
              content: 'Nobody watches your boring content. Stop embarrassing yourself.',
              author: 'FinalBoss666',
              timestamp: 'just now'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    },

    // Step 16: Freeform input
    {
      id: 'step-16-freeform-input',
      type: 'practice',
      narrative: 'Step 16: Type Your Response',
      steps: [
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

    // Completion
    {
      id: 'completion',
      type: 'completion',
      narrative: 'Congratulations! Badge Complete!',
      steps: [
        {
          id: 'completion-message',
          cards: [
            {
              id: 'completion',
              type: 'feedback',
              content: 'You\'ve learned to protect your mental health while building trust with your community. Badge earned!'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: []
    }
  ]
}