/**
 * [ PART III. Deep Learning ]
 * Chapter 09. 순환 신경망 (RNN) 기초
 * * 학습 목표: 이전 단계의 정보를 현재 단계로 전달하는 
 * '은닉 상태(Hidden State)'의 순환 원리를 코드로 이해합니다.
 */

/**
 * 1. [데이터 설계] 단어 시퀀스 시뮬레이션
 * AI가 "I", "Love", "AI"라는 세 단어를 순서대로 읽는다고 가정합니다.
 * (실제로는 각 단어가 숫자로 변환된 벡터 형태입니다.)
 */
const sentence = ["I", "Love", "AI"];

/**
 * 2. [기억 저장소] 은닉 상태 (Hidden State)
 * 이전 단계에서 배운 정보를 담아두는 '메모리' 역할입니다.
 */
let hiddenState = 0; // 초기 기억은 아무것도 없는 상태(0)

/**
 * 3. RNN 셀(Cell) 연산 함수
 * @param {string} input - 현재 입력된 단어
 * @param {number} prevHidden - 이전 단계까지의 기억
 */
function rnnCell(input, prevHidden) {
    // [Deep Dive]: 실제 가중치 연산 시뮬레이션
    // 가중치 1: 현재 입력에 대한 중요도 (W_hx)
    // 가중치 2: 이전 기억에 대한 중요도 (W_hh)
    const weight_input = 0.5;
    const weight_hidden = 0.8;

    // 가상의 단어 수치화 (I: 1, Love: 2, AI: 3)
    const inputVal = input === "I" ? 1 : input === "Love" ? 2 : 3;

    /**
     * [핵심 로직]: 현재의 기억 = 활성화함수( (현재입력 * 가중치) + (이전기억 * 가중치) )
     * 이 식이 바로 RNN이 과거를 기억하는 수학적 원리입니다.
     */
    const currentHidden = Math.tanh((inputVal * weight_input) + (prevHidden * weight_hidden));

    return currentHidden;
}

/**
 * [메인 실행 로직]
 */
async function runRnnDemo() {
    console.log("========================================");
    console.log("📜 RNN 문장 분석 엔진 가동");
    console.log("========================================");

    // 문장의 단어를 하나씩 순서대로 처리합니다.
    for (let i = 0; i < sentence.length; i++) {
        const currentWord = sentence[i];

        console.log(`\n[Step ${i + 1}]: 단어 "${currentWord}" 읽는 중...`);
        console.log(` - 이전의 기억(prevHidden): ${hiddenState.toFixed(4)}`);

        // RNN 셀을 거쳐 새로운 기억을 생성합니다.
        hiddenState = rnnCell(currentWord, hiddenState);

        // 비동기 처리 시뮬레이션 (단어를 하나씩 읽는 느낌 연출)
        await new Promise(res => setTimeout(res, 800));

        console.log(` ✅ 새로운 기억(currentHidden) 저장 완료: ${hiddenState.toFixed(4)}`);
    }

    console.log("\n----------------------------------------");
    console.log("🎯 문장 분석 최종 결과 (문맥 파악 완료)");
    console.log(`최종 메모리 상태: ${hiddenState.toFixed(4)}`);
    console.log("----------------------------------------");
    console.log("========================================");
}

runRnnDemo();

/**
 * [ 🛠️ 엔지니어링 분석 리포트 (Engineering Insight) ]
 * * 1. 활성화 함수 Tanh:
 * - RNN에서는 주로 -1에서 1 사이의 값을 가지는 Tanh를 사용합니다. 
 * - 기억이 너무 커지거나(Exploding) 사라지는(Vanishing) 것을 방지하기 위함입니다.
 * * 2. 장기 의존성(Long-term Dependency) 문제:
 * - 문장이 너무 길어지면 맨 앞 단어의 기억이 점점 흐릿해집니다. 
 * - 이를 해결하기 위해 나중에 '중요한 것만 골라 기억하는' LSTM이나 GRU를 배웁니다.
 * * 3. 재발 방지 팁: 
 * - 문맥 파악이 안 된다면 데이터의 순서를 섞지 않았는지 확인하세요. RNN은 순서가 생명입니다!
 */