const task =
    document.getElementById("task");

const input =
    document.getElementById("inputText");

const inputLabel =
    document.getElementById("inputLabel");

const level =
    document.getElementById("level");

const levelLabel =
    document.getElementById("levelLabel");

const submitButton =
    document.getElementById("submitBtn");

const clearButton =
    document.getElementById("clearBtn");

const result =
    document.getElementById("result");

const status =
    document.getElementById("status");

const copyButton =
    document.getElementById("copyBtn");



/* --------------------------
   TASK CONFIGURATION
-------------------------- */

const taskConfig = {

    qa: {

        label:
            "Your Question",

        placeholder:
            "Example: What is Artificial Intelligence?"

    },


    explain: {

        label:
            "Topic to Explain",

        placeholder:
            "Example: Explain the Pythagoras theorem simply."

    },


    quiz: {

        label:
            "Study Passage",

        placeholder:
            "Paste your educational passage here."

    },


    summarize: {

        label:
            "Text to Summarize",

        placeholder:
            "Paste your long educational text here."

    },


    learn: {

        label:
            "Topic to Learn",

        placeholder:
            "Example: Java Programming"

    }

};



/* --------------------------
   UPDATE FORM
-------------------------- */

function updateForm() {

    const selected =
        taskConfig[task.value];


    inputLabel.textContent =
        selected.label;


    input.placeholder =
        selected.placeholder;


    const isLearning =
        task.value === "learn";


    level.classList.toggle(
        "hidden",
        !isLearning
    );


    levelLabel.classList.toggle(
        "hidden",
        !isLearning
    );

}


task.addEventListener(
    "change",
    updateForm
);


updateForm();



/* --------------------------
   CLEAR
-------------------------- */

clearButton.addEventListener(
    "click",
    function () {

        input.value = "";

        result.textContent =
            "Your AI-generated result will appear here.";

        status.textContent =
            "";

    }
);



/* --------------------------
   COPY
-------------------------- */

copyButton.addEventListener(
    "click",
    async function () {

        try {

            await navigator.clipboard.writeText(
                result.innerText
            );

            status.textContent =
                "Copied to clipboard.";

        } catch (error) {

            status.textContent =
                "Unable to copy.";

        }

    }
);



/* --------------------------
   QUIZ DISPLAY
-------------------------- */

function displayQuiz(data) {

    result.innerHTML = "";

    const questions =
        data.questions || [];


    if (questions.length === 0) {

        result.textContent =
            "No quiz questions were generated.";

        return;

    }


    questions.forEach(
        function (question, index) {

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "quiz-question";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                `${index + 1}. ${question.question}`;


            wrapper.appendChild(
                title
            );


            const optionsContainer =
                document.createElement(
                    "div"
                );

            optionsContainer.className =
                "quiz-options";


            question.options.forEach(
                function (option) {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.type =
                        "button";

                    button.textContent =
                        option;


                    button.addEventListener(
                        "click",
                        function () {

                            const buttons =
                                optionsContainer.querySelectorAll(
                                    "button"
                                );


                            buttons.forEach(
                                function (buttonItem) {

                                    buttonItem.disabled =
                                        true;

                                }
                            );


                            if (
                                option ===
                                question.answer
                            ) {

                                button.classList.add(
                                    "correct"
                                );

                                status.textContent =
                                    "Correct! 🎉";

                            } else {

                                button.classList.add(
                                    "wrong"
                                );


                                buttons.forEach(
                                    function (buttonItem) {

                                        if (
                                            buttonItem.textContent ===
                                            question.answer
                                        ) {

                                            buttonItem.classList.add(
                                                "correct"
                                            );

                                        }

                                    }
                                );


                                status.textContent =
                                    `Incorrect. Correct answer: ${question.answer}`;

                            }

                        }
                    );


                    optionsContainer.appendChild(
                        button
                    );

                }
            );


            wrapper.appendChild(
                optionsContainer
            );


            if (question.explanation) {

                const explanation =
                    document.createElement(
                        "p"
                    );

                explanation.textContent =
                    `Explanation: ${question.explanation}`;


                wrapper.appendChild(
                    explanation
                );

            }


            result.appendChild(
                wrapper
            );

        }
    );

}



/* --------------------------
   API ENDPOINTS
-------------------------- */

const endpoints = {

    qa:
        "/qa",

    explain:
        "/explain",

    quiz:
        "/quiz",

    summarize:
        "/summarize",

    learn:
        "/learn/recommendations"

};



/* --------------------------
   SEND REQUEST
-------------------------- */

submitButton.addEventListener(
    "click",
    async function () {

        const text =
            input.value.trim();


        if (!text) {

            status.textContent =
                "Please enter something first.";

            input.focus();

            return;

        }


        submitButton.disabled =
            true;


        status.textContent =
            "EduGenie is thinking...";


        result.textContent =
            "";


        let requestBody;


        if (task.value === "qa") {

            requestBody = {

                question:
                    text

            };

        }

        else if (
            task.value === "learn"
        ) {

            requestBody = {

                topic:
                    text,

                level:
                    level.value

            };

        }

        else if (
            task.value === "quiz"
        ) {

            requestBody = {

                text:
                    text,

                num_questions:
                    3

            };

        }

        else {

            requestBody = {

                text:
                    text

            };

        }



        try {

            const response =
                await fetch(
                    endpoints[task.value],
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                requestBody
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Request failed."
                );

            }


            if (
                task.value === "quiz"
            ) {

                displayQuiz(
                    data.result
                );

            } else {

                result.textContent =
                    data.result;

            }


            status.textContent =
                "Completed successfully.";

        }

        catch (error) {

            result.textContent =
                "Something went wrong.";

            status.textContent =
                error.message;

        }

        finally {

            submitButton.disabled =
                false;

        }

    }
);