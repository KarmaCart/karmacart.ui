import React from 'react';
import { Progress, Tooltip, Statistic } from 'antd';
import './EthicalScore.css';

const EthicalScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 8) return '#52c41a'; // green for high scores
    if (score >= 6) return '#faad14'; // yellow for medium scores
    return '#f5222d'; // red for low scores
  };

  const getScoreDescription = (score) => {
    if (score >= 8) return 'High Ethical Standards';
    if (score >= 6) return 'Moderate Ethical Standards';
    return 'Low Ethical Standards';
  };

  return (
    <div>
      <Tooltip title={`This company has an ethical score of ${score}, indicating ${getScoreDescription(score)}.`}>
      <span className='score-container'><div className="score-badge" style={{borderColor: getScoreColor(score)}}>{score}</div></span>
      </Tooltip>
      <div>
        Ethical&nbsp;Score
      </div>
    </div>
  );
};

export default EthicalScore;