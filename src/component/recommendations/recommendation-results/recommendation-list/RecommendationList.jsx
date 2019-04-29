import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import styled from 'styled-components'
import { RecommendationsState } from 'state/recommendationStates'
import Recommendation from 'model/Recommendation'
import Placeholder from './placeholder/Placeholder'
import RecommendationGroup from './recommendation-group/RecommendationGroup'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  align-self: stretch;
`

const ListItem = styled.li`
  margin: 1rem 0;
`

const RecommendationList = ({ recommendations, status }) => {
  if (status === RecommendationsState.idle) return <Placeholder showSpinner={false}/>
  if (status === RecommendationsState.pending) return <Placeholder showSpinner={true}/>

  const validatedRecommendations = recommendations.map(recommendation => Recommendation(recommendation))
  const groupedByEducation = R.compose(Object.entries, R.groupBy(v => v.name))(validatedRecommendations)

  return (
    <List>
      {groupedByEducation.map(([degreeTitle, recommendations]) => <ListItem key={degreeTitle}><RecommendationGroup title={degreeTitle} recommendations={recommendations}/></ListItem>)}
    </List>
  )
}

RecommendationList.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default RecommendationList
