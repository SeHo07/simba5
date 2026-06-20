document.addEventListener("DOMContentLoaded", function () {
    const tagCheckboxes = document.querySelectorAll(
        'input[name="tag"]'
    );

    tagCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const selectedTags = document.querySelectorAll(
                'input[name="tag"]:checked'
            );

            if (selectedTags.length > 4) {
                checkbox.checked = false;
                alert("태그는 최대 4개까지 선택할 수 있습니다.");
            }
        });
    });

    const reviewForm = document.querySelector("#review-form");

    reviewForm.addEventListener("submit", function (event) {
        const requiredGroups = [
            "time",
            "purpose",
            "sense_score",
            "tag",
            "level",
            "kiosk",
            "sole_seat",
            "power_outlet",
            "wifi",
            "place_rating"
        ];

        for (const groupName of requiredGroups) {
            const checkedInput = document.querySelector(
                `input[name="${groupName}"]:checked`
            );

            if (checkedInput === null) {
                event.preventDefault();
                alert("모든 항목을 입력해주세요.");
                return;
            }
        }

        const review = document.querySelector(
            'textarea[name="review"]'
        );

        if (review.value.trim() === "") {
            event.preventDefault();
            alert("한 줄 후기를 작성해주세요.");
        }
    });
});