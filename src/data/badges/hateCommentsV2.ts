import { Badge, StoryCard } from '../../types/game'

export const hateCommentsV2: Badge = {
  id: 'hate-comments-v2',
  title: 'Hate Comments',
  description: 'Learn to handle negative comments while protecting your mental health',
  icon: '💬',
  phases: [
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
              content: 'Watch your Followers and Stress Level. Your choices will affect both metrics throughout this simulation.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ]
    },
    {
      id: 'bad-strategies-round1',
      type: 'scenario', 
      narrative: 'Teaching the Outcome of Wrong Reactions - Round 1',
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
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'reply-angry-1',
          text: 'Reply angrily',
          effects: {
            mentalHealth: -40,
            communityTrust: 10
          },
          feedback: 'Your angry reply: "Why don\'t you get a life instead of trolling here?"'
        },
        {
          id: 'ignore-1', 
          text: 'Ignore the comment',
          effects: {
            mentalHealth: -20,
            communityTrust: 0
          },
          feedback: 'You chose to ignore; stress builds silently.'
        }
      ]
    },
    {
      id: 'bad-strategies-round2',
      type: 'scenario',
      narrative: 'Teaching the Outcome of Wrong Reactions - Round 2',
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
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'reply-angry-2',
          text: 'Reply angrily',
          effects: {
            mentalHealth: -40,
            communityTrust: 10
          },
          feedback: 'Your angry reply escalates the conflict and attracts more trolls.'
        },
        {
          id: 'ignore-2',
          text: 'Ignore the comment', 
          effects: {
            mentalHealth: -20,
            communityTrust: 0
          },
          feedback: 'Ignoring builds internal stress without resolution.'
        }
      ]
    },
    {
      id: 'teaching-moment',
      type: 'lesson',
      narrative: 'Learning from Bad Strategies',
      steps: [
        {
          id: 'lesson-card',
          cards: [
            {
              id: 'teaching-feedback',
              type: 'feedback',
              content: 'Neither angrily replying nor ignoring is sustainable. Both raise your stress or hurt your followers. Let\'s try better strategies next.'
            }
          ],
          requiresChoiceToProgress: false
        }
      ]
    },
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
      ]
    },
    {
      id: 'good-strategy-1',
      type: 'scenario',
      narrative: 'Good Strategy Practice - Comment 1',
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
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'block-report',
          text: 'Block/report user',
          effects: {
            mentalHealth: 15,
            communityTrust: 2
          },
          feedback: 'You blocked the user. Your community stays clean and your stress decreases.'
        },
        {
          id: 'pin-positive',
          text: 'Pin a positive fan comment',
          effects: {
            mentalHealth: 10,
            communityTrust: 10
          },
          feedback: 'You pinned: "Love your content, keep it up!" Positive vibes flow through your community.'
        }
      ]
    },
    {
      id: 'good-strategy-2',
      type: 'scenario',
      narrative: 'Good Strategy Practice - Comment 2', 
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
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'calm-reply',
          text: 'Reply with a positive, calm comment',
          effects: {
            mentalHealth: 8,
            communityTrust: 8
          },
          feedback: 'Your calm reply: "Thanks for watching! I\'m always working to improve my content." Shows maturity and attracts support.'
        },
        {
          id: 'ignore-better',
          text: 'Ignore (less harmful but not ideal)',
          effects: {
            mentalHealth: -5,
            communityTrust: 0
          },
          feedback: 'Ignoring is better than reacting angrily, but still builds some internal stress.'
        }
      ]
    },
    {
      id: 'good-strategy-3',
      type: 'scenario',
      narrative: 'Good Strategy Practice - Comment 3',
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
          requiresChoiceToProgress: false
        }
      ],
      choices: [
        {
          id: 'moderation-tools',
          text: 'Use moderation tools (block spam)',
          effects: {
            mentalHealth: 20,
            communityTrust: 0
          },
          feedback: 'You used platform tools to filter negative comments. Your mental space feels cleaner.'
        },
        {
          id: 'gratitude-post',
          text: 'Post a community gratitude message',
          effects: {
            mentalHealth: 12,
            communityTrust: 12
          },
          feedback: 'Your post: "Grateful for all the positive support from my amazing community!" Real fans rally around you.'
        }
      ]
    },
    {
      id: 'practice-mode',
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
              content: 'How would you respond? Type your reply below. Consider what you\'ve learned about healthy strategies.'
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
      ]
    }
  ]
}