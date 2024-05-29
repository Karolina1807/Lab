function calculateTriangle(parameter1, type1, parameter2, type2) {
    // Перевірка валідності введених значень
    if (parameter1 <= 0 || parameter2 <= 0) {
        console.error("Одне або обидва значення є некоректними (від'ємні або нульові).");
        return "failed";
    }

    // Перевірка валідності типів
    const allowedTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!allowedTypes.includes(type1) || !allowedTypes.includes(type2)) {
        console.error("Неприпустимий тип аргументу.");
        return "failed";
    }

    // Обчислення параметрів трикутника
    let sideA, sideB, sideC, angleAlpha, angleBeta;

    if (type1 === "hypotenuse") {
        sideC = parameter1;
        if (type2 === "leg") {
            sideA = parameter2;
            sideB = Math.sqrt(sideC * sideC - sideA * sideA);
            angleAlpha = Math.atan(sideA / sideB) * 180 / Math.PI;
            angleBeta = 90 - angleAlpha;
        } else {
            angleBeta = parameter2;
            angleAlpha = 90 - angleBeta;
            sideA = sideC * Math.sin(angleBeta * Math.PI / 180);
            sideB = sideC * Math.cos(angleBeta * Math.PI / 180);
        }
    } else if (type1 === "leg") {
        sideA = parameter1;
        if (type2 === "hypotenuse") {
            sideC = parameter2;
            sideB = Math.sqrt(sideC * sideC - sideA * sideA);
            angleAlpha = Math.atan(sideA / sideB) * 180 / Math.PI;
            angleBeta = 90 - angleAlpha;
        } else {
            angleBeta = parameter2;
            angleAlpha = 90 - angleBeta;
            sideC = sideA / Math.sin(angleBeta * Math.PI / 180);
            sideB = sideA / Math.tan(angleBeta * Math.PI / 180);
        }
    } else if (type1 === "adjacent angle" || type1 === "opposite angle") {
        if (type2 === "leg") {
            sideA = parameter2;
            angleBeta = parameter1;
            angleAlpha = 90 - angleBeta;
            sideB = sideA * Math.tan(angleBeta * Math.PI / 180);
            sideC = sideA / Math.cos(angleBeta * Math.PI / 180);
        } else {
            angleBeta = parameter2;
            angleAlpha = parameter1;
            sideA = sideC * Math.sin(angleBeta * Math.PI / 180);
            sideB = sideC * Math.cos(angleBeta * Math.PI / 180);
        }
    } else { // type1 === "angle"
        angleAlpha = parameter1;
        if (type2 === "leg") {
            sideA = parameter2;
            angleBeta = 90 - angleAlpha;
            sideB = sideA * Math.tan(angleBeta * Math.PI / 180);
            sideC = sideA / Math.cos(angleBeta * Math.PI / 180);
        } else {
            angleBeta = parameter2;
            sideA = sideC * Math.sin(angleBeta * Math.PI / 180);
            sideB = sideC * Math.cos(angleBeta * Math.PI / 180);
        }
    }

    // Перевірка коректності обчислених значень
    if (sideA <= 0 || sideB <= 0 || sideC <= 0 || angleAlpha <= 0 || angleBeta <= 0 || angleAlpha >= 90 || angleBeta >= 90) {
        console.error("Некоректні дані. Трикутник із заданими параметрами не існує.");
        return "failed";
    }

    // Вивід результатів
    console.log(`a = ${sideA}, b = ${sideB}, c = ${sideC}, alpha = ${angleAlpha}, beta = ${angleBeta}`);
    return "success";
}
