document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.querySelector("#review-form");
    const savePopup = document.querySelector("#save-popup");
    const reviewMain = document.querySelector(".review_main");
    const group = reviewForm ? reviewForm.dataset.group : "food";

    function setInputsEnabled(selector, enabled) {
        document.querySelectorAll(selector).forEach(function (section) {
            section.querySelectorAll("input, textarea, select").forEach(function (input) {
                input.disabled = !enabled;
            });
        });
    }

    if (group === "culture") {
        setInputsEnabled(".review_main--culture .review_write:nth-child(8), .review_main--culture .review_write:nth-child(9), .review_main--culture .review_write:nth-child(10), .review_main--culture .review_write:nth-child(11)", false);
        setInputsEnabled(".review_write--culture", true);
    } else {
        setInputsEnabled(".review_write--culture", false);
    }

    const tagCheckboxes = document.querySelectorAll('input[name="tags"]');

    tagCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const selectedTags = document.querySelectorAll('input[name="tags"]:checked');

            if (selectedTags.length > 4) {
                checkbox.checked = false;
                alert("Please select up to 4 tags.");
            }
        });
    });

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (event) {
            const commonRequiredGroups = [
                "visit_times",
                "purposes",
                "nunchi_score",
                "tags",
                "recommended_level",
                "rating"
            ];

            const foodRequiredGroups = [
                "has_kiosk",
                "has_single_seat",
                "has_con",
                "has_wifi"
            ];

            const requiredGroups = group === "culture"
                ? commonRequiredGroups.concat(["stay_time"])
                : commonRequiredGroups.concat(foodRequiredGroups);

            for (const groupName of requiredGroups) {
                const checkedInput = document.querySelector(`input[name="${groupName}"]:checked`);

                if (checkedInput === null) {
                    event.preventDefault();
                    alert("Please complete all required fields.");
                    return;
                }
            }

            const review = document.querySelector('textarea[name="content"]');

            if (!review || review.value.trim() === "") {
                event.preventDefault();
                alert("Please write a short review.");
                return;
            }

            if (savePopup) {
                savePopup.classList.add("open");
            }
        });
    }

    const reviewImageInput = document.querySelector("#review-image");
    const photoUploadFileName = document.querySelector("#photo-upload-file-name");

    if (reviewImageInput && photoUploadFileName) {
        reviewImageInput.addEventListener("change", function () {
            const fileCount = reviewImageInput.files.length;

            if (fileCount === 0) {
                photoUploadFileName.textContent = "No photos selected";
                return;
            }

            if (fileCount === 1) {
                photoUploadFileName.textContent = reviewImageInput.files[0].name;
                return;
            }

            photoUploadFileName.textContent = `${fileCount} photos selected`;
        });
    }

    if (!reviewMain) {
        return;
    }
});
