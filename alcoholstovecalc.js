// Backpacking Guys的版本：
function calculateExtraAlcoholToBoiling(elevationInMeters, baseAlcoholAmount, initialWaterTemp, waterVolumeInMl) {
  // 研究表明，海拔每升高 1,000 英尺 ，燃油效率就會下降約 3-5%。這意味著在更高的海拔，背包客需要燃燒更多的燃料來完成相同的烹飪任務。
  const elevationInFeet = elevationInMeters * 3.28084;
  const extraPercentageFromElevation = Math.max(0, Math.floor(elevationInFeet / 1000) * 0.03);

  // 計算海拔對沸點的影響 (簡化模型)
  const boilingPointDrop = Math.floor(elevationInFeet / 1000) * 1.1;
  const seaLevelBoilingPoint = 100; // °C
  const currentBoilingPoint = Math.max(80, seaLevelBoilingPoint - boilingPointDrop); // 假設最低沸點為 80°C

  // 目標水溫固定為當前沸點
  const targetWaterTemp = currentBoilingPoint;

  // 計算提升水溫所需的熱量 (焦耳)
  const deltaTemp = targetWaterTemp - initialWaterTemp;
  const specificHeatOfWater = 4186; // J/(kg·°C)
  const waterVolumeInLiters = waterVolumeInMl / 1000; // 將毫升轉換為公升
  const waterMassInKg = waterVolumeInLiters; // 假設水的密度約為 1 kg/L
  const heatRequiredForWater = waterMassInKg * specificHeatOfWater * deltaTemp;

  // 假設酒精的燃燒熱值約為 29.7 kJ/g
  const heatValueAlcoholPerGramInJoules = 29700; // J/g

  // 計算理論上需要額外燃燒的酒精克數來加熱水
  const extraAlcoholMassForWater = heatRequiredForWater / heatValueAlcoholPerGramInJoules;

  // 假設酒精的密度約為 0.789 g/mL
  const alcoholDensityInGmPerMl = 0.789;
  const extraAlcoholVolumeForWater = extraAlcoholMassForWater / alcoholDensityInGmPerMl;

  // 將額外酒精體積轉換為相對於基礎酒精量的比例
  const extraPercentageFromWaterTemp = baseAlcoholAmount > 0 ? (extraAlcoholVolumeForWater / baseAlcoholAmount) : 0;

  // 計算總共的額外百分比 (簡化模型)
  const totalExtraPercentage = extraPercentageFromElevation + extraPercentageFromWaterTemp;

  // 計算額外需要的酒精量
  const extraAlcoholAmount = baseAlcoholAmount * totalExtraPercentage;

  // 計算總共需要的酒精量
  const totalAlcoholAmount = baseAlcoholAmount + extraAlcoholAmount;

  return {
    extraPercentageFromElevation: extraPercentageFromElevation,
    extraPercentageFromWaterTemp: extraPercentageFromWaterTemp,
    extraAmount: extraAlcoholAmount,
    totalAmount: totalAlcoholAmount,
    currentBoilingPoint: currentBoilingPoint
  };
}

function CalcAndPrint_bg()
{
	const initialEthanolAtSeaLevel = 30.0; // 假設在海平面煮沸水需要 30 毫升乙醇

	var elevation_m = document.getElementById("b_elevation_m");
	var temperature_c = document.getElementById("b_temperature_c");
	var waterVolume = document.getElementById("b_waterVolume");
	var baseAlcoholAmount = document.getElementById("b_baseAlcoholAmount");	
	var result_sign = document.getElementById("b_result_sign");	
	var result_ml = document.getElementById("b_result_ml");		
	var estimationResult = calculateExtraAlcoholToBoiling( elevation_m.value, baseAlcoholAmount.value, temperature_c.value, waterVolume.value);	
	var ml = estimationResult.extraAmount.toFixed(2);
	result_sign.innerText = Math.sign(ml)==1 ? "增加" : "減少";
	result_ml.innerText = Math.abs(ml).toString();	
}


