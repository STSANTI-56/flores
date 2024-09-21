const flowerContainer = document.querySelector(".flower-container");
const playSoundButton = document.getElementById("playSound");
const audio = document.getElementById("audio");

// Función para crear flores
function createFlower() {
    const maxFlowersOnScreen = 15;

    if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
        return; // No crear más flores
    }

    const maxFlowers = Math.ceil(Math.random() * 5 + 1);
    const flowerSize = 100; 
    const existingPositions = [];

    for (let j = 0; j < maxFlowers; j++) {
        let positionValid = false;
        let randomX, randomY;

        while (!positionValid) {
            randomX = Math.random() * (window.innerWidth - flowerSize);
            randomY = Math.random() * (window.innerHeight - flowerSize);
            positionValid = true;

            for (const position of existingPositions) {
                const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
                if (distance < 100) { // Distancia mínima para evitar superposición
                    positionValid = false;
                    break;
                }
            }
        }

        existingPositions.push({ x: randomX, y: randomY });

        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.style.animation = "fadeInFlower 1s ease-in-out both";

        for (let i = 1; i <= 10; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal", `p${i}`);
            flower.appendChild(petal);
            petal.style.animation = `fadeOutPetal 0.5s ease-in-out both ${i * 0.1}s`;
        }

        flower.style.position = "fixed";
        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;

        flowerContainer.appendChild(flower);

        const disappearanceTime = Math.random() * 3000 + 2000;

        setTimeout(() => {
            flowerContainer.removeChild(flower);
            existingPositions.splice(existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
        }, disappearanceTime);
    }
}

// Función para reproducir el audio
playSoundButton.addEventListener("click", () => {
    audio.play();
});

// Cambia el intervalo de tiempo para controlar la aparición de las flores cada segundo
setInterval(createFlower, 1000);
