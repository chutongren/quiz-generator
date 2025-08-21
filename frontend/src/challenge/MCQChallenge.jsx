import { useState, useEffect } from "react";

export function MCQChallenge({ challenge, showExplanation = false }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shouldShowExplanation, setShouldShowExplanation] =
    useState(showExplanation);

  // ✅ 当 challenge 改变时重置状态
  useEffect(() => {
    setSelectedOption(null);
    setShouldShowExplanation(showExplanation);
  }, [challenge, showExplanation]);

  if (!challenge || !challenge.options) {
    return <div>Loading challenge...</div>; // ✅ 防止 null 报错
  }
  // 预处理 challenge.options，如果是JSON格式转为list
  const options =
    typeof challenge.options === "string" // "[\"A\",\"B\",\"C\"]"; -> ["A", "B", "C"]
      ? JSON.parse(challenge.options)
      : challenge.options;

  // click触发 selectedOption = index, 同时可以显示Explanation了，所以 setShouldShowExplanation(true)
  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShouldShowExplanation(true);
  };
  // 各个option的样式 选中的 选对了 选错了 没被选的
  const getOptionClass = (index) => {
    if (selectedOption === null) return "option";

    if (index === challenge.correct_answer_id) {
      return "option correct";
    }
    if (selectedOption === index && index !== challenge.correct_answer_id) {
      return "option incorrect";
    }
    return "option";
  };

  return (
    <div className="challenge-display">
      <p>
        <strong>Difficulty</strong>: {challenge.difficulty}
      </p>
      <p className="challenge-title">{challenge.title}</p>
      <div className="options">
        {options.map(
          (
            option,
            index //index是数组的下标0,1,2...
          ) => (
            <div
              className={getOptionClass(index)}
              key={index}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          )
        )}
      </div>

      {shouldShowExplanation &&
        selectedOption !== null && ( // 只有在 用户选择了某个选项 且 允许显示解释
          <div className="explanation">
            <h4>Explanation</h4>
            <p>{challenge.explanation}</p>
          </div>
        )}
    </div>
  );
}