// 依據GEMINI提供的版本：
function estimateEthanolChange(initialEthanol, altitudeMeters, initialWaterTempCelsius, kFactor) {
  // 海平面沸點 (攝氏度)
  const seaLevelBoilingPoint = 100;

  // 計算海拔導致的沸點變化 (每升高 150 米降低約 0.55 度)
  const boilingPointChange = -0.00367 * altitudeMeters;
  const boilingPointAtAltitude = seaLevelBoilingPoint + boilingPointChange;

  // 計算海平面所需溫升
  const riseAtSeaLevel = seaLevelBoilingPoint - initialWaterTempCelsius;

  // 計算高海拔所需溫升
  const riseAtAltitude = boilingPointAtAltitude - initialWaterTempCelsius;

  // 假設一個燃燒效率修正因子 (需要根據實際經驗調整)
  const efficiencyCorrectionFactor = 1.0 + (kFactor / 100.0); // 假設在高海拔需要增加約 8% 的燃料

  // 估計在高海拔和特定水溫下所需的乙醇量
  const estimatedEthanol = initialEthanol * (riseAtAltitude / riseAtSeaLevel) * efficiencyCorrectionFactor;

  // 計算乙醇用量的相對變化百分比
  const relativeChangePercentage = ((estimatedEthanol / initialEthanol) - 1) * 100;
/*
  return {
    estimatedEthanol: estimatedEthanol,
    relativeChangePercentage: relativeChangePercentage
  };*/
  return (estimatedEthanol - initialEthanol).toFixed(2);
}

function CalcAndPrint_gemini()
{
	const initialEthanolAtSeaLevel = 30.0; // 假設在海平面煮沸水需要 30 毫升乙醇

	var elevation_m = document.getElementById("g_elevation_m");
	var temperature_c = document.getElementById("g_temperature_c");	
	var g_kfactor = document.getElementById("g_kfactor");	
	var result_sign = document.getElementById("g_result_sign");	
	var result_ml = document.getElementById("g_result_ml");	
	
	var estimationResult = estimateEthanolChange(initialEthanolAtSeaLevel, elevation_m.value, temperature_c.value, g_kfactor.value);
	
	var ml = estimationResult;
	result_sign.innerText = Math.sign(ml)==1 ? "增加" : "減少";
	result_ml.innerText = Math.abs(ml).toString();	
}

// 高海拔酒精燃料計算機
function calculateAlcoholUsage(elevation, temperatureF)
{
    const baseTempF = 77.0; // 攝氏25度 = 華氏77度
    const baseElevationFt = 328.0; // 約100公尺

    // 每降低10°F增加1ml，每升高4000ft減少1ml
    const tempDifference = baseTempF - temperatureF;
    const elevationDifference = elevation - baseElevationFt;

    let alcoholAdjustment = 0.0;
    alcoholAdjustment += (tempDifference / 10.0);
    alcoholAdjustment -= (elevationDifference / 4000.0);

    return alcoholAdjustment.toFixed(2);
}

function toCelsius(fahrenheit)
{
    return (5.0/9.0) * (fahrenheit-32.0);
}

function toFahrenheit(celsius)
{
    return celsius * 1.8 + 32.0;
}

function toFeet(meter)
{
    var cm = meter*100;
    var feet = cm * 0.0328084;
    return feet;
}

function CalcAndPrint_jonfong57()
{
	var elevation_m = document.getElementById("j_elevation_m");
	var temperature_c = document.getElementById("j_temperature_c");	
	var result_sign = document.getElementById("j_result_sign");	
	var result_ml = document.getElementById("j_result_ml");	
	
	var ml = calculateAlcoholUsage(toFeet(elevation_m.value), toFahrenheit(temperature_c.value));
	result_sign.innerText = Math.sign(ml)==1 ? "增加" : "減少";
	result_ml.innerText = Math.abs(ml).toString();	
}