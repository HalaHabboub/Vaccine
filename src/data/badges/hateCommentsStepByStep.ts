import type { Badge } from '../../types/game'

export const hateCommentsStepByStepBadge: Badge = {
  id: 'hate-comments-steps',
  name: 'Hate Comments Badge',
  description: 'Learn to handle online harassment through step-by-step scenarios',
  icon: '🛡️',
  phases: [
    {
      id: 'posting',
      type: 'scenario',
      narrative: 'Step 1: Your Initial Post',
      steps: [
        {
          id: 'user-post',
          cards: [
            {
              id: 'initial-post',
              type: 'post',
              content: 'Finally uploaded my latest video on how to stay positive online!',
              isUserPost: true,
              author: 'You',
              timestamp: '2 min ago'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'continue-to-comments',
          text: 'Continue',
          effects: {}
        }
      ]
    },
    {
      id: 'hate-comment-appears',
      type: 'scenario', 
      narrative: 'Step 2: A Hate Comment Appears',
      steps: [
        {
          id: 'first-hate-comment',
          cards: [
            {
              id: 'hate-comment-1',
              type: 'comment',
              content: "You're so cringe. Delete your channel.",
              author: '@TrollUser47',
              timestamp: '1 min ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'reply-angrily',
          text: 'Reply Angrily',
          effects: {
            mentalHealth: -10,
            communityTrust: 5
          }
        },
        {
          id: 'ignore',
          text: 'Ignore',
          effects: {
            mentalHealth: -5,
            communityTrust: 0
          }
        }
      ]
    },
    {
      id: 'angry-response',
      type: 'scenario',
      narrative: 'Step 3: Your Angry Response',
      steps: [
        {
          id: 'angry-reply',
          cards: [
            {
              id: 'user-angry-reply',
              type: 'reply',
              content: "Why don't you get a life instead of trolling here?",
              isUserPost: true,
              author: 'You',
              timestamp: 'Just now'
            }
          ],
          requiresChoiceToProgress: false
        },
        {
          id: 'feedback-angry',
          cards: [
            {
              id: 'angry-feedback',
              type: 'feedback',
              content: 'More followers from drama engagement, but your stress is climbing fast!'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'continue-escalation',
          text: 'Continue',
          effects: {}
        }
      ]
    },
    {
      id: 'escalation',
      type: 'scenario',
      narrative: 'Step 4: Escalation - Multiple Hate Comments',
      steps: [
        {
          id: 'multiple-comments',
          cards: [
            {
              id: 'hate-comment-2',
              type: 'comment',
              content: 'Haha, you can\'t handle criticism!',
              author: '@HaterBot',
              timestamp: '30 sec ago'
            }
          ],
          requiresChoiceToProgress: false
        },
        {
          id: 'more-comments',
          cards: [
            {
              id: 'hate-comment-3',
              type: 'comment', 
              content: 'Can\'t even defend yourself?',
              author: '@ToxicUser99',
              timestamp: '15 sec ago'
            }
          ],
          requiresChoiceToProgress: true
        }
      ],
      choices: [
        {
          id: 'block-report',
          text: 'Block/Report',
          effects: {
            mentalHealth: 15,
            communityTrust: -2
          }
        },
        {
          id: 'pin-positive',
          text: 'Pin Supportive Comment',
          effects: {
            mentalHealth: 10,
            communityTrust: 8
          }
        }
      ]
    },
    {
      id: 'healthy-response',
      type: 'scenario',
      narrative: 'Step 5: Healthy Response Strategy',
      steps: [
        {
          id: 'block-action',
          cards: [
            {
              id: 'block-message',
              type: 'feedback',
              content: 'You blocked and reported the toxic users.'
            }
          ],
          requiresChoiceToProgress: false
        },
        {
          id: 'stress-relief',
          cards: [
            {
              id: 'relief-feedback',
              type: 'feedback',
              content: 'A quieter space, less stress. You feel better protected.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'continue-final',
          text: 'Continue',
          effects: {}
        }
      ]
    },
    {
      id: 'completion',
      type: 'completion',
      narrative: 'Badge Complete!',
      steps: [
        {
          id: 'badge-earned',
          cards: [
            {
              id: 'completion-card',
              type: 'feedback',
              content: 'Badge Unlocked: Hate Comment Survivor'
            }
          ],
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'finish',
          text: 'Finish Badge',
          effects: {}
        }
      ]
    }
  ]
}