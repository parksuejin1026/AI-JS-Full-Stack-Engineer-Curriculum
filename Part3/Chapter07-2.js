/**
 * [ PART III. Deep Learning - 상세 주석 버전 ]
 * Chapter 07-2. 역전파(Backpropagation)의 원리
 * * * 수진 님을 위한 요약: 
 * 1. Forward(순전파): 문제를 푼다 (y = wx + b)
 * 2. Loss(오차): 채점을 한다 (예측 - 정답)
 * 3. Backward(역전파): 왜 틀렸는지 분석한다 (미분)
 * 4. Update(업데이트): 공부 방향(가중치)을 수정한다.
 */

/**
 * [함수] ReLU (활성화 함수)
 * - 목적: 음수 데이터(노이즈)를 제거하고 양수 신호만 통과시킴
 * - 연산: 0과 x를 비교해서 더 큰 쪽을 리턴 (x가 -5면 0 리턴, x가 5면 5 리턴)
 */
const relu = (x) => Math.max(0, x);

/**
 * [함수] ReLU의 미분 (기울기 추출기)
 * - 목적: 역전파 때 "이 노드가 정답에 얼마나 기여했나?"를 판별
 * - 규칙: x가 0보다 크면 1(기여함), 0 이하면 0(기여 안 함/차단됨)을 반환
 * - 문법: (조건 ? 참일때 : 거짓일때) -> 자바스크립트의 짧은 if문 (삼항 연산자)
 */
const reluDerivative = (x) => (x > 0 ? 1 : 0);

/**
 * [메인 함수] 신경망 학습 시뮬레이션
 */
async function backpropagateSimulation() {
    console.log("========================================");
    console.log("🔄 역전파(Backpropagation) 시뮬레이션 가동");
    console.log("========================================");

    // 1. 초기 하이퍼파라미터 설정
    let weight = 0.8;         // 가중치: 우리가 학습시켜야 할 '지능'의 값
    const input = 1.0;        // 입력값: 공부 시간 (고정)
    const target = 10.0;      // 목표값: 시험 점수 (우리가 맞춰야 할 정답)
    const learningRate = 0.1;   // 학습률: 가중치를 한 번에 얼마나 수정할지 결정하는 '보폭'

    console.log(`[시작] 가중치: ${weight}, 목표 정답: ${target}`);

    // 학습 반복 (Epoch: 전체 데이터를 몇 번 반복해서 공부할 것인가)
    for (let epoch = 1; epoch <= 5; epoch++) {

        // --- [Step 2: 순전파 (Forward)] ---
        // 입력값에 가중치를 곱하고 활성화 함수(ReLU)를 통과시켜 결과를 예측합니다.
        const prediction = relu(input * weight);

        // --- [Step 3: 오차 계산 (Loss)] ---
        // 예측한 값과 정답의 차이를 구합니다. (음수가 나오면 모델이 더 커져야 한다는 뜻)
        const error = prediction - target;

        // --- [Step 4: 역전파 (Backprop) - 기울기(Gradient) 계산] ---
        /** * [Deep Dive]: 기울기(Gradient)의 공식 = 오차 * 입력값 * 활성화함수의 미분
         * 1. error가 클수록: 가중치를 많이 바꿔야 함 (많이 틀렸으니까!)
         * 2. input이 클수록: 이 가중치가 결과에 끼친 영향력이 큼
         * 3. reluDerivative: 현재 노드가 활성화 상태(양수)일 때만 학습 신호를 뒤로 전달
         */
        const gradient = error * input * reluDerivative(prediction);

        // --- [Step 5: 가중치 업데이트 (Update)] ---
        /**
         * 경사하강법(GD) 공식: 새로운 가중치 = 기존 가중치 - (보폭 * 방향)
         * - gradient가 음수면 weight는 커지고, 양수면 weight는 작아집니다.
         */
        weight = weight - (learningRate * gradient);

        console.log(`\n[${epoch}회차 학습]`);
        console.log(` 🎯 예측 점수: ${prediction.toFixed(2)} (오차: ${error.toFixed(2)})`);
        console.log(` 🛠️ 수정된 가중치: ${weight.toFixed(2)}`);

        // 2초 뒤에 결과가 나오는 것처럼 시뮬레이션 (수진님이 배운 비동기 await 사용)
        await new Promise(res => setTimeout(res, 800));
    }

    console.log("\n========================================");
    console.log("✅ 학습 종료: 가중치가 정답(10.0)을 맞추기 위해 최적화되었습니다.");
    console.log("========================================");
}

// 서비스 실행
backpropagateSimulation();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. 연쇄 법칙(Chain Rule):
 * - 오차가 마지막 층에서 발생했지만, 그 책임은 앞쪽의 가중치들에게도 있습니다.
 * - 이 책임을 미분값을 곱해가며 뒤로 전달하는 것이 역전파의 핵심입니다.
 * * 2. 미분의 역할:
 * - reluDerivative는 "이 노드가 결과에 기여를 했는가?"를 결정합니다. 
 * - 만약 값이 0 이하라면 기울기도 0이 되어 학습이 일어나지 않습니다.
 * * 3. 재발 방지 팁: 
 * - 학습이 너무 안 된다면 학습률(learningRate)이 너무 작거나, 
 * 가중치가 모두 0으로 수렴하는 '기울기 소실' 문제일 수 있습니다.
 */