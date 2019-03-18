import React from 'react'
import createRendererWithTheme from 'test/util/createRendererWithTheme'

const mockState = formState => jest.doMock('state/state', () => {
  const Atom = require('bacon.atom')
  const React = require('react')

  const state = Atom({
    context: {
      interests: {
        data: [],
        error: undefined
      },
      education: {
        data: {
          educations: [{
            id: 'd17ebd27-c42c-416a-954c-2eb42f9436ed',
            level: { id: '1' }
          }, {
            id: 'a24d7a2e-2922-4f60-9d12-c1285ead6ddd',
            level: { id: '2' },
            specifier: { id: '0214' }
          }],
          selection: undefined
        }
      }
    },
    value: {
      profile: {
        education: formState
      }
    }
  })

  return {
    Context: React.createContext(state)
  }
})

describe('Education', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show added educations', () => {
    let Education
    mockState('formCollapsed')
    jest.isolateModules(() => { Education = require('./Education').default })

    const renderedJSON = createRendererWithTheme(<Education/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
