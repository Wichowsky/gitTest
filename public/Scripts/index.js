const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function OpenPage() {
    const browser = await puppeteer.launch({
        headless : false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://steamdb.info/')
    await new Promise(r => setTimeout(r,5000));
    await browser.close()
}
//OpenPage()


async function SSPage() {
    const browser = await puppeteer.launch({
        headless : false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'

    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://steamdb.info/')
    await new Promise(r => setTimeout(r,2500));
    await page.screenshot({path:"SS.png"})
    await browser.close()
}
//SSPage()

async function ClickPage() {
    const browser = await puppeteer.launch({
        headless : false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://steamdb.info/')
    await new Promise(r => setTimeout(r,5000));
    await page.click('a[href="/charts/"]')
    await new Promise(r => setTimeout(r,50000));
    await browser.close()
}//Funciona, pero el captcha de Steamdb nos frena

//ClickPage()

async function GetDataWeb() {
    const browser = await puppeteer.launch({
        headless : false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://steamdb.info/')
    await new Promise(r => setTimeout(r,5000));

const data = await page.evaluate(() => {
    let jugadores = [];
    for (let i = 0; i <= 14; i++) {
        const JugadoresActuales = document.getElementsByClassName('text-center tabular-nums green')[i].textContent.trim();
        jugadores.push(JugadoresActuales); // lo agrega al array
    }
    return jugadores; // retornamos todo el array al final
    });
    console.log(data);
    await browser.close();
}


//GetDataWeb()
/*
async function GetDataJSON() {
    const browser = await puppeteer.launch({
        headless : false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://steamdb.info/')
    await new Promise(r => setTimeout(r,5000));

const data = await page.evaluate(() => {
    let resultados = [];
    // Obtenemos todas las filas de la tabla
    // Podemos "filtrar" el contenido colocando un . para seleccionar la clase de cada etiqueta
    const filas = document.querySelectorAll('tr.app');
    // Recorremos cada fila
    filas.forEach((fila ,index)=> {
        const nombre = fila.querySelector('a.css-truncate')?.textContent.trim();
        const jugadores = fila.querySelector('.text-center.tabular-nums.green')?.textContent.trim();
        if (nombre && jugadores) {
            //Almacenamos en cada seccion del arreglo de resultados la combinacion
            //De el nombre del juego y los jugadores actuales
            resultados.push({
                id: index + 1,
                juego: nombre,
                jugadores: jugadores

            });
        }
    });
    return resultados;
});
console.log(JSON.stringify(data, null, 2));
fs.writeFileSync("Data.json", JSON.stringify(data, null, 2), "utf-8");
await browser.close();
}

GetDataJSON()
*/

async function GetDataJSON() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://steamdb.info/');
    await new Promise(r => setTimeout(r, 5000));

    const data = await page.evaluate(() => {
        let resultados = [];
        const filas = document.querySelectorAll('tr.app');
        filas.forEach((fila, index) => {
            const nombre = fila.querySelector('a.css-truncate')?.textContent.trim();
            const jugadores = fila.querySelector('.text-center.tabular-nums.green')?.textContent.trim();
            if (nombre && jugadores) {
                resultados.push({
                    id: index + 1,
                    juego: nombre,
                    jugadores: jugadores
                });
            }
        });
        return resultados;
    });

    //Convertir el arreglo en formato que LoopBack entiende
    let jsonFormatted = {
        ids: { Juego: data.length },
        models: { Juego: {} }
    };

    data.forEach(item => {
        jsonFormatted.models.Juego[item.id] = JSON.stringify(item);
    });

    fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(jsonFormatted, null, 2), "utf-8");

    console.log("Archivo data.json creado con formato LoopBack.");
    await browser.close();
}

GetDataJSON();
