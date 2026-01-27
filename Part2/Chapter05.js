/**
 * [ PART II. Machine Learning & JS Interface ]
 * Chapter 05. 머신러닝 알고리즘 (Supervised Learning)
 * * 학습 목표: 파이썬에서 학습시킨 모델의 '지능(가중치와 편향)'을 
 * JS로 가져와 실제 예측(Inference)을 수행하는 엔진을 구현합니다.
 */

/**
 * 1. [데이터 설계] Model 파라미터 규격화
 * 실무에서는 파이썬 학습 결과물을 이와 같은 JSON 형식으로 저장하여 전달합니다.
 */
const trainedModel = {
    // Chapter 03에서 우리가 찾았던 최적의 값들과 유사하게 설정
    parameters: {
        weight: 3.12,  // 가중치 (Slope)
        bias: 3.98     // 편향 (Intercept)
    },
    metadata: {
        model_name: "linear_regression_v1",
        metrics: { accuracy: "98.5%", loss_type: "MSE" },
        last_updated: "2026-01-27"
    }
};

/**
 * 2. [추론 엔진] 선형 회귀 예측 함수
 * 파이썬에서 배운 y = Wx + b 수식을 순수 JS로 구현합니다.
 * @param {number} x - 입력 데이터 (예: 공부 시간)
 * @returns {number} 예측 결과값 (예: 예상 점수)
 */
function predict(x) {
    // 1. 모델 데이터에서 가중치와 편향을 꺼내옵니다.
    const { weight, bias } = trainedModel.parameters;

    // 2. 수식 적용 (Deep Dive: 파이썬 NumPy 연산의 JS 이식)
    const y_pred = (weight * x) + bias;

    return y_pred;
}

/**
 * 3. [성능 평가] 예측 오차 측정 (MSE)
 * 모델이 실제 정답과 얼마나 차이가 나는지 계산합니다.
 */
function evaluate(inputX, actualY) {
    const prediction = predict(inputX);
    const error = prediction - actualY;
    return Math.pow(error, 2); // 오차의 제곱 반환
}

/**
 * 4. 메인 실행 로직 (Async Interface)
 */
async function main() {
    console.log("========================================");
    console.log(`🚀 [${trainedModel.metadata.model_name}] 추론 시작`);
    console.log("========================================");

    // 가상의 테스트 데이터 (공부 시간: 1.5시간, 실제 점수: 8.5점)
    const testInput = 1.5;
    const realScore = 8.5;

    console.log(`[분석 단계 1]: 입력값 ${testInput}에 대한 예측 수행...`);

    // 2초 뒤에 결과가 나오는 것처럼 비동기 연출 (Chapter 04 복습)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const prediction = predict(testInput);
    const mse = evaluate(testInput, realScore);

    console.log(`✅ 분석 완료!`);
    console.log(`----------------------------------------`);
    console.log(`📩 예상 점수: ${prediction.toFixed(2)}점`);
    console.log(`📉 실제 점수와의 오차(MSE): ${mse.toFixed(4)}`);
    console.log(`----------------------------------------`);
    console.log(`🏁 서비스 종료 (업데이트 날짜: ${trainedModel.metadata.last_updated})`);
    console.log("========================================");
}

// 서비스 가동
main();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. Root Cause Analysis (데이터 타입 주의):
 * - JSON 데이터의 weight가 "3.12"(문자열)로 되어 있으면 덧셈 시 버그가 발생합니다.
 * - 반드시 숫자형(Number)임을 확인하고 연산해야 합니다.
 * * 2. 구조적 확장성:
 * - 현재는 입력값 x가 하나지만, 여러 개의 특징(Feature)을 다룰 때는 
 * Chapter 01에서 배운 '행렬 곱' 로직을 배열 순회(map, reduce)로 구현해야 합니다.
 * * 3. 시간 복잡도: O(1) 
 * - 단순 사칙연산이므로 데이터 개수에 상관없이 즉시 처리됩니다.
 */