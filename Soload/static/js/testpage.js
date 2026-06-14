document.addEventListener("DOMContentLoaded", function () {
    const totalQuestions = 10;

    let currentQuestionIndex = 0;
    let selectedScore = null;
    let totalScore = 0;

    const questionItems = document.querySelectorAll(".question-item");

    const currentQuestionNumber = document.getElementById("current-question-number");
    const progressCount = document.getElementById("progress-count");

    const questionProgressFill = document.getElementById("question-progress-fill");
    const sideProgressFill = document.getElementById("side-progress-fill");

    const nextButton = document.getElementById("next-question-button");
    const resultButton = document.getElementById("result-button");

    const questionStatusItems = document.querySelectorAll(".question-status");
    resultButton.style.display = "none";

    function updateProgress () {
        const currentNumber = currentQuestionIndex + 1;
        const progressPercent = (currentNumber / totalQuestions) * 100;

        currentQuestionNumber.textContent = currentNumber;
        progressCount.textContent = currentNumber;

        questionProgressFill.style.width = progressPercent + "%";
        sideProgressFill.style.width = progressPercent + "%";
    }

    function showQuestion(index) {
        questionItems.forEach(function (item, itemIndex){
            item.classList.remove("question-item--active");

            if (itemIndex === index) {
                item.style.display = "block";
                item.classList.add("question-item--active");
            } else {
                item.style.display = "none";
            }
        });

        questionStatusItems.forEach(function (statusItem, statusIndex) {
            statusItem.classList.remove("question-status--active");

            if (statusIndex === index) {
                statusItem.classList.add("question-status--active");
            }
        });

        selectedScore = null;

        const checkedRadio = questionItems[index].querySelector(".answer-radio:checked");

        if (checkedRadio) {
            selectedScore = Number(checkedRadio.dataset.score);
        }

        if (index === totalQuestions - 1) {
            nextButton.textContent = "테스트 완료";
        } else {
            nextButton.textContent = "다음 질문";
        }

        updateProgress();
    }

    function markQuestionComplete(index) {
        const statusItem = questionStatusItems[index];
        const checkSpan = statusItem.querySelector("span");

        statusItem.classList.add("question-status--done");

        if (checkSpan) {
            checkSpan.textContent = "✓"
        }
    }

    questionItems.forEach(function (questionItem) {
        const answerRadios = questionItem.querySelectorAll(".answer-radio");

        answerRadios.forEach(function (radio){
            radio.addEventListener("change", function () {
                selectedScore = Number(radio.dataset.score);
            });
        });
    });

    nextButton.addEventListener("click", function () {
        if (selectedScore === null) {
            alert("답변을 선택해주세요.");
            return;
        }

        totalScore += selectedScore;

        markQuestionComplete(currentQuestionIndex);

        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex += 1;
            showQuestion(currentQuestionIndex);
        } else {
            localStorage.setItem("honnolTestScore", totalScore);

            nextButton.style.display = "none";
            resultButton.style.display = "inline-flex";

            questionStatusItems.forEach(function (statusItem) {
                statusItem.classList.remove("question-status--active");
            });
        }
    });

    showQuestion(currentQuestionIndex);
});