import React from 'react'
import * as R from 'ramda'
import createRendererWithTheme from 'test/util/createRendererWithTheme'
import interests from 'resources/interests'
import { subtopicsLens } from 'state/helper'

const interestsData = interests
  .map(interest => R.assoc('selected', false, interest))
  .map(interest => R.over(subtopicsLens(),
    subtopics => subtopics.map(R.assoc('selected', false)),
    interest
  ))

const mockState = (queryStatus, data = interestsData) => jest.doMock('state/state', () => {
  const Atom = require('bacon.atom')
  const React = require('react')

  const state = Atom({
    context: {
      user: {
        language: 'fi'
      },
      interests: {
        data,
        error: undefined
      },
      education: {
        data: {
          unverifiedEducations: [],
          selection: undefined
        }
      }
    },
    value: {
      profile: {
        interests: queryStatus
      }
    }
  })

  return {
    Context: React.createContext(state),
    state: Atom(state)
  }
})

describe('Interests', () => {
  beforeAll(() => {
    process.env.MIN_INTERESTS = 3
    process.env.MAX_INTERESTS = 8
    global.console = Object.assign({}, global.console, { warn: jest.fn() }) // Suppress logging
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mock('component/interests/notification/Notification', () => () => null)
  })

  it('should show loading indicator (placeholder tags) when fetching suggestions', () => {
    let Interests
    mockState('pending')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show top level interest suggestions when fetched successfully', () => {
    let Interests
    mockState('success')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show error when fetching interest suggestions failed', () => {
    let Interests
    mockState('failure')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show subtopics for selected topic', () => {
    let Interests
    const data = R.over(R.lensIndex(1), R.assoc('selected', true), interestsData)
    mockState('success', data)
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
