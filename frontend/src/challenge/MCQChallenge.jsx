import { useState, useEffect } from "react";

export function MCQChallenge({ challenge, showExplanation = false }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation);

    // ✅ 当 challenge 改变时重置状态
    useEffect(() => {
        setSelectedOption(null);
        setShouldShowExplanation(showExplanation);
    }, [challenge, showExplanation]);

    if (!challenge || !challenge.options) {
        return <div>Loading challenge...</div>; // ✅ 防止 null 报错
    }

    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options;

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        setShouldShowExplanation(true);
    };

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
            <p><strong>Difficulty</strong>: {challenge.difficulty}</p>
            <p className="challenge-title">{challenge.title}</p>
            <div className="options">
                {options.map((option, index) => (
                    <div
                        className={getOptionClass(index)}
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            {shouldShowExplanation && selectedOption !== null && (
                <div className="explanation">
                    <h4>Explanation</h4>
                    <p>{challenge.explanation}</p>
                </div>
            )}
        </div>
    );
}
