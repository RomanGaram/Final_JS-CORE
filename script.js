$(function () {
    let startButton = $('.start');
    let checkBotton = $('.check');
    let newGameBotton = $('.new_game');
    checkBotton.prop('disabled', true);
    checkBotton.addClass('disabled-button');

    let rows = 4;
    let columns = 4;

    // Додаєм зображення до кожного початкового блоку

    let leftBox = document.querySelectorAll('.pieceImg');

    let addPics = () => {
        for (let p = 0; p < leftBox.length; p++) {
            let element = leftBox[p];
            element.className = `pieceImg p${[p + 1]}`;
        }
    };

    // Функція для перетасовування фрагментів картинки
    let mixPices = () => {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let shuffledArr = arr.sort(function () {
            return Math.random() - 0.5;
        });
        for (let i = 0; i < shuffledArr.length; i++) {
            leftBox[i].className = `pieceImg p${shuffledArr[i]}`;
        }
        
    }

    let addEmtyPieces = () => {
        $('#right').empty();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                //<div>
                let tile = document.createElement("div");
                tile.classList.add('piece');
                tile.classList.add('ordered');
                document.getElementById("right").append(tile);
            }
        }
    }


    // Запуск таймера
    let timerID;
    let minutCounter = parseInt($('.minuts').text(), 10);
    let secondsCounter = parseInt($('.seconds').text(), 10);

    let startTimer = () => {
        if (minutCounter === 1) {
            secondsCounter = 60;
            minutCounter -= 1;
        }
        if (secondsCounter === 0 && minutCounter === 0) {
            clearInterval(timerID); // Зупинити таймер, якщо час вийшов
            checkModal();
        } else {
            if (secondsCounter === 0) {
                minutCounter -= 1;
                secondsCounter = 60;
            } else {
                secondsCounter -= 1;
            }
        }
        // Оновлюємо відображення часу в DOM
        $('.minuts').text(0+minutCounter);
        $('.seconds').text(0+secondsCounter);
    };

    // Перевірка і відкритя модального вікна
    $(".check").on(
        "click",
        (check = () => {
            openModal();
            $(".modal-text-message").text(`You still have time, you sure?  `);
            $(".modal-btn-close").on("click", closeModal);
        })
    );

    // Закриття модального вікна
    function closeModal() {
        $(".modal-container").css({
            "z-index": -1,
            opacity: 0,
        });
        $(".modal").css({
            top: "-200px",
            transition: "0.2s",
        });
    }

    // Відкриття модального вікна
    function openModal() {
        $(".modal-container").css({
            "z-index": 0,
            opacity: 0.3,
        });
        $(".modal").css({
            top: "30px",
            transition: "0.2s",
        });
        $("body").css({
            overflow: 'hidden'
        })
    }

    // Функція для перевірки чи правильно складений пазл

    $(".modal-btn-check").on("click", checkModal);
    let res = true;
    function checkModal() {
        for (let i = 0; i < $(".ordered").length; i++) {
            if ($(".ordered")[i].firstChild == null) {
                res = false;
                break;
            } else if (
                $(".ordered")[i].firstChild.classList.contains(`p${i + 1}`)
            ) {
                continue;
            }
        }
        if (res === true) {
            $(".modal-text-message").text("Woohoo, well done, you did it!");
            $(".modal-container").css({
                "z-index": 0,
                opacity: 0.3,
            });
            $(".modal").css({
                top: "30px",
                transition: "0.2s",
            });
            $(".modal-btn-check").css("display", "none");
            clearInterval(timerID);
        } else {
            $(".modal-container").css({
                "z-index": 0,
                opacity: 0.3,
            });
            $(".modal").css({
                top: "30px",
                transition: "0.2s",
            });

            $(".modal-text-message").text("It's a pity, but you lost((");
            $(".t").css("display", "none");
            $(".modal-btn-check").css("display", "none");
            clearInterval(timerID);
            $(".modal-btn-close").on("click", function () { 
                closeModal, 
                location.reload()
            });
        }
    }

    $(newGameBotton).on('click', function () {
        location.reload();
    })

    $(startButton).on('click', function () {
        addPics();
        mixPices();
        timerID = setInterval(startTimer, 1000);
        startButton.prop('disabled', true);
        startButton.addClass('disabled-button');
        checkBotton.prop('disabled', false);
        checkBotton.removeClass('disabled-button');
        
        //  функція переміщення DOM елементів
        $(".piece").sortable({
            connectWith: ".piece"
        });
    })

    addPics();
    addEmtyPieces();
    
});
