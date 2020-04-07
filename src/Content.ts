import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        // Material Design Bootstrap súgó: https://mdbootstrap.com/
        // Font Awesome:
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        // Google Fonts:
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        // Bootstrap core CSS:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        // Material Design Bootstrap:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        //változó def.

        res.write("Téglalap kerülete, területe\n");
        res.write("a = ");
        let oldalA: number = parseInt(params.inputa as string);
        if (isNaN(oldalA)) {
            oldalA = 0;
        }
        res.write(`<input type = 'text' name='inputa' value = ${oldalA} style='width:3em'>\n`);

        res.write("b = ");
        let oldalB: number = parseInt(params.inputb as string);
        if (isNaN(oldalB)) {
            oldalB = 0;
        }
        res.write(`<input type = 'text' name='inputb' value = ${oldalB} style='width:3em' onChange= 'this.form.submit();'>\n`);

        const t = oldalA * oldalB;
        const k = 2 * (oldalA + oldalB);
        res.write(`Terület = ${t}\n`);
        res.write(`Kerület = ${k}\n`);
        res.write("\n\n");

        res.write("Páros-páratlan meghatározó\n");
        res.write("x = ");
        let x: number = parseInt(params.inputx as string);
        if (isNaN(x)) {
            x = 0;
        }
        res.write(`<input type = 'number' name='inputx' value = ${x} style='width:3em' onChange= 'this.form.submit();'>\n`);
        if (x % 2 == 0) {
            res.write("A szám páros\n\n");
        } else {
            res.write("A szám páratlan\n\n");
        }

        res.write("KRÉTA\n");
        res.write("Kérem az osztályzatot:  ");
        let jegy: number = parseInt(params.jegy as string);
        if (isNaN(jegy)) {
            jegy = 0;
        }
        res.write(`<input type = 'text' name='jegy' value = ${jegy} style='width:2em' onChange= 'this.form.submit();'>\n`);
        switch (jegy) {
            case 1:
                res.write("Elégtelen\n\n\n");
                break;
            case 2:
                res.write("Elégséges\n\n\n");
                break;
            case 3:
                res.write("Közepes\n\n\n");
                break;
            case 4:
                res.write("Jó\n\n\n");
                break;
            case 5:
                res.write("Jeles\n\n\n");
                break;

            default:
                res.write("Nem osztályzat!\n\n\n");
                break;
        }

        res.write("MFEGY\n");
        res.write("Kérem a változókat:\n");

        res.write("a = ");
        let adatA: number = parseInt(params.adatA as string);
        if (isNaN(adatA)) {
            adatA = 1;
        }
        res.write(`<input type = 'text' name='adatA' value = ${adatA} style='width:2em' onChange= 'this.form.submit();'>\n`);

        res.write("b = ");
        let adatB: number = parseInt(params.adatB as string);
        if (isNaN(adatB)) {
            adatB = 2;
        }
        res.write(`<input type = 'text' name='adatB' value = ${adatB} style='width:2em' onChange= 'this.form.submit();'>\n`);

        res.write("c = ");
        let adatC: number = parseInt(params.adatC as string);
        if (isNaN(adatC)) {
            adatC = 1;
        }
        res.write(`<input type = 'text' name='adatC' value = ${adatC} style='width:2em' onChange= 'this.form.submit();'>\n`);

        if (adatA != 0) {
            if (Math.pow(adatB, 2) >= 4 * adatA * adatC) {
                if (Math.pow(adatB, 2) > 4 * adatA * adatC) {
                    res.write("Két gyök!\n");
                    const x1: number = -adatB + Math.sqrt(Math.pow(adatB, 2) - 4 * adatA * adatC) / (2 * adatA);
                    const x2: number = -adatB - Math.sqrt(Math.pow(adatB, 2) - 4 * adatA * adatC) / (2 * adatA);
                    res.write(`x1 = ${x1}\n`);
                    res.write(`x2 = ${x2}\n`);
                } else {
                    res.write("Egy gyök!\n");
                    const x = -adatB / (2 * adatA);
                    res.write(`x = ${x}`);
                }
            } else res.write("Nincs valós gyök!\n");
        } else {
            res.write("Nem másodfokú!");
            if (adatB != 0) {
                const x = -adatC / adatB;
                res.write(`x1 = ${x}`);
            } else {
                if (adatC != 0) res.write("Ellentmondás !");
                else res.write("Azonosság !");
            }
        }
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>");
        // Bootstrap tooltips:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js'></script>");
        // Bootstrap core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js'></script>");
        // MDB core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/js/mdb.min.js'></script>");
        res.end();
    }
}
