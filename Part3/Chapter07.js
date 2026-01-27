/**
 * [ PART III. Deep Learning ]
 * Chapter 07. 인공 신경망 기초 (ANN)
 * * 학습 목표: 입력층에서 은닉층으로 데이터가 흐르는 '순전파(Forward Propagation)' 
 * 과정과 비선형성을 부여하는 '활성화 함수'의 원리를 마스터합니다.
 */

/**
 * 1. [데이터 설계] 신경망 가중치 및 편향 데이터
 * - 입력(Input): 2개 (예: 공부 시간, 수면 시간)
 * - 은닉층 노드(Hidden Nodes): 3개
 * - 따라서 가중치 행렬은 2x3 구조가 됩니다.
 */
const neuralNetwork = {
    layers: [
        {
            name: "Hidden Layer 1",
            // weights[입력인덱스][노드인덱스]
            weights: [
                [0.5, 0.8, -0.2], // 입력 1(공부시간)에서 각 노드로 가는 가중치
                [0.1, -0.4, 0.6]  // 입력 2(수면시간)에서 각 노드로 가는 가중치
            ],
            biases: [0.1, 0.2, -0.1] // 각 노드의 고유 편향값
        }
    ]
};

/**
 * 2. [활성화 함수] ReLU (Rectified Linear Unit)
 * 딥러닝의 핵심! 0보다 작은 값은 0으로, 큰 값은 그대로 유지하여 '비선형성'을 추가합니다.
 * (이게 없으면 신경망은 그냥 단순한 선형 회귀의 합일 뿐입니다.)
 */
const relu = (x) => Math.max(0, x);

/**
 * 3. [연산 엔진] 순전파(Forward Propagation) 함수
 * @param {Array} inputs - [x1, x2] 형태의 입력 데이터
 */
function forward(inputs) {
    const layer = neuralNetwork.layers[0];

    console.log(`\n[입력 신호 수신]: ${inputs}`);

    // map을 사용해 3개의 노드 결과를 각각 계산합니다.
    const output = layer.biases.map((bias, nodeIdx) => {
        /**
         * [Deep Dive]: 행렬 곱 연산 (Dot Product)
         * 파이썬의 np.dot(inputs, weights)와 같은 역할입니다.
         * acc: 누적된 합계, input: 현재 입력값, i: 현재 입력 인덱스
         */
        const weightedSum = inputs.reduce((acc, input, i) => {
            const w = layer.weights[i][nodeIdx];
            return acc + (input * w);
        }, 0);

        // 결과 = ReLU( 가중치합 + 편향 )
        const finalValue = relu(weightedSum + bias);

        console.log(` - 노드 ${nodeIdx + 1} 연산 완료: ${finalValue.toFixed(4)}`);
        return finalValue;
    });

    return output;
}

/**
 * 4. 메인 실행 로직
 */
async function main() {
    console.log("========================================");
    console.log("🧠 Artificial Neural Network 가동");
    console.log("========================================");

    // 테스트 입력 데이터: [공부 시간 1.0, 수면 시간 0.5]
    const testData = [1.0, 0.5];

    // 비동기 처리 시뮬레이션 (네트워크 지연 연출)
    await new Promise(res => setTimeout(res, 1000));

    const result = forward(testData);

    console.log("----------------------------------------");
    console.log("✅ 은닉층 연산 최종 결과 (Next Layer의 입력값):");
    console.log(result);
    console.log("========================================");
}

main();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. 왜 map과 reduce를 쓰나요?
 * - for 루프보다 선언적이며, 가중치 행렬의 크기가 변해도 코드를 수정할 필요가 없는 '유연한 구조'이기 때문입니다.
 * * 2. ReLU 함수의 중요성 (Root Cause Analysis):
 * - 만약 결과값이 모두 음수라면 ReLU에 의해 0이 출력됩니다. 이를 '죽은 뉴런(Dead Neuron)' 현상이라고 하며, 
 * 가중치 초기화가 잘못되었을 때 발생합니다.
 * * 3. 시간 복잡도: O(I * H) (I: 입력 수, H: 은닉 노드 수)
 */