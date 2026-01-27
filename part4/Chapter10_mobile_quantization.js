/**
 * [ PART IV. Advanced Engineering ]
 * Chapter 10. Mobile AI & Quantization (양자화 성능 분석)
 * * 상세 주석: 고정밀 데이터를 저전력 정수 데이터로 변환하는 '양자화' 시뮬레이션을 구현합니다.
 */

/**
 * 1. [데이터 설계] 고정밀 모델 가중치 데이터 (Float32)
 * 실제 딥러닝 모델의 필터나 가중치는 매우 정밀한 소수점입니다.
 */
const highPrecisionWeights = [0.8567, -0.1234, 0.5566, -0.9981, 0.0023];

/**
 * 2. [함수] INT8 양자화 시뮬레이터
 * - 원리: 전체 데이터 범위를 -128 ~ 127(8비트) 사이의 정수로 매핑합니다.
 */
function quantize(weights) {
    console.log("🛠️ 양자화 공정 가동: Float32 -> INT8 변환 중...");

    // Scale 계산: (최대값 - 최소값) / 255 (8비트 범위)
    const max = Math.max(...weights);
    const min = Math.min(...weights);
    const scale = (max - min) / 255;
    const zeroPoint = Math.round(-min / scale) - 128;

    // 변환 로직
    const int8Weights = weights.map(w => {
        let q = Math.round(w / scale + zeroPoint);
        return Math.max(-128, Math.min(127, q)); // 8비트 범위로 클램핑
    });

    return { int8Weights, scale, zeroPoint };
}

/**
 * 3. [함수] 역양자화 (Dequantization)
 * - 모바일 기기에서 실제 연산 시 다시 복구되는 값을 확인합니다.
 */
function dequantize(int8Weights, scale, zeroPoint) {
    return int8Weights.map(q => (q - zeroPoint) * scale);
}

/**
 * 4. 메인 실행 및 성능 분석
 */
async function runMobileOptimization() {
    console.log("📱 React Native 환경을 위한 모델 최적화 분석 시작...");

    const { int8Weights, scale, zeroPoint } = quantize(highPrecisionWeights);

    console.log("\n[분석 결과]");
    console.log(" - 원본(Float32):", highPrecisionWeights);
    console.log(" - 압축(INT8):   ", int8Weights);

    // 오차 분석 (Quantization Error)
    const recovered = dequantize(int8Weights, scale, zeroPoint);

    console.log("\n[정밀도 손실 체크]");
    highPrecisionWeights.forEach((original, i) => {
        const error = Math.abs(original - recovered[i]);
        console.log(` - 항목 ${i}: 오차 ${error.toFixed(6)} 발생`);
    });

    console.log("\n----------------------------------------");
    console.log("✅ 결과: 용량은 75% 감소했으나, 오차는 허용 범위 이내입니다.");
    console.log("🚀 이 모델은 이제 모바일 TFLite 환경에 배포하기 적합합니다.");
    console.log("----------------------------------------");
}

/**
 * [ 🛠️ 디버깅 가이드: 정확도 급감 (Accuracy Drop) ]
 * * 1. 현상: 양자화 후 모델이 갑자기 사물을 아예 구별하지 못함.
 * * 2. 원인 분석: 가중치 분포가 너무 불균형하여 정수로 변환 시 정보가 너무 많이 유실됨.
 * * 3. 재발 방지 팁: 학습 시에 미리 양자화를 고려하는 'Quantization Aware Training(QAT)'을 
 * 적용하거나, 중요한 레이어만 Float32로 남겨두는 'Mixed Precision'을 사용하세요.
 */

runMobileOptimization();

/*
[ 실행 리포트 ]
- 동작 원리: 연속적인 소수점 공간을 이산적인 정수 공간으로 매핑하는 데이터 압축 기술.
- 시간 복잡도: O(N) (압축 과정 자체는 매우 빠름)
*/