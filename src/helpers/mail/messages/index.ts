const mailMsg = (link: string, msg: string, name?: string, last_name?: string): string => {
	/*html*/
	return `
    <html>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
        <body style="background-color: #f2f3f5;padding: 30px">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; font: 14px sans-serif; border-top: 4px solid #004063">
                <!--  -->
                <div style="border-bottom: 1px solid #f2f3f5; padding: 2px 10px;background-color: #fff">
                    <div style="background-color: #fff">
                        <img
                            style="width: 100%"
                            src="https://ci5.googleusercontent.com/proxy/3QgftoNx6q75VgEY3CxVe15i2ExBF5-rWm59xNhSNauB_jf_xvvpnhDTBSrgDch113r8rtAT-E_Vzxa8BCTtQaakEAbkXP-ddgWH-yAJICOwVPJ4cCp9GHV7BQcEV4NWmGX6r7kMUb7loOC4I24mqOsoT8qffVPUUkNHr8BFmsplWCn7Ydi1reuyfpSF2LgZ4p33ssCpkw=s0-d-e1-ft#https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWcOy5yvd0spuXJcnqaf4DBoWXlxYE2NArQtSa3OApMpX9wSxaX0RRJjQJhRV4GMMQQ&usqp=CAU"
                        />
                    </div>
                </div>

                <div style="background-color: #fff; padding: 0px 30px">
                    <div style="border-bottom: 1px solid #f2f3f5">
                        <h2>Hola ${name} ${last_name}</h2>
                        <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                            Te damos la bienvenida a 1000pagos.
                        </p>
                    </div>
                    <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                        Gracias por confiar en nosotros. Nos comprometemos a apoyarte y a entregarte todas las herramientas que necesites.
                        <br />
                        
                        <br />
                        <br />
                
                    </p>
                    <br />
                    <div style="text-align: center; border-bottom: 1px solid #f2f3f5; margin-top: 0px;font-family: 'Roboto', sans-serif">
                        <a
                            style="
                                text-decoration: none;
                                border: none;
                                border-radius: 6pt;
                                display: inline-block;
                                height: 36px;
                                line-height: 36px;
                                padding: 0 65px;
                                vertical-align: middle;
                                -webkit-tap-highlight-color: transparent;
                                background-color: #6fb060;
                                color: white;
                                outline: 0;
                                font-family: 'Roboto', sans-serif;
                            "
                            href="${link}"
                        >
                            ${msg}
                        </a>
                        <br />
                    </div>
                    <br />
                    <br />
                </div>
            </div>
            <div style="max-width: 600px; margin: 0 auto;font: 14px sans-serif">
                <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                    1000pagos un punto mil soluciones.
                </p>
            </div>
        </body>
    </html>`;
};

export const digeridosMSG = (msg: string, name?: string, last_name?: string): string => {
	/*html*/
	return `
    <html>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
        <body style="background-color: #f2f3f5;padding: 30px">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; font: 14px sans-serif; border-top: 4px solid #004063">
                <!--  -->
                <div style="border-bottom: 1px solid #f2f3f5; padding: 2px 10px;background-color: #fff">
                    <div style="background-color: #fff">
                        <img
                            style="width: 100%"
                            src="https://ci5.googleusercontent.com/proxy/3QgftoNx6q75VgEY3CxVe15i2ExBF5-rWm59xNhSNauB_jf_xvvpnhDTBSrgDch113r8rtAT-E_Vzxa8BCTtQaakEAbkXP-ddgWH-yAJICOwVPJ4cCp9GHV7BQcEV4NWmGX6r7kMUb7loOC4I24mqOsoT8qffVPUUkNHr8BFmsplWCn7Ydi1reuyfpSF2LgZ4p33ssCpkw=s0-d-e1-ft#https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWcOy5yvd0spuXJcnqaf4DBoWXlxYE2NArQtSa3OApMpX9wSxaX0RRJjQJhRV4GMMQQ&usqp=CAU"
                        />
                    </div>
                </div>

                <div style="background-color: #fff; padding: 0px 30px">
                    <div style="border-bottom: 1px solid #f2f3f5">
                        <h2>Hola ${name} ${last_name}</h2>
                        <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                            Hola ${name} ${last_name}, reciba un cordial saludo.
                        </p>
                    </div>
                    <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">

                        le informamos que los siguientes recaudos precentaron erroes al validar:

                        <br />
                        <br />

                        ${msg}
                        
                        <br />
                
                    </p>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
            <div style="max-width: 600px; margin: 0 auto;font: 14px sans-serif">
                <p style="font-size: 14px; outline: 0; text-align: justify;font-family: 'Roboto', sans-serif">
                    1000pagos un punto mil soluciones.
                </p>
            </div>
        </body>
    </html>`;
};

export default mailMsg;
