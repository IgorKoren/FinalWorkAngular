export interface ISpacificationForProduct {
    // репітери
    repeter: {
        specificationName: string;
        idCodeProduct?: string[];
        brend?: string[];
        madel?: string[];
        standart?: string[];
        gain?: string[];
        coverageArea?: string[];
        lcdDisplay?: string[];
        outputPower?: string[];
        connectorType?: string[];
        manualGain?: string[];
        automaticGainAGC?: string[];
        selfDiagnosticFunction?: string[];
        sleepingMode?: string[];
        impedance?: string[];
        outdoorAntenna?: string[];
        idoorAntenna?: string[];
        // Сфери застосування
        areasApplication?: string[];
        // Комплект постачання
        deliverySet?: string[];
        // Додаткові функції
        additionalFeatures?: string[];
        voltage?: string[];
        countryOfProduce?: string[];
        guarantee?: string[];
    };
    antenna: {
        specificationName: string;
        idCodeProduct?: string[];
        brend?: string[];
        madel?: string[];
        mhz?: string[];
        gain?: string[];
        coverageArea?: string[];
        lcdDisplay?: string[];
        type?: string[];
        radiusWork?: string[];
        numberOfElements?: string[];
        polarization?: string[];
        countElements?: string[];
        cableLength?: string[];
        //Діграма направленості по горизонталі
        horizontalPattern?: string[];
        //Діграма направленості по вертикалі
        verticallPattern?: string[];
        vswr?: string[];
        material?: string[];
        size?: string[];
        connectorType?: string[];
        manualGain?: string[];
        automaticGainAGC?: string[];
        selfDiagnosticFunction?: string[];
        sleepingMode?: string[];
        impedance?: string[];
        outdoorAntenna?: string[];
        idoorAntenna?: string[];
        // Сфери застосування
        areasApplication?: string[];
        // Комплект постачання
        deliverySet?: string[];
        // Додаткові функції
        additionalFeatures?: string[];
        voltage?: string[];
        countryOfProduce?: string[];
        guarantee?: string[];
    };

}