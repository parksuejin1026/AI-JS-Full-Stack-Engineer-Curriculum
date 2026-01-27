/**
 * [ PART III. Deep Learning ]
 * Chapter 09-2. LSTM (Long Short-Term Memory) 원리
 * * 학습 목표: 정보를 선택적으로 기억하고 잊는 'Gate'의 논리 구조를 이해합니다.
 */

/**
 * 1. [데이터 설계] 긴 문장 데이터
 * "나는 어제 수진이를 만났는데, 오늘 그녀는..." -> 여기서 '그녀'가 '수진'임을 기억해야 합니다.
 */
let longTermMemory = 0;  // Cell State (장기 기억 컨베이어 벨트)
let shortTermMemory = 0; // Hidden State (단기 기억/출력)

/**
 * 2. [함수] 시그모이드(Sigmoid) 함수
 * - 역할: 0 ~ 1 사이의 값을 반환합니다. 
 * - 의미: 0이면 '다 잊어!', 1이면 '다 기억해!'라는 '밸브' 역할을 합니다.
 */
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const tanh = (x) => Math.tanh(x);

/**
 * 3. LSTM 셀 시뮬레이션
 */
function lstmCell(inputVal, prevShortTerm, prevLongTerm) {
    console.log(`\n📥 새 데이터 입력: ${inputVal}`);

    // [Step 1: Forget Gate] - 과거의 기억을 얼마나 잊을지 결정
    // 만약 주제가 바뀌었다면 과거 기억을 0에 가깝게 만듭니다.
    const forgetRate = sigmoid(inputVal * 0.1);
    let currentLongTerm = prevLongTerm * forgetRate;
    console.log(` 🗑️ 망각 게이트: 과거 기억의 ${(forgetRate * 100).toFixed(1)}%만 유지`);

    // [Step 2: Input Gate] - 현재 들어온 정보 중 중요한 것만 저장
    const inputImportance = sigmoid(inputVal * 0.5);
    const candidateInfo = tanh(inputVal * 0.8); // 새로운 정보 후보
    currentLongTerm += (inputImportance * candidateInfo);
    console.log(` 💾 입력 게이트: 새 정보 중 ${(inputImportance * 100).toFixed(1)}%를 장기 기억에 추가`);

    // [Step 3: Output Gate] - 어떤 정보를 밖으로 내보낼지 결정
    const outputFilter = sigmoid(inputVal * 0.2);
    const currentShortTerm = outputFilter * tanh(currentLongTerm);

    return {
        cellState: currentLongTerm,
        hiddenState: currentShortTerm
    };
}

/**
 * [메인 실행 로직]
 */
async function runLstmDemo() {
    console.log("========================================");
    console.log("🧠 LSTM 고도화 기억 엔진 가동");
    console.log("========================================");

    const inputs = [1, 5, -2]; // 시간에 따라 들어오는 데이터 흐름

    for (let i = 0; i < inputs.length; i++) {
        const result = lstmCell(inputs[i], shortTermMemory, longTermMemory);

        longTermMemory = result.cellState;
        shortTermMemory = result.hiddenState;

        await new Promise(res => setTimeout(res, 800));
        console.log(` ✨ 현재 메모리 상태 - 장기: ${longTermMemory.toFixed(3)}, 단기: ${shortTermMemory.toFixed(3)}`);
    }

    console.log("\n========================================");
    console.log("✅ LSTM 분석 완료: 긴 문맥도 놓치지 않고 학습했습니다.");
    console.log("========================================");
}

runLstmDemo();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. 왜 Sigmoid인가?: 
 * - 곱셈 연산을 통해 정보를 '통과'시키거나 '차단'하는 스위치 역할을 하기에 최적입니다.
 * * 2. RNN vs LSTM:
 * - RNN은 단순 합산이지만, LSTM은 '선택적 업데이트'입니다. 
 * - 덕분에 수만 개의 단어 뒤에서도 초기 정보를 잃지 않습니다.
 * * 3. 시간 복잡도: O(N) (N은 데이터의 길이)
 */