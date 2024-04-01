import React from 'react'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import './EthicalScore.css'

const EthicalScore = ({ score, size, showDesc }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return '#52c41a' // green for high scores
    if (score >= 6) return '#faad14' // yellow for medium scores
    return '#f5222d' // red for low scores
  }

  const getScoreDescription = (score) => {
    if (score >= 8) return 'High Ethical Standards'
    if (score >= 6) return 'Moderate Ethical Standards'
    return 'Low Ethical Standards'
  }

  const getSizeStyle = (size) => {
    if (size === 'large') return { width: '50px', height: '50px', fontSize: '24px' }
    if (size === 'small') return { width: '35px', height: '35px', fontSize: '18px' }
    return { width: '50px', height: '50px', fontSize: '24px' }
  }

  return (
    <div>
      <Tooltip title={`This company has an ethical score of ${score}, indicating ${getScoreDescription(score)}.`}>
      <span className='score-container'><div className="score-badge" style={{ borderColor: getScoreColor(score), ...getSizeStyle(size) }}>{score}</div></span>
      </Tooltip>
      { showDesc && <div>Ethical&nbsp;Score</div>}
    </div>
  )
}

export default EthicalScore

EthicalScore.propTypes = {
  score: PropTypes.number,
  size: PropTypes.string,
  showDesc: PropTypes.bool
}
